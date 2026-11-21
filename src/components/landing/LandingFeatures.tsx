import React from 'react'
import {
  Compass,
  Code2,
  Bot,
  LineChart,
  CalendarCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { SectionHeader } from '../ui/SectionHeader'

const features = [
  {
    icon: <Compass className="w-6 h-6 text-[#F02BC8]" />,
    title: 'Personalized Learning Roadmaps',
    description:
      'Deconstruct complex semester syllabi into weekly visual milestones. See prerequisite topic dependencies and clear weekly checkpoints for every course.',
    badge: 'Curriculum Core',
    highlights: [
      'Visual topic prerequisite graphs',
      'Step-by-step weekly lecture milestones',
      'Adaptive pacing when deadlines shift',
    ],
    accent: 'accent-pink' as const,
  },
  {
    icon: <Code2 className="w-6 h-6 text-[#9255FF]" />,
    title: 'Interactive Practice Lab',
    description:
      'Write and test code directly in your browser. Validate algorithm implementations against automated unit test suites calibrated to your current week of lectures.',
    badge: 'Hands-on Labs',
    highlights: [
      'Instant test suite validation',
      'Time & space complexity feedback',
      'Direct alignment with university assignments',
    ],
    accent: 'accent-violet' as const,
  },
  {
    icon: <Bot className="w-6 h-6 text-[#FF6BE6]" />,
    title: 'AI Study Mentor',
    description:
      'A contextual learning assistant grounded in your course materials. Break down dense mathematical proofs and debug code without receiving superficial or spoiler answers.',
    badge: '24/7 Guidance',
    highlights: [
      'Grounded in your course syllabus',
      'Socratic hints that encourage real learning',
      'Code line-by-line debugging assistance',
    ],
    accent: 'default' as const,
  },
  {
    icon: <LineChart className="w-6 h-6 text-emerald-400" />,
    title: 'Progress & Performance Analytics',
    description:
      'Track concrete academic velocity instead of meaningless timer counters. Monitor passed test suites, topic retention rates, and pre-exam readiness.',
    badge: 'Measurable Growth',
    highlights: [
      'Exam readiness scorecards',
      'Course-by-course mastery percentages',
      'Weekly focus hours vs target goals',
    ],
    accent: 'default' as const,
  },
  {
    icon: <CalendarCheck className="w-6 h-6 text-amber-400" />,
    title: 'Study Planning & Streak Tracking',
    description:
      'Build long-term retention with 25-minute daily micro-sprints. Stay accountable through consistency streaks that eliminate the stress of 3:00 AM cramming.',
    badge: 'Anti-Burnout',
    highlights: [
      'Bite-sized 25-minute sprint goals',
      'Unbroken study streak counters',
      'Exam countdown & reminder alerts',
    ],
    accent: 'default' as const,
  },
]

export const LandingFeatures: React.FC = () => {
  return (
    <section id="features" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          title="Engineered for Academic Mastery"
          subtitle="Everything you need to organize your college semester, master complex coursework, and build practical technical competence."
          badge={<Badge variant="violet" size="sm" icon={<Sparkles className="w-3 h-3" />}>Core Features</Badge>}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              variant={feature.accent}
              className={`flex flex-col justify-between hover:border-[rgba(240,43,200,0.35)] transition-all duration-300 group ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between pb-3">
                  <div className="w-12 h-12 rounded-xl bg-[#171536] border border-[rgba(146,85,255,0.25)] flex items-center justify-center group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(146,85,255,0.15)]">
                    {feature.icon}
                  </div>
                  <Badge variant="neutral" size="sm">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="group-hover:text-[#FF6BE6] transition-colors">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm pt-1">
                  {feature.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-2">
                <div className="p-3.5 rounded-xl bg-[#171536]/80 border border-[rgba(146,85,255,0.12)] space-y-2">
                  {feature.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs text-[#A7A0C5]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F02BC8] shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
