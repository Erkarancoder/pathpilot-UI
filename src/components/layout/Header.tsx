import React, { useState, useEffect } from 'react'
import {
  Menu,
  Search,
  Bell,
  Sparkles,
  Flame,
  Command,
} from 'lucide-react'
import { Button } from '../ui/Button'
import {
  getActiveStudentProfile,
  getNotifications,
  markAllNotificationsAsRead,
  dismissNotification,
  getStudyTasks,
} from '../../lib/storage'
import { SearchModal } from '../dashboard/SearchModal'
import { SprintTimerModal } from '../dashboard/SprintTimerModal'
import { NotificationsDropdown } from '../dashboard/NotificationsDropdown'
import { ProfileDropdown } from '../dashboard/ProfileDropdown'
import type { NotificationItem, StudyTask } from '../../types'

interface HeaderProps {
  onToggleSidebar: () => void
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const [student, setStudent] = useState(getActiveStudentProfile)
  const [notifications, setNotifications] = useState<NotificationItem[]>(getNotifications)
  const [tasks, setTasks] = useState<StudyTask[]>(getStudyTasks)

  // Modals / dropdowns state
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isSprintOpen, setIsSprintOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  // Sync state on focus/mount
  useEffect(() => {
    const refreshData = () => {
      setStudent(getActiveStudentProfile())
      setNotifications(getNotifications())
      setTasks(getStudyTasks())
    }

    window.addEventListener('storage', refreshData)
    return () => window.removeEventListener('storage', refreshData)
  }, [])

  // Keyboard shortcut: Cmd+K / Ctrl+K opens search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleMarkAllRead = () => {
    markAllNotificationsAsRead()
    setNotifications(getNotifications())
  }

  const handleDismissNotification = (id: string) => {
    dismissNotification(id)
    setNotifications(getNotifications())
  }

  const handleSprintCompleted = () => {
    setStudent(getActiveStudentProfile())
  }

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between h-20 px-4 sm:px-8 bg-[#090817]/85 backdrop-blur-md border-b border-[rgba(146,85,255,0.14)]">
        {/* Left: Mobile hamburger & search */}
        <div className="flex items-center gap-4 flex-1 max-w-xl">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-[#A7A0C5] hover:text-[#F7F3FF] rounded-xl hover:bg-[#171536] lg:hidden transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Global Search Bar (Trigger SearchModal) */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="relative w-full max-w-md hidden sm:flex items-center justify-between h-10 pl-10 pr-3 rounded-xl bg-[#171536]/80 border border-[rgba(146,85,255,0.2)] text-xs sm:text-sm text-[#A7A0C5] hover:border-[rgba(240,43,200,0.4)] hover:text-[#F7F3FF] transition-all cursor-pointer text-left"
          >
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A7A0C5]">
              <Search className="w-4 h-4" />
            </div>
            <span className="truncate">Search tasks, courses, topics, or modules...</span>
            <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-semibold text-[#A7A0C5] bg-[#211C50] border border-[rgba(146,85,255,0.25)] rounded">
              <Command className="w-3 h-3" />K
            </kbd>
          </button>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          {/* Mobile search button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2.5 rounded-xl bg-[#171536] border border-[rgba(146,85,255,0.2)] text-[#A7A0C5] hover:text-[#F7F3FF] sm:hidden"
            aria-label="Open search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Streak Indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#171536] border border-[rgba(146,85,255,0.22)] shadow-[0_0_12px_rgba(240,43,200,0.1)]">
            <Flame className="w-4 h-4 text-[#F02BC8] fill-[#F02BC8]" />
            <span className="text-xs font-bold text-[#F7F3FF]">
              {student.streakDays}-Day Streak
            </span>
          </div>

          {/* Study Sprint Button */}
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsSprintOpen(true)}
            leftIcon={<Sparkles className="w-3.5 h-3.5 text-white" />}
            className="hidden sm:inline-flex cursor-pointer"
          >
            Study Sprint
          </Button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setIsNotificationsOpen((prev) => !prev)
                setIsProfileOpen(false)
              }}
              className="relative p-2.5 rounded-xl bg-[#171536] border border-[rgba(146,85,255,0.2)] text-[#A7A0C5] hover:text-[#F7F3FF] hover:border-[rgba(146,85,255,0.4)] transition-all cursor-pointer"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F02BC8] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F02BC8]" />
                </span>
              )}
            </button>

            <NotificationsDropdown
              isOpen={isNotificationsOpen}
              onClose={() => setIsNotificationsOpen(false)}
              notifications={notifications}
              onMarkAllRead={handleMarkAllRead}
              onDismiss={handleDismissNotification}
            />
          </div>

          {/* User Profile Avatar with dropdown */}
          <div className="relative pl-1 border-l border-[rgba(146,85,255,0.15)] ml-1">
            <button
              onClick={() => {
                setIsProfileOpen((prev) => !prev)
                setIsNotificationsOpen(false)
              }}
              className="flex items-center gap-2 group cursor-pointer focus:outline-none"
              title="Open profile menu"
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#F02BC8] to-[#9255FF] p-0.5 shadow-[0_0_12px_rgba(240,43,200,0.25)] group-hover:scale-105 transition-transform">
                  <div className="w-full h-full rounded-[10px] bg-[#171536] flex items-center justify-center font-bold text-xs text-[#F7F3FF]">
                    {student.name.substring(0, 2).toUpperCase()}
                  </div>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#090817]" />
              </div>
              <div className="hidden xl:flex flex-col text-left">
                <span className="text-xs font-bold text-[#F7F3FF] leading-tight group-hover:text-[#FF6BE6] transition-colors">
                  {student.name}
                </span>
                <span className="text-[10px] text-[#A7A0C5]">
                  {student.year}
                </span>
              </div>
            </button>

            <ProfileDropdown
              isOpen={isProfileOpen}
              onClose={() => setIsProfileOpen(false)}
              student={student}
            />
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        tasks={tasks}
      />

      {/* Study Sprint Timer Modal */}
      <SprintTimerModal
        isOpen={isSprintOpen}
        onClose={() => setIsSprintOpen(false)}
        onSprintCompleted={handleSprintCompleted}
      />
    </>
  )
}
