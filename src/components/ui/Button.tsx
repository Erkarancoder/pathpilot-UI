import React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { ButtonSize, ButtonVariant } from '../../types'

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children?: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  className?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F02BC8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090817]'

    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        'bg-gradient-to-r from-[#F02BC8] via-[#D813B8] to-[#9255FF] text-[#F7F3FF] shadow-[0_0_20px_rgba(240,43,200,0.35)] hover:shadow-[0_0_28px_rgba(240,43,200,0.55)] hover:brightness-110 active:scale-[0.98] border border-[rgba(255,255,255,0.2)]',
      secondary:
        'bg-[#171536] text-[#F7F3FF] border border-[rgba(146,85,255,0.3)] hover:bg-[#211C50] hover:border-[rgba(146,85,255,0.55)] hover:shadow-[0_0_18px_rgba(146,85,255,0.25)] active:scale-[0.98]',
      outline:
        'bg-transparent text-[#F7F3FF] border border-[rgba(240,43,200,0.45)] hover:bg-[rgba(240,43,200,0.12)] hover:border-[#F02BC8] hover:shadow-[0_0_15px_rgba(240,43,200,0.25)] active:scale-[0.98]',
      ghost:
        'bg-transparent text-[#A7A0C5] hover:text-[#F7F3FF] hover:bg-[rgba(146,85,255,0.14)] active:scale-[0.98]',
      danger:
        'bg-red-500/15 text-red-200 border border-red-500/35 hover:bg-red-500/25 hover:border-red-500/50 hover:shadow-[0_0_18px_rgba(239,68,68,0.25)] active:scale-[0.98]',
    }

    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
      md: 'text-sm px-4 py-2.5 rounded-xl gap-2',
      lg: 'text-base px-6 py-3.5 rounded-xl gap-2.5 font-semibold',
      icon: 'p-2.5 rounded-xl aspect-square items-center justify-center',
    }

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0 text-current" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
