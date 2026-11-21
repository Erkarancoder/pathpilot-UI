import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Award,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Target,
  Sparkles,
} from 'lucide-react'
import { Button } from '../ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { ProgressBar } from '../ui/ProgressBar'
import { ASSESSMENT_QUESTIONS } from '../../data/assessmentData'
import type { AssessmentResult } from '../../types'

interface StepResultProps {
  result: AssessmentResult
  learningGoals: string[]
  onNext: () => void
}

export const StepResult: React.FC<StepResultProps> = ({
  result,
  learningGoals,
  onNext,
}) => {
  const [showFullReview, setShowFullReview] = useState(false)

  const isPassing = result.percentage >= 60

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto space-y-6"
    >
      {/* Score Header Card */}
      <Card variant="accent-pink">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={isPassing ? 'success' : 'warning'} size="sm" dot>
                  Skill Assessment Completed
                </Badge>
                <Badge variant="violet" size="sm">
                  Verified Score
                </Badge>
              </div>
              <CardTitle className="text-xl sm:text-2xl">
                Diagnostic Assessment Results
              </CardTitle>
              <CardDescription>
                Calculated directly from your 8 submitted technical answers.
              </CardDescription>
            </div>

            {/* Score Pill */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#171536] border border-[rgba(240,43,200,0.3)] shadow-[0_0_20px_rgba(240,43,200,0.2)] shrink-0">
              <div className="text-right">
                <p className="text-[11px] text-[#A7A0C5]">Score Achieved</p>
                <p className="text-2xl font-extrabold text-[#F7F3FF]">
                  {result.score} <span className="text-sm font-normal text-[#A7A0C5]">/ {result.totalQuestions}</span>
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#F02BC8] to-[#9255FF] flex items-center justify-center font-bold text-white text-sm shadow-[0_0_12px_rgba(240,43,200,0.4)]">
                {result.percentage}%
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <ProgressBar
            value={result.percentage}
            variant="gradient"
            size="md"
            label="Overall Benchmark Mastery"
            showLabel
          />

          {/* Skill Interpretation & Recommendation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#171536]/80 border border-[rgba(146,85,255,0.2)] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#F7F3FF]">
                <Award className="w-4 h-4 text-[#F02BC8]" />
                <span>Skill Level Interpretation</span>
              </div>
              <p className="text-xs text-[#A7A0C5] leading-relaxed">
                {result.skillLevelSummary}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#171536]/80 border border-[rgba(146,85,255,0.2)] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#F7F3FF]">
                <Sparkles className="w-4 h-4 text-[#9255FF]" />
                <span>Next-Step Recommendation</span>
              </div>
              <p className="text-xs text-[#A7A0C5] leading-relaxed">
                {result.recommendation}
              </p>
            </div>
          </div>

          {/* Selected Goals Alignment */}
          <div className="p-4 rounded-xl bg-[#171536]/60 border border-[rgba(146,85,255,0.14)] space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#F7F3FF] flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-[#FF6BE6]" />
                Your Targeted Semester Goals
              </span>
              <span className="text-[#A7A0C5]">{learningGoals.length} selected</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {learningGoals.map((goal) => (
                <Badge key={goal} variant="pink" size="sm">
                  {goal}
                </Badge>
              ))}
            </div>
          </div>

          {/* Toggle Full Questions Review */}
          <div className="pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              fullWidth
              rightIcon={showFullReview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              onClick={() => setShowFullReview((prev) => !prev)}
            >
              {showFullReview ? 'Hide Question Breakdown' : 'Review All 8 Questions & Explanations'}
            </Button>
          </div>

          {/* Expandable Question Review Details */}
          {showFullReview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-3 pt-2"
            >
              {ASSESSMENT_QUESTIONS.map((q, idx) => {
                const userAns = result.answers[q.id]
                const isCorrect = userAns === q.correctAnswerIndex
                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border text-xs space-y-2 ${
                      isCorrect
                        ? 'bg-[#171536]/80 border-emerald-500/30'
                        : 'bg-[#171536]/80 border-red-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#F7F3FF]">
                        Question {idx + 1}: {q.topic}
                      </span>
                      {isCorrect ? (
                        <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-400 font-semibold">
                          <XCircle className="w-3.5 h-3.5" /> Incorrect
                        </span>
                      )}
                    </div>

                    <p className="text-[#A7A0C5]">{q.question}</p>

                    <div className="space-y-1 pt-1">
                      <p className="text-white">
                        <span className="text-[#A7A0C5]">Your answer: </span>
                        {userAns !== undefined ? q.options[userAns] : 'None'}
                      </p>
                      {!isCorrect && (
                        <p className="text-emerald-300">
                          <span className="text-[#A7A0C5]">Correct answer: </span>
                          {q.options[q.correctAnswerIndex]}
                        </p>
                      )}
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#090817] text-[#A7A0C5] text-[11px] leading-relaxed border border-[rgba(146,85,255,0.1)]">
                      <span className="text-[#FF6BE6] font-semibold">Explanation: </span>
                      {q.explanation}
                    </div>
                  </div>
                )
              })}
            </motion.div>
          )}

          {/* Action Navigation */}
          <div className="pt-4 border-t border-[rgba(146,85,255,0.12)] flex items-center justify-end">
            <Button
              type="button"
              variant="primary"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={onNext}
              className="shadow-[0_0_20px_rgba(240,43,200,0.4)]"
            >
              Continue to Completion
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
