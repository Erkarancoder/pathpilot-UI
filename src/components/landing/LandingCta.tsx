import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Layers, CheckCircle2 } from 'lucide-react'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'

export const LandingCta: React.FC = () => {
  const navigate = useNavigate()

  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#211C50] via-[#171536] to-[#090817] border border-[rgba(240,43,200,0.35)] p-8 sm:p-12 lg:p-16 text-center space-y-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Subtle Ambient Glow Orbs */}
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#F02BC8]/25 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[#9255FF]/25 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex">
              <Badge variant="pink" size="md" dot>
                Spring 2026 Academic Season
              </Badge>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F7F3FF] tracking-tight leading-tight">
              Ready to Take Control of Your College Journey?
            </h2>
            <p className="text-sm sm:text-base text-[#A7A0C5] leading-relaxed">
              Step into an organized academic workflow. Track your course roadmaps, pass lab test suites with confidence, and build placement-ready engineering skills.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              onClick={() => navigate('/onboarding')}
              className="w-full sm:w-auto shadow-[0_0_30px_rgba(240,43,200,0.45)]"
            >
              Get Started
            </Button>
            <Button
              variant="secondary"
              size="lg"
              leftIcon={<Layers className="w-4 h-4 text-[#9255FF]" />}
              onClick={() => navigate('/design-system')}
              className="w-full sm:w-auto"
            >
              Explore Workspace
            </Button>
          </div>

          <div className="relative z-10 pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#A7A0C5]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#FF6BE6]" />
              <span>Free Academic Setup</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#9255FF]" />
              <span>Tailored for College Curricula</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Built by Students, for Students</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
