import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Award,
  CheckCircle2,
  Lock,
  Sparkles,
  Compass,
  BookOpen,
  GraduationCap,
  Target,
  Code2,
  Cpu,
  Clock,
} from 'lucide-react'
import { Button } from '../ui/Button'
import type { AchievementBadge } from '../../types'

interface BadgesModalProps {
  isOpen: boolean
  onClose: () => void
  badges: AchievementBadge[]
  currentXp: number
}

const BADGE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Compass,
  BookOpen,
  GraduationCap,
  Award,
  Target,
  Code2,
  Cpu,
  Clock,
  CheckCircle2,
}

export const BadgesModal: React.FC<BadgesModalProps> = ({
  isOpen,
  onClose,
  badges,
  currentXp,
}) => {
  if (!isOpen) return null

  const unlockedCount = badges.filter((b) => b.unlocked).length

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="fixed inset-0" onClick={onClose} />

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-[#171536] border border-[rgba(146,85,255,0.3)] shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 bg-[#080611] border-b border-[rgba(146,85,255,0.18)] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F02BC8] to-[#9255FF] flex items-center justify-center text-white shadow-[0_0_15px_rgba(240,43,200,0.35)]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-[#F7F3FF]">
                  Achievement Badges & Milestones
                </h3>
                <p className="text-xs text-[#A7A0C5]">
                  {unlockedCount} of {badges.length} Unlocked • {currentXp} Total XP Earned
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-[#171536] hover:bg-[#211C50] text-[#A7A0C5] hover:text-[#F7F3FF] flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Badges Grid */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-3.5 max-h-[calc(90vh-140px)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {badges.map((badge) => {
                const IconComponent = BADGE_ICONS[badge.icon] || Award
                return (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                      badge.unlocked
                        ? 'bg-[#211C50]/60 border-[rgba(240,43,200,0.35)] shadow-[0_4px_20px_rgba(240,43,200,0.12)]'
                        : 'bg-[#171536]/40 border-[rgba(146,85,255,0.12)] opacity-60'
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-xl shrink-0 flex items-center justify-center ${
                        badge.unlocked
                          ? 'bg-gradient-to-tr from-[#F02BC8] to-[#9255FF] text-white shadow-[0_0_12px_rgba(240,43,200,0.4)]'
                          : 'bg-[#090817] text-[#A7A0C5] border border-[rgba(146,85,255,0.15)]'
                      }`}
                    >
                      {badge.unlocked ? (
                        <IconComponent className="w-5 h-5" />
                      ) : (
                        <Lock className="w-4 h-4" />
                      )}
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-bold text-[#F7F3FF] truncate">
                          {badge.title}
                        </h4>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            badge.unlocked
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                              : 'bg-white/5 text-[#A7A0C5] border border-white/10'
                          }`}
                        >
                          +{badge.xpReward} XP
                        </span>
                      </div>
                      <p className="text-xs text-[#A7A0C5] leading-relaxed">
                        {badge.description}
                      </p>
                      {badge.unlocked && badge.unlockedAt && (
                        <div className="pt-1 flex items-center gap-1 text-[10px] text-[#FF6BE6]">
                          <Sparkles className="w-3 h-3" />
                          <span>Unlocked: {new Date(badge.unlockedAt).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-[#080611] border-t border-[rgba(146,85,255,0.18)] flex items-center justify-between">
            <span className="text-xs text-[#A7A0C5]">
              XP rewards are awarded once per unique milestone.
            </span>
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
