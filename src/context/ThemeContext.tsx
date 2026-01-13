import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Helper to get initial theme
const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark'
  
  const stored = localStorage.getItem('naolito-theme') as Theme | null
  if (stored) return stored
  
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light'
  }
  
  return 'dark'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    const root = window.document.documentElement
    
    // Remove both classes first
    root.classList.remove('light', 'dark')
    
    // Add the current theme
    root.classList.add(theme)
    
    // Save to localStorage
    localStorage.setItem('naolito-theme', theme)
    
    console.log('Theme changed to:', theme) // Debug
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light'
      console.log('Toggling theme from', prev, 'to', newTheme) // Debug
      return newTheme
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
