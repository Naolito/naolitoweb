import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navigation from './Navigation'

const LOGO_TEXT = 'NAOLITO'

const AnimatedLogo = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {LOGO_TEXT.split('').map((letter, index) => (
        <span
          key={index}
          className="inline-block text-2xl font-semibold tracking-[0.35em] leading-none text-sky-500 logo-letter"
          style={{
            animationDelay: `${index * 60}ms`,
            textShadow: isHovered
              ? `-0.5px 0 0 #22d3ee, 0.5px 0 0 #e879f9`
              : 'none',
            transition: 'text-shadow 0.3s ease',
          }}
        >
          {letter}
        </span>
      ))}
      <style>{`
        .logo-letter {
          animation: dropBounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }

        @keyframes dropBounce {
          0% {
            opacity: 0;
            transform: translateY(-30px) scaleY(1.3) scaleX(0.85);
          }
          50% {
            opacity: 1;
            transform: translateY(4px) scaleY(0.92) scaleX(1.06);
          }
          70% {
            transform: translateY(-2px) scaleY(1.03) scaleX(0.98);
          }
          85% {
            transform: translateY(1px) scaleY(0.99) scaleX(1.01);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scaleY(1) scaleX(1);
          }
        }
      `}</style>
    </div>
  )
}

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
            <AnimatedLogo />
          </Link>

          {/* Navigation */}
          <Navigation />
        </div>
      </div>
    </header>
  )
}

export default Header
