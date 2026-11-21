import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Compass,
  Layers,
  LayoutDashboard,
  Bot,
  Code2,
  LineChart,
  Settings,
  Sparkles,
  X,
  Flame,
  GraduationCap,
} from 'lucide-react'
import { navigationItems } from '../../data/demoData'
import { getActiveStudentProfile } from '../../lib/storage'
import { Badge } from '../ui/Badge'
import { cn } from '../../lib/utils'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const iconMap: Record<string, React.ReactNode> = {
  Layers: <Layers className="w-5 h-5" />,
  LayoutDashboard: <LayoutDashboard className="w-5 h-5" />,
  Compass: <Compass className="w-5 h-5" />,
  Bot: <Bot className="w-5 h-5" />,
  Code2: <Code2 className="w-5 h-5" />,
  LineChart: <LineChart className="w-5 h-5" />,
  Settings: <Settings className="w-5 h-5" />,
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation()
  const student = getActiveStudentProfile()

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={cn(
          'fixed top-0 bottom-0 left-0 z-50 flex flex-col w-72 bg-[#080611] border-r border-[rgba(146,85,255,0.15)] transition-transform duration-300 ease-in-out lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-[rgba(146,85,255,0.12)] bg-[#080611]/80 backdrop-blur">
          <Link to="/" onClick={onClose} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F02BC8] via-[#B819E0] to-[#9255FF] flex items-center justify-center shadow-[0_0_18px_rgba(240,43,200,0.45)] group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-[#F7F3FF]">
                  Path<span className="text-[#F02BC8]">Pilot</span>
                </span>
                <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded bg-[rgba(240,43,200,0.15)] text-[#FF6BE6] border border-[rgba(240,43,200,0.3)]">
                  v1.0
                </span>
              </div>
              <span className="text-[11px] text-[#A7A0C5] tracking-wide">
                Student Workspace
              </span>
            </div>
          </Link>

          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="p-1.5 text-[#A7A0C5] hover:text-white rounded-lg hover:bg-[#171536] lg:hidden"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student Quick Status */}
        <div className="px-5 py-4 border-b border-[rgba(146,85,255,0.1)]">
          <div className="p-3 rounded-xl bg-gradient-to-r from-[#171536] to-[#211C50] border border-[rgba(146,85,255,0.18)] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[rgba(146,85,255,0.2)] flex items-center justify-center text-[#9255FF]">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#F7F3FF] truncate max-w-[120px]">{student.major}</p>
                <p className="text-[11px] text-[#A7A0C5]">Target GPA: {student.gpa}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-[rgba(240,43,200,0.12)] border border-[rgba(240,43,200,0.25)] text-[#FF6BE6] text-xs font-bold">
              <Flame className="w-3.5 h-3.5 fill-[#F02BC8]" />
              <span>{student.streakDays}d</span>
            </div>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#A7A0C5]/60">
            Workspace
          </div>
          {navigationItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== '/' && location.pathname.startsWith(item.path))
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={onClose}
                className={cn(
                  'group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative',
                  isActive
                    ? 'text-[#F7F3FF] bg-gradient-to-r from-[rgba(240,43,200,0.18)] to-[rgba(146,85,255,0.12)] border border-[rgba(240,43,200,0.35)] shadow-[0_0_15px_rgba(240,43,200,0.18)]'
                    : 'text-[#A7A0C5] hover:text-[#F7F3FF] hover:bg-[#171536]/80 hover:border hover:border-[rgba(146,85,255,0.15)]'
                )}
              >
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#F02BC8] shadow-[0_0_8px_#F02BC8]" />
                )}
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'transition-colors',
                      isActive
                        ? 'text-[#F02BC8]'
                        : 'text-[#A7A0C5] group-hover:text-[#9255FF]'
                    )}
                  >
                    {iconMap[item.icon]}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <Badge
                    variant={isActive ? 'pink' : 'neutral'}
                    size="sm"
                    className="text-[10px]"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Student Profile Footer */}
        <div className="p-4 border-t border-[rgba(146,85,255,0.12)] bg-[#080611]">
          <Link
            to="/onboarding"
            onClick={onClose}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#171536] transition-colors cursor-pointer border border-transparent hover:border-[rgba(146,85,255,0.2)]"
            title="Click to edit profile or retake assessment"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F02BC8] to-[#9255FF] p-0.5 shadow-[0_0_12px_rgba(240,43,200,0.3)]">
                <div className="w-full h-full rounded-full bg-[#171536] flex items-center justify-center font-bold text-xs text-[#F7F3FF]">
                  {student.name.substring(0, 2).toUpperCase()}
                </div>
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#080611]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#F7F3FF] truncate">
                {student.name}
              </p>
              <p className="text-xs text-[#A7A0C5] truncate">
                {student.college || student.email}
              </p>
            </div>
          </Link>
        </div>
      </aside>
    </>
  )
}
