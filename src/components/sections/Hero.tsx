import { Link } from 'react-router-dom'
import { useStore } from '../../store/store'
import Button from '../ui/Button'

const Hero = () => {
  const studioInfo = useStore((state) => state.studioInfo)

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1920&q=80"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-animation-of-futuristic-devices-99786-large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/70 dark:from-gray-950 dark:via-gray-950/95 dark:to-gray-950/70" />
      </div>

      {/* Animated Lines */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-20">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary-500 to-transparent animate-pulse" />
        <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-accent-500 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-primary-500 to-transparent animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
            <span className="text-sm text-white/80 font-medium">Award-Winning Animation Studio</span>
          </div>

          {/* Main Heading - Split lines for drama */}
          <h1 className="mb-8">
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-[0.9] tracking-tight">
              We Create
            </span>
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tight bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-clip-text text-transparent">
              Viral Content
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
            {studioInfo.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-16">
            <Link to="/portfolio">
              <Button variant="primary" size="lg">
                Watch Our Reel
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
              </Button>
            </Link>
            <Link to="/contact">
              <button className="px-8 py-4 text-lg font-medium text-white border-2 border-white/30 rounded-lg hover:bg-white/10 hover:border-white/50 transition-all">
                Start a Project
              </button>
            </Link>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-8 md:gap-16">
            <div className="group">
              <div className="text-4xl md:text-5xl font-display font-bold text-white group-hover:text-primary-400 transition-colors">
                {studioInfo.stats.projectsCompleted}+
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mt-1">Projects</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-display font-bold text-white group-hover:text-primary-400 transition-colors">
                2.8M+
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mt-1">Followers</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-display font-bold text-white group-hover:text-primary-400 transition-colors">
                50M+
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mt-1">Monthly Views</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-white/50">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
