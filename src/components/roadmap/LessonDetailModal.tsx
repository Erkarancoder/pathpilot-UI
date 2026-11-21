import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  Code2,
  ExternalLink,
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import type { Lesson, RoadmapModule } from '../../types'

interface LessonDetailModalProps {
  isOpen: boolean
  onClose: () => void
  lesson: Lesson | null
  module: RoadmapModule | null
  isCompleted: boolean
  onToggleComplete: (lessonId: string) => void
  onNavigateLesson?: (direction: 'next' | 'prev') => void
  hasNext?: boolean
  hasPrev?: boolean
}

export const LessonDetailModal: React.FC<LessonDetailModalProps> = ({
  isOpen,
  onClose,
  lesson,
  module,
  isCompleted,
  onToggleComplete,
  onNavigateLesson,
  hasNext,
  hasPrev,
}) => {
  if (!isOpen || !lesson || !module) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="fixed inset-0" onClick={onClose} />

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-[#171536] border border-[rgba(146,85,255,0.3)] shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[rgba(146,85,255,0.15)] bg-[#090817]/70 flex items-start justify-between gap-4">
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="violet" size="sm">
                  {module.level} • Module {module.order}
                </Badge>
                <span className="text-xs text-[#A7A0C5] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#9255FF]" />
                  {lesson.durationMinutes} minutes
                </span>
                {isCompleted && (
                  <Badge variant="success" size="sm">
                    Completed
                  </Badge>
                )}
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#F7F3FF] tracking-tight leading-snug">
                {lesson.title}
              </h2>
              <p className="text-xs text-[#A7A0C5]">{module.title}</p>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#A7A0C5] hover:text-[#F7F3FF] rounded-lg hover:bg-[#211C50] transition-colors shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* 1. Learning Objective */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[rgba(240,43,200,0.1)] to-[rgba(146,85,255,0.08)] border border-[rgba(240,43,200,0.25)] space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF6BE6] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F02BC8]" />
                Learning Objective
              </span>
              <p className="text-xs sm:text-sm text-[#F7F3FF] font-medium leading-relaxed">
                {lesson.objective}
              </p>
            </div>

            {/* 2. Conceptual Explanation */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#A7A0C5] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#9255FF]" />
                Core Concept &amp; Academic Notes
              </h3>
              <div className="p-4 rounded-xl bg-[#211C50]/60 border border-[rgba(146,85,255,0.18)] text-xs sm:text-sm text-[#A7A0C5] leading-relaxed space-y-2">
                <p className="text-[#F7F3FF]">{lesson.explanation}</p>
              </div>
            </div>

            {/* 3. Suggested Practice Activity */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#A7A0C5] flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                Hands-On Practice Challenge
              </h3>
              <div className="p-4 rounded-xl bg-[#171536] border border-[rgba(146,85,255,0.2)] text-xs sm:text-sm text-[#F7F3FF] space-y-1.5">
                <p className="leading-relaxed">{lesson.practiceActivity}</p>
                <span className="text-[11px] text-[#A7A0C5] block pt-1">
                  Tip: Implement this in your local editor or verify test cases in your terminal before marking as complete.
                </span>
              </div>
            </div>

            {/* 4. Official Documentation / Resource */}
            {lesson.resource && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#A7A0C5] flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 text-[#F02BC8]" />
                  Verified Documentation Reference
                </h3>
                <a
                  href={lesson.resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#211C50] border border-[rgba(146,85,255,0.22)] hover:border-[rgba(240,43,200,0.45)] text-xs text-[#F7F3FF] group transition-all"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-1.5 rounded-lg bg-[#171536] text-[#9255FF] group-hover:text-[#F02BC8] transition-colors">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-xs group-hover:text-[#FF6BE6] transition-colors truncate">
                        {lesson.resource.title}
                      </p>
                      <span className="text-[10px] text-[#A7A0C5] truncate block">
                        {lesson.resource.url}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#A7A0C5] group-hover:text-[#F02BC8] shrink-0 ml-2 transition-colors" />
                </a>
              </div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="p-4 sm:p-5 border-t border-[rgba(146,85,255,0.15)] bg-[#090817]/90 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {onNavigateLesson && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={!hasPrev}
                    onClick={() => onNavigateLesson('prev')}
                    leftIcon={<ChevronLeft className="w-4 h-4" />}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={!hasNext}
                    onClick={() => onNavigateLesson('next')}
                    rightIcon={<ChevronRight className="w-4 h-4" />}
                  >
                    Next Lesson
                  </Button>
                </>
              )}
            </div>

            <Button
              variant={isCompleted ? 'secondary' : 'primary'}
              size="sm"
              onClick={() => onToggleComplete(lesson.id)}
              leftIcon={
                isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Circle className="w-4 h-4 text-white" />
                )
              }
            >
              {isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
