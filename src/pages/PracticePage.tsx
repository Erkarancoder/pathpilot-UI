import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Sparkles,
  Award,
  Code2,
  Search,
  BookOpen,
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { PracticeStatsBanner } from '../components/practice/PracticeStatsBanner'
import { CategoryCard } from '../components/practice/CategoryCard'
import { QuizRunnerModal } from '../components/practice/QuizRunnerModal'
import { CodingLabSection } from '../components/practice/CodingLabSection'
import { ResetPracticeModal } from '../components/practice/ResetPracticeModal'

import {
  PRACTICE_CATEGORIES,
  PRACTICE_QUESTIONS,
  type CategoryMetadata,
} from '../data/practiceData'
import {
  getPracticeStats,
  resetPracticeHistory,
  getOnboardingData,
} from '../lib/storage'

export const PracticePage: React.FC = () => {
  const onboarding = getOnboardingData()
  const [activeTab, setActiveTab] = useState<'quizzes' | 'coding'>('quizzes')
  const [stats, setStats] = useState(getPracticeStats)
  const [searchQuery, setSearchQuery] = useState('')

  // Modals state
  const [activeQuizCategory, setActiveQuizCategory] = useState<CategoryMetadata | null>(null)
  const [isResetModalOpen, setIsResetModalOpen] = useState(false)

  // Refresh stats on storage updates
  useEffect(() => {
    const refreshData = () => {
      setStats(getPracticeStats())
    }
    window.addEventListener('storage', refreshData)
    return () => window.removeEventListener('storage', refreshData)
  }, [])

  const handleStartQuiz = (cat: CategoryMetadata) => {
    setActiveQuizCategory(cat)
  }

  const handleQuizCompleted = () => {
    setStats(getPracticeStats())
  }

  const handleConfirmReset = () => {
    resetPracticeHistory()
    setStats(getPracticeStats())
  }

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return PRACTICE_CATEGORIES
    const q = searchQuery.toLowerCase()
    return PRACTICE_CATEGORIES.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    )
  }, [searchQuery])

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Breadcrumb Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[rgba(146,85,255,0.14)]">
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Dashboard
            </Button>
          </Link>
          <span className="text-[#A7A0C5]">/</span>
          <span className="text-sm font-bold text-[#F7F3FF]">
            Interactive Practice Lab
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="pink" size="sm" dot>
            Practice Workspace
          </Badge>
          {onboarding?.experienceLevel && (
            <Badge variant="violet" size="sm">
              Level: {onboarding.experienceLevel}
            </Badge>
          )}
        </div>
      </div>

      {/* Practice Performance Banner */}
      <PracticeStatsBanner
        stats={stats}
        onOpenResetModal={() => setIsResetModalOpen(true)}
      />

      {/* Mode Switcher Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-2 rounded-2xl bg-[#171536]/80 border border-[rgba(146,85,255,0.18)]">
        <div className="flex items-center gap-2 p-1 rounded-xl bg-[#090817] border border-[rgba(146,85,255,0.15)] text-xs">
          <button
            onClick={() => setActiveTab('quizzes')}
            className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'quizzes'
                ? 'bg-gradient-to-r from-[#F02BC8] to-[#9255FF] text-white shadow-[0_0_12px_rgba(240,43,200,0.3)]'
                : 'text-[#A7A0C5] hover:text-[#F7F3FF]'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Interactive MCQ Quizzes (7 Disciplines)</span>
          </button>
          <button
            onClick={() => setActiveTab('coding')}
            className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'coding'
                ? 'bg-gradient-to-r from-[#F02BC8] to-[#9255FF] text-white shadow-[0_0_12px_rgba(240,43,200,0.3)]'
                : 'text-[#A7A0C5] hover:text-[#F7F3FF]'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>DSA Coding Lab (Sample Test Runner)</span>
          </button>
        </div>

        {activeTab === 'quizzes' && (
          <div className="relative w-full sm:w-64 px-2">
            <div className="absolute inset-y-0 left-4 pl-1 flex items-center pointer-events-none text-[#A7A0C5]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search practice topics..."
              className="w-full h-9 pl-9 pr-3 rounded-xl bg-[#090817] border border-[rgba(146,85,255,0.2)] text-xs text-[#F7F3FF] placeholder-[#A7A0C5]/50 focus:outline-none focus:border-[#F02BC8]"
            />
          </div>
        )}
      </div>

      {/* Tab 1: Interactive Quizzes */}
      {activeTab === 'quizzes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#F7F3FF] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F02BC8]" />
              Subject Disciplines ({filteredCategories.length})
            </h3>
            <span className="text-xs text-[#A7A0C5]">
              Select any discipline to launch an interactive assessment
            </span>
          </div>

          {filteredCategories.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl bg-[#171536]/40 border border-dashed border-[rgba(146,85,255,0.25)] space-y-2">
              <BookOpen className="w-8 h-8 text-[#9255FF] mx-auto" />
              <h4 className="text-sm font-bold text-[#F7F3FF]">No categories match &ldquo;{searchQuery}&rdquo;</h4>
              <p className="text-xs text-[#A7A0C5]">Try searching for DSA, Java, React, Python, or SQL.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredCategories.map((cat) => {
                const catQuestions = PRACTICE_QUESTIONS.filter((q) => q.categoryId === cat.id)
                const catStats = stats.categoryStats[cat.id]

                return (
                  <CategoryCard
                    key={cat.id}
                    category={cat}
                    totalQuestions={catQuestions.length}
                    stats={catStats}
                    onStartQuiz={handleStartQuiz}
                  />
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: DSA Coding Lab */}
      {activeTab === 'coding' && (
        <CodingLabSection onSolutionSaved={() => setStats(getPracticeStats())} />
      )}

      {/* Quiz Runner Modal */}
      {activeQuizCategory && (
        <QuizRunnerModal
          isOpen={!!activeQuizCategory}
          onClose={() => setActiveQuizCategory(null)}
          category={activeQuizCategory}
          questions={PRACTICE_QUESTIONS.filter(
            (q) => q.categoryId === activeQuizCategory.id
          )}
          onQuizCompleted={handleQuizCompleted}
        />
      )}

      {/* Reset Practice History Confirmation Modal */}
      <ResetPracticeModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirmReset={handleConfirmReset}
      />
    </div>
  )
}
