import React from 'react'
import { motion } from 'framer-motion'
import { X, Sparkles, Compass, Code2, Bot } from 'lucide-react'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'

interface ComingSoonModalProps {
  isOpen: boolean
  onClose: () => void
  featureName: string
  description?: string
}

export const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
  isOpen,
  onClose,
  featureName,
  description,
}) => {
  if (!isOpen) return null

  const getFeatureIcon = (name: string) => {
    if (name.toLowerCase().includes('roadmap')) {
      return <Compass className="w-8 h-8 text-[#F02BC8]" />
    }
    if (name.toLowerCase().includes('practice') || name.toLowerCase().includes('code')) {
      return <Code2 className="w-8 h-8 text-[#9255FF]" />
    }
    if (name.toLowerCase().includes('mentor')) {
      return <Bot className="w-8 h-8 text-[#FF6BE6]" />
    }
    return <Sparkles className="w-8 h-8 text-[#F02BC8]" />
  }

  const defaultDescriptions: Record<string, string> = {
    'Course Roadmaps':
      'Phase 5 will implement the complete visual roadmap engine: topic prerequisite trees, syllabus milestone tracking, and dynamic pacing.',
    'Practice Lab':
      'Phase 5 will implement the interactive coding test runner with complexity profiling and LeetCode-aligned pattern checklists.',
    'AI Mentor':
      'Phase 5 will introduce the context-aware Socratic doubt solver grounded directly in your syllabus and assignment proofs.',
  }

  const desc = description || defaultDescriptions[featureName] || 'This feature is scheduled for the upcoming development phase.'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="fixed inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative z-10 w-full max-w-md rounded-2xl bg-[#211C50] border border-[rgba(146,85,255,0.3)] shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-6 space-y-5 text-center overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#9255FF]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="p-1.5 text-[#A7A0C5] hover:text-[#F7F3FF] rounded-lg hover:bg-[#171536]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#171536] border border-[rgba(146,85,255,0.25)] flex items-center justify-center shadow-[0_0_20px_rgba(240,43,200,0.2)]">
          {getFeatureIcon(featureName)}
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-center">
            <Badge variant="pink" size="sm" dot>
              Phase 5 Scheduled
            </Badge>
          </div>
          <h3 className="text-xl font-extrabold text-[#F7F3FF]">
            {featureName}
          </h3>
          <p className="text-xs sm:text-sm text-[#A7A0C5] leading-relaxed">
            {desc}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#171536] border border-[rgba(146,85,255,0.15)] text-left text-xs space-y-1.5">
          <span className="font-semibold text-[#F7F3FF]">Active in Phase 4:</span>
          <p className="text-[#A7A0C5]">
            Use the real <strong className="text-[#FF6BE6]">Study Planner</strong>, track your daily <strong className="text-[#FF6BE6]">Study Sprint</strong>, and review <strong className="text-[#FF6BE6]">Weekly Analytics</strong> today.
          </p>
        </div>

        <Button variant="primary" size="md" onClick={onClose} className="w-full">
          Understood, Continue Dashboard
        </Button>
      </motion.div>
    </div>
  )
}
