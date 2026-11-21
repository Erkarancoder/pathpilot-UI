import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  Clock,
  CheckCircle2,
  Lock,
  Layers,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { ProgressBar } from '../ui/ProgressBar'
import { LessonItem } from './LessonItem'
import type { RoadmapModule, Lesson } from '../../types'

interface ModuleCardProps {
  module: RoadmapModule
  completedLessonIds: string[]
  onToggleLesson: (lessonId: string) => void
  onSelectLesson: (lesson: Lesson, module: RoadmapModule) => void
  isLocked?: boolean
  defaultExpanded?: boolean
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  completedLessonIds,
  onToggleLesson,
  onSelectLesson,
  isLocked = false,
  defaultExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  const totalLessons = module.lessons.length
  const completedCount = module.lessons.filter((l) =>
    completedLessonIds.includes(l.id)
  ).length
  const progressPercent =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0
  const isModuleCompleted = completedCount === totalLessons && totalLessons > 0

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'pink' as const
      case 'Intermediate':
        return 'violet' as const
      case 'Advanced':
        return 'neutral' as const
      default:
        return 'violet' as const
    }
  }

  return (
    <Card
      variant="default"
      className={`border transition-all duration-300 ${
        isModuleCompleted
          ? 'border-emerald-500/30 shadow-[0_4px_20px_rgba(16,185,129,0.08)]'
          : isExpanded
          ? 'border-[rgba(240,43,200,0.35)] shadow-[0_8px_30px_rgba(0,0,0,0.4)]'
          : 'border-[rgba(146,85,255,0.18)] hover:border-[rgba(146,85,255,0.35)]'
      }`}
    >
      {/* Module Card Header (Clickable Accordion) */}
      <CardHeader
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer select-none pb-4 border-b border-[rgba(146,85,255,0.1)] transition-colors hover:bg-[#171536]/30"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 text-white transition-all ${
                isModuleCompleted
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-gradient-to-tr from-[#F02BC8] to-[#9255FF] shadow-[0_0_12px_rgba(240,43,200,0.3)]'
              }`}
            >
              {isModuleCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : isLocked ? (
                <Lock className="w-5 h-5 text-[#A7A0C5]" />
              ) : (
                <Layers className="w-5 h-5" />
              )}
            </div>

            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant={getLevelBadgeVariant(module.level)} size="sm">
                  {module.level} Stage
                </Badge>
                <span className="text-[11px] text-[#A7A0C5] flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3 text-[#9255FF]" />
                  ~{module.estimatedHours} hours
                </span>
                <span className="text-[11px] text-[#A7A0C5]">
                  • {completedCount}/{totalLessons} Lessons
                </span>
                {isLocked && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> Upcoming Stage
                  </span>
                )}
              </div>

              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                Module {module.order}: {module.title}
              </CardTitle>

              <CardDescription className="line-clamp-2 text-xs text-[#A7A0C5]">
                {module.description}
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-bold text-[#F7F3FF]">
                {progressPercent}%
              </span>
              <span className="text-[10px] text-[#A7A0C5] block">
                Completed
              </span>
            </div>

            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="p-1.5 rounded-lg text-[#A7A0C5] hover:text-[#F7F3FF] bg-[#171536]"
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </div>
        </div>

        {/* Module progress bar */}
        <div className="pt-3">
          <ProgressBar
            value={progressPercent}
            variant="gradient"
            size="sm"
          />
        </div>
      </CardHeader>

      {/* Accordion Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <CardContent className="p-4 sm:p-5 space-y-2.5 bg-[#090817]/40">
              {module.lessons.map((lesson) => {
                const isLessonDone = completedLessonIds.includes(lesson.id)
                return (
                  <LessonItem
                    key={lesson.id}
                    lesson={lesson}
                    isCompleted={isLessonDone}
                    onToggleComplete={onToggleLesson}
                    onSelectLesson={(l) => onSelectLesson(l, module)}
                  />
                )
              })}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
