import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Flame,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Code2,
  Layers,
  GraduationCap,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { ProgressBar } from '../ui/ProgressBar'

const studyActivityData = [
  { day: 'Mon', hours: 3.5, target: 3.0 },
  { day: 'Tue', hours: 4.8, target: 3.0 },
  { day: 'Wed', hours: 3.2, target: 3.0 },
  { day: 'Thu', hours: 5.5, target: 3.0 },
  { day: 'Fri', hours: 4.2, target: 3.0 },
  { day: 'Sat', hours: 3.8, target: 2.5 },
  { day: 'Sun', hours: 3.0, target: 2.5 },
]

export const LandingHero: React.FC = () => {
  const navigate = useNavigate()

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background ambient lighting glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#F02BC8]/15 to-[#9255FF]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#9255FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#211C50]/25 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and Call-to-Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Top Cohort Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171536] border border-[rgba(146,85,255,0.3)] shadow-[0_0_15px_rgba(240,43,200,0.15)]">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F02BC8] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F02BC8]" />
              </span>
              <span className="text-xs font-semibold text-[#F7F3FF]">
                Spring 2026 Semester
              </span>
              <span className="text-xs text-[#A7A0C5]">|</span>
              <span className="text-xs text-[#FF6BE6] font-medium">Computer Science &amp; Engineering</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F7F3FF] leading-[1.12]">
              Your College Journey,{' '}
              <span className="text-gradient-brand">On the Right Path.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#A7A0C5] leading-relaxed max-w-2xl mx-auto lg:mx-0">
              PathPilot helps college students plan structured learning, track real semester progress, and build placement-ready technical skills — turning overwhelming syllabi into clear daily achievements.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                onClick={() => navigate('/onboarding')}
                className="w-full sm:w-auto shadow-[0_0_25px_rgba(240,43,200,0.4)]"
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

            {/* Micro Highlights */}
            <div className="pt-6 border-t border-[rgba(146,85,255,0.12)] flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#A7A0C5]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF6BE6]" />
                <span>Week-by-Week Syllabi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#9255FF]" />
                <span>Targeted Lab Practice</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Placement Skill Alignment</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Dashboard Visual Representation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            {/* Ambient Background Box Glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#F02BC8]/30 to-[#9255FF]/30 blur-xl opacity-75" />

            {/* Main Interactive Student Dashboard Preview Card */}
            <div className="relative rounded-2xl bg-[#211C50] border border-[rgba(146,85,255,0.25)] shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-5 sm:p-6 space-y-5 backdrop-blur-md">
              {/* Header: Student & Active Course Context */}
              <div className="flex items-center justify-between pb-4 border-b border-[rgba(146,85,255,0.15)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#9255FF] to-[#F02BC8] p-0.5 shadow-[0_0_12px_rgba(240,43,200,0.3)]">
                    <div className="w-full h-full rounded-[10px] bg-[#171536] flex items-center justify-center text-xs font-bold text-[#F7F3FF]">
                      <GraduationCap className="w-5 h-5 text-[#9255FF]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#F7F3FF]">
                      CS 161: Design of Algorithms
                    </h3>
                    <p className="text-xs text-[#A7A0C5]">
                      Week 6 • Graph Algorithms &amp; MSTs
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[rgba(240,43,200,0.15)] border border-[rgba(240,43,200,0.3)] text-[#FF6BE6] text-xs font-bold">
                  <Flame className="w-3.5 h-3.5 fill-[#F02BC8]" />
                  <span>14d Streak</span>
                </div>
              </div>

              {/* Course Mastery Progress Bar */}
              <div className="space-y-1.5">
                <ProgressBar
                  value={78}
                  max={100}
                  variant="gradient"
                  size="md"
                  label="Curriculum Mastery (14 / 18 Core Modules)"
                  showLabel
                />
              </div>

              {/* Study Hours Activity Chart */}
              <div className="p-4 rounded-xl bg-[#171536]/80 border border-[rgba(146,85,255,0.15)] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#F7F3FF]">Weekly Focus Hours</span>
                  <span className="text-[#FF6BE6] font-mono font-bold">28.0 hrs logged</span>
                </div>
                <div className="h-32 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={studyActivityData}
                      margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorHoursLanding" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F02BC8" stopOpacity={0.6} />
                          <stop offset="95%" stopColor="#9255FF" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="day"
                        stroke="#A7A0C5"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#A7A0C5"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#171536',
                          borderColor: 'rgba(146,85,255,0.3)',
                          borderRadius: '8px',
                          color: '#F7F3FF',
                          fontSize: '11px',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="hours"
                        stroke="#F02BC8"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorHoursLanding)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Next Assignment Priority Card */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#171536] to-[#211C50] border border-[rgba(240,43,200,0.25)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[rgba(240,43,200,0.15)] flex items-center justify-center text-[#FF6BE6]">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#F7F3FF]">
                      Problem Set 4: Dijkstra Implementation
                    </p>
                    <p className="text-[11px] text-[#A7A0C5]">
                      Due Friday, 11:59 PM • 4 test cases remaining
                    </p>
                  </div>
                </div>
                <Badge variant="warning" size="sm">
                  Priority
                </Badge>
              </div>

              {/* Floating micro badges */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#090817] border border-[rgba(240,43,200,0.4)] shadow-[0_0_15px_rgba(240,43,200,0.3)] text-xs font-bold text-[#F7F3FF]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F02BC8]" />
                <span>Active 25m Sprint</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#090817] border border-[rgba(146,85,255,0.4)] shadow-[0_0_15px_rgba(146,85,255,0.3)] text-xs font-bold text-[#F7F3FF]"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#9255FF]" />
                <span>Syllabus Synced</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
