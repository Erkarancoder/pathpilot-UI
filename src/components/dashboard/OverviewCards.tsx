import React from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, Flame, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react'
import { Card, CardContent } from '../ui/Card'
import { getActiveRoadmapId, getRoadmapProgress, getGamificationState, getPracticeStats } from '../../lib/storage'
import type { StudyTask, AssessmentResult } from '../../types'

interface OverviewCardsProps {
  tasks: StudyTask[]
  assessmentResult?: AssessmentResult
  streakDays: number
  onOpenAssessmentModal?: () => void
}

export const OverviewCards: React.FC<OverviewCardsProps> = ({
  tasks,
  assessmentResult,
  streakDays,
}) => {
  const completedTasks = tasks.filter((t) => t.completed).length
  const totalTasks = tasks.length
  const taskProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  // Read actual roadmap progress from storage
  const activeRoadmapId = getActiveRoadmapId()
  const roadmapProgress = getRoadmapProgress(activeRoadmapId)
  const gamification = getGamificationState()
  const practiceStats = getPracticeStats()

  // Combined overall progress taking into account assessment + tasks + roadmap lessons + practice
  const assessmentFactor = assessmentResult ? assessmentResult.percentage : 50
  const practiceFactor = practiceStats.accuracyPercentage || 50
  const overallProgress = Math.round(
    assessmentFactor * 0.25 + taskProgress * 0.25 + roadmapProgress.percentage * 0.3 + practiceFactor * 0.2
  )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Overall Learning Progress */}
      <Card variant="default">
        <CardContent className="p-5 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#A7A0C5]">Overall Semester Progress</span>
            <div className="w-9 h-9 rounded-xl bg-[rgba(146,85,255,0.15)] text-[#9255FF] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h4 className="text-2xl font-extrabold text-[#F7F3FF] tracking-tight">
              {overallProgress}%
            </h4>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#FF6BE6] font-medium">
              <span>{completedTasks} tasks • {roadmapProgress.completedCount} lessons</span>
              <span className="text-[#A7A0C5]">• {roadmapProgress.path.title.split(' ')[0]}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Assessment Score */}
      <Card variant="default">
        <CardContent className="p-5 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#A7A0C5]">Diagnostic Score</span>
            <div className="w-9 h-9 rounded-xl bg-[rgba(240,43,200,0.15)] text-[#F02BC8] flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div>
            {assessmentResult ? (
              <>
                <h4 className="text-2xl font-extrabold text-[#F7F3FF] tracking-tight">
                  {assessmentResult.percentage}%
                </h4>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-400 font-medium">
                  <span>{assessmentResult.score} / {assessmentResult.totalQuestions} Questions</span>
                  <span className="text-[#A7A0C5]">• Verified</span>
                </div>
              </>
            ) : (
              <>
                <h4 className="text-base font-bold text-[#F7F3FF] tracking-tight">
                  Unverified
                </h4>
                <Link
                  to="/onboarding"
                  className="flex items-center gap-1 mt-1 text-[11px] text-[#FF6BE6] hover:underline"
                >
                  <Sparkles className="w-3 h-3" />
                  Take assessment test
                </Link>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 3. Completed Study Tasks */}
      <Card variant="default">
        <CardContent className="p-5 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#A7A0C5]">Daily Study Tasks</span>
            <div className="w-9 h-9 rounded-xl bg-[rgba(146,85,255,0.15)] text-[#9255FF] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h4 className="text-2xl font-extrabold text-[#F7F3FF] tracking-tight">
              {completedTasks} / {totalTasks}
            </h4>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#A7A0C5]">
              <span className="text-emerald-400 font-medium">{taskProgress}% complete</span>
              <span>• Today's queue</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. Current Real Study Streak & XP */}
      <Card variant="default">
        <CardContent className="p-5 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#A7A0C5]">Study Streak & XP</span>
            <div className="w-9 h-9 rounded-xl bg-[rgba(240,43,200,0.15)] text-[#F02BC8] flex items-center justify-center">
              <Flame className="w-4 h-4 fill-[#F02BC8]" />
            </div>
          </div>
          <div>
            <h4 className="text-2xl font-extrabold text-[#F7F3FF] tracking-tight">
              {streakDays} Days
            </h4>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-400 font-medium">
              <span>{gamification.xp} Total XP</span>
              <span className="text-[#A7A0C5]">• Level {gamification.level}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
