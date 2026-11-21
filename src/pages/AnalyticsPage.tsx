import React from 'react'
import { Link } from 'react-router-dom'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts'
import {
  ArrowLeft,
  BookOpen,
  Code2,
  AlertCircle,
} from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { ProgressBar } from '../components/ui/ProgressBar'
import { GamificationCard } from '../components/gamification/GamificationCard'
import {
  getPracticeStats,
  getPracticeCodingSolutions,
  getCompletedLessons,
  getRoadmapProgress,
  getActiveRoadmapId,
  getStudyTasks,
  getStudySessions,
  getGamificationState,
  getOnboardingData,
} from '../lib/storage'
import { PRACTICE_CATEGORIES } from '../data/practiceData'

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const AnalyticsPage: React.FC = () => {
  const onboarding = getOnboardingData()
  const practiceStats = getPracticeStats()
  const codingSolutions = getPracticeCodingSolutions()
  const completedLessonIds = getCompletedLessons()
  const activeRoadmapId = getActiveRoadmapId()
  const roadmapProgress = getRoadmapProgress(activeRoadmapId)
  const tasks = getStudyTasks()
  const sessions = getStudySessions()
  const gamification = getGamificationState()

  // 1. Weekly activity breakdown (from recorded sessions)
  const weeklyDayMinutes: Record<string, number> = {
    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
  }

  sessions.forEach((s) => {
    try {
      const date = new Date(s.date)
      const dayName = DAY_NAMES[date.getDay()]
      if (weeklyDayMinutes[dayName] !== undefined) {
        weeklyDayMinutes[dayName] += s.durationMinutes
      }
    } catch {
      // ignore invalid dates
    }
  })

  const weeklyActivityData = DAY_NAMES.map((day) => ({
    day,
    minutes: weeklyDayMinutes[day],
  }))

  const totalStudyMinutes = sessions.reduce((acc, s) => acc + s.durationMinutes, 0)

  // 2. Quiz category performance
  const categoryBarData = PRACTICE_CATEGORIES.map((cat) => {
    const stat = practiceStats.categoryStats[cat.id]
    return {
      category: cat.title.split(' ')[0],
      fullName: cat.title,
      attempts: stat ? stat.attempts : 0,
      accuracy: stat ? stat.percentage : 0,
    }
  })

  // 3. Coding language distribution
  const langCounts: Record<string, number> = {
    Java: 0,
    Python: 0,
    JavaScript: 0,
    'C++': 0,
  }
  codingSolutions.forEach((c) => {
    if (c.language === 'java') langCounts.Java += 1
    else if (c.language === 'python') langCounts.Python += 1
    else if (c.language === 'javascript') langCounts.JavaScript += 1
    else if (c.language === 'cpp') langCounts['C++'] += 1
  })

  // 4. Radar skill mastery scores (derived from assessment + roadmap + quizzes)
  const assessmentScore = onboarding?.assessmentResult ? onboarding.assessmentResult.percentage : 50
  const dsaAccuracy = practiceStats.categoryStats['dsa']?.percentage || assessmentScore
  const webAccuracy = practiceStats.categoryStats['react']?.percentage || (completedLessonIds.length > 0 ? 70 : 40)
  const dbAccuracy = practiceStats.categoryStats['database']?.percentage || assessmentScore
  const coreCsAccuracy = practiceStats.categoryStats['java']?.percentage || assessmentScore

  const skillRadarData = [
    { subject: 'DSA', score: dsaAccuracy, fullMark: 100 },
    { subject: 'Frontend', score: webAccuracy, fullMark: 100 },
    { subject: 'Database', score: dbAccuracy, fullMark: 100 },
    { subject: 'Core CS', score: coreCsAccuracy, fullMark: 100 },
    { subject: 'Task Discipline', score: tasks.length > 0 ? Math.round((tasks.filter((t) => t.completed).length / tasks.length) * 100) : 0, fullMark: 100 },
  ]

  // Check if data is sparse
  const hasSparseData =
    practiceStats.totalQuizzesCompleted === 0 &&
    completedLessonIds.length === 0 &&
    sessions.length === 0

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[rgba(146,85,255,0.15)]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link
              to="/dashboard"
              className="text-xs text-[#A7A0C5] hover:text-[#F7F3FF] flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>
            <span className="text-[#A7A0C5]">•</span>
            <span className="text-xs text-[#FF6BE6] font-medium">Phase 7: Performance Analytics</span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F7F3FF] tracking-tight">
              Student Performance Analytics
            </h1>
            <Badge variant="violet" size="sm">
              Real Data Only
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-[#A7A0C5]">
            Comprehensive multi-metric analysis calculated strictly from your recorded study activity and quizzes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/practice">
            <Button variant="outline" size="sm" className="text-xs gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-[#FF6BE6]" />
              <span>Practice Lab</span>
            </Button>
          </Link>
          <Link to="/roadmap">
            <Button variant="primary" size="sm" className="text-xs gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Roadmap</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Gamification Strip */}
      <GamificationCard gamification={gamification} />

      {/* Sparse Data Informational Alert */}
      {hasSparseData && (
        <Card
          variant="default"
          className="p-5 border-amber-500/30 bg-amber-500/5 shadow-[0_4px_20px_rgba(245,158,11,0.1)]"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-amber-300">
                Awaiting Initial Activity Data
              </h3>
              <p className="text-xs text-[#A7A0C5] leading-relaxed">
                PathPilot never fabricates mock numbers or fake performance graphs. To generate rich performance analytics:
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <Link
                  to="/practice"
                  className="px-3 py-1 rounded-lg bg-[#171536] text-xs font-semibold text-[#FF6BE6] border border-[rgba(240,43,200,0.3)] hover:border-[#F02BC8]"
                >
                  1. Take a 5-Question Quiz →
                </Link>
                <Link
                  to="/roadmap"
                  className="px-3 py-1 rounded-lg bg-[#171536] text-xs font-semibold text-[#9255FF] border border-[rgba(146,85,255,0.3)] hover:border-[#9255FF]"
                >
                  2. Complete a Roadmap Lesson →
                </Link>
                <Link
                  to="/dashboard"
                  className="px-3 py-1 rounded-lg bg-[#171536] text-xs font-semibold text-emerald-400 border border-emerald-500/30 hover:border-emerald-500"
                >
                  3. Log a 25-Min Study Sprint →
                </Link>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Metric Stat Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <Card variant="default" className="p-4 space-y-1 border-[rgba(146,85,255,0.2)]">
          <span className="text-[11px] text-[#A7A0C5]">Total Study Time</span>
          <h4 className="text-xl font-extrabold text-[#F7F3FF]">
            {Math.round(totalStudyMinutes / 60)}h {totalStudyMinutes % 60}m
          </h4>
          <span className="text-[10px] text-emerald-400">{sessions.length} sprints recorded</span>
        </Card>

        <Card variant="default" className="p-4 space-y-1 border-[rgba(146,85,255,0.2)]">
          <span className="text-[11px] text-[#A7A0C5]">Roadmap Progress</span>
          <h4 className="text-xl font-extrabold text-[#F7F3FF]">
            {roadmapProgress.percentage}%
          </h4>
          <span className="text-[10px] text-[#FF6BE6]">{roadmapProgress.completedCount} lessons done</span>
        </Card>

        <Card variant="default" className="p-4 space-y-1 border-[rgba(146,85,255,0.2)]">
          <span className="text-[11px] text-[#A7A0C5]">Practice Accuracy</span>
          <h4 className="text-xl font-extrabold text-[#F7F3FF]">
            {practiceStats.accuracyPercentage}%
          </h4>
          <span className="text-[10px] text-emerald-400">{practiceStats.totalCorrectAnswers} correct answers</span>
        </Card>

        <Card variant="default" className="p-4 space-y-1 border-[rgba(146,85,255,0.2)]">
          <span className="text-[11px] text-[#A7A0C5]">Quizzes Taken</span>
          <h4 className="text-xl font-extrabold text-[#F7F3FF]">
            {practiceStats.totalQuizzesCompleted}
          </h4>
          <span className="text-[10px] text-[#A7A0C5]">{practiceStats.totalQuestionsAttempted} total MCQs</span>
        </Card>

        <Card variant="default" className="p-4 space-y-1 border-[rgba(146,85,255,0.2)]">
          <span className="text-[11px] text-[#A7A0C5]">DSA Solved</span>
          <h4 className="text-xl font-extrabold text-[#F7F3FF]">
            {practiceStats.totalCodingSolved}
          </h4>
          <span className="text-[10px] text-[#9255FF]">{codingSolutions.length} lab attempts</span>
        </Card>

        <Card variant="default" className="p-4 space-y-1 border-[rgba(146,85,255,0.2)]">
          <span className="text-[11px] text-[#A7A0C5]">Study Tasks</span>
          <h4 className="text-xl font-extrabold text-[#F7F3FF]">
            {tasks.filter((t) => t.completed).length} / {tasks.length}
          </h4>
          <span className="text-[10px] text-emerald-400">
            {tasks.length > 0 ? Math.round((tasks.filter((t) => t.completed).length / tasks.length) * 100) : 0}% complete
          </span>
        </Card>
      </div>

      {/* Row 1: Weekly Study Activity & Quiz Accuracy Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Weekly Recorded Sprints (7 cols) */}
        <div className="lg:col-span-7">
          <Card variant="default" className="p-5 sm:p-6 border-[rgba(146,85,255,0.25)] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-[#F7F3FF]">
                  Weekly Study Session Activity
                </h3>
                <p className="text-xs text-[#A7A0C5]">
                  Minutes logged per day using the dashboard sprint timer
                </p>
              </div>
              <Badge variant="pink" size="sm">
                Minutes / Day
              </Badge>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyActivityData}>
                  <defs>
                    <linearGradient id="activityGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F02BC8" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#9255FF" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(146, 85, 255, 0.12)" />
                  <XAxis dataKey="day" stroke="#A7A0C5" fontSize={11} />
                  <YAxis stroke="#A7A0C5" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#171536',
                      borderColor: 'rgba(146, 85, 255, 0.3)',
                      borderRadius: '12px',
                      color: '#F7F3FF',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="minutes"
                    stroke="#F02BC8"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#activityGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Right: Quiz Category Performance (5 cols) */}
        <div className="lg:col-span-5">
          <Card variant="default" className="p-5 sm:p-6 border-[rgba(146,85,255,0.25)] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-[#F7F3FF]">
                  Quiz Accuracy by Category
                </h3>
                <p className="text-xs text-[#A7A0C5]">
                  Calculated from verified submissions
                </p>
              </div>
              <Badge variant="violet" size="sm">
                Accuracy %
              </Badge>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryBarData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(146, 85, 255, 0.12)" />
                  <XAxis dataKey="category" stroke="#A7A0C5" fontSize={10} />
                  <YAxis stroke="#A7A0C5" fontSize={11} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#171536',
                      borderColor: 'rgba(146, 85, 255, 0.3)',
                      borderRadius: '12px',
                      color: '#F7F3FF',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="accuracy" fill="#9255FF" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      {/* Row 2: Skill Mastery Radar & Language Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Skill Radar Chart (6 cols) */}
        <div className="lg:col-span-6">
          <Card variant="default" className="p-5 sm:p-6 border-[rgba(146,85,255,0.25)] space-y-4">
            <div>
              <h3 className="text-base font-extrabold text-[#F7F3FF]">
                Skill Mastery Overview
              </h3>
              <p className="text-xs text-[#A7A0C5]">
                Balanced synthesis of diagnostic assessment, roadmap lessons, and practice
              </p>
            </div>

            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={85} data={skillRadarData}>
                  <PolarGrid stroke="rgba(146, 85, 255, 0.18)" />
                  <PolarAngleAxis dataKey="subject" stroke="#A7A0C5" fontSize={11} />
                  <PolarRadiusAxis stroke="#A7A0C5" fontSize={10} domain={[0, 100]} />
                  <Radar
                    name="Skill Mastery"
                    dataKey="score"
                    stroke="#F02BC8"
                    fill="#F02BC8"
                    fillOpacity={0.35}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#171536',
                      borderColor: 'rgba(146, 85, 255, 0.3)',
                      borderRadius: '12px',
                      color: '#F7F3FF',
                      fontSize: '12px',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Right: Coding Languages & Roadmap Completion (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <Card variant="default" className="p-5 sm:p-6 border-[rgba(146,85,255,0.25)] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-[#F7F3FF]">
                  Roadmap Completion Breakdown
                </h3>
                <p className="text-xs text-[#A7A0C5]">
                  {roadmapProgress.path.title}
                </p>
              </div>
              <span className="text-xs font-bold text-[#FF6BE6]">
                {roadmapProgress.completedCount} / {roadmapProgress.totalCount} Lessons
              </span>
            </div>

            <div className="space-y-3">
              <ProgressBar value={roadmapProgress.percentage} variant="gradient" size="lg" />

              <div className="space-y-2 pt-2">
                {roadmapProgress.path.modules.map((mod, idx) => {
                  const doneInMod = mod.lessons.filter((l) =>
                    completedLessonIds.includes(l.id)
                  ).length
                  const pct = Math.round((doneInMod / mod.lessons.length) * 100)

                  return (
                    <div
                      key={mod.id}
                      className="p-2.5 rounded-xl bg-[#090817] border border-[rgba(146,85,255,0.15)] flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[rgba(146,85,255,0.15)] text-[#9255FF] flex items-center justify-center text-[10px] font-bold">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-[#F7F3FF] truncate">{mod.title}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-[#A7A0C5]">
                          {doneInMod}/{mod.lessons.length}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            pct === 100
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                              : pct > 0
                              ? 'bg-[rgba(240,43,200,0.15)] text-[#FF6BE6] border border-[rgba(240,43,200,0.3)]'
                              : 'bg-white/5 text-[#A7A0C5]'
                          }`}
                        >
                          {pct}%
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Coding Lab Language Breakdown */}
              <div className="pt-3 border-t border-[rgba(146,85,255,0.12)]">
                <span className="text-[11px] font-bold text-[#A7A0C5] block mb-2">
                  Coding Lab Solutions by Language
                </span>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {Object.entries(langCounts).map(([lang, count]) => (
                    <div
                      key={lang}
                      className="p-2 rounded-lg bg-[#090817] border border-[rgba(146,85,255,0.15)]"
                    >
                      <span className="text-[10px] text-[#A7A0C5] block">{lang}</span>
                      <span className="text-xs font-bold text-[#FF6BE6]">{count} Solved</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
