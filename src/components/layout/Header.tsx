import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navigation from './Navigation'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

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
          ? 'bg-white/90 backdrop-blur-xl border-b border-black/10 shadow-[0_20px_60px_rgba(15,23,42,0.12)]'
          : 'bg-white/70 backdrop-blur-lg border-b border-black/5'
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
            <div className="flex flex-col">
              <span className="text-2xl font-logo text-sky-400 leading-none tracking-[0.02em]">
                Naolito
              </span>
              <span className="text-[11px] text-slate-500 uppercase tracking-[0.28em] leading-none">
                Animation Studio
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <Navigation />
        </div>
      </div>
    </header>
  )
}

export default Header
