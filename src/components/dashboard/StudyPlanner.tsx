import React, { useState } from 'react'
import {
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Edit2,
  Calendar,
  Clock,
  Filter,
  Check,
  X,
  BookOpen,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { ProgressBar } from '../ui/ProgressBar'
import type { StudyTask, TaskPriority } from '../../types'

interface StudyPlannerProps {
  tasks: StudyTask[]
  onToggleTask: (id: string) => void
  onAddTask: (task: Omit<StudyTask, 'id' | 'createdAt'>) => void
  onUpdateTask: (id: string, updates: Partial<StudyTask>) => void
  onDeleteTask: (id: string) => void
}

export const StudyPlanner: React.FC<StudyPlannerProps> = ({
  tasks,
  onToggleTask,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [isAdding, setIsAdding] = useState(false)
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)

  // Form states for Add Task
  const [newTitle, setNewTitle] = useState('')
  const [newCourse, setNewCourse] = useState('CS 201')
  const [newPriority, setNewPriority] = useState<TaskPriority>('Medium')
  const [newDueDate, setNewDueDate] = useState('Today, 7:00 PM')
  const [newEstimatedMinutes, setNewEstimatedMinutes] = useState(45)

  // Form states for Edit Task
  const [editTitle, setEditTitle] = useState('')
  const [editCourse, setEditCourse] = useState('')
  const [editPriority, setEditPriority] = useState<TaskPriority>('Medium')

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((t) => t.completed).length
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const handleStartEdit = (task: StudyTask) => {
    setEditingTaskId(task.id)
    setEditTitle(task.title)
    setEditCourse(task.course)
    setEditPriority(task.priority)
  }

  const handleSaveEdit = (id: string) => {
    if (!editTitle.trim()) return
    onUpdateTask(id, {
      title: editTitle.trim(),
      course: editCourse.trim() || 'General CS',
      priority: editPriority,
    })
    setEditingTaskId(null)
  }

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    onAddTask({
      title: newTitle.trim(),
      course: newCourse.trim() || 'General Study',
      priority: newPriority,
      completed: false,
      dueDate: newDueDate || 'Today',
      estimatedMinutes: Number(newEstimatedMinutes) || 30,
    })

    setNewTitle('')
    setIsAdding(false)
  }

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case 'High':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
            High Priority
          </span>
        )
      case 'Medium':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            Medium
          </span>
        )
      case 'Low':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            Low
          </span>
        )
    }
  }

  return (
    <Card variant="default" className="flex flex-col h-full">
      <CardHeader className="pb-3 border-b border-[rgba(146,85,255,0.12)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#F02BC8] to-[#9255FF] flex items-center justify-center text-white shadow-[0_0_12px_rgba(240,43,200,0.3)]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                Today&apos;s Study Plan
                <Badge variant="pink" size="sm">
                  {completedTasks}/{totalTasks} Done
                </Badge>
              </CardTitle>
              <CardDescription>
                Personalized task queue synchronized with your semester milestones
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isAdding && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsAdding(true)}
                leftIcon={<Plus className="w-3.5 h-3.5" />}
              >
                Add Task
              </Button>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="pt-3">
          <ProgressBar
            value={progressPercent}
            variant="gradient"
            size="sm"
            label="Daily Completion Rate"
            showLabel
          />
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#171536] border border-[rgba(146,85,255,0.15)] text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-lg transition-all font-medium ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-[#F02BC8] to-[#9255FF] text-white shadow-[0_0_8px_rgba(240,43,200,0.3)]'
                  : 'text-[#A7A0C5] hover:text-[#F7F3FF]'
              }`}
            >
              All ({totalTasks})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-2.5 py-1 rounded-lg transition-all font-medium ${
                filter === 'active'
                  ? 'bg-gradient-to-r from-[#F02BC8] to-[#9255FF] text-white shadow-[0_0_8px_rgba(240,43,200,0.3)]'
                  : 'text-[#A7A0C5] hover:text-[#F7F3FF]'
              }`}
            >
              Active ({totalTasks - completedTasks})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-2.5 py-1 rounded-lg transition-all font-medium ${
                filter === 'completed'
                  ? 'bg-gradient-to-r from-[#F02BC8] to-[#9255FF] text-white shadow-[0_0_8px_rgba(240,43,200,0.3)]'
                  : 'text-[#A7A0C5] hover:text-[#F7F3FF]'
              }`}
            >
              Done ({completedTasks})
            </button>
          </div>

          <span className="text-[11px] text-[#A7A0C5] hidden sm:inline-flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Sorted by priority
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        {/* Add Task Inline Form */}
        {isAdding && (
          <form
            onSubmit={handleCreateTask}
            className="p-4 rounded-xl bg-[#171536] border border-[rgba(240,43,200,0.35)] shadow-[0_4px_20px_rgba(0,0,0,0.3)] space-y-3 mb-2 animate-in fade-in duration-200"
          >
            <div className="flex items-center justify-between pb-1 border-b border-[rgba(146,85,255,0.12)]">
              <span className="text-xs font-bold text-[#F7F3FF] flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5 text-[#F02BC8]" />
                New Study Task
              </span>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="text-[#A7A0C5] hover:text-[#F7F3FF] p-1 rounded"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <input
                type="text"
                autoFocus
                placeholder="e.g. Implement Dijkstra's Algorithm in C++"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#211C50] border border-[rgba(146,85,255,0.25)] text-xs text-[#F7F3FF] placeholder-[#A7A0C5]/50 focus:outline-none focus:border-[#F02BC8]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] text-[#A7A0C5] uppercase block mb-1">Course Code</label>
                <input
                  type="text"
                  placeholder="e.g. CS 201"
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#211C50] border border-[rgba(146,85,255,0.2)] text-xs text-[#F7F3FF]"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#A7A0C5] uppercase block mb-1">Priority</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as TaskPriority)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#211C50] border border-[rgba(146,85,255,0.2)] text-xs text-[#F7F3FF] focus:outline-none"
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-[#A7A0C5] uppercase block mb-1">Duration (Min)</label>
                <input
                  type="number"
                  min="5"
                  max="240"
                  value={newEstimatedMinutes}
                  onChange={(e) => setNewEstimatedMinutes(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#211C50] border border-[rgba(146,85,255,0.2)] text-xs text-[#F7F3FF]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <input
                type="text"
                placeholder="Due date (e.g. Today, 7:00 PM)"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                className="w-48 px-2 py-1 rounded bg-[#211C50] text-[11px] text-[#F7F3FF] border border-[rgba(146,85,255,0.2)]"
              />
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAdding(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Save Task
                </Button>
              </div>
            </div>
          </form>
        )}

        {/* Task List */}
        <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-10 px-4 rounded-xl bg-[#171536]/40 border border-dashed border-[rgba(146,85,255,0.2)]">
              <div className="w-12 h-12 mx-auto rounded-full bg-[rgba(146,85,255,0.12)] text-[#9255FF] flex items-center justify-center mb-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <h5 className="text-sm font-bold text-[#F7F3FF]">All caught up for today!</h5>
              <p className="text-xs text-[#A7A0C5] max-w-xs mx-auto mt-1">
                {filter === 'completed'
                  ? 'No tasks completed yet. Mark a task done from the active list.'
                  : 'No active tasks in your queue. Start a Study Sprint or add a syllabus milestone above.'}
              </p>
              {filter !== 'all' && (
                <button
                  onClick={() => setFilter('all')}
                  className="mt-3 text-xs text-[#FF6BE6] hover:underline"
                >
                  View all tasks
                </button>
              )}
            </div>
          ) : (
            filteredTasks.map((task) => {
              const isEditing = editingTaskId === task.id

              if (isEditing) {
                return (
                  <div
                    key={task.id}
                    className="p-3 rounded-xl bg-[#171536] border border-[#9255FF] space-y-2.5"
                  >
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#211C50] text-xs text-[#F7F3FF] border border-[rgba(146,85,255,0.3)] focus:outline-none"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Course"
                        value={editCourse}
                        onChange={(e) => setEditCourse(e.target.value)}
                        className="w-24 px-2 py-1 rounded bg-[#211C50] text-xs text-[#F7F3FF] border border-[rgba(146,85,255,0.2)]"
                      />
                      <select
                        value={editPriority}
                        onChange={(e) => setEditPriority(e.target.value as TaskPriority)}
                        className="px-2 py-1 rounded bg-[#211C50] text-xs text-[#F7F3FF] border border-[rgba(146,85,255,0.2)]"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                      <div className="ml-auto flex items-center gap-1.5">
                        <button
                          onClick={() => handleSaveEdit(task.id)}
                          className="p-1 text-emerald-400 hover:bg-emerald-400/20 rounded"
                          title="Save changes"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingTaskId(null)}
                          className="p-1 text-[#A7A0C5] hover:bg-[#211C50] rounded"
                          title="Cancel"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <div
                  key={task.id}
                  className={`group relative p-3.5 rounded-xl border transition-all duration-200 flex items-start gap-3 ${
                    task.completed
                      ? 'bg-[#171536]/40 border-[rgba(146,85,255,0.1)] opacity-75'
                      : 'bg-[#171536] border-[rgba(146,85,255,0.2)] hover:border-[rgba(240,43,200,0.4)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.3)]'
                  }`}
                >
                  {/* Custom Checkbox */}
                  <button
                    onClick={() => onToggleTask(task.id)}
                    className="mt-0.5 text-left text-[#A7A0C5] hover:text-[#F02BC8] transition-colors focus:outline-none"
                    aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                    ) : (
                      <Circle className="w-5 h-5 text-[#A7A0C5] group-hover:text-[#F02BC8]" />
                    )}
                  </button>

                  {/* Task Details */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={`text-xs sm:text-sm font-semibold leading-snug break-words ${
                          task.completed
                            ? 'line-through text-[#A7A0C5]/60'
                            : 'text-[#F7F3FF]'
                        }`}
                      >
                        {task.title}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#A7A0C5]">
                      <span className="px-2 py-0.5 rounded-md bg-[#211C50] border border-[rgba(146,85,255,0.2)] text-[#F7F3FF] font-medium">
                        {task.course}
                      </span>
                      {getPriorityBadge(task.priority)}

                      {task.dueDate && (
                        <span className="flex items-center gap-1 text-[#A7A0C5]/80">
                          <Calendar className="w-3 h-3" />
                          {task.dueDate}
                        </span>
                      )}

                      {task.estimatedMinutes && (
                        <span className="flex items-center gap-1 text-[#A7A0C5]/80">
                          <Clock className="w-3 h-3" />
                          ~{task.estimatedMinutes}m
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions on hover */}
                  <div className="flex items-center gap-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleStartEdit(task)}
                      className="p-1.5 text-[#A7A0C5] hover:text-[#F7F3FF] hover:bg-[#211C50] rounded-lg transition-colors"
                      title="Edit task"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteTask(task.id)}
                      className="p-1.5 text-[#A7A0C5] hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                      title="Delete task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
