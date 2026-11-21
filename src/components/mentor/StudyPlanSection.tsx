import React, { useState } from 'react'
import {
  Calendar,
  Clock,
  CheckCircle2,
  RefreshCw,
  Save,
  Info,
} from 'lucide-react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { generateWeeklyStudyPlan } from '../../data/mentorKnowledge'
import {
  getSavedStudyPlan,
  saveSavedStudyPlan,
  getOnboardingData,
  getActiveRoadmapId,
  getRoadmapProgress,
  getPracticeStats,
  getCompletedLessons,
} from '../../lib/storage'
import type { SavedStudyPlan } from '../../types'

export const StudyPlanSection: React.FC = () => {
  const onboarding = getOnboardingData()
  const activeRoadmapId = getActiveRoadmapId()
  const roadmapProgress = getRoadmapProgress(activeRoadmapId)
  const completedLessonIds = getCompletedLessons()
  const practiceStats = getPracticeStats()

  // Collect incomplete lessons
  const incompleteLessons: { title: string; objective: string }[] = []
  roadmapProgress.path.modules.forEach((mod) => {
    mod.lessons.forEach((les) => {
      if (!completedLessonIds.includes(les.id)) {
        incompleteLessons.push({
          title: les.title,
          objective: les.objective,
        })
      }
    })
  })

  // Initialize from saved plan or generate fresh
  const [currentPlan, setCurrentPlan] = useState<SavedStudyPlan>(() => {
    const saved = getSavedStudyPlan()
    if (saved) return saved

    return generateWeeklyStudyPlan(
      onboarding?.learningGoals || ['Full Stack Web Development'],
      onboarding?.experienceLevel || 'Intermediate',
      incompleteLessons,
      practiceStats.accuracyPercentage
    )
  })

  const [savedSuccess, setSavedSuccess] = useState(false)

  const handleRegenerate = () => {
    const newPlan = generateWeeklyStudyPlan(
      onboarding?.learningGoals || ['Full Stack Web Development'],
      onboarding?.experienceLevel || 'Intermediate',
      incompleteLessons,
      practiceStats.accuracyPercentage
    )
    setCurrentPlan(newPlan)
    saveSavedStudyPlan(newPlan)
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2500)
  }

  const handleToggleItemComplete = (itemId: string) => {
    const updatedItems = currentPlan.items.map((item) => {
      if (item.id === itemId) {
        return { ...item, completed: !item.completed }
      }
      return item
    })
    const updatedPlan: SavedStudyPlan = {
      ...currentPlan,
      updatedAt: new Date().toISOString(),
      items: updatedItems,
    }
    setCurrentPlan(updatedPlan)
    saveSavedStudyPlan(updatedPlan)
  }

  const handleSavePlan = () => {
    saveSavedStudyPlan(currentPlan)
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2500)
  }

  const completedCount = currentPlan.items.filter((i) => i.completed).length
  const totalMinutes = currentPlan.items.reduce((acc, i) => acc + i.suggestedDurationMinutes, 0)

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <Card
        variant="default"
        className="p-5 sm:p-6 border border-[rgba(146,85,255,0.25)] shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#F02BC8] to-[#9255FF] flex items-center justify-center text-white">
                <Calendar className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-extrabold text-[#F7F3FF]">
                Weekly Study Plan Generator
              </h2>
              <Badge variant="violet" size="sm">
                Local Recommendation
              </Badge>
            </div>
            <p className="text-xs text-[#A7A0C5]">
              {currentPlan.summary}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRegenerate}
              className="text-xs gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#FF6BE6]" />
              <span>Regenerate</span>
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSavePlan}
              className="text-xs gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savedSuccess ? 'Saved!' : 'Save Plan'}</span>
            </Button>
          </div>
        </div>

        {/* Plan stats ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-[rgba(146,85,255,0.12)] text-xs">
          <div>
            <span className="text-[#A7A0C5]">Target Goal</span>
            <p className="font-bold text-[#F7F3FF] truncate">{currentPlan.goalTarget}</p>
          </div>
          <div>
            <span className="text-[#A7A0C5]">Total Weekly Time</span>
            <p className="font-bold text-[#FF6BE6]">{Math.round(totalMinutes / 60)} hrs ({totalMinutes} mins)</p>
          </div>
          <div>
            <span className="text-[#A7A0C5]">Progress</span>
            <p className="font-bold text-emerald-400">
              {completedCount} of {currentPlan.items.length} Completed
            </p>
          </div>
          <div>
            <span className="text-[#A7A0C5]">Last Updated</span>
            <p className="font-bold text-[#F7F3FF]">
              {new Date(currentPlan.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Transparency note */}
        <div className="mt-4 p-2.5 rounded-xl bg-[#090817] border border-[rgba(146,85,255,0.15)] flex items-center gap-2 text-[11px] text-[#A7A0C5]">
          <Info className="w-3.5 h-3.5 text-[#9255FF] shrink-0" />
          <span>
            This plan is synthesized locally from your roadmap lessons, goals, and quiz accuracy.
          </span>
        </div>
      </Card>

      {/* 7-Day Plan Cards */}
      <div className="space-y-3">
        {currentPlan.items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleToggleItemComplete(item.id)}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              item.completed
                ? 'bg-[#171536]/40 border-emerald-500/30 opacity-70'
                : 'bg-[#171536] border-[rgba(146,85,255,0.2)] hover:border-[#F02BC8] shadow-[0_4px_15px_rgba(0,0,0,0.25)]'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`w-6 h-6 rounded-lg mt-0.5 shrink-0 flex items-center justify-center border transition-all ${
                  item.completed
                    ? 'bg-emerald-500 border-emerald-400 text-white'
                    : 'bg-[#090817] border-[rgba(146,85,255,0.3)] text-transparent hover:border-[#F02BC8]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-[rgba(146,85,255,0.15)] text-[#FF6BE6]">
                    {item.day}
                  </span>
                  <h4
                    className={`text-sm font-bold text-[#F7F3FF] ${
                      item.completed ? 'line-through text-[#A7A0C5]' : ''
                    }`}
                  >
                    {item.topic}
                  </h4>
                </div>

                <p className="text-xs text-[#A7A0C5]">
                  <strong className="text-[#F7F3FF]">Objective:</strong> {item.learningObjective}
                </p>

                <p className="text-xs text-[#A7A0C5]">
                  <strong className="text-[#9255FF]">Activity:</strong> {item.practiceActivity}
                </p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[rgba(146,85,255,0.1)]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF6BE6]">
                <Clock className="w-3.5 h-3.5" />
                <span>{item.suggestedDurationMinutes} mins</span>
              </div>
              <span className="text-[10px] text-[#A7A0C5]">
                {item.completed ? 'Done' : 'Tap to mark done'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
