import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  fullWidth?: boolean
  isLoading?: boolean
}

const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  isLoading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantStyles = {
    primary:
      'bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-[length:200%_200%] text-white shadow-[0_20px_60px_rgba(59,130,246,0.35)] hover:shadow-[0_25px_70px_rgba(34,211,238,0.45)] hover:animate-gradient-pan hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'bg-slate-900 text-white hover:bg-slate-800 hover:-translate-y-0.5',
    outline: 'border border-slate-300 text-slate-900 hover:bg-slate-100 hover:-translate-y-0.5',
    ghost: 'text-slate-700 hover:bg-slate-100',
  }
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm rounded-full',
    md: 'px-6 py-2.5 text-sm md:text-base rounded-full',
    lg: 'px-8 py-3 text-base md:text-lg rounded-full',
  }
  
  const widthStyle = fullWidth ? 'w-full' : ''
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  )
}

export default Button
