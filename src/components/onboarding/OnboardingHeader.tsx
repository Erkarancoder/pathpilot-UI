import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Home } from 'lucide-react'
import { ProgressBar } from '../ui/ProgressBar'

interface OnboardingHeaderProps {
  currentStep: number
  totalSteps: number
  stepTitle: string
}

export const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({
  currentStep,
  totalSteps,
  stepTitle,
}) => {
  const percentage = Math.round((currentStep / totalSteps) * 100)

  return (
    <header className="sticky top-0 z-40 bg-[#090817]/92 backdrop-blur-md border-b border-[rgba(146,85,255,0.18)] px-4 sm:px-8 py-3.5">
      <div className="max-w-4xl mx-auto flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#F02BC8] to-[#9255FF] flex items-center justify-center shadow-[0_0_15px_rgba(240,43,200,0.35)] group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-extrabold tracking-tight text-[#F7F3FF]">
              Path<span className="text-[#F02BC8]">Pilot</span>
            </span>
          </Link>

          {/* Current Step Tracker */}
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end">
              <span className="text-xs font-mono font-bold text-[#FF6BE6]">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-xs text-[#A7A0C5] hidden sm:inline">•</span>
              <span className="text-xs font-semibold text-[#F7F3FF] hidden sm:inline">
                {stepTitle}
              </span>
            </div>
          </div>

          {/* Exit / Return Home */}
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs text-[#A7A0C5] hover:text-[#F7F3FF] p-1.5 rounded-lg hover:bg-[#171536] transition-colors"
            title="Return to home page"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Exit</span>
          </Link>
        </div>

        {/* Global Step Progress Bar */}
        <ProgressBar
          value={percentage}
          variant="gradient"
          size="sm"
          animated
        />
      </div>
    </header>
  )
}
