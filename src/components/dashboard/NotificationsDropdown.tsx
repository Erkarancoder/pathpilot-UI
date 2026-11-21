import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Trash2, Calendar, AlertTriangle, Sparkles, CheckCheck } from 'lucide-react'
import type { NotificationItem } from '../../types'

interface NotificationsDropdownProps {
  isOpen: boolean
  onClose: () => void
  notifications: NotificationItem[]
  onMarkAllRead: () => void
  onDismiss: (id: string) => void
}

export const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onDismiss,
}) => {
  if (!isOpen) return null

  const getIcon = (type?: string) => {
    switch (type) {
      case 'exam':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
      case 'streak':
        return <Sparkles className="w-3.5 h-3.5 text-[#F02BC8]" />
      default:
        return <Calendar className="w-3.5 h-3.5 text-[#9255FF]" />
    }
  }

  return (
    <>
      {/* Invisible backdrop to dismiss */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="absolute right-0 top-14 z-50 w-80 sm:w-96 rounded-2xl bg-[#171536] border border-[rgba(146,85,255,0.25)] shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-4 space-y-3"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(146,85,255,0.14)]">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#F02BC8]" />
              <h4 className="text-xs font-bold text-[#F7F3FF]">Academic Notifications</h4>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#211C50] text-[#FF6BE6] border border-[rgba(240,43,200,0.3)]">
                {notifications.filter((n) => !n.read).length} new
              </span>
            </div>
            <button
              onClick={onMarkAllRead}
              className="text-[11px] text-[#A7A0C5] hover:text-[#F7F3FF] flex items-center gap-1 transition-colors"
              title="Mark all as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Mark all read
            </button>
          </div>

          {/* List */}
          <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-xs text-[#A7A0C5]">
                No pending notifications
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-xl border transition-all text-xs flex items-start gap-2.5 relative group ${
                    item.read
                      ? 'bg-[#171536]/50 border-transparent opacity-70'
                      : 'bg-[#211C50]/80 border-[rgba(146,85,255,0.2)] hover:border-[rgba(240,43,200,0.4)]'
                  }`}
                >
                  <div className="mt-0.5 shrink-0 p-1.5 rounded-lg bg-[#171536] border border-[rgba(146,85,255,0.15)]">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-[#F7F3FF] truncate">{item.title}</span>
                      <span className="text-[10px] text-[#A7A0C5] shrink-0">{item.time}</span>
                    </div>
                    <p className="text-[#A7A0C5] text-[11px] mt-0.5 leading-snug">
                      {item.message}
                    </p>
                  </div>
                  <button
                    onClick={() => onDismiss(item.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-[#A7A0C5] hover:text-rose-400 rounded transition-opacity"
                    title="Dismiss"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}
