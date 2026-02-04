import { useRef } from 'react'
import Reveal from '../ui/Reveal'

const steps = [
  { title: 'Idea', tone: 'from-sky-100 to-cyan-100 text-sky-600' },
  { title: 'Character Design', tone: 'from-emerald-100 to-teal-100 text-emerald-600' },
  { title: 'Storyboard', tone: 'from-amber-100 to-yellow-100 text-amber-700' },
  { title: 'Layout', tone: 'from-rose-100 to-pink-100 text-rose-600' },
  { title: 'Blocking', tone: 'from-violet-100 to-indigo-100 text-violet-600' },
  { title: 'Spline', tone: 'from-cyan-100 to-sky-100 text-cyan-700' },
  { title: 'FX', tone: 'from-fuchsia-100 to-purple-100 text-fuchsia-600' },
  { title: 'Lookdev', tone: 'from-lime-100 to-emerald-100 text-emerald-700' },
  { title: 'Music', tone: 'from-amber-100 to-orange-100 text-amber-700' },
  { title: 'SFX', tone: 'from-sky-100 to-blue-100 text-sky-600' },
  { title: 'Compositing', tone: 'from-rose-100 to-orange-100 text-rose-600' },
  { title: 'Release', tone: 'from-indigo-100 to-sky-100 text-indigo-600' },
]

const PipelineTimeline = () => {
  const timelineRef = useRef<HTMLDivElement | null>(null)

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (!timelineRef.current) return
    const amount = timelineRef.current.offsetWidth * 0.7
    timelineRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="relative py-24 bg-[#f8fbff] overflow-hidden">
      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            'radial-gradient(circle at 18% 12%, rgba(56,189,248,0.18), transparent 45%), radial-gradient(circle at 82% 82%, rgba(251,113,133,0.16), transparent 40%)',
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative">
            <div
              ref={timelineRef}
              className="no-scrollbar overflow-x-auto md:overflow-visible pb-2 -mx-4 sm:mx-0 scroll-smooth snap-x snap-mandatory"
            >
              <div className="relative w-full px-4 sm:px-0">
                <div
                  className="absolute left-0 right-0 h-1 bg-sky-300 rounded-full"
                  style={{ top: '10px' }}
                />
                <div className="flex md:grid md:grid-cols-12 gap-6 md:gap-0 pr-10 md:pr-0">
                  {steps.map((step, index) => (
                    <div
                      key={step.title}
                      className="min-w-[24%] md:min-w-0 md:col-span-1 snap-center flex flex-col items-center text-center px-1"
                    >
                      <div className="relative flex items-center justify-center">
                        <span className="h-5 w-5 rounded-full bg-white border-2 border-sky-300 shadow-[0_0_0_4px_rgba(255,255,255,0.9)]" />
                        <span className="absolute h-2.5 w-2.5 rounded-full bg-sky-600" />
                      </div>
                      <div className="mt-3 text-[13px] font-semibold text-slate-900 leading-tight">{step.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => scrollByAmount('left')}
              className="md:hidden flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-black/10 bg-white/90 shadow-sm text-slate-500 hover:text-slate-900 -translate-x-1/2"
              aria-label="Scroll timeline left"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount('right')}
              className="md:hidden flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-black/10 bg-white/90 shadow-sm text-slate-500 hover:text-slate-900 translate-x-1/2"
              aria-label="Scroll timeline right"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-10 max-w-3xl">
            <span className="text-xs font-semibold text-sky-500 uppercase tracking-[0.35em] mb-4 block">
              Cutting-edge Project Tracking Tools
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight text-slate-900">
              From idea to release,
              <span className="block text-transparent bg-gradient-to-r from-primary-600 via-accent-500 to-primary-500 bg-clip-text">
                fully transparent
              </span>
            </h2>
            <p className="mt-6 text-lg text-slate-600">
              An advanced pipeline that keeps production efficient and fully trackable for every client.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default PipelineTimeline
