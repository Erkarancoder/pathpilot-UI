import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle2, Target } from 'lucide-react'
import { Button } from '../ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card'
import { LEARNING_GOAL_OPTIONS } from '../../data/assessmentData'

interface StepGoalsProps {
  initialGoals: string[]
  onSave: (goals: string[]) => void
  onBack: () => void
}

export const StepGoals: React.FC<StepGoalsProps> = ({
  initialGoals,
  onSave,
  onBack,
}) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(
    initialGoals && initialGoals.length > 0 ? initialGoals : [LEARNING_GOAL_OPTIONS[0], LEARNING_GOAL_OPTIONS[1]]
  )
  const [error, setError] = useState('')

  const toggleGoal = (goal: string) => {
    setError('')
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal))
    } else {
      setSelectedGoals([...selectedGoals, goal])
    }
  }

  const handleNext = () => {
    if (selectedGoals.length === 0) {
      setError('Please select at least one primary learning goal to continue.')
      return
    }
    onSave(selectedGoals)
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
            <div className="w-10 h-10 rounded-xl bg-[rgba(240,43,200,0.15)] flex items-center justify-center text-[#F02BC8]">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <CardTitle>Step 3: What Are Your Learning Goals?</CardTitle>
              <CardDescription>
                Select all the areas you want to prioritize this semester. We will customize your daily study sprints accordingly.
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {LEARNING_GOAL_OPTIONS.map((goal) => {
              const isSelected = selectedGoals.includes(goal)
              return (
                <div
                  key={goal}
                  onClick={() => toggleGoal(goal)}
                  className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between select-none ${
                    isSelected
                      ? 'bg-gradient-to-r from-[rgba(240,43,200,0.15)] to-[rgba(146,85,255,0.15)] border-[#F02BC8] shadow-[0_0_15px_rgba(240,43,200,0.2)]'
                      : 'bg-[#171536]/80 border-[rgba(146,85,255,0.18)] hover:border-[rgba(146,85,255,0.4)] hover:bg-[#171536]'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-semibold text-[#F7F3FF]">
                    {goal}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-colors ${
                      isSelected
                        ? 'bg-[#F02BC8] border-[#F02BC8] text-white'
                        : 'border-[rgba(146,85,255,0.3)] bg-[#090817]'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-[#A7A0C5] pt-2">
            <span>{selectedGoals.length} goals selected</span>
            <span className="text-[#FF6BE6]">Multiple selections allowed</span>
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
              Next: Skills &amp; Experience
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
