import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  User,
  Bell,
  Clock,
  Shield,
  RotateCcw,
  Download,
  Save,
  CheckCircle2,
  Layers,
} from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import {
  getOnboardingData,
  saveOnboardingData,
  clearOnboardingData,
  getActiveStudentProfile,
} from '../lib/storage'
import type { OnboardingData } from '../types'

export const SettingsPage: React.FC = () => {
  const currentOnboarding = getOnboardingData()
  const currentProfile = getActiveStudentProfile()

  const [fullName, setFullName] = useState(
    currentOnboarding?.fullName || currentProfile.name || 'Alex Chen'
  )
  const [collegeName, setCollegeName] = useState(
    currentOnboarding?.collegeName || currentProfile.college || 'Stanford University'
  )
  const [degree, setDegree] = useState(
    currentOnboarding?.degree || currentProfile.major || 'B.S. Computer Science'
  )
  const [yearOrSemester, setYearOrSemester] = useState(
    currentOnboarding?.yearOrSemester || currentProfile.year || 'Junior, Year 3'
  )

  // Preferences
  const [dailyTarget, setDailyTarget] = useState<'45' | '60' | '90' | '120'>('60')
  const [sprintDuration, setSprintDuration] = useState<'15' | '25' | '45'>('25')
  const [notifyTasks, setNotifyTasks] = useState(true)
  const [notifyStreaks, setNotifyStreaks] = useState(true)
  const [notifyPractice, setNotifyPractice] = useState(true)

  const [savedToast, setSavedToast] = useState(false)

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()

    const updatedOnboarding: OnboardingData = {
      fullName,
      collegeName,
      degree,
      yearOrSemester,
      avatarInitials: fullName.substring(0, 2).toUpperCase(),
      learningGoals: currentOnboarding?.learningGoals || ['Full Stack Web Development'],
      experienceLevel: currentOnboarding?.experienceLevel || 'Intermediate',
      selectedSkills: currentOnboarding?.selectedSkills || ['React', 'TypeScript', 'Java'],
      assessmentResult: currentOnboarding?.assessmentResult,
      completed: true,
    }

    saveOnboardingData(updatedOnboarding)
    setSavedToast(true)
    setTimeout(() => setSavedToast(false), 2500)
  }

  const handleResetData = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all local study tasks, sprint sessions, quiz attempts, and profile data to original defaults?'
      )
    ) {
      clearOnboardingData()
      window.location.href = '/'
    }
  }

  const handleExportData = () => {
    const data: Record<string, unknown> = {}
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('pathpilot_')) {
        try {
          data[key] = JSON.parse(localStorage.getItem(key) || '{}')
        } catch {
          data[key] = localStorage.getItem(key)
        }
      }
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pathpilot-student-backup-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Breadcrumb & Header */}
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
            <span className="text-xs text-[#FF6BE6] font-medium">Settings & Preferences</span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F7F3FF] tracking-tight">
              Settings & Workspace Preferences
            </h1>
            <Badge variant="violet" size="sm">
              Local Prototype
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-[#A7A0C5]">
            Manage your student profile, study sprint defaults, notifications, and client-side storage.
          </p>
        </div>

        {savedToast && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-semibold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings Saved!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Profile Form (7 cols) */}
        <div className="md:col-span-7 space-y-6">
          <Card variant="default" className="p-5 sm:p-6 border-[rgba(146,85,255,0.25)] space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-[rgba(146,85,255,0.15)]">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F02BC8] to-[#9255FF] flex items-center justify-center text-white">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#F7F3FF]">Student Profile Identity</h3>
                <p className="text-xs text-[#A7A0C5]">
                  Updates your personalized greetings and roadmap recommendations
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#A7A0C5] uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#171536] border border-[rgba(146,85,255,0.25)] text-sm text-[#F7F3FF] focus:outline-none focus:border-[#F02BC8] transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#A7A0C5] uppercase tracking-wider mb-1.5">
                  College / University
                </label>
                <input
                  type="text"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#171536] border border-[rgba(146,85,255,0.25)] text-sm text-[#F7F3FF] focus:outline-none focus:border-[#F02BC8] transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#A7A0C5] uppercase tracking-wider mb-1.5">
                    Degree / Major
                  </label>
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#171536] border border-[rgba(146,85,255,0.25)] text-sm text-[#F7F3FF] focus:outline-none focus:border-[#F02BC8] transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#A7A0C5] uppercase tracking-wider mb-1.5">
                    Year / Semester
                  </label>
                  <input
                    type="text"
                    value={yearOrSemester}
                    onChange={(e) => setYearOrSemester(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#171536] border border-[rgba(146,85,255,0.25)] text-sm text-[#F7F3FF] focus:outline-none focus:border-[#F02BC8] transition-all"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end">
                <Button type="submit" variant="primary" size="md" className="gap-2">
                  <Save className="w-4 h-4" />
                  <span>Save Profile</span>
                </Button>
              </div>
            </form>
          </Card>

          {/* Study & Pomodoro Sprint Preferences */}
          <Card variant="default" className="p-5 sm:p-6 border-[rgba(146,85,255,0.25)] space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[rgba(146,85,255,0.15)]">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#9255FF] to-[#F02BC8] flex items-center justify-center text-white">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#F7F3FF]">Study Targets & Sprint Defaults</h3>
                <p className="text-xs text-[#A7A0C5]">
                  Configure your default session lengths and daily study commitments
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#A7A0C5] uppercase tracking-wider mb-2">
                  Daily Study Goal
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['45', '60', '90', '120'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setDailyTarget(m)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        dailyTarget === m
                          ? 'bg-gradient-to-r from-[#F02BC8] to-[#9255FF] text-white border-transparent'
                          : 'bg-[#171536] text-[#A7A0C5] border-[rgba(146,85,255,0.2)] hover:text-[#F7F3FF]'
                      }`}
                    >
                      {m} mins
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#A7A0C5] uppercase tracking-wider mb-2">
                  Pomodoro Deep Work Sprint Duration
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['15', '25', '45'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setSprintDuration(m)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        sprintDuration === m
                          ? 'bg-gradient-to-r from-[#F02BC8] to-[#9255FF] text-white border-transparent'
                          : 'bg-[#171536] text-[#A7A0C5] border-[rgba(146,85,255,0.2)] hover:text-[#F7F3FF]'
                      }`}
                    >
                      {m} mins {m === '25' && '(Standard)'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Notifications & Data Hygiene (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          {/* Notification Preferences */}
          <Card variant="default" className="p-5 sm:p-6 border-[rgba(146,85,255,0.25)] space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[rgba(146,85,255,0.15)]">
              <div className="w-10 h-10 rounded-xl bg-[#171536] border border-[rgba(146,85,255,0.2)] flex items-center justify-center text-[#9255FF]">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#F7F3FF]">In-App Notifications</h3>
                <p className="text-xs text-[#A7A0C5]">
                  Control simulated notification drawer alerts
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 rounded-xl bg-[#090817] border border-[rgba(146,85,255,0.15)] cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-[#F7F3FF] block">Study Task Reminders</span>
                  <span className="text-[11px] text-[#A7A0C5]">Alerts for due tasks</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifyTasks}
                  onChange={(e) => setNotifyTasks(e.target.checked)}
                  className="w-4 h-4 accent-[#F02BC8] cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-[#090817] border border-[rgba(146,85,255,0.15)] cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-[#F7F3FF] block">Streak Protection</span>
                  <span className="text-[11px] text-[#A7A0C5]">Daily active streak updates</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifyStreaks}
                  onChange={(e) => setNotifyStreaks(e.target.checked)}
                  className="w-4 h-4 accent-[#F02BC8] cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-[#090817] border border-[rgba(146,85,255,0.15)] cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-[#F7F3FF] block">Lab Milestones</span>
                  <span className="text-[11px] text-[#A7A0C5]">Quiz completion summaries</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifyPractice}
                  onChange={(e) => setNotifyPractice(e.target.checked)}
                  className="w-4 h-4 accent-[#F02BC8] cursor-pointer"
                />
              </label>
            </div>
          </Card>

          {/* Hackathon Architecture & Data Management */}
          <Card variant="default" className="p-5 sm:p-6 border-[rgba(146,85,255,0.25)] space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[rgba(146,85,255,0.15)]">
              <div className="w-10 h-10 rounded-xl bg-[#171536] border border-[rgba(146,85,255,0.2)] flex items-center justify-center text-[#F02BC8]">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#F7F3FF]">Data & Hackathon Protocol</h3>
                <p className="text-xs text-[#A7A0C5]">
                  100% Client-Side Local Prototype
                </p>
              </div>
            </div>

            <p className="text-xs text-[#A7A0C5] leading-relaxed">
              PathPilot executes completely in your browser sandbox without remote servers or paid API keys. All progress (tasks, roadmap lessons, quiz attempts, and earned XP) persists locally via LocalStorage.
            </p>

            <div className="space-y-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportData}
                className="w-full justify-center gap-2 text-xs"
              >
                <Download className="w-3.5 h-3.5 text-[#FF6BE6]" />
                <span>Export Progress JSON Backup</span>
              </Button>

              <Link to="/design-system" className="block">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center gap-2 text-xs border-[rgba(146,85,255,0.2)]"
                >
                  <Layers className="w-3.5 h-3.5 text-[#9255FF]" />
                  <span>Inspect Phase 1 Design System</span>
                </Button>
              </Link>

              <button
                type="button"
                onClick={handleResetData}
                className="w-full px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Local Data & Start Fresh</span>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
