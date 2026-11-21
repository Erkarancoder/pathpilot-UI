import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import type { ProgressBarSize, ProgressBarVariant } from '../../types'

export interface ProgressBarProps {
  value: number // 0 to 100
  max?: number
  variant?: ProgressBarVariant
  size?: ProgressBarSize
  showLabel?: boolean
  label?: string
  className?: string
  animated?: boolean
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  variant = 'gradient',
  size = 'md',
  showLabel = false,
  label,
  className,
  animated = true,
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)))

  const variantStyles: Record<ProgressBarVariant, string> = {
    pink: 'bg-gradient-to-r from-[#F02BC8] to-[#FF6BE6] shadow-[0_0_12px_rgba(240,43,200,0.45)]',
    violet: 'bg-gradient-to-r from-[#9255FF] to-[#C4A5FF] shadow-[0_0_12px_rgba(146,85,255,0.45)]',
    gradient:
      'bg-gradient-to-r from-[#F02BC8] via-[#C054FD] to-[#9255FF] shadow-[0_0_14px_rgba(240,43,200,0.35)]',
    success:
      'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_12px_rgba(16,185,129,0.35)]',
  }

  const sizeStyles: Record<ProgressBarSize, string> = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }

  return (
    <div className={cn('w-full flex flex-col gap-1.5', className)}>
      {(label || showLabel) && (
        <div className="flex justify-between items-center text-xs">
          {label && <span className="font-medium text-[#A7A0C5]">{label}</span>}
          {showLabel && (
            <span className="font-semibold text-[#F7F3FF] ml-auto">{percentage}%</span>
          )}
        </div>
      )}
      <div
        className={cn(
          'w-full bg-[#171536] border border-[rgba(146,85,255,0.18)] rounded-full overflow-hidden p-0.5',
          sizeStyles[size]
        )}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: animated ? 0.8 : 0,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={cn('h-full rounded-full transition-all', variantStyles[variant])}
        />
      </div>
    </div>
  )
}
