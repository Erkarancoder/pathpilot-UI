import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Code2, Award, Zap, Flame, Check } from 'lucide-react'
import { Button } from '../ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card'
import { SKILL_OPTIONS } from '../../data/assessmentData'
import type { SkillLevel } from '../../types'

interface StepSkillsProps {
  initialLevel: SkillLevel
  initialSkills: string[]
  onSave: (level: SkillLevel, skills: string[]) => void
  onBack: () => void
}

const LEVEL_CHOICES: { level: SkillLevel; label: string; desc: string; icon: React.ReactNode }[] = [
  {
    level: 'Beginner',
    label: 'Beginner / First Steps',
    desc: 'Familiar with basic syntax or currently taking introductory CS courses.',
    icon: <Zap className="w-5 h-5 text-emerald-400" />,
  },
  {
    level: 'Intermediate',
    label: 'Intermediate Developer',
    desc: 'Comfortable writing basic algorithms and small full-stack projects.',
    icon: <Flame className="w-5 h-5 text-[#F02BC8]" />,
  },
  {
    level: 'Advanced',
    label: 'Advanced Problem Solver',
    desc: 'Strong grasp of data structures, system design concepts, and frameworks.',
    icon: <Award className="w-5 h-5 text-[#9255FF]" />,
  },
]

export const StepSkills: React.FC<StepSkillsProps> = ({
  initialLevel,
  initialSkills,
  onSave,
  onBack,
}) => {
  const [level, setLevel] = useState<SkillLevel>(initialLevel || 'Intermediate')
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    initialSkills && initialSkills.length > 0
      ? initialSkills
      : ['HTML/CSS', 'JavaScript', 'Python', 'Git and GitHub']
  )
  const [error, setError] = useState('')

  const toggleSkill = (skill: string) => {
    setError('')
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill))
    } else {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  const handleNext = () => {
    if (selectedSkills.length === 0) {
      setError('Please select at least one technology or skill you have worked with.')
      return
    }
    onSave(level, selectedSkills)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <Card variant="default">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[rgba(146,85,255,0.2)] flex items-center justify-center text-[#9255FF]">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <CardTitle>Step 4: Your Current Experience &amp; Stack</CardTitle>
              <CardDescription>
                Help us calibrate the initial difficulty of your test cases and diagnostic questions.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/35 text-red-300 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Experience Level Selector */}
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#A7A0C5]">
              Self-Assessed Experience Level
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {LEVEL_CHOICES.map((choice) => {
                const isSelected = level === choice.level
                return (
                  <div
                    key={choice.level}
                    onClick={() => setLevel(choice.level)}
                    className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer space-y-2 select-none flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-b from-[rgba(240,43,200,0.18)] to-[rgba(146,85,255,0.12)] border-[#F02BC8] shadow-[0_0_15px_rgba(240,43,200,0.25)]'
                        : 'bg-[#171536]/80 border-[rgba(146,85,255,0.18)] hover:border-[rgba(146,85,255,0.4)] hover:bg-[#171536]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      {choice.icon}
                      <span
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#F02BC8] bg-[#F02BC8]' : 'border-[#A7A0C5]/40'
                        }`}
                      >
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#F7F3FF]">
                        {choice.level}
                      </h4>
                      <p className="text-[11px] text-[#A7A0C5] leading-snug mt-1">
                        {choice.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Skills Multi-Select Chips */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#A7A0C5]">
                Select Skills &amp; Technologies You Know
              </label>
              <span className="text-xs text-[#FF6BE6] font-mono">
                {selectedSkills.length} selected
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {SKILL_OPTIONS.map((skill) => {
                const isSelected = selectedSkills.includes(skill)
                return (
                  <button
                    type="button"
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer flex items-center gap-2 select-none ${
                      isSelected
                        ? 'bg-[rgba(240,43,200,0.18)] text-[#FF75EA] border-[#F02BC8] shadow-[0_0_12px_rgba(240,43,200,0.2)]'
                        : 'bg-[#171536] text-[#A7A0C5] border-[rgba(146,85,255,0.2)] hover:border-[rgba(146,85,255,0.45)] hover:text-[#F7F3FF]'
                    }`}
                  >
                    <span>{skill}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#FF75EA]" />}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Action Navigation */}
          <div className="pt-4 border-t border-[rgba(146,85,255,0.12)] flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              size="md"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              onClick={onBack}
            >
              Back
            </Button>
            <Button
              type="button"
              variant="primary"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={handleNext}
            >
              Start Skill Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
