import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Compass,
  Code2,
  Bot,
  LineChart,
  Settings,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Calendar,
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'

interface ModuleInfo {
  title: string
  subtitle: string
  phase: string
  icon: React.ReactNode
  description: string
  upcomingDeliverables: string[]
}

const MODULE_DATA: Record<string, ModuleInfo> = {
  '/roadmap': {
    title: 'Course Roadmaps',
    subtitle: 'Dynamic prerequisite graphs & syllabus milestones',
    phase: 'Phase 5 Module',
    icon: <Compass className="w-8 h-8 text-[#F02BC8]" />,
    description:
      'PathPilot Course Roadmaps transform static college syllabi into interactive, personalized prerequisite dependency graphs. You will be able to visualize course paths, track weekly topic mastery, and preview exam readiness.',
    upcomingDeliverables: [
      'Visual interactive node graph of topics and prerequisites',
      'Direct synchronization with university semester calendar',
      'Milestone pacing alerts based on personal study velocity',
      'Dynamic curriculum branching for Computer Science electives',
    ],
  },
  '/practice': {
    title: 'Coding Practice Lab',
    subtitle: 'Targeted algorithm & data structure test runner',
    phase: 'Phase 5 Module',
    icon: <Code2 className="w-8 h-8 text-[#9255FF]" />,
    description:
      'The Practice Lab is designed specifically for college coursework and technical placement prep. Run test suites locally, benchmark time and space complexity, and solve LeetCode-aligned pattern checklists.',
    upcomingDeliverables: [
      'Interactive TypeScript/Python code runner with test verification',
      'Pattern checklists (Sliding Window, Two Pointers, Graph BFS/DFS)',
      'College lab assignment starter repos & rubric test suites',
      'Complexity visualizer for recursion and stack traces',
    ],
  },
  '/mentor': {
    title: 'AI Study Assistant',
    subtitle: 'Socratic academic doubt solver grounded in your syllabus',
    phase: 'Phase 5 Module',
    icon: <Bot className="w-8 h-8 text-[#FF6BE6]" />,
    description:
      'An intelligent study mentor that does not just give direct code solutions, but leads you through Socratic guidance, textbook citations, and proof explanations matching your registered college curriculum.',
    upcomingDeliverables: [
      'Socratic dialogue mode to prevent blind copy-pasting',
      'Direct referencing of lecture notes and professor slides',
      'Proof and mathematical deduction step verifier',
      'Doubt session history tied to specific course syllabus topics',
    ],
  },
  '/analytics': {
    title: 'Weekly Analytics Deep Dive',
    subtitle: 'Detailed academic pacing and study habit metrics',
    phase: 'Phase 4 Preview',
    icon: <LineChart className="w-8 h-8 text-emerald-400" />,
    description:
      'Gain visibility into your real study consistency, sprint focus times, and assignment completion velocity compared to university cohort averages.',
    upcomingDeliverables: [
      'Sprint duration breakdown by course code',
      'Study streak resilience and recovery forecasts',
      'Assignment turnaround velocity trends',
      'Exportable academic progress report for advisor check-ins',
    ],
  },
  '/settings': {
    title: 'Student Settings',
    subtitle: 'Preferences, notification rules & curriculum configs',
    phase: 'Core System',
    icon: <Settings className="w-8 h-8 text-[#A7A0C5]" />,
    description:
      'Manage your college affiliation, active semester registration, privacy options, and local workspace synchronization.',
    upcomingDeliverables: [
      'Notification triggers for exam and assignment due dates',
      'Study Sprint default duration (Pomodoro length options)',
      'Local data backup and JSON curriculum export',
      'Theme accents and accessibility font sizing',
    ],
  },
}

export const ModuleComingSoon: React.FC = () => {
  const location = useLocation()
  const current = MODULE_DATA[location.pathname] || MODULE_DATA['/roadmap']

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4 animate-in fade-in duration-300">
      {/* Top navigation back */}
      <div className="flex items-center justify-between">
        <Link to="/dashboard">
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Dashboard
          </Button>
        </Link>
        <Badge variant="pink" size="sm" dot>
          {current.phase}
        </Badge>
      </div>

      {/* Main card */}
      <Card variant="accent-pink" className="overflow-hidden">
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#171536] border border-[rgba(146,85,255,0.3)] flex items-center justify-center shadow-[0_0_20px_rgba(240,43,200,0.25)] shrink-0">
              {current.icon}
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F7F3FF] tracking-tight">
                {current.title}
              </h1>
              <p className="text-sm text-[#FF6BE6] font-medium">
                {current.subtitle}
              </p>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#A7A0C5] leading-relaxed">
            {current.description}
          </p>

          {/* Upcoming features list */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F7F3FF] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#F02BC8]" />
              Scheduled Feature Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {current.upcomingDeliverables.map((item) => (
                <div
                  key={item}
                  className="p-3.5 rounded-xl bg-[#171536] border border-[rgba(146,85,255,0.18)] flex items-start gap-2.5 text-xs text-[#F7F3FF]"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[rgba(146,85,255,0.14)] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-[#A7A0C5]">
              <Calendar className="w-4 h-4 text-[#9255FF]" />
              <span>Full interaction unlocked in next hackathon iteration</span>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/dashboard">
                <Button variant="primary" size="sm">
                  Return to Active Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
