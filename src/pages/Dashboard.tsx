import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Sparkles,
  Calendar,
  Flame,
  RefreshCw,
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'

// Dashboard subcomponents
import { OverviewCards } from '../components/dashboard/OverviewCards'
import { ContinueLearningCard } from '../components/dashboard/ContinueLearningCard'
import { WeeklyAnalyticsChart } from '../components/dashboard/WeeklyAnalyticsChart'
import { StudyPlanner } from '../components/dashboard/StudyPlanner'
import { GoalsAndSkills } from '../components/dashboard/GoalsAndSkills'
import { QuickActions } from '../components/dashboard/QuickActions'
import { SprintTimerModal } from '../components/dashboard/SprintTimerModal'
import { GamificationCard } from '../components/gamification/GamificationCard'

import {
  getActiveStudentProfile,
  getOnboardingData,
  getStudyTasks,
  addStudyTask,
  updateStudyTask,
  toggleStudyTask,
  deleteStudyTask,
  getStudySessions,
  getGamificationState,
} from '../lib/storage'
import type { StudyTask, StudySession } from '../types'

export const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const [student, setStudent] = useState(getActiveStudentProfile)
  const [onboarding, setOnboarding] = useState(getOnboardingData)
  const [tasks, setTasks] = useState<StudyTask[]>(getStudyTasks)
  const [sessions, setSessions] = useState<StudySession[]>(getStudySessions)
  const [gamification, setGamification] = useState(getGamificationState)

  // Modals state
  const [isSprintOpen, setIsSprintOpen] = useState(false)

  const analyticsSectionRef = useRef<HTMLDivElement>(null)

  // Listen to cross-tab or component updates
  useEffect(() => {
    const refreshData = () => {
      setStudent(getActiveStudentProfile())
      setOnboarding(getOnboardingData())
      setTasks(getStudyTasks())
      setSessions(getStudySessions())
      setGamification(getGamificationState())
    }

    window.addEventListener('storage', refreshData)
    return () => window.removeEventListener('storage', refreshData)
  }, [])

  const assessment = onboarding?.assessmentResult

  // Task handlers
  const handleToggleTask = (id: string) => {
    const updated = toggleStudyTask(id)
    setTasks(updated)
    setGamification(getGamificationState())
  }

  const handleAddTask = (taskData: Omit<StudyTask, 'id' | 'createdAt'>) => {
    const updated = addStudyTask(taskData)
    setTasks(updated)
    setGamification(getGamificationState())
  }

  const handleUpdateTask = (id: string, updates: Partial<StudyTask>) => {
    const updated = updateStudyTask(id, updates)
    setTasks(updated)
    setGamification(getGamificationState())
  }

  const handleDeleteTask = (id: string) => {
    const updated = deleteStudyTask(id)
    setTasks(updated)
    setGamification(getGamificationState())
  }

  const handleSprintCompleted = () => {
    setSessions(getStudySessions())
    setStudent(getActiveStudentProfile())
    setGamification(getGamificationState())
  }

  const handleScrollToAnalytics = () => {
    analyticsSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Dynamic Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#171536] via-[#211C50] to-[#171536] border border-[rgba(146,85,255,0.22)] p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F02BC8]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#9255FF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="pink" size="sm" dot>
                Spring 2026 Semester
              </Badge>
              <Badge variant="violet" size="sm">
                {student.major}
              </Badge>
              {student.college && (
                <Badge variant="neutral" size="sm">
                  {student.college}
                </Badge>
              )}
              <span className="text-xs text-[#A7A0C5] hidden sm:inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#9255FF]" />
                {student.year}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F7F3FF] tracking-tight">
              Welcome back, {student.name}
            </h1>

            <p className="text-xs sm:text-sm text-[#A7A0C5] max-w-2xl leading-relaxed">
              Your semester learning path is synchronized with your college curriculum. You have{' '}
              <span className="text-[#FF6BE6] font-semibold">
                {tasks.filter((t) => !t.completed).length} pending tasks
              </span>{' '}
              scheduled for today across your registered coursework.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsSprintOpen(true)}
              leftIcon={<Sparkles className="w-4 h-4 text-white" />}
            >
              Start Sprint (25m)
            </Button>
            <Link to="/onboarding">
              <Button
                variant="outline"
                size="md"
                leftIcon={<RefreshCw className="w-4 h-4" />}
              >
                {assessment ? 'Retake Diagnostic' : 'Skill Assessment'}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Overview Stat Cards */}
      <OverviewCards
        tasks={tasks}
        assessmentResult={assessment}
        streakDays={gamification.streakDays}
        onOpenAssessmentModal={() => navigate('/onboarding')}
      />

      {/* 2.5 Gamification: Level, Real XP & Milestone Badges */}
      <GamificationCard
        gamification={gamification}
        onRefresh={() => setGamification(getGamificationState())}
      />

      {/* 3. Continue Learning Active Roadmap Banner */}
      <ContinueLearningCard />

      {/* 4. Platform Modules & Quick Actions */}
      <QuickActions
        onOpenMentor={() => navigate('/mentor')}
        onScrollToAnalytics={handleScrollToAnalytics}
      />

      {/* 4. Main Two-Column Workflow Section: Study Planner + Focus Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Study Planner (7 cols) */}
        <div className="xl:col-span-7">
          <StudyPlanner
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>

        {/* Right Column: Weekly Focus & Analytics Summary (5 cols) */}
        <div className="xl:col-span-5 space-y-6">
          {/* Quick Sprint Launcher Card */}
          <Card variant="accent-pink">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#F02BC8] to-[#9255FF] flex items-center justify-center text-white">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold">Deep Work Sprint</CardTitle>
                    <CardDescription className="text-xs">
                      25-minute Pomodoro study sprint with zero distractions
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="pink" size="sm">
                  Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#171536] border border-[rgba(146,85,255,0.18)]">
                <div>
                  <span className="text-xs font-semibold text-[#F7F3FF]">Sprint Duration</span>
                  <p className="text-[11px] text-[#A7A0C5]">Standard 25m focus + 5m cooldown</p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsSprintOpen(true)}
                  leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                >
                  Launch Timer
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Real Study Streak Insight */}
          <Card variant="default">
            <CardHeader className="pb-2 border-b border-[rgba(146,85,255,0.1)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#F02BC8] fill-[#F02BC8]" />
                  <CardTitle className="text-sm font-bold">Study Streak Integrity</CardTitle>
                </div>
                <span className="text-xs font-bold text-[#FF6BE6]">{student.streakDays} Days</span>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <p className="text-xs text-[#A7A0C5] leading-relaxed">
                Your study streak updates dynamically whenever you complete a study task or log a Pomodoro sprint. Maintain 1 study session today to preserve your milestone.
              </p>
              <div className="flex items-center gap-2 pt-1 text-xs">
                <div className="flex-1 h-2 rounded-full bg-[#171536] overflow-hidden p-0.5">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#F02BC8] to-[#9255FF] w-4/5" />
                </div>
                <span className="text-[11px] font-bold text-emerald-400">On Track</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 5. Goals & Skills Inventory */}
      <GoalsAndSkills
        student={student}
        onboarding={onboarding}
        onOpenRoadmapModal={() => navigate('/roadmap')}
      />

      {/* 6. Weekly Analytics Chart */}
      <div ref={analyticsSectionRef}>
        <WeeklyAnalyticsChart sessions={sessions} tasks={tasks} />
      </div>

      {/* Study Sprint Timer Modal */}
      <SprintTimerModal
        isOpen={isSprintOpen}
        onClose={() => setIsSprintOpen(false)}
        onSprintCompleted={handleSprintCompleted}
      />
    </div>
  )
}
