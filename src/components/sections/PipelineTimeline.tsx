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

const feedbackBranches = new Set([1, 3, 5, 7, 10])

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
    <Reveal>
      <div className="relative">
        <div
          ref={timelineRef}
          className="no-scrollbar overflow-x-auto md:overflow-visible pb-2 -mx-4 sm:mx-0 scroll-smooth snap-x snap-mandatory"
        >
          <div className="relative w-full px-4 sm:px-0">
            <div className="absolute left-0 right-0 h-1 bg-sky-300 rounded-full" style={{ top: '10px' }} />
            <div
              className="absolute left-0 right-0 h-1 rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500 shadow-[0_0_12px_rgba(56,189,248,0.45)] pipeline-line-animate"
              style={{ top: '10px', animationDelay: '200ms' }}
            />
            <div
              className="absolute right-0 top-[10px] pointer-events-none pipeline-confetti-animate"
              style={{ animationDelay: '2800ms' }}
              aria-hidden="true"
            >
              <span className="confetti-piece bg-amber-400" style={{ '--x': '16px', '--y': '-26px', '--r': '18deg' } as React.CSSProperties} />
              <span className="confetti-piece bg-rose-400" style={{ '--x': '4px', '--y': '-34px', '--r': '-12deg' } as React.CSSProperties} />
              <span className="confetti-piece bg-sky-400" style={{ '--x': '22px', '--y': '-8px', '--r': '32deg' } as React.CSSProperties} />
              <span className="confetti-piece bg-emerald-400" style={{ '--x': '-8px', '--y': '-18px', '--r': '-28deg' } as React.CSSProperties} />
              <span className="confetti-piece bg-fuchsia-400" style={{ '--x': '28px', '--y': '-20px', '--r': '10deg' } as React.CSSProperties} />
            </div>
            <div className="flex md:grid md:grid-cols-12 gap-6 md:gap-0 pr-10 md:pr-0">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="min-w-[24%] md:min-w-0 md:col-span-1 snap-center flex flex-col items-center text-center px-1"
                >
                  <div className="relative flex items-center justify-center">
                    <span className="relative z-10 h-5 w-5 rounded-full bg-white border-2 border-sky-300 shadow-[0_0_0_4px_rgba(255,255,255,0.9)]" />
                    <span
                      className="absolute z-10 h-2.5 w-2.5 rounded-full bg-sky-600 pipeline-dot-animate"
                      style={{ animationDelay: `${index * 140 + 420}ms` }}
                    />
                    {feedbackBranches.has(index) && (
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10">
                        <svg
                          className="absolute -left-1 top-1 -translate-y-full"
                          width="80"
                          height="42"
                          viewBox="0 0 80 42"
                          fill="none"
                          aria-hidden="true"
                          style={{ overflow: 'visible' }}
                        >
                          <path
                            d="M2 40 L28 2 L78 2"
                            className="pipeline-branch-animate"
                            stroke={index === 10 ? '#ef4444' : '#f59e0b'}
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ animationDelay: `${index * 140 + 420}ms` }}
                          />
                          <circle
                            cx="78"
                            cy="2"
                            r="6"
                            fill="#ffffff"
                            stroke={index === 10 ? '#ef4444' : '#f59e0b'}
                            strokeWidth="3"
                            className="pipeline-branch-end"
                            style={{ animationDelay: `${index * 140 + 700}ms` }}
                          />
                          <text
                            x="90"
                            y="6"
                            className="pipeline-branch-end"
                            fill={index === 10 ? '#b91c1c' : '#b45309'}
                            fontSize="9"
                            fontWeight="600"
                            letterSpacing="0.22em"
                            style={{ animationDelay: `${index * 140 + 700}ms` }}
                          >
                            {index === 10 ? 'LOVE IT!' : 'FEEDBACK'}
                          </text>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div
                    className="mt-3 text-[13px] font-semibold text-slate-900 leading-tight pipeline-label-animate"
                    style={{ animationDelay: `${index * 140 + 520}ms` }}
                  >
                    {step.title}
                  </div>
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
  )
}

export default PipelineTimeline
