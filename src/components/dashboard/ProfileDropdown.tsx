import React from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Layers,
  RotateCcw,
  ChevronRight,
  Settings,
} from 'lucide-react'
import { clearOnboardingData } from '../../lib/storage'
import type { StudentProfile } from '../../types'

interface ProfileDropdownProps {
  isOpen: boolean
  onClose: () => void
  student: StudentProfile
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  isOpen,
  onClose,
  student,
}) => {
  if (!isOpen) return null

  const handleReset = () => {
    if (window.confirm('Reset all saved study tasks, sprints, and profile data to defaults?')) {
      clearOnboardingData()
      window.location.reload()
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="absolute right-0 top-14 z-50 w-72 rounded-2xl bg-[#171536] border border-[rgba(146,85,255,0.25)] shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-4 space-y-3"
        >
          {/* Student Identity */}
          <div className="flex items-center gap-3 pb-3 border-b border-[rgba(146,85,255,0.14)]">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#F02BC8] to-[#9255FF] p-0.5">
              <div className="w-full h-full rounded-[10px] bg-[#171536] flex items-center justify-center font-bold text-sm text-[#F7F3FF]">
                {student.name.substring(0, 2).toUpperCase()}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-[#F7F3FF] truncate">{student.name}</h4>
              <p className="text-xs text-[#A7A0C5] truncate">{student.email}</p>
              <span className="inline-block text-[10px] font-semibold text-[#FF6BE6] mt-0.5">
                {student.major}
              </span>
            </div>
          </div>

          {/* Quick stats recap */}
          <div className="grid grid-cols-2 gap-2 text-center py-1">
            <div className="p-2 rounded-xl bg-[#211C50] border border-[rgba(146,85,255,0.18)]">
              <span className="text-[10px] text-[#A7A0C5] block">Target GPA</span>
              <span className="text-xs font-bold text-[#F7F3FF]">{student.gpa}</span>
            </div>
            <div className="p-2 rounded-xl bg-[#211C50] border border-[rgba(146,85,255,0.18)]">
              <span className="text-[10px] text-[#A7A0C5] block">Study Streak</span>
              <span className="text-xs font-bold text-[#F02BC8]">{student.streakDays} Days</span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-1 pt-1 border-t border-[rgba(146,85,255,0.12)]">
            <Link
              to="/onboarding"
              onClick={onClose}
              className="flex items-center justify-between p-2 rounded-xl text-xs text-[#A7A0C5] hover:text-[#F7F3FF] hover:bg-[#211C50] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#F02BC8]" />
                <span>Edit Onboarding Profile</span>
              </div>
              <ChevronRight className="w-3 h-3" />
            </Link>

            <Link
              to="/settings"
              onClick={onClose}
              className="flex items-center justify-between p-2 rounded-xl text-xs text-[#A7A0C5] hover:text-[#F7F3FF] hover:bg-[#211C50] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Settings className="w-3.5 h-3.5 text-[#FF6BE6]" />
                <span>Settings & Preferences</span>
              </div>
              <ChevronRight className="w-3 h-3" />
            </Link>

            <Link
              to="/design-system"
              onClick={onClose}
              className="flex items-center justify-between p-2 rounded-xl text-xs text-[#A7A0C5] hover:text-[#F7F3FF] hover:bg-[#211C50] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#9255FF]" />
                <span>Phase 1 Design System</span>
              </div>
              <ChevronRight className="w-3 h-3" />
            </Link>

            <button
              onClick={handleReset}
              className="w-full flex items-center justify-between p-2 rounded-xl text-xs text-rose-400/90 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
            >
              <div className="flex items-center gap-2">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Local Study Data</span>
              </div>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}
