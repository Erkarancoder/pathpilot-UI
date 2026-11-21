import React from 'react'
import { CheckCircle2, Circle, Clock, ChevronRight, BookOpen } from 'lucide-react'
import type { Lesson } from '../../types'

interface LessonItemProps {
  lesson: Lesson
  isCompleted: boolean
  onToggleComplete: (lessonId: string) => void
  onSelectLesson: (lesson: Lesson) => void
}

export const LessonItem: React.FC<LessonItemProps> = ({
  lesson,
  isCompleted,
  onToggleComplete,
  onSelectLesson,
}) => {
  return (
    <div
      className={`group flex items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl border transition-all duration-200 ${
        isCompleted
          ? 'bg-[#171536]/40 border-[rgba(146,85,255,0.12)] opacity-85'
          : 'bg-[#171536] border-[rgba(146,85,255,0.22)] hover:border-[rgba(240,43,200,0.4)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.25)]'
      }`}
    >
      {/* Left: Checkbox & Title */}
      <div className="flex items-start gap-3 min-w-0 flex-1">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleComplete(lesson.id)
          }}
          className="mt-0.5 text-left text-[#A7A0C5] hover:text-[#F02BC8] transition-colors focus:outline-none shrink-0"
          aria-label={isCompleted ? 'Mark incomplete' : 'Mark complete'}
          title={isCompleted ? 'Click to mark incomplete' : 'Click to mark complete'}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
          ) : (
            <Circle className="w-5 h-5 text-[#A7A0C5] group-hover:text-[#F02BC8]" />
          )}
        </button>

        <div
          onClick={() => onSelectLesson(lesson)}
          className="cursor-pointer flex-1 min-w-0"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <h4
              className={`text-xs sm:text-sm font-semibold leading-snug transition-colors group-hover:text-[#FF6BE6] ${
                isCompleted ? 'line-through text-[#A7A0C5]/70' : 'text-[#F7F3FF]'
              }`}
            >
              {lesson.title}
            </h4>
          </div>

          <p className="text-[11px] text-[#A7A0C5] mt-1 line-clamp-1 leading-relaxed">
            {lesson.objective}
          </p>
        </div>
      </div>

      {/* Right: Duration & Action */}
      <div className="flex items-center gap-2.5 shrink-0 self-center">
        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#A7A0C5] px-2 py-0.5 rounded-md bg-[#211C50] border border-[rgba(146,85,255,0.15)]">
          <Clock className="w-3 h-3 text-[#9255FF]" />
          {lesson.durationMinutes}m
        </span>

        <button
          onClick={() => onSelectLesson(lesson)}
          className="p-1.5 rounded-lg text-[#A7A0C5] hover:text-[#F7F3FF] hover:bg-[#211C50] transition-colors flex items-center gap-1 text-xs font-medium cursor-pointer"
          title="Open lesson notes & challenge"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#9255FF]" />
          <span className="hidden md:inline">Notes</span>
          <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
        </button>
      </div>
    </div>
  )
}
