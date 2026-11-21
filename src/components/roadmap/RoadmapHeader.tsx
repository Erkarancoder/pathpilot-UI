import React from 'react'
import {
  Sparkles,
  BookOpen,
  Clock,
  Layers,
  CheckCircle2,
  RotateCcw,
  Code2,
  Bot,
  Compass,
  ArrowRight,
  Target,
} from 'lucide-react'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { ProgressBar } from '../ui/ProgressBar'
import { LEARNING_PATHS } from '../../data/roadmapData'
import type { LearningPath, Lesson, RoadmapModule } from '../../types'

interface RoadmapHeaderProps {
  activePath: LearningPath
  onSelectPath: (pathId: string) => void
  recommendedPathIds: string[]
  completedLessonIds: string[]
  onResumeLearning?: () => void
  onOpenResetModal: () => void
  nextLesson?: Lesson
  nextModule?: RoadmapModule
}

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-4 h-4" />,
  Layers: <Layers className="w-4 h-4" />,
  Bot: <Bot className="w-4 h-4" />,
  Compass: <Compass className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
}

export const RoadmapHeader: React.FC<RoadmapHeaderProps> = ({
  activePath,
  onSelectPath,
  recommendedPathIds,
  completedLessonIds,
  onResumeLearning,
  onOpenResetModal,
  nextLesson,
  nextModule,
}) => {
  const allLessons = activePath.modules.flatMap((m) => m.lessons)
  const totalLessons = allLessons.length
  const completedCount = allLessons.filter((l) =>
    completedLessonIds.includes(l.id)
  ).length
  const progressPercent =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0
  const totalHours = activePath.modules.reduce((acc, m) => acc + m.estimatedHours, 0)
  const isRecommended = recommendedPathIds.includes(activePath.id)

  return (
    <div className="space-y-6">
      {/* 1. Learning Path Switcher Tabs */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-[#A7A0C5] flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-[#F02BC8]" />
            Select Learning Curriculum
          </label>
          <span className="text-xs text-[#A7A0C5]">
            5 Structured College Tracks
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {LEARNING_PATHS.map((path) => {
            const isSelected = path.id === activePath.id
            const isRec = recommendedPathIds.includes(path.id)
            const pathLessons = path.modules.flatMap((m) => m.lessons)
            const pathDone = pathLessons.filter((l) =>
              completedLessonIds.includes(l.id)
            ).length
            const pathPct =
              pathLessons.length > 0
                ? Math.round((pathDone / pathLessons.length) * 100)
                : 0

            return (
              <button
                key={path.id}
                onClick={() => onSelectPath(path.id)}
                className={`text-left p-3 rounded-xl border transition-all duration-200 relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#211C50] to-[#171536] border-[#F02BC8] shadow-[0_0_15px_rgba(240,43,200,0.25)]'
                    : 'bg-[#171536]/80 border-[rgba(146,85,255,0.18)] hover:border-[rgba(146,85,255,0.4)] hover:bg-[#171536]'
                }`}
              >
                <div className="space-y-1.5 w-full">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#F02BC8] text-white shadow-[0_0_8px_#F02BC8]'
                          : 'bg-[#211C50] text-[#9255FF]'
                      }`}
                    >
                      {iconMap[path.icon] || <BookOpen className="w-3.5 h-3.5" />}
                    </div>

                    {isRec ? (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[rgba(240,43,200,0.18)] text-[#FF6BE6] border border-[rgba(240,43,200,0.3)]">
                        Goal Match
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#A7A0C5] font-medium">
                        {pathPct}%
                      </span>
                    )}
                  </div>

                  <h4
                    className={`text-xs font-bold leading-snug line-clamp-2 ${
                      isSelected ? 'text-[#F7F3FF]' : 'text-[#A7A0C5]'
                    }`}
                  >
                    {path.title}
                  </h4>
                </div>

                {/* Mini progress bar on tab */}
                <div className="w-full mt-2 pt-2 border-t border-[rgba(146,85,255,0.1)]">
                  <div className="h-1 rounded-full bg-[#090817] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#F02BC8] to-[#9255FF]'
                          : 'bg-[#9255FF]/40'
                      }`}
                      style={{ width: `${pathPct}%` }}
                    />
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* 2. Active Path Hero Overview Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#171536] via-[#211C50] to-[#171536] border border-[rgba(146,85,255,0.25)] p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#F02BC8]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="pink" size="sm" dot>
                Active Roadmap
              </Badge>
              {isRecommended && (
                <Badge variant="violet" size="sm">
                  Recommended for your onboarding goal
                </Badge>
              )}
              <span className="text-xs text-[#A7A0C5] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#9255FF]" />
                ~{totalHours} Total Hours
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F7F3FF] tracking-tight">
              {activePath.title}
            </h1>

            <p className="text-xs sm:text-sm text-[#A7A0C5] leading-relaxed">
              {activePath.fullDescription}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {activePath.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg bg-[#171536] border border-[rgba(146,85,255,0.18)] text-[11px] text-[#F7F3FF] font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Progress & Resume Actions */}
          <div className="p-5 rounded-2xl bg-[#171536]/90 border border-[rgba(146,85,255,0.22)] shadow-[0_4px_20px_rgba(0,0,0,0.3)] space-y-4 shrink-0 lg:w-80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#A7A0C5]">Curriculum Mastery</span>
              <span className="text-sm font-extrabold text-[#FF6BE6]">
                {completedCount} / {totalLessons} ({progressPercent}%)
              </span>
            </div>

            <ProgressBar
              value={progressPercent}
              variant="gradient"
              size="md"
            />

            {nextLesson && (
              <div className="p-2.5 rounded-xl bg-[#211C50] border border-[rgba(146,85,255,0.2)] text-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#FF6BE6] block">
                  Next Incomplete Lesson
                </span>
                <p className="font-semibold text-[#F7F3FF] truncate">
                  {nextLesson.title}
                </p>
                {nextModule && (
                  <span className="text-[10px] text-[#A7A0C5] block">
                    {nextModule.title}
                  </span>
                )}
              </div>
            )}

            <div className="flex items-center gap-2 pt-1">
              {nextLesson && onResumeLearning ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onResumeLearning}
                  className="flex-1"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Continue Learning
                </Button>
              ) : (
                <div className="flex-1 p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold text-center flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Roadmap Completed!
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={onOpenResetModal}
                title="Reset progress for this path"
                className="text-[#A7A0C5] hover:text-rose-400"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
