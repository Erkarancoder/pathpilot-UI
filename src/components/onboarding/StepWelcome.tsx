import React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Compass,
  Code2,
  LineChart,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { Card, CardContent } from '../ui/Card'

interface StepWelcomeProps {
  onNext: () => void
}

export const StepWelcome: React.FC<StepWelcomeProps> = ({ onNext }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#211C50] via-[#171536] to-[#090817] border border-[rgba(146,85,255,0.25)] p-6 sm:p-10 text-center space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        {/* Ambient glow orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F02BC8]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#9255FF]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
          <Badge variant="pink" size="md" dot>
            Student Onboarding &amp; Skill Diagnosis
          </Badge>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F7F3FF] tracking-tight leading-tight">
            Welcome to <span className="text-gradient-brand">PathPilot.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#A7A0C5] leading-relaxed">
            Let's set up your personalized college study plan. In the next few minutes, we will configure your semester courses, understand your target goals, and run a quick 8-question skill check to tailor your roadmap.
          </p>
        </div>

        {/* Value Highlights */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
          <Card className="border-[rgba(146,85,255,0.18)] bg-[#171536]/80">
            <CardContent className="p-4 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-[rgba(240,43,200,0.15)] flex items-center justify-center text-[#F02BC8]">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-[#F7F3FF]">
                1. Custom Syllabus Roadmap
              </h4>
              <p className="text-[11px] text-[#A7A0C5] leading-relaxed">
                Break wide course topics into manageable daily 25-minute sprints.
              </p>
            </CardContent>
          </Card>

          <Card className="border-[rgba(146,85,255,0.18)] bg-[#171536]/80">
            <CardContent className="p-4 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-[rgba(146,85,255,0.2)] flex items-center justify-center text-[#9255FF]">
                <Code2 className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-[#F7F3FF]">
                2. Test-Driven Labs
              </h4>
              <p className="text-[11px] text-[#A7A0C5] leading-relaxed">
                Validate algorithm concepts with automated unit test suites.
              </p>
            </CardContent>
          </Card>

          <Card className="border-[rgba(146,85,255,0.18)] bg-[#171536]/80">
            <CardContent className="p-4 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                <LineChart className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-[#F7F3FF]">
                3. Placement Readiness
              </h4>
              <p className="text-[11px] text-[#A7A0C5] leading-relaxed">
                Identify and fill technical gaps early before placement drives begin.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action Button */}
        <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight className="w-5 h-5" />}
            onClick={onNext}
            className="w-full sm:w-auto shadow-[0_0_25px_rgba(240,43,200,0.4)]"
          >
            Start Setup &amp; Assessment
          </Button>
        </div>

        {/* Demo Indicator */}
        <div className="relative z-10 pt-2 flex items-center justify-center gap-2 text-[11px] text-[#A7A0C5]">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Interactive Student Onboarding • All data persists in LocalStorage</span>
        </div>
      </div>
    </motion.div>
  )
}
