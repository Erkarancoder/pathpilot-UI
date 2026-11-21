import React from 'react'
import { cn } from '../../lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      fullWidth = true,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    return (
      <div className={cn('flex flex-col gap-1.5 text-left', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold uppercase tracking-wider text-[#A7A0C5]"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-[#A7A0C5]">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            ref={ref}
            disabled={disabled}
            className={cn(
              'h-11 w-full rounded-xl bg-[#171536] px-4 text-sm text-[#F7F3FF] placeholder-[#A7A0C5]/40 transition-all duration-200 outline-none border',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error
                ? 'border-red-500/80 focus:border-red-500 focus:ring-2 focus:ring-red-500/25'
                : 'border-[rgba(146,85,255,0.22)] focus:border-[#F02BC8] focus:ring-2 focus:ring-[#F02BC8]/25 hover:border-[rgba(146,85,255,0.4)]',
              disabled && 'opacity-50 cursor-not-allowed bg-[#0e0c22]',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center text-[#A7A0C5]">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs text-red-400 font-medium pl-1">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-[#A7A0C5]/70 pl-1">{helperText}</p>
        ) : null}
      </div>
    )
  }
)

Input.displayName = 'Input'
