import React, { useState } from 'react'
import { Award, Sparkles, Flame, ChevronRight, Lock } from 'lucide-react'
import { Card } from '../ui/Card'
import { ProgressBar } from '../ui/ProgressBar'
import { Button } from '../ui/Button'
import { BadgesModal } from './BadgesModal'
import { calculateLevelFromXp } from '../../data/gamificationData'
import type { GamificationState } from '../../types'

interface GamificationCardProps {
  gamification: GamificationState
  onRefresh?: () => void
}

export const GamificationCard: React.FC<GamificationCardProps> = ({ gamification }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const levelInfo = calculateLevelFromXp(gamification.xp)
  const unlockedBadges = gamification.badges.filter((b) => b.unlocked)

  return (
    <>
      <Card
        variant="default"
        className="border border-[rgba(146,85,255,0.22)] shadow-[0_8px_30px_rgba(0,0,0,0.35)] overflow-hidden"
      >
        <div className="p-5 sm:p-6 space-y-5">
          {/* Top row: Level, XP and Streak */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#F02BC8] to-[#9255FF] flex items-center justify-center text-white shadow-[0_0_20px_rgba(240,43,200,0.4)]">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-extrabold text-[#F7F3FF]">
                    Level {levelInfo.level} Scholar
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[rgba(240,43,200,0.15)] text-[#FF6BE6] border border-[rgba(240,43,200,0.3)]">
                    {gamification.xp} Total XP
                  </span>
                </div>
                <p className="text-xs text-[#A7A0C5] mt-0.5">
                  {levelInfo.nextLevelXp - levelInfo.currentLevelXp} XP to Level {levelInfo.level + 1}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="px-3 py-1.5 rounded-xl bg-[#090817] border border-[rgba(146,85,255,0.2)] flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#F02BC8] fill-[#F02BC8]" />
                <span className="text-xs font-bold text-[#F7F3FF]">
                  {gamification.streakDays} Day Streak
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsModalOpen(true)}
                className="gap-1.5 text-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FF6BE6]" />
                <span>Badges ({unlockedBadges.length}/{gamification.badges.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {/* Level Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium text-[#A7A0C5]">
              <span>Level Progress</span>
              <span className="text-[#F7F3FF] font-bold">
                {levelInfo.currentLevelXp} / {levelInfo.nextLevelXp} XP ({levelInfo.progressPercentage}%)
              </span>
            </div>
            <ProgressBar value={levelInfo.progressPercentage} variant="gradient" size="md" />
          </div>

          {/* Badges preview row */}
          <div className="pt-2 border-t border-[rgba(146,85,255,0.12)]">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A7A0C5]">
                Milestone Badges
              </span>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-xs text-[#FF6BE6] hover:underline cursor-pointer"
              >
                View All Details
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {gamification.badges.slice(0, 4).map((badge) => (
                <div
                  key={badge.id}
                  onClick={() => setIsModalOpen(true)}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                    badge.unlocked
                      ? 'bg-[#171536] border-[rgba(240,43,200,0.3)] hover:border-[#F02BC8]'
                      : 'bg-[#090817] border-[rgba(146,85,255,0.12)] opacity-50'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs ${
                      badge.unlocked
                        ? 'bg-gradient-to-tr from-[#F02BC8] to-[#9255FF] text-white'
                        : 'bg-white/5 text-[#A7A0C5]'
                    }`}
                  >
                    {badge.unlocked ? '🏆' : <Lock className="w-3 h-3" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#F7F3FF] truncate">{badge.title}</p>
                    <p className="text-[10px] text-[#A7A0C5]">+{badge.xpReward} XP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <BadgesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        badges={gamification.badges}
        currentXp={gamification.xp}
      />
    </>
  )
}
