import React, { useState } from 'react'
import {
  Sparkles,
  ArrowRight,
  Download,
  Copy,
  Check,
  Search,
  Mail,
  ShieldCheck,
  AlertTriangle,
  Flame,
  Clock,
  Layers,
  Palette,
  Type,
  MousePointerClick,
  Sliders,
  CheckCircle2,
  Lock,
  Compass,
  GraduationCap,
  TrendingUp,
  Award,
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Input } from '../components/ui/Input'
import { ProgressBar } from '../components/ui/ProgressBar'
import { SectionHeader } from '../components/ui/SectionHeader'
import { colorTokens } from '../data/demoData'

export const DesignSystemPreview: React.FC = () => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null)
  const [demoProgress, setDemoProgress] = useState(72)
  const [interactiveInput, setInteractiveInput] = useState('Dynamic Programming & Graph Theory')
  const [buttonLoading, setButtonLoading] = useState(false)

  const copyToClipboard = (text: string, token: string) => {
    navigator.clipboard.writeText(text)
    setCopiedToken(token)
    setTimeout(() => setCopiedToken(null), 2000)
  }

  return (
    <div className="space-y-14 pb-20">
      {/* Hero Showcase Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#171536] via-[#211C50] to-[#090817] border border-[rgba(146,85,255,0.25)] p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        {/* Glow orb accents */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#F02BC8]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-[#9255FF]/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant="pink" size="md" dot>
              Phase 1 Live
            </Badge>
            <Badge variant="violet" size="md">
              Tailwind CSS v4 + TypeScript
            </Badge>
            <Badge variant="success" size="md">
              WCAG AA Contrast Verified
            </Badge>
            <Badge variant="neutral" size="md">
              Framer Motion 14
            </Badge>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F7F3FF]">
              Path<span className="text-[#F02BC8]">Pilot</span> Design System
            </h1>
            <p className="text-base sm:text-lg text-[#A7A0C5] leading-relaxed max-w-2xl">
              A high-contrast dark interface crafted to help college students manage coursework, map weekly milestones, and stay ahead of deadlines without burning out.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="p-3.5 rounded-xl bg-[#090817]/60 border border-[rgba(146,85,255,0.18)] backdrop-blur">
              <p className="text-xs text-[#A7A0C5]">Base Primitives</p>
              <p className="text-xl sm:text-2xl font-bold text-[#F7F3FF]">6 Components</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#090817]/60 border border-[rgba(146,85,255,0.18)] backdrop-blur">
              <p className="text-xs text-[#A7A0C5]">Design Tokens</p>
              <p className="text-xl sm:text-2xl font-bold text-[#FF6BE6]">8 Colors</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#090817]/60 border border-[rgba(146,85,255,0.18)] backdrop-blur">
              <p className="text-xs text-[#A7A0C5]">Type Safety</p>
              <p className="text-xl sm:text-2xl font-bold text-[#9255FF]">Strict TS</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#090817]/60 border border-[rgba(146,85,255,0.18)] backdrop-blur">
              <p className="text-xs text-[#A7A0C5]">Breakpoints</p>
              <p className="text-xl sm:text-2xl font-bold text-emerald-400">Mobile + Desktop</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: COLOR PALETTE */}
      <section className="space-y-6">
        <SectionHeader
          title="Color Palette Tokens"
          subtitle="Precision color system built with deep violet canvas layers, accented by high-visibility neon pink for priority deadlines and soft violet for secondary controls."
          badge={<Badge variant="pink" size="sm" icon={<Palette className="w-3 h-3" />}>Palette</Badge>}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {colorTokens.map((token) => (
            <Card
              key={token.token}
              variant="interactive"
              className="group border-[rgba(146,85,255,0.18)] hover:border-[rgba(240,43,200,0.4)]"
            >
              <CardContent className="p-5 space-y-4">
                {/* Visual Swatch */}
                <div
                  className="w-full h-24 rounded-xl border border-[rgba(255,255,255,0.12)] relative flex items-end p-3 shadow-inner"
                  style={{ backgroundColor: token.hex }}
                >
                  <span
                    className="text-xs font-mono font-bold px-2 py-0.5 rounded shadow-sm backdrop-blur"
                    style={{
                      backgroundColor: token.hex === '#F7F3FF' || token.hex === '#F02BC8' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.15)',
                      color: '#FFFFFF',
                    }}
                  >
                    {token.hex}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#F7F3FF] group-hover:text-[#FF6BE6] transition-colors">
                      {token.name}
                    </h4>
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#171536] text-[#A7A0C5]">
                      {token.role}
                    </span>
                  </div>
                  <p className="text-xs text-[#A7A0C5] leading-relaxed line-clamp-2">
                    {token.description}
                  </p>
                </div>

                {/* Token string & copy action */}
                <div className="pt-2 flex items-center justify-between border-t border-[rgba(146,85,255,0.1)]">
                  <code className="text-[11px] text-[#A7A0C5] font-mono">
                    {token.token}
                  </code>
                  <button
                    onClick={() => copyToClipboard(token.hex, token.token)}
                    className="flex items-center gap-1 text-xs text-[#A7A0C5] hover:text-[#F02BC8] transition-colors cursor-pointer"
                    title="Copy hex code"
                  >
                    {copiedToken === token.token ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[11px] text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* SECTION 2: TYPOGRAPHY HIERARCHY */}
      <section className="space-y-6">
        <SectionHeader
          title="Typography Scale & Hierarchy"
          subtitle="Clean, legible typographic rhythm tested for dense lecture notes, course codes, and terminal output."
          badge={<Badge variant="violet" size="sm" icon={<Type className="w-3 h-3" />}>Type</Badge>}
        />

        <Card className="border-[rgba(146,85,255,0.18)]">
          <CardContent className="p-6 divide-y divide-[rgba(146,85,255,0.12)]">
            {/* Display */}
            <div className="py-4 first:pt-0 space-y-2">
              <div className="flex items-center justify-between text-xs text-[#A7A0C5]">
                <span className="font-mono font-semibold">Display • 36px - 44px • Bold</span>
                <span>Hero Headlines</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient-brand">
                Break syllabus chaos into focused daily study sprints.
              </h1>
            </div>

            {/* Heading 1 */}
            <div className="py-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-[#A7A0C5]">
                <span className="font-mono font-semibold">Heading 1 • 28px - 32px • Bold</span>
                <span>Course &amp; Module Titles</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F7F3FF]">
                CS 161: Design and Analysis of Algorithms
              </h2>
            </div>

            {/* Heading 2 */}
            <div className="py-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-[#A7A0C5]">
                <span className="font-mono font-semibold">Heading 2 • 20px - 24px • Semibold</span>
                <span>Weekly Lecture Milestones</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F7F3FF]">
                Week 6: Greedy Algorithms &amp; Minimum Spanning Trees
              </h3>
            </div>

            {/* Heading 3 */}
            <div className="py-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-[#A7A0C5]">
                <span className="font-mono font-semibold">Heading 3 • 16px - 18px • Semibold</span>
                <span>Assignment &amp; Task Headers</span>
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-[#F7F3FF]">
                Problem Set 4: Dijkstra Implementation &amp; Proofs
              </h4>
            </div>

            {/* Body Large / Regular */}
            <div className="py-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-[#A7A0C5]">
                <span className="font-mono font-semibold">Body Regular • 14px - 15px • Normal</span>
                <span>Color: #F7F3FF</span>
              </div>
              <p className="text-sm sm:text-base text-[#F7F3FF] leading-relaxed max-w-3xl">
                This week focuses on priority queue optimizations for single-source shortest paths. Complete the dry-run on the sample test graph before running the benchmark suite against larger adjacency lists.
              </p>
            </div>

            {/* Secondary / Caption */}
            <div className="py-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-[#A7A0C5]">
                <span className="font-mono font-semibold">Secondary Text • 12px - 13px • Medium</span>
                <span>Color: #A7A0C5</span>
              </div>
              <p className="text-xs sm:text-sm text-[#A7A0C5] leading-relaxed max-w-3xl">
                Synced with course portal at 08:15 AM • TA Office Hours today at 4:00 PM in Gates 260.
              </p>
            </div>

            {/* Code / Mono */}
            <div className="py-4 last:pb-0 space-y-2">
              <div className="flex items-center justify-between text-xs text-[#A7A0C5]">
                <span className="font-mono font-semibold">Code / Monospace • 12px - 13px</span>
                <span>JetBrains Mono / monospace</span>
              </div>
              <div className="p-3 rounded-xl bg-[#171536] border border-[rgba(146,85,255,0.2)] font-mono text-xs text-[#FF75EA]">
                <code>pytest test_dijkstra.py -v --benchmark</code>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* SECTION 3: BUTTONS & INTERACTIVE STATES */}
      <section className="space-y-6">
        <SectionHeader
          title="Buttons & Interactive Controls"
          subtitle="Tactile buttons with neon pink gradients, violet borders, subtle elevation lift on hover, and responsive loading indicators."
          badge={<Badge variant="pink" size="sm" icon={<MousePointerClick className="w-3 h-3" />}>Buttons</Badge>}
          action={
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setButtonLoading((prev) => !prev)}
            >
              Toggle Loading ({buttonLoading ? 'Active' : 'Off'})
            </Button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Primary & Secondary */}
          <Card className="border-[rgba(146,85,255,0.18)]">
            <CardHeader>
              <CardTitle>Core Action Styles</CardTitle>
              <CardDescription>
                Primary neon pink gradient for main study actions, secondary violet for navigation and panels.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="md" isLoading={buttonLoading} leftIcon={<Sparkles className="w-4 h-4" />}>
                  Start 25m Sprint
                </Button>
                <Button variant="secondary" size="md" isLoading={buttonLoading} leftIcon={<Layers className="w-4 h-4" />}>
                  Course Outline
                </Button>
                <Button variant="outline" size="md" isLoading={buttonLoading}>
                  View Syllabus
                </Button>
                <Button variant="ghost" size="md" isLoading={buttonLoading}>
                  Skip Topic
                </Button>
                <Button variant="danger" size="md" isLoading={buttonLoading}>
                  Drop Course
                </Button>
              </div>

              {/* Sizes scale */}
              <div className="pt-4 border-t border-[rgba(146,85,255,0.12)] space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#A7A0C5]">
                  Size Scale (sm, md, lg, icon)
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary" size="sm" leftIcon={<Flame className="w-3.5 h-3.5" />}>
                    Small (32px)
                  </Button>
                  <Button variant="primary" size="md" leftIcon={<Flame className="w-4 h-4" />}>
                    Medium (42px)
                  </Button>
                  <Button variant="primary" size="lg" leftIcon={<Flame className="w-5 h-5" />}>
                    Large (50px)
                  </Button>
                  <Button variant="secondary" size="icon" aria-label="Download notes">
                    <Download className="w-4 h-4 text-[#F7F3FF]" />
                  </Button>
                  <Button variant="primary" size="icon" aria-label="Start timer">
                    <Sparkles className="w-4 h-4 text-white" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Button States & Props */}
          <Card className="border-[rgba(146,85,255,0.18)]">
            <CardHeader>
              <CardTitle>States & Icons</CardTitle>
              <CardDescription>
                Directional arrows, icons, loading spinners, and disabled states.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Next Problem
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  leftIcon={<Clock className="w-4 h-4" />}
                >
                  Set Reminder
                </Button>
                <Button variant="primary" size="md" disabled>
                  <Lock className="w-3.5 h-3.5 mr-1" /> Prerequisite Locked
                </Button>
                <Button variant="outline" size="md" disabled>
                  Disabled
                </Button>
              </div>

              <div className="pt-4 border-t border-[rgba(146,85,255,0.12)] space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#A7A0C5]">
                  Full-Width Action
                </p>
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  leftIcon={<Sparkles className="w-4 h-4" />}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Review Today's Problem Set Questions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SECTION 4: CARD SYSTEM & VARIANTS */}
      <section className="space-y-6">
        <SectionHeader
          title="Card Layouts & Surface Variants"
          subtitle="Rounded cards (#211C50) built with subtle borders, gentle hover elevation, and contextual metrics for college students."
          badge={<Badge variant="violet" size="sm" icon={<Layers className="w-3 h-3" />}>Cards</Badge>}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Default Surface */}
          <Card variant="default">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="neutral" size="sm">Standard Card</Badge>
                <Compass className="w-4 h-4 text-[#9255FF]" />
              </div>
              <CardTitle className="pt-2">Course Overview</CardTitle>
              <CardDescription>
                Solid #211C50 background with a 1px soft purple border. Clean container for reading syllabus notes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-3 rounded-xl bg-[#171536] border border-[rgba(146,85,255,0.12)] text-xs text-[#A7A0C5] space-y-1">
                <div className="flex justify-between text-[#F7F3FF] font-medium">
                  <span>Course:</span>
                  <span className="font-mono">CS 161</span>
                </div>
                <div className="flex justify-between">
                  <span>Next Deadline:</span>
                  <span className="text-[#F7F3FF]">Friday, 11:59 PM</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" fullWidth rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Open Details
              </Button>
            </CardFooter>
          </Card>

          {/* Card 2: Interactive Lift */}
          <Card variant="interactive">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="pink" size="sm" dot>Interactive</Badge>
                <TrendingUp className="w-4 h-4 text-[#F02BC8]" />
              </div>
              <CardTitle className="pt-2">Weekly Goal Card</CardTitle>
              <CardDescription>
                Elevates slightly on hover with a neon pink border highlight to indicate clickability.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-3 rounded-xl bg-[#171536] border border-[rgba(240,43,200,0.18)] text-xs text-[#A7A0C5] space-y-1">
                <div className="flex justify-between text-[#F7F3FF] font-medium">
                  <span>Weekly Target:</span>
                  <span className="font-mono">15 Hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Completed So Far:</span>
                  <span className="text-emerald-400 font-semibold">12.5 Hours</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="primary" size="sm" fullWidth>
                Log Study Session
              </Button>
            </CardFooter>
          </Card>

          {/* Card 3: Pink Accent */}
          <Card variant="accent-pink">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="pink" size="sm">Priority</Badge>
                <Award className="w-4 h-4 text-[#F02BC8]" />
              </div>
              <CardTitle className="pt-2">Upcoming Exam</CardTitle>
              <CardDescription>
                Top accent border highlights pressing exam dates, major lab submissions, and key deliverables.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-3 rounded-xl bg-[#171536] border border-[rgba(146,85,255,0.12)] text-xs text-[#A7A0C5] space-y-1">
                <div className="flex justify-between text-[#F7F3FF] font-medium">
                  <span>Midterm Exam:</span>
                  <span className="font-mono text-[#FF75EA]">In 4 Days</span>
                </div>
                <div className="flex justify-between">
                  <span>Coverage:</span>
                  <span>Weeks 1-5</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" fullWidth>
                Practice Exam
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Realistic Student Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <Card className="border-[rgba(146,85,255,0.18)] bg-gradient-to-br from-[#211C50] to-[#171536]">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-[#A7A0C5]">Cumulative GPA</p>
                <h4 className="text-2xl font-bold text-[#F7F3FF] mt-1">3.89</h4>
                <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-400 font-semibold">
                  <span>↑ +0.14</span>
                  <span className="text-[#A7A0C5]">vs Fall semester</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#9255FF]/20 to-[#F02BC8]/20 border border-[rgba(146,85,255,0.3)] flex items-center justify-center text-[#9255FF]">
                <GraduationCap className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[rgba(146,85,255,0.18)] bg-gradient-to-br from-[#211C50] to-[#171536]">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-[#A7A0C5]">Syllabus Progress</p>
                <h4 className="text-2xl font-bold text-[#F7F3FF] mt-1">14 / 18</h4>
                <div className="flex items-center gap-1 mt-1 text-[11px] text-[#FF6BE6] font-semibold">
                  <span>78% complete</span>
                  <span className="text-[#A7A0C5]">• 4 topics left</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#F02BC8]/20 to-[#9255FF]/20 border border-[rgba(240,43,200,0.3)] flex items-center justify-center text-[#F02BC8]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[rgba(146,85,255,0.18)] bg-gradient-to-br from-[#211C50] to-[#171536]">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-[#A7A0C5]">Daily Study Streak</p>
                <h4 className="text-2xl font-bold text-[#F7F3FF] mt-1">14 Days</h4>
                <div className="flex items-center gap-1 mt-1 text-[11px] text-amber-400 font-semibold">
                  <span>🔥 Consistent</span>
                  <span className="text-[#A7A0C5]">• Best: 21 days</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Flame className="w-6 h-6 fill-amber-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SECTION 5: BADGES & STATUS INDICATORS */}
      <section className="space-y-6">
        <SectionHeader
          title="Badges & Status Tags"
          subtitle="Clear visual badges for course categories, assignment difficulties, deadline urgency, and submission status."
          badge={<Badge variant="pink" size="sm">Tags</Badge>}
        />

        <Card className="border-[rgba(146,85,255,0.18)]">
          <CardContent className="p-6 space-y-6">
            {/* Variants */}
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#A7A0C5]">
                Category Colors
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="pink" size="md">
                  Core Required
                </Badge>
                <Badge variant="violet" size="md">
                  CS Elective
                </Badge>
                <Badge variant="success" size="md">
                  Submitted
                </Badge>
                <Badge variant="warning" size="md">
                  Needs Review
                </Badge>
                <Badge variant="neutral" size="md">
                  Audit Only
                </Badge>
              </div>
            </div>

            {/* Pulsing Dots */}
            <div className="space-y-3 pt-4 border-t border-[rgba(146,85,255,0.12)]">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#A7A0C5]">
                Live Status Indicators
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="pink" size="md" dot>
                  Study Sprint Active
                </Badge>
                <Badge variant="violet" size="md" dot>
                  Syncing Portal
                </Badge>
                <Badge variant="success" size="md" dot>
                  All Test Cases Passed
                </Badge>
                <Badge variant="warning" size="md" dot>
                  Due in 4 Hours
                </Badge>
              </div>
            </div>

            {/* Icons */}
            <div className="space-y-3 pt-4 border-t border-[rgba(146,85,255,0.12)]">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#A7A0C5]">
                With Icons &amp; Sizes
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  variant="pink"
                  size="sm"
                  icon={<Sparkles className="w-3 h-3" />}
                >
                  Recommended Today
                </Badge>
                <Badge
                  variant="violet"
                  size="md"
                  icon={<ShieldCheck className="w-3.5 h-3.5" />}
                >
                  Official Syllabus
                </Badge>
                <Badge
                  variant="warning"
                  size="sm"
                  icon={<AlertTriangle className="w-3 h-3" />}
                >
                  Prerequisite: CS 106B
                </Badge>
                <Badge
                  variant="neutral"
                  size="md"
                  icon={<Clock className="w-3.5 h-3.5" />}
                >
                  Est. 45 mins
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* SECTION 6: FORM INPUTS */}
      <section className="space-y-6">
        <SectionHeader
          title="Input Fields &amp; Form Controls"
          subtitle="Form components styled for dark mode with subtle purple borders and a neon pink glow when focused."
          badge={<Badge variant="violet" size="sm">Inputs</Badge>}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-[rgba(146,85,255,0.18)]">
            <CardHeader>
              <CardTitle>Interactive Fields</CardTitle>
              <CardDescription>
                Type into the field below to test focus border transitions and responsive styling.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <Input
                label="Current Study Focus"
                placeholder="e.g. Graph Algorithms, Memory Hierarchy..."
                value={interactiveInput}
                onChange={(e) => setInteractiveInput(e.target.value)}
                helperText="Used to suggest practice problems and lecture notes for today"
                leftIcon={<Search className="w-4 h-4" />}
              />

              <Input
                label="Student Campus Email"
                type="email"
                placeholder="student@campus.edu"
                defaultValue="alex.chen@campus.edu"
                leftIcon={<Mail className="w-4 h-4" />}
                helperText="Sends daily deadline digests before 9:00 AM"
              />
            </CardContent>
          </Card>

          <Card className="border-[rgba(146,85,255,0.18)]">
            <CardHeader>
              <CardTitle>Validation &amp; Disabled States</CardTitle>
              <CardDescription>
                Clean error messages, accessible borders, and disabled input styling.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <Input
                label="Course Code"
                placeholder="e.g. CS-161"
                defaultValue="INVALID-101"
                error="Course not found in current semester catalog."
                leftIcon={<AlertTriangle className="w-4 h-4 text-red-400" />}
              />

              <Input
                label="Student ID (Verified)"
                defaultValue="STU-920481"
                disabled
                helperText="Synced with university registrar portal"
                leftIcon={<Lock className="w-4 h-4" />}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SECTION 7: PROGRESS BARS */}
      <section className="space-y-6">
        <SectionHeader
          title="Progress Indicators"
          subtitle="Smooth progress meters for tracking syllabus completion, weekly study goals, and assignment completion."
          badge={<Badge variant="pink" size="sm" icon={<Sliders className="w-3 h-3" />}>Progress</Badge>}
        />

        <Card className="border-[rgba(146,85,255,0.18)]">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Interactive Progress Demonstration</CardTitle>
                <CardDescription>
                  Drag the slider to test smooth spring animations across all color variants.
                </CardDescription>
              </div>
              <div className="flex items-center gap-3 bg-[#171536] px-4 py-2 rounded-xl border border-[rgba(146,85,255,0.2)]">
                <span className="text-xs text-[#A7A0C5]">Adjust Value:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={demoProgress}
                  onChange={(e) => setDemoProgress(Number(e.target.value))}
                  className="w-32 accent-[#F02BC8] cursor-pointer"
                />
                <span className="text-xs font-bold text-[#FF6BE6] font-mono min-w-8 text-right">
                  {demoProgress}%
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <ProgressBar
              value={demoProgress}
              variant="gradient"
              size="lg"
              label="Dual Brand Gradient (Pink → Violet)"
              showLabel
            />

            <ProgressBar
              value={demoProgress}
              variant="pink"
              size="md"
              label="Primary Neon Pink Variant"
              showLabel
            />

            <ProgressBar
              value={demoProgress}
              variant="violet"
              size="md"
              label="Violet Accent Variant"
              showLabel
            />

            <ProgressBar
              value={demoProgress}
              variant="success"
              size="sm"
              label="Success / Completed Variant (sm)"
              showLabel
            />
          </CardContent>
        </Card>
      </section>

      {/* SECTION 8: ARCHITECTURAL FOUNDATION */}
      <section className="space-y-6">
        <SectionHeader
          title="Architecture &amp; Design Notes"
          subtitle="Core engineering principles used across Phase 1 to ensure a scalable foundation for subsequent phases."
          badge={<Badge variant="violet" size="sm">System</Badge>}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-[rgba(146,85,255,0.18)] bg-[#171536]/60">
            <CardHeader className="pb-2">
              <h4 className="text-sm font-bold text-[#F7F3FF]">
                1. Token Consistency
              </h4>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-[#A7A0C5] leading-relaxed">
                Centralized CSS variables in index.css coupled with Tailwind v4 theme variables to keep spacing and colors uniform.
              </p>
            </CardContent>
          </Card>

          <Card className="border-[rgba(146,85,255,0.18)] bg-[#171536]/60">
            <CardHeader className="pb-2">
              <h4 className="text-sm font-bold text-[#F7F3FF]">
                2. Strict TypeScript
              </h4>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-[#A7A0C5] leading-relaxed">
                Strict type safety with polymorphic refs on interactive elements and zero implicit or untyped props.
              </p>
            </CardContent>
          </Card>

          <Card className="border-[rgba(146,85,255,0.18)] bg-[#171536]/60">
            <CardHeader className="pb-2">
              <h4 className="text-sm font-bold text-[#F7F3FF]">
                3. Responsive Layout
              </h4>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-[#A7A0C5] leading-relaxed">
                Sidebar converts smoothly from a permanent desktop navigation rail to a mobile drawer on smaller screens.
              </p>
            </CardContent>
          </Card>

          <Card className="border-[rgba(146,85,255,0.18)] bg-[#171536]/60">
            <CardHeader className="pb-2">
              <h4 className="text-sm font-bold text-[#F7F3FF]">
                4. Scope Discipline
              </h4>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-[#A7A0C5] leading-relaxed">
                Phase 1 focuses entirely on foundational design tokens, reusable components, and responsive app shell.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
