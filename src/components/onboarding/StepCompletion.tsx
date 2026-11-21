import React from 'react'
import { motion } from 'framer-motion'
import {
  CheckCircle2,
  ArrowRight,
  RefreshCw,
} from 'lucide-react'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import type { OnboardingData } from '../../types'

interface StepCompletionProps {
  data: OnboardingData
  onFinish: () => void
  onRetake: () => void
}

export const StepCompletion: React.FC<StepCompletionProps> = ({
  data,
  onFinish,
  onRetake,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#211C50] via-[#171536] to-[#090817] border border-[rgba(240,43,200,0.35)] p-6 sm:p-10 text-center space-y-6 shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-80 h-80 bg-[#F02BC8]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#F02BC8] to-[#9255FF] mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(240,43,200,0.5)]">
            <CheckCircle2 className="w-9 h-9 text-white" />
          </div>

          <div className="space-y-2">
            <Badge variant="pink" size="md" dot>
              Onboarding Complete
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F7F3FF] tracking-tight">
              You Are Ready, {data.fullName}!
            </h1>
            <p className="text-sm text-[#A7A0C5] max-w-lg mx-auto leading-relaxed">
              Your academic profile and skill diagnosis have been saved. Your personalized study plan and semester milestones are ready on your dashboard.
            </p>
          </div>
        </div>

        {/* Profile Summary Card */}
        <div className="relative z-10 p-5 rounded-2xl bg-[#080611]/80 border border-[rgba(146,85,255,0.2)] text-left space-y-3.5 backdrop-blur">
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(146,85,255,0.12)]">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#F02BC8] to-[#9255FF] p-0.5">
                <div className="w-full h-full rounded-[10px] bg-[#171536] flex items-center justify-center font-bold text-sm text-[#F7F3FF]">
                  {data.avatarInitials}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#F7F3FF]">{data.fullName}</h4>
                <p className="text-xs text-[#A7A0C5]">{data.collegeName}</p>
              </div>
            </div>

            {data.assessmentResult && (
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-[#A7A0C5]">Score</span>
                <p className="text-sm font-bold text-[#FF6BE6]">
                  {data.assessmentResult.score}/{data.assessmentResult.totalQuestions} ({data.assessmentResult.percentage}%)
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[#A7A0C5]">Program:</span>
              <p className="font-semibold text-[#F7F3FF]">{data.degree}</p>
            </div>
            <div>
              <span className="text-[#A7A0C5]">Year / Term:</span>
              <p className="font-semibold text-[#F7F3FF]">{data.yearOrSemester}</p>
            </div>
            <div>
              <span className="text-[#A7A0C5]">Experience Level:</span>
              <p className="font-semibold text-[#FF6BE6]">{data.experienceLevel}</p>
            </div>
            <div>
              <span className="text-[#A7A0C5]">Selected Skills:</span>
              <p className="font-semibold text-[#9255FF]">{data.selectedSkills.length} Tech Stacks</p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="relative z-10 pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Button
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight className="w-5 h-5" />}
            onClick={onFinish}
            className="w-full sm:w-auto shadow-[0_0_25px_rgba(240,43,200,0.45)]"
          >
            Go to Student Dashboard
          </Button>

          <Button
            variant="ghost"
            size="md"
            leftIcon={<RefreshCw className="w-4 h-4 text-[#A7A0C5]" />}
            onClick={onRetake}
            className="w-full sm:w-auto text-xs"
          >
            Edit Profile / Retake
          </Button>
        </div>

        {/* LocalStorage reassurance note */}
        <p className="relative z-10 text-[11px] text-[#A7A0C5]/70">
          Saved locally in your browser. Refreshing or returning will preserve your profile.
        </p>
      </div>
    </motion.div>
  )
}
