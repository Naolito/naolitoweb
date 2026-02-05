import { mockProjectImages } from '../../store/mockData'
import Reveal from '../ui/Reveal'

const SocialProof = () => {
  return (
    <section className="relative py-24 bg-[#f8fbff] overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 18% 12%, rgba(56,189,248,0.18), transparent 45%), radial-gradient(circle at 82% 82%, rgba(251,113,133,0.14), transparent 40%)',
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
          <Reveal>
            <div>
              <span
                className="text-xs font-semibold text-sky-500 uppercase tracking-[0.35em] mb-4 block impact-kicker-animate"
                style={{ animationDelay: '120ms' }}
              >
                Social Impact
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-slate-900 leading-tight">
                <span className="block impact-line-animate" style={{ animationDelay: '220ms' }}>
                  Audience attention
                </span>
                <span
                  className="block text-transparent bg-gradient-to-r from-primary-600 via-accent-500 to-primary-500 bg-clip-text impact-gradient-animate"
                  style={{ animationDelay: '360ms' }}
                >
                  engineered
                </span>
              </h2>
              <p className="mt-6 text-lg text-slate-600 max-w-xl impact-line-animate" style={{ animationDelay: '520ms' }}>
                We go far beyond creativity. We study trend curves across platforms, test ideas with our own massive
                audience, and use that signal to sharpen every story beat. That feedback loop lets us experiment fast,
                validate what resonates, and then scale with the latest production tech, so each campaign lands with
                maximum reach, engagement, and cultural impact.
              </p>

            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="space-y-4">
            <div className="rounded-3xl border border-black/10 bg-white p-6">
              <div className="text-xs uppercase tracking-[0.35em] text-slate-500">Platform Performance</div>
              <div className="mt-6 space-y-4">
                <a
                  href="https://tiktok.com/@naolitok"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-black/10 bg-slate-50 p-4 hover:bg-white transition-all performance-card-animate"
                  style={{ animationDelay: '220ms' }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 bg-black/80 rounded-xl flex items-center justify-center border border-white/10 performance-icon-animate"
                      style={{ animationDelay: '320ms' }}
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                      </svg>
                    </div>
                    <div className="performance-text-animate" style={{ animationDelay: '360ms' }}>
                      <div className="font-semibold text-slate-900">TikTok</div>
                      <div className="text-slate-500 text-sm">@naolitok</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-semibold text-slate-900 performance-metric-animate" style={{ animationDelay: '420ms' }}>
                      —
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.3em] text-slate-500 performance-label-animate" style={{ animationDelay: '460ms' }}>
                      Followers
                    </div>
                  </div>
                </a>

                <a
                  href="https://instagram.com/naolito"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-black/10 bg-slate-50 p-4 hover:bg-white transition-all performance-card-animate"
                  style={{ animationDelay: '360ms' }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-xl flex items-center justify-center performance-icon-animate"
                      style={{ animationDelay: '460ms' }}
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </div>
                    <div className="performance-text-animate" style={{ animationDelay: '500ms' }}>
                      <div className="font-semibold text-slate-900">Instagram</div>
                      <div className="text-slate-500 text-sm">@naolito</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-semibold text-slate-900 performance-metric-animate" style={{ animationDelay: '560ms' }}>
                      —
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.3em] text-slate-500 performance-label-animate" style={{ animationDelay: '600ms' }}>
                      Followers
                    </div>
                  </div>
                </a>

                <a
                  href="https://facebook.com/naolito"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-black/10 bg-slate-50 p-4 hover:bg-white transition-all performance-card-animate"
                  style={{ animationDelay: '500ms' }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 bg-[#1877F2] rounded-xl flex items-center justify-center performance-icon-animate"
                      style={{ animationDelay: '600ms' }}
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24H12.82v-9.294H9.692V11.01h3.128V8.309c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z" />
                      </svg>
                    </div>
                    <div className="performance-text-animate" style={{ animationDelay: '640ms' }}>
                      <div className="font-semibold text-slate-900">Facebook</div>
                      <div className="text-slate-500 text-sm">/naolito</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-semibold text-slate-900 performance-metric-animate" style={{ animationDelay: '700ms' }}>
                      —
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.3em] text-slate-500 performance-label-animate" style={{ animationDelay: '740ms' }}>
                      Followers
                    </div>
                  </div>
                </a>
              </div>
            </div>

            </div>
          </Reveal>
        </div>

        <div className="mt-12">
          <Reveal>
            <div className="group relative overflow-hidden rounded-3xl border border-black/10 bg-white">
              <img
                src={mockProjectImages.motion[1]}
                alt="Campaign case study"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = 'https://picsum.photos/seed/case-study/1600/900'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
              <div className="relative p-8 md:p-10 max-w-md">
                <div className="text-xs uppercase tracking-[0.35em] text-white/60">Case Study</div>
                <h3 className="mt-3 text-3xl font-display font-semibold text-white">Netflix Holiday Campaign</h3>
                <p className="mt-3 text-white/60">
                  Character-first storytelling with a global rollout across 24 territories.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default SocialProof
