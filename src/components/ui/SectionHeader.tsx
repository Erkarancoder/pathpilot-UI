import React from 'react'
import { cn } from '../../lib/utils'

export interface SectionHeaderProps {
  title: string
  subtitle?: string
  badge?: React.ReactNode
  action?: React.ReactNode
  gradientTitle?: boolean
  className?: string
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badge,
  action,
  gradientTitle = false,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[rgba(146,85,255,0.12)]',
        className
      )}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h2
            className={cn(
              'text-2xl font-bold tracking-tight text-[#F7F3FF]',
              gradientTitle && 'text-gradient-brand'
            )}
          >
            {title}
          </h2>
          {badge && <div>{badge}</div>}
        </div>
        {subtitle && (
          <p className="text-sm text-[#A7A0C5] max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="flex items-center gap-2.5 shrink-0">{action}</div>}
    </div>
  )
}
