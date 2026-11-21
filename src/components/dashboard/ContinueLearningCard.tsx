import React from 'react'
import { Link } from 'react-router-dom'
import {
  Compass,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
  BookOpen,
} from 'lucide-react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { ProgressBar } from '../ui/ProgressBar'
import { getActiveRoadmapId, getRoadmapProgress } from '../../lib/storage'

export const ContinueLearningCard: React.FC = () => {
  const activePathId = getActiveRoadmapId()
  const progress = getRoadmapProgress(activePathId)

  const { path, completedCount, totalCount, percentage, nextLesson, nextModule, isAllCompleted } = progress

  return (
    <Card
      variant="accent-pink"
      className="overflow-hidden border border-[rgba(240,43,200,0.3)] shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
    >
      <div className="p-5 sm:p-6 space-y-4">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F02BC8] to-[#9255FF] flex items-center justify-center text-white shadow-[0_0_12px_rgba(240,43,200,0.3)]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF6BE6]">
                  Active Learning Track
                </span>
                <Badge variant="violet" size="sm">
                  {completedCount}/{totalCount} Completed
                </Badge>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#F7F3FF]">
                {path.title}
              </h3>
            </div>
          </div>

          <Link to="/roadmap">
            <Button
              variant="outline"
              size="sm"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              All Roadmaps
            </Button>
          </Link>
        </div>

        {/* Progress Bar */}
        <ProgressBar
          value={percentage}
          variant="gradient"
          size="sm"
          label="Track Completion"
          showLabel
        />

        {/* Next Lesson Box or Completed Banner */}
        {isAllCompleted ? (
          <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-emerald-300 text-xs sm:text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>You have completed all lessons in this curriculum track!</span>
            </div>
            <Link to="/roadmap">
              <Button variant="primary" size="sm">
                Explore Next Track
              </Button>
            </Link>
          </div>
        ) : nextLesson ? (
          <div className="p-4 rounded-xl bg-[#171536] border border-[rgba(146,85,255,0.2)] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A7A0C5] flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-[#9255FF]" />
                  Up Next in {nextModule?.title}
                </span>
                <span className="text-[10px] text-[#A7A0C5] flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  {nextLesson.durationMinutes}m
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#F7F3FF] truncate">
                {nextLesson.title}
              </h4>
              <p className="text-xs text-[#A7A0C5] line-clamp-1">
                {nextLesson.objective}
              </p>
            </div>

            <Link to="/roadmap" className="shrink-0">
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Sparkles className="w-3.5 h-3.5 text-white" />}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Continue Learning
              </Button>
            </Link>
          </div>
        ) : null}
      </div>
    </Card>
  )
}
