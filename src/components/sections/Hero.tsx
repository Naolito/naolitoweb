import { Link } from 'react-router-dom'
import { useStore } from '../../store/store'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import heroBanner from '../../../media/hero-banner.png'

const Hero = () => {
  const studioInfo = useStore((state) => state.studioInfo)

  return (
    <section className="relative py-12 overflow-hidden bg-[#f8fbff]">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage:
              'radial-gradient(circle at 12% 20%, rgba(56,189,248,0.3), transparent 45%), radial-gradient(circle at 85% 12%, rgba(251,113,133,0.22), transparent 42%), radial-gradient(circle at 45% 88%, rgba(253,224,71,0.2), transparent 45%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(120deg, rgba(15,23,42,0.08) 1px, transparent 1px)',
            backgroundSize: '120px 120px',
          }}
        />
      </div>
      <div className="absolute -top-48 right-[-10%] w-[520px] h-[520px] bg-sky-400/25 rounded-full blur-[180px] motion-safe:animate-float-slow" />
      <div className="absolute -bottom-40 left-[-10%] w-[560px] h-[560px] bg-rose-300/30 rounded-full blur-[200px] motion-safe:animate-float-slower" />
      <div className="absolute top-32 left-[12%] w-28 h-28 bg-amber-200/60 rounded-[40%] blur-2xl rotate-12" />
      <div className="absolute top-20 right-[18%] hidden md:block w-12 h-12 text-sky-300/80 motion-safe:animate-wiggle">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l1.7 4.7L18.4 8l-4.7 1.6L12 14.3l-1.7-4.7L5.6 8l4.7-1.3L12 2z" />
        </svg>
      </div>
      <div className="absolute top-44 right-[10%] hidden md:block w-8 h-8 rounded-full bg-sky-200/80 shadow-[0_0_20px_rgba(56,189,248,0.35)] motion-safe:animate-float-fast" />
      <div className="absolute bottom-24 left-[8%] hidden lg:block w-14 h-14 rounded-[30%] bg-rose-200/70 motion-safe:animate-float-fast" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-center">
          {/* Left */}
          <div>
            <Reveal>
              <h1 className="mt-6 text-balance text-5xl sm:text-6xl lg:text-7xl font-display font-semibold text-slate-900 leading-[0.95]">
                Award winning
                <span className="block bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  animation studio
                </span>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed">
                Our films have been celebrated at international festivals, and we collaborate with clients all over
                the world, from global brands to ambitious startups and creator-led teams. We bring big-studio craft
                with a playful spirit, turning every brief into a story people feel, share, and remember.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button variant="primary" size="lg">
                    Start a Project
                  </Button>
                </Link>
              </div>
            </Reveal>

          </div>

          {/* Right - Structured Reel */}
          <Reveal delay={180}>
            <div className="relative rounded-3xl overflow-hidden border border-black/10 bg-white aspect-[18/9] shadow-[0_25px_60px_rgba(15,23,42,0.12)]">
              <img
                src={heroBanner}
                alt="Naolito originals on screen"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            </div>
          </Reveal>
        </div>
      </div>

    </section>
  )
}

export default Hero
