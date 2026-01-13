import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Navigation from './Navigation'
import ThemeToggle from '../ui/ThemeToggle'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg'
            : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group"
            aria-label="Animation Studio Home"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="relative w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">N</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-display font-bold text-gray-900 dark:text-white leading-none">
                  Naolito
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-400 leading-none">
                  Animation Studio
                </span>
              </div>
            </div>
          </Link>

          {/* Navigation & Theme Toggle */}
          <div className="flex items-center space-x-4">
            <Navigation />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

