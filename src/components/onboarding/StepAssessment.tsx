import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  AlertCircle,
  FileCheck,
} from 'lucide-react'
import { Button } from '../ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { ProgressBar } from '../ui/ProgressBar'
import { ASSESSMENT_QUESTIONS, calculateSkillSummary } from '../../data/assessmentData'
import type { AssessmentResult } from '../../types'

interface StepAssessmentProps {
  initialAnswers?: Record<number, number>
  onComplete: (result: AssessmentResult) => void
  onBack: () => void
}

export const StepAssessment: React.FC<StepAssessmentProps> = ({
  initialAnswers = {},
  onComplete,
  onBack,
}) => {
  const [currentQIndex, setCurrentQIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>(initialAnswers)
  const [validationError, setValidationError] = useState('')

  const currentQ = ASSESSMENT_QUESTIONS[currentQIndex]
  const totalQuestions = ASSESSMENT_QUESTIONS.length
  const answeredCount = Object.keys(answers).length
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100)

  const handleSelectOption = (optionIndex: number) => {
    setValidationError('')
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex,
    }))
  }

  const handleNext = () => {
    if (answers[currentQ.id] === undefined) {
      setValidationError('Please select an option before moving forward.')
      return
    }
    setValidationError('')
    if (currentQIndex < totalQuestions - 1) {
      setCurrentQIndex((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    setValidationError('')
    if (currentQIndex > 0) {
      setCurrentQIndex((prev) => prev - 1)
    } else {
      onBack()
    }
  }

  const handleSubmitAssessment = () => {
    // Verify all 8 questions answered
    const unanswered: number[] = []
    ASSESSMENT_QUESTIONS.forEach((q, idx) => {
      if (answers[q.id] === undefined) {
        unanswered.push(idx + 1)
      }
    })

    if (unanswered.length > 0) {
      setValidationError(
        `Please answer all questions before submitting. Unanswered questions: #${unanswered.join(', #')}`
      )
      return
    }

    // Calculate score
    let score = 0
    ASSESSMENT_QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correctAnswerIndex) {
        score += 1
      }
    })

    const evaluation = calculateSkillSummary(score, totalQuestions)

    const result: AssessmentResult = {
      score,
      totalQuestions,
      percentage: Math.round((score / totalQuestions) * 100),
      answers,
      skillLevelSummary: `${evaluation.level}: ${evaluation.summary}`,
      recommendation: evaluation.recommendation,
      completedAt: new Date().toISOString(),
    }

    onComplete(result)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card variant="default">
        <CardHeader className="pb-4 border-b border-[rgba(146,85,255,0.14)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[rgba(240,43,200,0.15)] flex items-center justify-center text-[#F02BC8]">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-base sm:text-lg">
                  Step 5: Interactive Diagnostic Assessment
                </CardTitle>
                <CardDescription>
                  8 questions covering algorithms, web runtimes, data structures, and databases.
                </CardDescription>
              </div>
            </div>

            <Badge variant="pink" size="sm" dot>
              {answeredCount} of {totalQuestions} Answered
            </Badge>
          </div>

          {/* Question Progress Bar */}
          <div className="pt-2">
            <ProgressBar
              value={progressPercent}
              variant="gradient"
              size="sm"
            />
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* Quick Question Number Jump Bar */}
          <div className="flex items-center justify-between gap-1.5 overflow-x-auto pb-1">
            {ASSESSMENT_QUESTIONS.map((q, idx) => {
              const isCurrent = idx === currentQIndex
              const isAnswered = answers[q.id] !== undefined
              return (
                <button
                  type="button"
                  key={q.id}
                  onClick={() => {
                    setValidationError('')
                    setCurrentQIndex(idx)
                  }}
                  className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center ${
                    isCurrent
                      ? 'bg-[#F02BC8] text-white shadow-[0_0_12px_rgba(240,43,200,0.4)]'
                      : isAnswered
                      ? 'bg-[#211C50] border border-emerald-400/40 text-emerald-300'
                      : 'bg-[#171536] border border-[rgba(146,85,255,0.2)] text-[#A7A0C5] hover:text-[#F7F3FF]'
                  }`}
                  title={`Question ${idx + 1}: ${q.topic}`}
                >
                  {idx + 1}
                </button>
              )
            })}
          </div>

          {validationError && (
            <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/35 text-red-300 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Question Area Animated Container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              {/* Question Header */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="violet" size="sm">
                    {currentQ.topic}
                  </Badge>
                  <span className="text-xs text-[#A7A0C5]">
                    Question {currentQIndex + 1} of {totalQuestions}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#F7F3FF] leading-snug">
                  {currentQ.question}
                </h3>
              </div>

              {/* 4 Clickable Options */}
              <div className="space-y-3">
                {currentQ.options.map((option, optIdx) => {
                  const isSelected = answers[currentQ.id] === optIdx
                  const letters = ['A', 'B', 'C', 'D']
                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-3.5 select-none ${
                        isSelected
                          ? 'bg-gradient-to-r from-[rgba(240,43,200,0.18)] to-[rgba(146,85,255,0.18)] border-[#F02BC8] shadow-[0_0_15px_rgba(240,43,200,0.25)] text-[#F7F3FF]'
                          : 'bg-[#171536]/80 border-[rgba(146,85,255,0.18)] hover:border-[rgba(146,85,255,0.4)] hover:bg-[#171536] text-[#A7A0C5] hover:text-[#F7F3FF]'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 border transition-colors ${
                          isSelected
                            ? 'bg-[#F02BC8] text-white border-[#F02BC8]'
                            : 'bg-[#090817] border-[rgba(146,85,255,0.3)] text-[#A7A0C5]'
                        }`}
                      >
                        {letters[optIdx]}
                      </div>
                      <span className="text-xs sm:text-sm font-medium leading-relaxed">
                        {option}
                      </span>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-[rgba(146,85,255,0.12)] flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              size="md"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              onClick={handlePrev}
            >
              {currentQIndex === 0 ? 'Back to Skills' : 'Previous Question'}
            </Button>

            {currentQIndex < totalQuestions - 1 ? (
              <Button
                type="button"
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={handleNext}
              >
                Next Question
              </Button>
            ) : (
              <Button
                type="button"
                variant="primary"
                size="md"
                leftIcon={<FileCheck className="w-4 h-4" />}
                onClick={handleSubmitAssessment}
                className="shadow-[0_0_20px_rgba(240,43,200,0.45)]"
              >
                Submit &amp; View Results
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
