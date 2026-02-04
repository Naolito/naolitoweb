import { ReactNode } from 'react'
import useInView from './useInView'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

const Reveal = ({ children, className = '', delay = 0 }: RevealProps) => {
  const { ref, isInView } = useInView()

  return (
    <div
      ref={ref}
      className={`reveal ${isInView ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default Reveal
