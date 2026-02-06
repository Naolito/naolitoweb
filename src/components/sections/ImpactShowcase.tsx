import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import { mockProjectImages } from '../../store/mockData'

type ImpactSlide = {
  id: string
  kicker: string
  title: string
  description: string
  video: string
  poster: string
  stat: string
  statLabel: string
}

const slides: ImpactSlide[] = [
  {
    id: 'impact-1',
    kicker: 'Global Animation Studio',
    title: 'Big-screen quality for fast-moving brands',
    description:
      'From blockbuster visual language to social-first cuts, we build animation that performs across platforms without losing craft.',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    poster: mockProjectImages.animation3d[0],
    stat: '100+',
    statLabel: 'festival selections',
  },
  {
    id: 'impact-2',
    kicker: 'Character-Driven Production',
    title: 'Stories designed to be remembered',
    description:
      'We direct, model, animate, light, and deliver with one integrated pipeline so every frame looks intentional.',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    poster: mockProjectImages.character[1],
    stat: '20+',
    statLabel: 'awards won',
  },
  {
    id: 'impact-3',
    kicker: 'Creative + Performance',
    title: 'Cinematic visuals. Measurable impact.',
    description:
      'Our creative decisions are built around audience behavior, replay value, and campaign outcomes, not just aesthetics.',
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    poster: mockProjectImages.motion[1],
    stat: '600K+',
    statLabel: 'global community',
  },
]

const slideIntervalMs = 6500

const ImpactShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, slideIntervalMs)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  const activeSlide = slides[activeIndex]

  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-[#06090f]">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <video
            key={slide.id}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={slide.poster}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src={slide.video} type="video/mp4" />
          </video>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#05070d]/92 via-[#05070d]/70 to-[#05070d]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-transparent to-black/40" />

      <div className="relative z-10 flex min-h-[92vh] items-center px-4 pb-14 pt-32 sm:px-8 lg:px-14">
        <div className="max-w-4xl">
          <div className="text-xs uppercase tracking-[0.35em] text-sky-300/85">{activeSlide.kicker}</div>
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[0.92] text-white sm:text-6xl lg:text-8xl">
            {activeSlide.title}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/82 sm:text-lg lg:text-xl">
            {activeSlide.description}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link to="/contact">
              <Button variant="primary" size="lg">
                Start a Project
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button variant="outline" size="lg" className="border-white/35 bg-white/10 text-white hover:bg-white/20">
                Watch Work
              </Button>
            </Link>
          </div>

          <div className="mt-11 inline-flex items-end gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-sm">
            <div className="text-3xl font-semibold leading-none text-white sm:text-4xl">{activeSlide.stat}</div>
            <div className="pb-1 text-xs uppercase tracking-[0.25em] text-white/72">{activeSlide.statLabel}</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-4 right-4 z-20 sm:left-8 sm:right-8 lg:left-14 lg:right-14">
        <div className="flex items-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === activeIndex ? 'w-20 bg-white' : 'w-8 bg-white/35 hover:bg-white/60'
              }`}
              aria-label={`Show slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ImpactShowcase

