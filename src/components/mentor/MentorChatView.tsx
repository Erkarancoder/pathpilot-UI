import React, { useState, useRef, useEffect } from 'react'
import {
  Send,
  RotateCcw,
  Sparkles,
  Bot,
  User,
  Info,
  Clock,
  ArrowRight,
} from 'lucide-react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import {
  SUGGESTED_MENTOR_PROMPTS,
  generateMentorResponse,
  type StudentMentorContext,
} from '../../data/mentorKnowledge'
import {
  getMentorChatHistory,
  saveMentorChatHistory,
  clearMentorChatHistory,
  getOnboardingData,
  getActiveRoadmapId,
  getRoadmapProgress,
  getPracticeStats,
  getCompletedLessons,
} from '../../lib/storage'
import type { ChatMessage } from '../../types'

interface MentorChatViewProps {
  onSwitchToStudyPlan?: () => void
}

export const MentorChatView: React.FC<MentorChatViewProps> = ({ onSwitchToStudyPlan }) => {
  const onboarding = getOnboardingData()
  const activeRoadmapId = getActiveRoadmapId()
  const roadmapProgress = getRoadmapProgress(activeRoadmapId)
  const completedLessonIds = getCompletedLessons()
  const practiceStats = getPracticeStats()

  // Find next incomplete lesson
  let nextLessonTitle: string | undefined = undefined
  for (const mod of roadmapProgress.path.modules) {
    for (const les of mod.lessons) {
      if (!completedLessonIds.includes(les.id)) {
        nextLessonTitle = les.title
        break
      }
    }
    if (nextLessonTitle) break
  }

  const mentorContext: StudentMentorContext = {
    onboarding,
    activeRoadmapTitle: roadmapProgress.path.title,
    completedLessonsCount: roadmapProgress.completedCount,
    totalLessonsCount: roadmapProgress.totalCount,
    nextLessonTitle,
    recentQuizAttempts: practiceStats.recentAttempts,
    overallAccuracy: practiceStats.accuracyPercentage,
  }

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const history = getMentorChatHistory()
    if (history.length > 0) return history
    return [
      {
        id: 'welcome-1',
        sender: 'assistant',
        text: `### 👋 Welcome to PathPilot Study Assistant!\n\nI am your **local educational study mentor**. In this frontend build, I operate entirely inside your browser using deterministic educational intelligence to help guide your studies, diagnose quiz mistakes, and explain core engineering concepts.\n\nHow can I help you accelerate your learning today? Click any suggested topic below or type a query!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowUps: [
          'Suggest what I should learn next',
          'Explain my quiz mistakes',
          'Explain a DSA concept',
          'Create a study plan',
        ],
        isDemoNotice: true,
      },
    ]
  })

  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputValue.trim()
    if (!query || isTyping) return

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    const updatedWithUser = [...messages, userMessage]
    setMessages(updatedWithUser)
    saveMentorChatHistory(updatedWithUser)
    setInputValue('')
    setIsTyping(true)

    // Simulate realistic educational processing latency (400ms - 700ms)
    setTimeout(() => {
      const response = generateMentorResponse(query, mentorContext)
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now()}-assistant`,
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowUps: response.suggestedFollowUps,
        topicTag: response.topicTag,
        isDemoNotice: response.isDemoNotice,
      }

      const finalMessages = [...updatedWithUser, assistantMessage]
      setMessages(finalMessages)
      saveMentorChatHistory(finalMessages)
      setIsTyping(false)
    }, 600)
  }

  const handleClearHistory = () => {
    clearMentorChatHistory()
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: `### Conversation Cleared 🔄\n\nChat history has been reset. What topic would you like to explore next?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowUps: SUGGESTED_MENTOR_PROMPTS.slice(0, 4),
      },
    ])
  }

  // Format markdown helper (bold, code blocks, headers, bullet points)
  const renderMessageContent = (text: string) => {
    const lines = text.split('\n')
    return (
      <div className="space-y-2 text-sm leading-relaxed">
        {lines.map((line, idx) => {
          // Headers
          if (line.startsWith('### ')) {
            return (
              <h4 key={idx} className="text-base font-extrabold text-[#F7F3FF] mt-2 mb-1">
                {line.replace('### ', '')}
              </h4>
            )
          }
          if (line.startsWith('#### ')) {
            return (
              <h5 key={idx} className="text-sm font-bold text-[#FF6BE6] mt-2">
                {line.replace('#### ', '')}
              </h5>
            )
          }
          // Code block markers
          if (line.startsWith('```')) {
            return null
          }
          // Bullets
          if (line.startsWith('- ')) {
            return (
              <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#F7F3FF]">
                <span className="text-[#F02BC8] font-bold mt-1">•</span>
                <span>{formatInlineMarkdown(line.replace('- ', ''))}</span>
              </div>
            )
          }
          // Numbered lists
          if (/^\d+\.\s/.test(line)) {
            const num = line.match(/^(\d+\.)\s/)?.[1]
            const rest = line.replace(/^\d+\.\s/, '')
            return (
              <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#F7F3FF]">
                <span className="text-[#9255FF] font-bold">{num}</span>
                <span>{formatInlineMarkdown(rest)}</span>
              </div>
            )
          }
          // Standard text or empty
          if (!line.trim()) {
            return <div key={idx} className="h-1" />
          }
          return (
            <p key={idx} className="text-xs sm:text-sm text-[#F7F3FF]">
              {formatInlineMarkdown(line)}
            </p>
          )
        })}
      </div>
    )
  }

  const formatInlineMarkdown = (str: string) => {
    // Basic parser for **bold** and `code`
    const parts = str.split(/(\*\*.*?\*\*|`.*?`)/g)
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-[#FF6BE6]">
            {part.slice(2, -2)}
          </strong>
        )
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={i}
            className="px-1.5 py-0.5 rounded bg-[#090817] text-[#9255FF] font-mono text-xs border border-[rgba(146,85,255,0.2)]"
          >
            {part.slice(1, -1)}
          </code>
        )
      }
      return part
    })
  }

  return (
    <Card
      variant="default"
      className="flex flex-col h-[750px] border border-[rgba(146,85,255,0.25)] shadow-[0_15px_40px_rgba(0,0,0,0.5)] overflow-hidden"
    >
      {/* Top Header */}
      <div className="p-4 bg-[#080611] border-b border-[rgba(146,85,255,0.18)] flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F02BC8] to-[#9255FF] flex items-center justify-center text-white shadow-[0_0_15px_rgba(240,43,200,0.35)]">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-[#F7F3FF]">
                PathPilot AI Study Mentor
              </h3>
              <Badge variant="violet" size="sm">
                Local Assistant
              </Badge>
            </div>
            <p className="text-[11px] text-[#A7A0C5]">
              Deterministic educational engine • Synchronized with your roadmap & practice data
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onSwitchToStudyPlan && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSwitchToStudyPlan}
              className="hidden sm:flex text-xs gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF6BE6]" />
              <span>Study Plan</span>
            </Button>
          )}
          <button
            onClick={handleClearHistory}
            title="Clear Chat History"
            className="p-2 rounded-xl bg-[#171536] hover:bg-[#211C50] text-[#A7A0C5] hover:text-[#F7F3FF] border border-[rgba(146,85,255,0.15)] transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Honest Disclaimer Ribbon */}
      <div className="px-4 py-2 bg-[rgba(146,85,255,0.08)] border-b border-[rgba(146,85,255,0.12)] flex items-center justify-between text-[11px] text-[#A7A0C5]">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-[#9255FF] shrink-0" />
          <span>
            Client-Side Educational Assistant: Responses are deterministically curated for academic guidance without external LLM APIs.
          </span>
        </div>
      </div>

      {/* Conversation Messages Panel */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user'

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-xs font-bold ${
                  isUser
                    ? 'bg-gradient-to-tr from-[#F02BC8] to-[#9255FF] text-white shadow-[0_0_10px_rgba(240,43,200,0.3)]'
                    : 'bg-[#080611] text-[#9255FF] border border-[rgba(146,85,255,0.25)]'
                }`}
              >
                {isUser ? (
                  onboarding?.avatarInitials || <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[85%] sm:max-w-[78%] space-y-2`}>
                <div
                  className={`p-4 rounded-2xl border text-sm ${
                    isUser
                      ? 'bg-gradient-to-r from-[rgba(240,43,200,0.18)] to-[rgba(146,85,255,0.22)] border-[rgba(240,43,200,0.3)] text-[#F7F3FF] rounded-tr-none'
                      : 'bg-[#211C50]/80 border-[rgba(146,85,255,0.2)] text-[#F7F3FF] rounded-tl-none shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
                  }`}
                >
                  {/* Topic tag badge if available */}
                  {!isUser && msg.topicTag && (
                    <div className="mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[rgba(146,85,255,0.2)] text-[#FF6BE6] border border-[rgba(146,85,255,0.25)]">
                        {msg.topicTag}
                      </span>
                    </div>
                  )}

                  {renderMessageContent(msg.text)}

                  {/* Timestamp */}
                  <div
                    className={`mt-2 text-[10px] text-[#A7A0C5] flex items-center gap-1 ${
                      isUser ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    <span>{msg.timestamp}</span>
                  </div>
                </div>

                {/* Follow-up question chips */}
                {!isUser && msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                  <div className="pt-1 flex flex-wrap gap-1.5">
                    {msg.suggestedFollowUps.map((chip, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(chip)}
                        className="px-2.5 py-1 rounded-lg bg-[#090817] hover:bg-[#171536] text-[11px] font-medium text-[#FF6BE6] hover:text-white border border-[rgba(240,43,200,0.25)] transition-all cursor-pointer flex items-center gap-1"
                      >
                        <span>{chip}</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl shrink-0 bg-[#080611] text-[#9255FF] border border-[rgba(146,85,255,0.25)] flex items-center justify-center">
              <Bot className="w-4 h-4 animate-pulse" />
            </div>
            <div className="p-3.5 rounded-2xl rounded-tl-none bg-[#211C50]/80 border border-[rgba(146,85,255,0.2)] flex items-center gap-1.5 text-xs text-[#A7A0C5]">
              <span className="w-2 h-2 rounded-full bg-[#F02BC8] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#9255FF] animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-[#FF6BE6] animate-bounce [animation-delay:0.4s]" />
              <span className="ml-2 font-medium">Formulating guidance...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="p-2.5 bg-[#090817] border-t border-[rgba(146,85,255,0.14)] overflow-x-auto flex items-center gap-2">
        <span className="text-[11px] font-bold text-[#A7A0C5] shrink-0 pl-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#F02BC8]" />
          Prompts:
        </span>
        {SUGGESTED_MENTOR_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            disabled={isTyping}
            className="px-2.5 py-1 rounded-xl bg-[#171536] hover:bg-[#211C50] text-[11px] font-medium text-[#A7A0C5] hover:text-[#F7F3FF] border border-[rgba(146,85,255,0.18)] transition-all shrink-0 cursor-pointer disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Bottom Input Form */}
      <div className="p-3 sm:p-4 bg-[#080611] border-t border-[rgba(146,85,255,0.18)]">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask a question about DSA, React, interviews, your quiz mistakes..."
            disabled={isTyping}
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#171536] border border-[rgba(146,85,255,0.25)] text-sm text-[#F7F3FF] placeholder-[#A7A0C5] focus:outline-none focus:border-[#F02BC8] focus:ring-1 focus:ring-[#F02BC8] transition-all"
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={!inputValue.trim() || isTyping}
            className="gap-2 cursor-pointer shrink-0"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </Card>
  )
}
