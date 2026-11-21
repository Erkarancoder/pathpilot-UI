import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Search,
  Layers,
  BookOpen,
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { RoadmapHeader } from '../components/roadmap/RoadmapHeader'
import { ModuleCard } from '../components/roadmap/ModuleCard'
import { LessonDetailModal } from '../components/roadmap/LessonDetailModal'
import { ResetProgressModal } from '../components/roadmap/ResetProgressModal'
import { LEARNING_PATHS } from '../data/roadmapData'
import {
  getActiveRoadmapId,
  setActiveRoadmapId,
  getCompletedLessons,
  toggleLessonCompleted,
  resetRoadmapProgress,
  getRecommendedPathIds,
  getOnboardingData,
  getRoadmapProgress,
} from '../lib/storage'
import type { Lesson, RoadmapModule } from '../types'

export const RoadmapPage: React.FC = () => {
  const onboarding = getOnboardingData()
  const recommendedPathIds = useMemo(
    () => getRecommendedPathIds(onboarding?.learningGoals),
    [onboarding?.learningGoals]
  )

  const [activePathId, setActivePathIdState] = useState<string>(getActiveRoadmapId)
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(getCompletedLessons)

  // Filters
  const [levelFilter, setLevelFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Modals state
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [selectedModule, setSelectedModule] = useState<RoadmapModule | null>(null)
  const [isResetModalOpen, setIsResetModalOpen] = useState(false)

  // Sync with cross-tab updates or storage
  useEffect(() => {
    const refreshData = () => {
      setCompletedLessonIds(getCompletedLessons())
      setActivePathIdState(getActiveRoadmapId())
    }
    window.addEventListener('storage', refreshData)
    return () => window.removeEventListener('storage', refreshData)
  }, [])

  const activePath = useMemo(() => {
    return (
      LEARNING_PATHS.find((p) => p.id === activePathId) ||
      LEARNING_PATHS[0]
    )
  }, [activePathId])

  const progressData = useMemo(() => {
    // completedLessonIds included so memo updates when lessons change
    if (completedLessonIds.length < 0) return getRoadmapProgress(activePath.id)
    return getRoadmapProgress(activePath.id)
  }, [activePath.id, completedLessonIds])

  const handleSelectPath = (pathId: string) => {
    setActiveRoadmapId(pathId)
    setActivePathIdState(pathId)
  }

  const handleToggleLesson = (lessonId: string) => {
    const updated = toggleLessonCompleted(lessonId)
    setCompletedLessonIds(updated)
  }

  const handleConfirmReset = () => {
    resetRoadmapProgress(activePath.id)
    setCompletedLessonIds(getCompletedLessons())
  }

  const handleOpenLessonDetail = (lesson: Lesson, module: RoadmapModule) => {
    setSelectedLesson(lesson)
    setSelectedModule(module)
  }

  const handleResumeLearning = () => {
    if (progressData.nextLesson && progressData.nextModule) {
      setSelectedLesson(progressData.nextLesson)
      setSelectedModule(progressData.nextModule)
    }
  }

  // Navigate through lessons in modal
  const allPathLessonsWithModule = useMemo(() => {
    const list: { lesson: Lesson; module: RoadmapModule }[] = []
    activePath.modules.forEach((mod) => {
      mod.lessons.forEach((les) => {
        list.push({ lesson: les, module: mod })
      })
    })
    return list
  }, [activePath])

  const currentIndex = allPathLessonsWithModule.findIndex(
    (item) => item.lesson.id === selectedLesson?.id
  )

  const handleNavigateLesson = (direction: 'next' | 'prev') => {
    if (currentIndex === -1) return
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1
    if (newIndex >= 0 && newIndex < allPathLessonsWithModule.length) {
      setSelectedLesson(allPathLessonsWithModule[newIndex].lesson)
      setSelectedModule(allPathLessonsWithModule[newIndex].module)
    }
  }

  // Filter modules and lessons
  const filteredModules = useMemo(() => {
    return activePath.modules
      .filter((mod) => {
        if (levelFilter === 'All') return true
        return mod.level === levelFilter
      })
      .map((mod) => {
        if (!searchQuery.trim()) return mod
        const q = searchQuery.toLowerCase()
        const matchesModule =
          mod.title.toLowerCase().includes(q) ||
          mod.description.toLowerCase().includes(q)
        const matchingLessons = mod.lessons.filter(
          (l) =>
            l.title.toLowerCase().includes(q) ||
            l.objective.toLowerCase().includes(q) ||
            l.explanation.toLowerCase().includes(q)
        )

        if (matchesModule) return mod
        if (matchingLessons.length > 0) {
          return { ...mod, lessons: matchingLessons }
        }
        return null
      })
      .filter((mod): mod is RoadmapModule => mod !== null)
  }, [activePath, levelFilter, searchQuery])

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[rgba(146,85,255,0.14)]">
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Dashboard
            </Button>
          </Link>
          <span className="text-[#A7A0C5]">/</span>
          <span className="text-sm font-bold text-[#F7F3FF]">
            Personalized Learning Roadmap
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onboarding?.learningGoals && onboarding.learningGoals.length > 0 && (
            <Badge variant="pink" size="sm" dot>
              Personalized for {onboarding.fullName || 'Student'}
            </Badge>
          )}
          <Link to="/onboarding">
            <Button variant="ghost" size="sm" className="text-xs">
              Change Goals
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Roadmap Header & Path Selector */}
      <RoadmapHeader
        activePath={activePath}
        onSelectPath={handleSelectPath}
        recommendedPathIds={recommendedPathIds}
        completedLessonIds={completedLessonIds}
        onResumeLearning={handleResumeLearning}
        onOpenResetModal={() => setIsResetModalOpen(true)}
        nextLesson={progressData.nextLesson}
        nextModule={progressData.nextModule}
      />

      {/* Search & Level Stage Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#171536]/80 border border-[rgba(146,85,255,0.18)]">
        {/* Stage Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#090817] border border-[rgba(146,85,255,0.15)] text-xs overflow-x-auto">
          {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map(
            (lvl) => {
              const isSelected = levelFilter === lvl
              return (
                <button
                  key={lvl}
                  onClick={() => setLevelFilter(lvl)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#F02BC8] to-[#9255FF] text-white shadow-[0_0_10px_rgba(240,43,200,0.3)]'
                      : 'text-[#A7A0C5] hover:text-[#F7F3FF]'
                  }`}
                >
                  {lvl} Stages
                </button>
              )
            }
          )}
        </div>

        {/* Keyword Search */}
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#A7A0C5]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lessons or topics..."
            className="w-full h-9 pl-9 pr-3 rounded-xl bg-[#090817] border border-[rgba(146,85,255,0.2)] text-xs text-[#F7F3FF] placeholder-[#A7A0C5]/50 focus:outline-none focus:border-[#F02BC8]"
          />
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#F7F3FF] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#F02BC8]" />
            Learning Modules ({filteredModules.length})
          </h3>
          <span className="text-xs text-[#A7A0C5]">
            Click any module to expand or collapse lessons
          </span>
        </div>

        {filteredModules.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-2xl bg-[#171536]/40 border border-dashed border-[rgba(146,85,255,0.25)] space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-[rgba(146,85,255,0.12)] text-[#9255FF] flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#F7F3FF]">
              No modules match your current filter
            </h4>
            <p className="text-xs text-[#A7A0C5] max-w-sm mx-auto">
              Try switching back to &ldquo;All Stages&rdquo; or clearing your search term &ldquo;{searchQuery}&rdquo;.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setLevelFilter('All')
                setSearchQuery('')
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          filteredModules.map((module, idx) => {
            // Check progressive unlock: intermediate requires beginner partially done, etc.
            const isLocked =
              idx > 0 &&
              progressData.completedCount === 0 &&
              module.level === 'Advanced'

            return (
              <ModuleCard
                key={module.id}
                module={module}
                completedLessonIds={completedLessonIds}
                onToggleLesson={handleToggleLesson}
                onSelectLesson={handleOpenLessonDetail}
                isLocked={isLocked}
                defaultExpanded={true}
              />
            )
          })
        )}
      </div>

      {/* Lesson Detail Notes & Challenge Modal */}
      <LessonDetailModal
        isOpen={!!selectedLesson}
        onClose={() => {
          setSelectedLesson(null)
          setSelectedModule(null)
        }}
        lesson={selectedLesson}
        module={selectedModule}
        isCompleted={
          selectedLesson ? completedLessonIds.includes(selectedLesson.id) : false
        }
        onToggleComplete={handleToggleLesson}
        onNavigateLesson={handleNavigateLesson}
        hasNext={currentIndex !== -1 && currentIndex < allPathLessonsWithModule.length - 1}
        hasPrev={currentIndex > 0}
      />

      {/* Reset Progress Confirmation Dialog */}
      <ResetProgressModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirmReset={handleConfirmReset}
        pathTitle={activePath.title}
      />
    </div>
  )
}
