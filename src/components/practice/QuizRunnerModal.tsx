import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Award,
  BookOpen,
} from 'lucide-react'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { ProgressBar } from '../ui/ProgressBar'
import { savePracticeQuizAttempt } from '../../lib/storage'
import type { PracticeQuestion, PracticeDifficulty, PracticeCategory } from '../../types'
import type { CategoryMetadata } from '../../data/practiceData'

interface QuizRunnerModalProps {
  isOpen: boolean
  onClose: () => void
  category: CategoryMetadata | null
  questions: PracticeQuestion[]
  onQuizCompleted?: () => void
}

export const QuizRunnerModal: React.FC<QuizRunnerModalProps> = ({
  isOpen,
  onClose,
  category,
  questions,
  onQuizCompleted,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    'All' | PracticeDifficulty
  >('All')

  const filteredQuestions = useMemo(() => {
    if (selectedDifficulty === 'All') return questions
    return questions.filter((q) => q.difficulty === selectedDifficulty)
  }, [questions, selectedDifficulty])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({})
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({})
  const [isFinished, setIsFinished] = useState(false)

  // Calculate score before any conditional return
  const correctCount = useMemo(() => {
    let count = 0
    filteredQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswerIndex) {
        count += 1
      }
    })
    return count
  }, [filteredQuestions, selectedAnswers])

  const totalQuestions = filteredQuestions.length
  const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0

  if (!isOpen || !category || filteredQuestions.length === 0) return null

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0]
  const currentSelectedOption = currentQ ? selectedAnswers[currentQ.id] : undefined
  const isCurrentSubmitted = currentQ ? !!submittedQuestions[currentQ.id] : false

  const handleSelectOption = (index: number) => {
    if (isCurrentSubmitted) return // Locked after checking
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: index,
    }))
  }

  const handleSubmitCurrentAnswer = () => {
    if (currentSelectedOption === undefined) return
    setSubmittedQuestions((prev) => ({
      ...prev,
      [currentQ.id]: true,
    }))
  }

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      // Finish quiz and persist
      setIsFinished(true)
      savePracticeQuizAttempt({
        categoryId: category.id as PracticeCategory,
        categoryTitle: category.title,
        difficulty: selectedDifficulty === 'All' ? 'Intermediate' : selectedDifficulty,
        score: correctCount,
        totalQuestions,
        percentage: scorePercentage,
        answers: selectedAnswers,
      })
      if (onQuizCompleted) onQuizCompleted()
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const handleRetake = () => {
    setCurrentIndex(0)
    setSelectedAnswers({})
    setSubmittedQuestions({})
    setIsFinished(false)
  }

  const handleDifficultyChange = (diff: 'All' | PracticeDifficulty) => {
    setSelectedDifficulty(diff)
    setCurrentIndex(0)
    setSelectedAnswers({})
    setSubmittedQuestions({})
    setIsFinished(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="fixed inset-0" onClick={onClose} />

      <AnimatePresence mode="wait">
        <motion.div
          key={isFinished ? 'results' : 'quiz'}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative z-10 w-full max-w-2xl max-h-[92vh] flex flex-col rounded-2xl bg-[#171536] border border-[rgba(146,85,255,0.3)] shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[rgba(146,85,255,0.15)] bg-[#090817]/70 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-md"
                style={{ backgroundColor: `${category.color}30`, color: category.color }}
              >
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FF6BE6]">
                    Practice Quiz
                  </span>
                  <Badge variant="violet" size="sm">
                    {category.title}
                  </Badge>
                </div>
                <h2 className="text-base sm:text-lg font-extrabold text-[#F7F3FF]">
                  {isFinished
                    ? 'Quiz Results & Review'
                    : `Question ${currentIndex + 1} of ${totalQuestions}`}
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#A7A0C5] hover:text-[#F7F3FF] rounded-lg hover:bg-[#211C50]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Difficulty Filter Bar (only before finish) */}
          {!isFinished && (
            <div className="px-5 py-2.5 bg-[#171536]/90 border-b border-[rgba(146,85,255,0.12)] flex items-center justify-between text-xs">
              <span className="text-[#A7A0C5]">Filter Difficulty:</span>
              <div className="flex items-center gap-1">
                {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map(
                  (lvl) => (
                    <button
                      key={lvl}
                      onClick={() => handleDifficultyChange(lvl)}
                      className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                        selectedDifficulty === lvl
                          ? 'bg-gradient-to-r from-[#F02BC8] to-[#9255FF] text-white'
                          : 'text-[#A7A0C5] hover:text-[#F7F3FF]'
                      }`}
                    >
                      {lvl}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {isFinished ? (
              /* FINAL RESULT SCREEN */
              <div className="space-y-6 text-center">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-[#F02BC8] to-[#9255FF] flex items-center justify-center text-white shadow-[0_0_30px_rgba(240,43,200,0.35)]">
                  <Award className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-[#F7F3FF]">
                    {scorePercentage >= 80
                      ? 'Outstanding Mastery!'
                      : scorePercentage >= 60
                      ? 'Good Academic Effort!'
                      : 'Needs Further Review'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A7A0C5] max-w-md mx-auto">
                    You answered <strong className="text-emerald-400">{correctCount}</strong> out of{' '}
                    <strong>{totalQuestions}</strong> questions correctly ({scorePercentage}%).
                  </p>
                </div>

                {/* Accuracy meter */}
                <div className="p-4 rounded-xl bg-[#211C50]/60 border border-[rgba(146,85,255,0.2)] max-w-sm mx-auto space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#A7A0C5]">Evaluation Accuracy</span>
                    <span className="font-extrabold text-[#FF6BE6]">{scorePercentage}%</span>
                  </div>
                  <ProgressBar value={scorePercentage} variant="gradient" size="md" />
                </div>

                {/* Review Breakdown */}
                <div className="space-y-3 text-left pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#A7A0C5] flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#9255FF]" />
                    Question Review &amp; Academic Explanations
                  </h4>

                  <div className="space-y-3">
                    {filteredQuestions.map((q, idx) => {
                      const userChoice = selectedAnswers[q.id]
                      const isCorrect = userChoice === q.correctAnswerIndex

                      return (
                        <div
                          key={q.id}
                          className={`p-4 rounded-xl border text-xs space-y-2.5 ${
                            isCorrect
                              ? 'bg-emerald-500/10 border-emerald-500/25'
                              : 'bg-rose-500/10 border-rose-500/25'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-bold text-[#F7F3FF]">
                              {idx + 1}. {q.question}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                                isCorrect
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : 'bg-rose-500/20 text-rose-400'
                              }`}
                            >
                              {isCorrect ? 'Correct' : 'Incorrect'}
                            </span>
                          </div>

                          <div className="text-[11px] text-[#A7A0C5] space-y-1">
                            <p>
                              Your answer:{' '}
                              <strong className={isCorrect ? 'text-emerald-400' : 'text-rose-400'}>
                                {userChoice !== undefined ? q.options[userChoice] : 'Not answered'}
                              </strong>
                            </p>
                            {!isCorrect && (
                              <p>
                                Correct answer:{' '}
                                <strong className="text-emerald-400">
                                  {q.options[q.correctAnswerIndex]}
                                </strong>
                              </p>
                            )}
                          </div>

                          <div className="p-3 rounded-lg bg-[#171536] border border-[rgba(146,85,255,0.15)] text-[11px] text-[#A7A0C5] leading-relaxed">
                            <strong className="text-[#FF6BE6] block mb-1">Explanation:</strong>
                            {q.explanation}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ) : (
              /* ACTIVE QUESTION VIEW */
              <div className="space-y-5">
                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[#A7A0C5]">
                    <span>
                      Question {currentIndex + 1} of {totalQuestions}
                    </span>
                    <Badge variant="violet" size="sm">
                      {currentQ.difficulty}
                    </Badge>
                  </div>
                  <ProgressBar
                    value={Math.round(((currentIndex + 1) / totalQuestions) * 100)}
                    variant="gradient"
                    size="sm"
                  />
                </div>

                {/* Question Prompt */}
                <div className="p-4 rounded-xl bg-[#211C50]/60 border border-[rgba(146,85,255,0.22)]">
                  <h3 className="text-sm sm:text-base font-bold text-[#F7F3FF] leading-relaxed">
                    {currentQ.question}
                  </h3>
                </div>

                {/* Multiple Choice Options */}
                <div className="space-y-2.5">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = currentSelectedOption === idx
                    const isCorrectAnswer = idx === currentQ.correctAnswerIndex

                    let optionStyle =
                      'bg-[#171536] border-[rgba(146,85,255,0.18)] hover:border-[rgba(240,43,200,0.4)] text-[#F7F3FF]'

                    if (isSelected && !isCurrentSubmitted) {
                      optionStyle =
                        'bg-gradient-to-r from-[rgba(240,43,200,0.18)] to-[rgba(146,85,255,0.15)] border-[#F02BC8] text-[#F7F3FF] shadow-[0_0_12px_rgba(240,43,200,0.2)]'
                    }

                    if (isCurrentSubmitted) {
                      if (isCorrectAnswer) {
                        optionStyle =
                          'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                      } else if (isSelected && !isCorrectAnswer) {
                        optionStyle =
                          'bg-rose-500/20 border-rose-500 text-rose-300 font-semibold'
                      } else {
                        optionStyle =
                          'bg-[#171536]/40 border-[rgba(146,85,255,0.1)] text-[#A7A0C5]/60'
                      }
                    }

                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelectOption(idx)}
                        disabled={isCurrentSubmitted}
                        className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all duration-200 flex items-center justify-between gap-3 ${optionStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-[#211C50] text-[#A7A0C5] text-xs font-bold flex items-center justify-center shrink-0">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="leading-snug">{opt}</span>
                        </div>

                        {isCurrentSubmitted && isCorrectAnswer && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        )}
                        {isCurrentSubmitted && isSelected && !isCorrectAnswer && (
                          <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Explanation Reveal Box after submission */}
                <AnimatePresence>
                  {isCurrentSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1.5 ${
                        currentSelectedOption === currentQ.correctAnswerIndex
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold">
                        <HelpCircle className="w-4 h-4" />
                        <span>
                          {currentSelectedOption === currentQ.correctAnswerIndex
                            ? 'Correct!'
                            : 'Incorrect! Here is the concept explanation:'}
                        </span>
                      </div>
                      <p className="text-[#F7F3FF] pt-1">{currentQ.explanation}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Footer Navigation */}
          <div className="p-4 sm:p-5 border-t border-[rgba(146,85,255,0.15)] bg-[#090817]/90 flex items-center justify-between gap-3">
            {isFinished ? (
              <div className="w-full flex items-center justify-between gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRetake}
                  leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                >
                  Retake Quiz
                </Button>
                <Button variant="primary" size="sm" onClick={onClose}>
                  Complete &amp; Return to Lab
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={currentIndex === 0}
                  onClick={handlePrev}
                  leftIcon={<ChevronLeft className="w-4 h-4" />}
                >
                  Previous
                </Button>

                <div className="flex items-center gap-2">
                  {!isCurrentSubmitted ? (
                    <Button
                      variant="primary"
                      size="sm"
                      disabled={currentSelectedOption === undefined}
                      onClick={handleSubmitCurrentAnswer}
                      leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                    >
                      Check Answer
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleNext}
                      rightIcon={<ChevronRight className="w-4 h-4" />}
                    >
                      {currentIndex === totalQuestions - 1 ? 'View Results' : 'Next Question'}
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
