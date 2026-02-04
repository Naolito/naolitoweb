import { useEffect, useRef, useState } from 'react'

type InViewOptions = IntersectionObserverInit & {
  once?: boolean
}

const useInView = (options: InViewOptions = {}) => {
  const {
    root = null,
    rootMargin = '0px 0px -10% 0px',
    threshold = 0.2,
    once = true,
  } = options

  const ref = useRef<HTMLDivElement | null>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsInView(true)
      return
    }

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) observer.unobserve(entry.target)
        } else if (!once) {
          setIsInView(false)
        }
      },
      { root, rootMargin, threshold }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [root, rootMargin, threshold, once])

  return { ref, isInView }
}

export default useInView
