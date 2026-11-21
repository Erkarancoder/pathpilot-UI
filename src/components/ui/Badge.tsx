import React from 'react'
import { cn } from '../../lib/utils'
import type { BadgeSize, BadgeVariant } from '../../types'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
  icon?: React.ReactNode
  children: React.ReactNode
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'pink',
  size = 'md',
  dot = false,
  icon,
  children,
  className,
  ...props
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    pink: 'bg-[rgba(240,43,200,0.14)] text-[#FF75EA] border-[rgba(240,43,200,0.32)] shadow-[0_0_12px_rgba(240,43,200,0.22)]',
    violet:
      'bg-[rgba(146,85,255,0.14)] text-[#C7A8FF] border-[rgba(146,85,255,0.32)] shadow-[0_0_12px_rgba(146,85,255,0.22)]',
    success:
      'bg-emerald-500/15 text-emerald-300 border-emerald-500/35 shadow-[0_0_12px_rgba(16,185,129,0.18)]',
    warning:
      'bg-amber-500/15 text-amber-300 border-amber-500/35 shadow-[0_0_12px_rgba(245,158,11,0.18)]',
    neutral:
      'bg-[#171536] text-[#A7A0C5] border-[rgba(146,85,255,0.2)]',
  }

  const dotColors: Record<BadgeVariant, string> = {
    pink: 'bg-[#F02BC8] shadow-[0_0_8px_#F02BC8]',
    violet: 'bg-[#9255FF] shadow-[0_0_8px_#9255FF]',
    success: 'bg-emerald-400 shadow-[0_0_8px_#34D399]',
    warning: 'bg-amber-400 shadow-[0_0_8px_#FBBF24]',
    neutral: 'bg-[#A7A0C5]',
  }

  const sizeStyles: Record<BadgeSize, string> = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-2',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full border transition-colors select-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          <span
            className={cn(
              'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
              dotColors[variant]
            )}
          />
          <span
            className={cn(
              'relative inline-flex rounded-full h-2 w-2',
              dotColors[variant]
            )}
          />
        </span>
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  )
}
