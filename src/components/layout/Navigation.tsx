import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/contact', label: 'Contact' },
]

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`relative text-sm font-medium transition-colors hover:text-sky-400 ${
              isActive(link.path)
                ? 'text-sky-400'
                : 'text-slate-600'
            }`}
          >
            {link.label}
            {isActive(link.path) && (
              <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-sky-400 rounded-full" />
            )}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden relative w-10 h-10 text-slate-700 hover:text-sky-500 focus:outline-none"
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
      >
        <span className="sr-only">Open main menu</span>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span
            className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'
            }`}
          />
        </div>
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white/98 backdrop-blur-lg border-t border-gray-200 shadow-2xl animate-slide-down">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-medium py-2 transition-colors ${
                    isActive(link.path)
                      ? 'text-sky-400'
                      : 'text-slate-700 hover:text-sky-500'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation
