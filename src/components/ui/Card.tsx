import React from 'react'
import { cn } from '../../lib/utils'
import type { CardVariant } from '../../types'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  children?: React.ReactNode
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variantStyles: Record<CardVariant, string> = {
      default:
        'bg-[#211C50] border border-[rgba(146,85,255,0.18)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.55)]',
      elevated:
        'bg-gradient-to-b from-[#211C50] to-[#171536] border border-[rgba(146,85,255,0.24)] shadow-[0_16px_36px_-12px_rgba(0,0,0,0.65)]',
      interactive:
        'bg-[#211C50] border border-[rgba(146,85,255,0.18)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.55)] hover:border-[rgba(240,43,200,0.45)] hover:shadow-[0_12px_36px_-6px_rgba(240,43,200,0.22)] hover:-translate-y-1 transition-all duration-300 cursor-pointer',
      'accent-pink':
        'bg-[#211C50] border-t-2 border-t-[#F02BC8] border-x border-b border-[rgba(146,85,255,0.18)] shadow-[0_10px_30px_-10px_rgba(240,43,200,0.25)]',
      'accent-violet':
        'bg-[#211C50] border-t-2 border-t-[#9255FF] border-x border-b border-[rgba(146,85,255,0.18)] shadow-[0_10px_30px_-10px_rgba(146,85,255,0.25)]',
    }

    return (
      <div
        ref={ref}
        className={cn('rounded-2xl relative overflow-hidden backdrop-blur-sm', variantStyles[variant], className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = 'Card'

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-lg font-bold tracking-tight text-[#F7F3FF]',
      className
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-[#A7A0C5] leading-relaxed', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center p-6 pt-0 border-t border-[rgba(146,85,255,0.12)] mt-4',
      className
    )}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'
