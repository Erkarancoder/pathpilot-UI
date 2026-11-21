import React from 'react'
import { Target, Compass, Code2, TrendingUp, CheckCircle2 } from 'lucide-react'
import { Card, CardContent } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { SectionHeader } from '../ui/SectionHeader'

const steps = [
  {
    step: '01',
    title: 'Understand Your Learning Goals',
    description:
      'Configure your enrolled courses, syllabus outlines, and target benchmarks. PathPilot maps out the prerequisite dependencies and timeline for your entire semester.',
    icon: <Target className="w-6 h-6 text-[#F02BC8]" />,
    tag: 'Step 1: Goal Setting',
    bullets: [
      'Select active semester modules',
      'Assess baseline prerequisite skills',
      'Set weekly focus hour targets',
    ],
  },
  {
    step: '02',
    title: 'Get a Personalized Learning Plan',
    description:
      'Receive a chronological weekly roadmap. Dense lecture modules are segmented into bite-sized 25-minute sprints combining reading notes with coding labs.',
    icon: <Compass className="w-6 h-6 text-[#9255FF]" />,
    tag: 'Step 2: Roadmap Creation',
    bullets: [
      'Curated week-by-week topic syllabus',
      'Lecture slides aligned with assignments',
      'Balanced daily sprint schedules',
    ],
  },
  {
    step: '03',
    title: 'Practice & Track Progress',
    description:
      'Tackle test-driven coding challenges and conceptual problem sets. Automated test cases provide immediate validation as your topic mastery climbs.',
    icon: <Code2 className="w-6 h-6 text-[#FF6BE6]" />,
    tag: 'Step 3: Active Practice',
    bullets: [
      'Runnable browser-based code tests',
      'Clear pass/fail diagnostic feedback',
      'Daily 14-day study streak tracking',
    ],
  },
  {
    step: '04',
    title: 'Improve Consistently',
    description:
      'Diagnose weak spots before midterms and finals arrive. Review targeted refresher problems and build practical confidence for technical placements.',
    icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
    tag: 'Step 4: Mastery & Retention',
    bullets: [
      'Pre-exam confidence scorecards',
      'Targeted reviews on weak proofs',
      'Industry placement skill verification',
    ],
  },
]

export const LandingHowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 relative bg-[#080611]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          title="How It Works"
          subtitle="A structured 4-step framework that turns overwhelming college syllabi into predictable academic success."
          badge={<Badge variant="pink" size="sm">Structured Workflow</Badge>}
          gradientTitle
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <Card
              key={idx}
              className="border-[rgba(146,85,255,0.2)] bg-[#171536]/90 flex flex-col justify-between hover:border-[rgba(240,43,200,0.4)] transition-all duration-300 group"
            >
              <CardContent className="p-6 space-y-5">
                {/* Step Top Bar */}
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-extrabold font-mono text-gradient-brand">
                    {item.step}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-[#211C50] border border-[rgba(146,85,255,0.25)] flex items-center justify-center group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(240,43,200,0.2)]">
                    {item.icon}
                  </div>
                </div>

                <div className="space-y-2">
                  <Badge variant="neutral" size="sm" className="mb-1 text-[10px]">
                    {item.tag}
                  </Badge>
                  <h3 className="text-base font-bold text-[#F7F3FF]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#A7A0C5] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bullets */}
                <div className="pt-3 border-t border-[rgba(146,85,255,0.12)] space-y-2">
                  {item.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2 text-xs text-[#F7F3FF]/85">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6BE6] shrink-0" />
                      <span>{bullet}</span>
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
