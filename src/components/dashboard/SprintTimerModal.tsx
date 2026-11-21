import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Pause, RotateCcw, CheckCircle2, Sparkles, Flame, Plus } from 'lucide-react'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { logStudySession } from '../../lib/storage'

interface SprintTimerModalProps {
  isOpen: boolean
  onClose: () => void
  onSprintCompleted?: () => void
}

export const SprintTimerModal: React.FC<SprintTimerModalProps> = ({
  isOpen,
  onClose,
  onSprintCompleted,
}) => {
  const SPRINT_SECONDS = 25 * 60
  const [timeLeft, setTimeLeft] = useState(SPRINT_SECONDS)
  const [isRunning, setIsRunning] = useState(false)
  const [topic, setTopic] = useState('Graph Algorithms & Proofs')
  const [completed, setCompleted] = useState(false)

  const handleSprintFinished = useCallback(() => {
    setIsRunning(false)
    setCompleted(true)
    logStudySession(25, topic)
    if (onSprintCompleted) onSprintCompleted()
  }, [topic, onSprintCompleted])

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSprintFinished()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft, handleSprintFinished])

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(SPRINT_SECONDS)
    setCompleted(false)
  }

  const handleAddFiveMinutes = () => {
    setTimeLeft((prev) => prev + 5 * 60)
  }

  if (!isOpen) return null

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  const progressPercent = Math.round(((SPRINT_SECONDS - timeLeft) / SPRINT_SECONDS) * 100)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="fixed inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative z-10 w-full max-w-md rounded-2xl bg-[#171536] border border-[rgba(146,85,255,0.3)] shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-6 space-y-5 text-center overflow-hidden"
      >
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#F02BC8]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#9255FF]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[rgba(146,85,255,0.15)]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F02BC8]" />
            <h3 className="text-sm font-bold text-[#F7F3FF]">Study Sprint Timer</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#A7A0C5] hover:text-[#F7F3FF] rounded-lg hover:bg-[#211C50]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Topic Input */}
        <div className="space-y-1 text-left">
          <label className="text-[11px] font-medium text-[#A7A0C5] block">
            Sprint Focus / Course Subject
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. CS 201 Problem Set 3"
            className="w-full px-3 py-2 rounded-xl bg-[#211C50] border border-[rgba(146,85,255,0.25)] text-xs text-[#F7F3FF] focus:outline-none focus:border-[#F02BC8]"
          />
        </div>

        {/* Timer Display */}
        <div className="relative py-4 flex flex-col items-center justify-center">
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Circular Progress Ring */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="currentColor"
                strokeWidth="5"
                fill="transparent"
                className="text-[#211C50]"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="url(#sprint-grad)"
                strokeWidth="5"
                fill="transparent"
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * progressPercent) / 100}
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
              />
              <defs>
                <linearGradient id="sprint-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F02BC8" />
                  <stop offset="100%" stopColor="#9255FF" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1">
              <span className="text-4xl font-extrabold tracking-tight text-[#F7F3FF] font-mono">
                {formattedTime}
              </span>
              <span className="text-xs text-[#A7A0C5] flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-[#F02BC8] fill-[#F02BC8]" />
                {isRunning ? 'Sprint In Progress' : 'Ready to Focus'}
              </span>
            </div>
          </div>
        </div>

        {/* Sprint Completed Feedback */}
        <AnimatePresence>
          {completed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>25m sprint logged! Your study streak updated.</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset
          </Button>

          <Button
            variant="primary"
            size="lg"
            onClick={() => setIsRunning((prev) => !prev)}
            leftIcon={
              isRunning ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white fill-white" />
              )
            }
            className="px-6"
          >
            {isRunning ? 'Pause' : 'Start Focus'}
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleAddFiveMinutes}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            +5 min
          </Button>
        </div>

        <div className="pt-2 flex items-center justify-between text-[11px] text-[#A7A0C5]">
          <span>Pomodoro Interval: 25m Focus / 5m Rest</span>
          <Badge variant="violet" size="sm">
            Automatic Sync
          </Badge>
        </div>
      </motion.div>
    </div>
  )
}
