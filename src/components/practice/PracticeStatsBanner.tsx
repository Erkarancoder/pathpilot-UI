import React from 'react'
import {
  Award,
  CheckCircle2,
  Code2,
  Target,
  RotateCcw,
} from 'lucide-react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { ProgressBar } from '../ui/ProgressBar'

interface PracticeStatsBannerProps {
  stats: {
    totalQuizzesCompleted: number
    totalQuestionsAttempted: number
    totalCorrectAnswers: number
    accuracyPercentage: number
    totalCodingSolved: number
  }
  onOpenResetModal: () => void
}

export const PracticeStatsBanner: React.FC<PracticeStatsBannerProps> = ({
  stats,
  onOpenResetModal,
}) => {
  return (
    <Card
      variant="default"
      className="border border-[rgba(146,85,255,0.25)] shadow-[0_10px_30px_rgba(0,0,0,0.4)] overflow-hidden"
    >
      <div className="p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F02BC8] to-[#9255FF] flex items-center justify-center text-white shadow-[0_0_15px_rgba(240,43,200,0.3)]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-[#F7F3FF]">
                Practice Performance &amp; Accuracy
              </h2>
              <p className="text-xs text-[#A7A0C5]">
                Calculated from genuine recorded attempts across MCQs and coding challenges
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenResetModal}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            className="text-[#A7A0C5] hover:text-rose-400 self-start sm:self-auto"
          >
            Reset History
          </Button>
        </div>

        {/* 4 Stat Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Accuracy */}
          <div className="p-3.5 rounded-xl bg-[#171536] border border-[rgba(146,85,255,0.18)] flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#A7A0C5] uppercase font-bold tracking-wider">
                Overall Accuracy
              </span>
              <Target className="w-3.5 h-3.5 text-[#F02BC8]" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-[#F7F3FF]">
                {stats.accuracyPercentage}%
              </span>
              <div className="pt-1.5">
                <ProgressBar
                  value={stats.accuracyPercentage}
                  variant="gradient"
                  size="sm"
                />
              </div>
            </div>
          </div>

          {/* Correct Questions */}
          <div className="p-3.5 rounded-xl bg-[#171536] border border-[rgba(146,85,255,0.18)] flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#A7A0C5] uppercase font-bold tracking-wider">
                Correct Answers
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-emerald-400">
                {stats.totalCorrectAnswers}
              </span>
              <span className="text-[11px] text-[#A7A0C5] block mt-0.5">
                out of {stats.totalQuestionsAttempted} questions attempted
              </span>
            </div>
          </div>

          {/* Quizzes Completed */}
          <div className="p-3.5 rounded-xl bg-[#171536] border border-[rgba(146,85,255,0.18)] flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#A7A0C5] uppercase font-bold tracking-wider">
                Quizzes Completed
              </span>
              <Award className="w-3.5 h-3.5 text-[#9255FF]" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-[#F7F3FF]">
                {stats.totalQuizzesCompleted}
              </span>
              <span className="text-[11px] text-[#A7A0C5] block mt-0.5">
                evaluated across 7 disciplines
              </span>
            </div>
          </div>

          {/* Coding Problems Solved */}
          <div className="p-3.5 rounded-xl bg-[#171536] border border-[rgba(146,85,255,0.18)] flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#A7A0C5] uppercase font-bold tracking-wider">
                Coding Solved
              </span>
              <Code2 className="w-3.5 h-3.5 text-[#FF6BE6]" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-[#FF6BE6]">
                {stats.totalCodingSolved}
              </span>
              <span className="text-[11px] text-[#A7A0C5] block mt-0.5">
                sample test suites validated
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
