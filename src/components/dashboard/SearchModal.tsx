import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, X, Compass, Code2, Bot, Layers, ArrowRight } from 'lucide-react'
import type { StudyTask } from '../../types'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  tasks: StudyTask[]
  onSelectTask?: (task: StudyTask) => void
  onOpenFeature?: (featureName: string) => void
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  tasks,
  onSelectTask,
  onOpenFeature,
}) => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  if (!isOpen) return null

  const features = [
    { name: 'Course Roadmaps', path: '/roadmap', desc: 'Semester syllabus visual progression', icon: <Compass className="w-4 h-4 text-[#F02BC8]" /> },
    { name: 'Practice Lab', path: '/practice', desc: 'Algorithm coding playground and test runner', icon: <Code2 className="w-4 h-4 text-[#9255FF]" /> },
    { name: 'AI Mentor', path: '/mentor', desc: 'Course conceptual doubt resolution assistant', icon: <Bot className="w-4 h-4 text-[#FF6BE6]" /> },
    { name: 'Design System', path: '/design-system', desc: 'Phase 1 UI component library preview', icon: <Layers className="w-4 h-4 text-emerald-400" /> },
  ]

  const filteredTasks = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.course.toLowerCase().includes(query.toLowerCase())
  )

  const filteredFeatures = features.filter(
    (f) =>
      f.name.toLowerCase().includes(query.toLowerCase()) ||
      f.desc.toLowerCase().includes(query.toLowerCase())
  )

  const hasResults = filteredTasks.length > 0 || filteredFeatures.length > 0

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/75 backdrop-blur-sm">
      <div className="fixed inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className="relative z-10 w-full max-w-xl rounded-2xl bg-[#171536] border border-[rgba(146,85,255,0.3)] shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[rgba(146,85,255,0.15)] bg-[#090817]/60">
          <Search className="w-5 h-5 text-[#F02BC8] shrink-0 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search study tasks, courses, topics, or modules..."
            className="w-full bg-transparent text-sm text-[#F7F3FF] placeholder-[#A7A0C5]/50 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#A7A0C5] hover:text-[#F7F3FF] rounded"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#211C50] text-[#A7A0C5] border border-[rgba(146,85,255,0.2)]">
              ESC
            </span>
          )}
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {!hasResults && query && (
            <div className="py-8 text-center text-xs text-[#A7A0C5]">
              No tasks or modules found matching &ldquo;{query}&rdquo;
            </div>
          )}

          {/* Platform Modules */}
          {filteredFeatures.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A7A0C5]">
                Workspace Modules
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredFeatures.map((feat) => (
                  <button
                    key={feat.name}
                    onClick={() => {
                      if (feat.path) {
                        navigate(feat.path)
                      } else if (onOpenFeature) {
                        onOpenFeature(feat.name)
                      }
                      onClose()
                    }}
                    className="p-2.5 rounded-xl bg-[#211C50]/70 hover:bg-[#211C50] border border-[rgba(146,85,255,0.18)] hover:border-[rgba(240,43,200,0.4)] text-left flex items-start gap-2.5 transition-all group"
                  >
                    <div className="p-1.5 rounded-lg bg-[#171536] shrink-0">
                      {feat.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#F7F3FF] group-hover:text-[#FF6BE6]">
                          {feat.name}
                        </span>
                        <ArrowRight className="w-3 h-3 text-[#A7A0C5] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-[10px] text-[#A7A0C5] truncate mt-0.5">
                        {feat.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Tasks Results */}
          {filteredTasks.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A7A0C5]">
                Study Tasks ({filteredTasks.length})
              </span>
              <div className="space-y-1.5">
                {filteredTasks.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      if (onSelectTask) onSelectTask(t)
                      onClose()
                    }}
                    className="w-full p-2.5 rounded-xl bg-[#211C50]/50 hover:bg-[#211C50] border border-[rgba(146,85,255,0.12)] hover:border-[rgba(146,85,255,0.3)] text-left flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-[#F7F3FF] truncate">{t.title}</p>
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] text-[#A7A0C5]">
                        <span className="text-[#FF6BE6] font-medium">{t.course}</span>
                        <span>• Priority: {t.priority}</span>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        t.completed
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : 'bg-amber-500/15 text-amber-300'
                      }`}
                    >
                      {t.completed ? 'Completed' : 'Pending'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
