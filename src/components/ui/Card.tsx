import { ReactNode, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hoverable?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
}

const Card = ({
  children,
  hoverable = false,
  padding = 'md',
  className = '',
  ...props
}: CardProps) => {
  const baseStyles = 'bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700/50 overflow-hidden transition-all duration-300'
  
  const hoverStyles = hoverable
    ? 'hover:border-primary-500/60 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800'
    : ''
  
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }
  
  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card

