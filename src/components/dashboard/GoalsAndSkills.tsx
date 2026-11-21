import React from 'react'
import { Link } from 'react-router-dom'
import {
  Target,
  Sparkles,
  Award,
  Layers,
  ArrowRight,
  TrendingUp,
  BookMarked,
  CheckCircle,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { ProgressBar } from '../ui/ProgressBar'
import type { OnboardingData, StudentProfile } from '../../types'

interface GoalsAndSkillsProps {
  student: StudentProfile
  onboarding: OnboardingData | null
  onOpenRoadmapModal?: () => void
}

export const GoalsAndSkills: React.FC<GoalsAndSkillsProps> = ({
  student,
  onboarding,
}) => {
  const assessment = onboarding?.assessmentResult
  const goals = onboarding?.learningGoals && onboarding.learningGoals.length > 0
    ? onboarding.learningGoals
    : [
        'Become a Full Stack Developer',
        'Improve DSA and problem solving',
        'Prepare for internships and placements',
      ]

  const skills = onboarding?.selectedSkills && onboarding.selectedSkills.length > 0
    ? onboarding.selectedSkills
    : ['Data Structures & Algorithms', 'React', 'JavaScript', 'Database Fundamentals']

  const skillLevel = onboarding?.experienceLevel || 'Intermediate'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 1. Academic Goals & Curricular Focus */}
      <Card variant="default" className="flex flex-col justify-between">
        <CardHeader className="pb-3 border-b border-[rgba(146,85,255,0.12)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[rgba(240,43,200,0.15)] text-[#F02BC8] flex items-center justify-center">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <CardTitle className="text-base sm:text-lg">Targeted Learning Goals</CardTitle>
                <CardDescription>
                  Active objectives configured during student onboarding
                </CardDescription>
              </div>
            </div>
            <Link to="/onboarding">
              <Button variant="ghost" size="sm" className="text-xs">
                Edit
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent className="p-5 space-y-4">
          <div className="space-y-2.5">
            {goals.map((goal, index) => (
              <div
                key={goal}
                className="p-3 rounded-xl bg-[#171536] border border-[rgba(146,85,255,0.15)] flex items-start gap-3 hover:border-[rgba(240,43,200,0.3)] transition-colors"
              >
                <div className="w-6 h-6 rounded-lg bg-[rgba(240,43,200,0.12)] text-[#F02BC8] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-semibold text-[#F7F3FF] leading-snug">
                    {goal}
                  </p>
                  <p className="text-[11px] text-[#A7A0C5] mt-0.5">
                    Integrated with {student.major} semester syllabus
                  </p>
                </div>
                <Badge variant="pink" size="sm" className="text-[10px]">
                  In Progress
                </Badge>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link to="/roadmap" className="block w-full">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-between"
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                <span className="flex items-center gap-2">
                  <BookMarked className="w-4 h-4 text-[#9255FF]" />
                  View Full Degree Roadmap &amp; Milestones
                </span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* 2. Skill Inventory & Diagnostic Verification */}
      <Card variant="default" className="flex flex-col justify-between">
        <CardHeader className="pb-3 border-b border-[rgba(146,85,255,0.12)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[rgba(146,85,255,0.15)] text-[#9255FF] flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <CardTitle className="text-base sm:text-lg">Skill Profile & Assessment</CardTitle>
                <CardDescription>
                  Verified proficiency and self-reported technical stack
                </CardDescription>
              </div>
            </div>
            <Badge variant="violet" size="sm" className="capitalize">
              {skillLevel} Level
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-5 space-y-4">
          {/* Assessment highlight */}
          {assessment ? (
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-[rgba(240,43,200,0.12)] to-[rgba(146,85,255,0.08)] border border-[rgba(240,43,200,0.3)] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#F7F3FF] flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#F02BC8]" />
                  Diagnostic Exam Score
                </span>
                <span className="text-xs font-extrabold text-[#FF6BE6]">
                  {assessment.score}/{assessment.totalQuestions} ({assessment.percentage}%)
                </span>
              </div>
              <ProgressBar
                value={assessment.percentage}
                variant="gradient"
                size="sm"
              />
              <p className="text-[11px] text-[#A7A0C5] leading-relaxed">
                {assessment.skillLevelSummary}
              </p>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-[#171536] border border-dashed border-[rgba(146,85,255,0.25)] flex items-center justify-between">
              <div>
                <h5 className="text-xs font-bold text-[#F7F3FF]">No Diagnostic Score Yet</h5>
                <p className="text-[11px] text-[#A7A0C5] mt-0.5">Take the 8-question CS assessment to verify skills.</p>
              </div>
              <Link to="/onboarding">
                <Button variant="primary" size="sm" leftIcon={<Sparkles className="w-3.5 h-3.5" />}>
                  Take Test
                </Button>
              </Link>
            </div>
          )}

          {/* Active Skills Tag Cloud */}
          <div>
            <label className="text-[11px] font-semibold text-[#A7A0C5] uppercase tracking-wider block mb-2">
              Current Competency Stack
            </label>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill: string) => (
                <div
                  key={skill}
                  className="px-3 py-1.5 rounded-xl bg-[#171536] border border-[rgba(146,85,255,0.2)] text-xs text-[#F7F3FF] flex items-center gap-2 hover:border-[rgba(240,43,200,0.35)] transition-colors"
                >
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-[#A7A0C5]">
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              Placement Readiness: High
            </span>
            <Link to="/onboarding" className="text-[#FF6BE6] hover:underline">
              Add More Skills →
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
