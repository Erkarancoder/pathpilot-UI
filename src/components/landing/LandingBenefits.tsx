import React from 'react'
import { FolderCheck, Target, LineChart, Flame } from 'lucide-react'
import { Card, CardContent } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { SectionHeader } from '../ui/SectionHeader'

const benefits = [
  {
    icon: <FolderCheck className="w-6 h-6 text-[#F02BC8]" />,
    title: 'Better Study Organization',
    badge: 'Organization',
    description:
      'Eliminate the chaos of scattered course portals, endless browser tabs, and random PDF slides. All lecture notes, problem sets, and reading materials are centralized in one structured workspace.',
    takeaway: 'Zero time wasted looking for course materials',
  },
  {
    icon: <Target className="w-6 h-6 text-[#9255FF]" />,
    title: 'Clear Learning Goals',
    badge: 'Direction',
    description:
      'Never wonder what to study next. Every single day presents a focused, prioritized 25-minute sprint mapped directly to your university syllabus and upcoming midterms.',
    takeaway: 'Actionable daily roadmap for every course',
  },
  {
    icon: <LineChart className="w-6 h-6 text-[#FF6BE6]" />,
    title: 'Trackable, Verified Progress',
    badge: 'Accountability',
    description:
      'See concrete mastery percentages as you pass automated code test suites. Know exactly how prepared you are for upcoming exams with diagnostic skill gap scorecards.',
    takeaway: 'Measurable topic coverage with zero guesswork',
  },
  {
    icon: <Flame className="w-6 h-6 text-emerald-400" />,
    title: 'Consistent Study Habits',
    badge: 'Anti-Burnout',
    description:
      'Ditch 3:00 AM emergency cramming sessions. Short, high-focus daily study sprints keep your momentum high, your memory fresh, and your weekends free from stress.',
    takeaway: 'Steady 14+ day study streaks that actually stick',
  },
]

export const LandingBenefits: React.FC = () => {
  return (
    <section id="benefits" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          title="Why College Students Choose PathPilot"
          subtitle="Designed to give students structure, clarity, and genuine technical growth throughout their academic journey."
          badge={<Badge variant="pink" size="sm">Core Benefits</Badge>}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, idx) => (
            <Card
              key={idx}
              className="border-[rgba(146,85,255,0.2)] bg-[#171536]/80 flex flex-col justify-between hover:border-[rgba(240,43,200,0.35)] transition-all duration-300"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#211C50] border border-[rgba(146,85,255,0.25)] flex items-center justify-center shadow-[0_0_15px_rgba(240,43,200,0.15)]">
                    {benefit.icon}
                  </div>
                  <Badge variant="neutral" size="sm">
                    {benefit.badge}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold text-[#F7F3FF]">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A7A0C5] leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[rgba(146,85,255,0.12)]">
                  <p className="text-xs font-semibold text-[#FF6BE6]">
                    ✓ {benefit.takeaway}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
