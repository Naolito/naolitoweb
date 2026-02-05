import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import { useStore } from '../store/store'
import { Link } from 'react-router-dom'
import { pipelineSteps, serviceGroups } from '../data/servicesCatalog'

const detailTones = [
  'from-sky-100 to-cyan-100 text-sky-600 border-sky-200',
  'from-rose-100 to-pink-100 text-rose-600 border-rose-200',
  'from-violet-100 to-indigo-100 text-violet-600 border-violet-200',
  'from-amber-100 to-yellow-100 text-amber-700 border-amber-200',
  'from-emerald-100 to-teal-100 text-emerald-600 border-emerald-200',
  'from-sky-100 to-indigo-100 text-sky-700 border-sky-200',
]

const detailAccents = [
  'bg-sky-500',
  'bg-rose-500',
  'bg-violet-500',
  'bg-amber-500',
  'bg-emerald-500',
  'bg-indigo-500',
]

const Services = () => {
  const services = useStore((state) => state.services)
  const [primaryGroup, ...secondaryGroups] = serviceGroups

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="relative py-16 lg:py-20 bg-[#f8fbff] overflow-hidden">
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                'radial-gradient(circle at 16% 20%, rgba(56,189,248,0.22), transparent 45%), radial-gradient(circle at 85% 18%, rgba(251,113,133,0.2), transparent 40%), radial-gradient(circle at 50% 90%, rgba(253,224,71,0.18), transparent 45%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: 'linear-gradient(120deg, rgba(15,23,42,0.08) 1px, transparent 1px)',
              backgroundSize: '120px 120px',
            }}
          />
          <div className="absolute -top-40 right-[-12%] w-[420px] h-[420px] bg-sky-300/30 rounded-full blur-[160px]" />
          <div className="absolute -bottom-40 left-[-10%] w-[520px] h-[520px] bg-rose-300/30 rounded-full blur-[180px]" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Reveal>
              <div className="relative mb-10">
                <div className="no-scrollbar overflow-x-auto md:overflow-visible pb-2 -mx-4 sm:mx-0 scroll-smooth">
                  <div className="relative w-full px-4 sm:px-0">
                    <div className="absolute left-0 right-0 h-1 bg-sky-200/80 rounded-full" style={{ top: '10px' }} />
                    <div
                    className="absolute left-0 right-0 h-1 rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500 shadow-[0_0_12px_rgba(56,189,248,0.45)] pipeline-line-animate"
                    style={{ top: '10px', animationDelay: '220ms' }}
                  />
                  <div className="flex md:grid md:grid-cols-12 gap-6 md:gap-0">
                    {pipelineSteps.map((step, index) => (
                        <div
                          key={step}
                          className="min-w-[24%] md:min-w-0 md:col-span-1 flex flex-col items-center text-center px-1"
                        >
                          <div className="relative flex items-center justify-center">
                            <span className="h-5 w-5 rounded-full bg-white border-2 border-sky-300 shadow-[0_0_0_4px_rgba(255,255,255,0.9)]" />
                          <span
                            className="absolute h-2.5 w-2.5 rounded-full bg-sky-600 pipeline-dot-animate"
                            style={{ animationDelay: `${index * 140 + 420}ms` }}
                          />
                        </div>
                        <div
                          className="mt-3 text-[13px] font-semibold text-slate-900 pipeline-label-animate"
                          style={{ animationDelay: `${index * 140 + 520}ms` }}
                        >
                          {step}
                        </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
              <Reveal className="max-w-xl">
                <span className="text-xs font-semibold text-sky-500 uppercase tracking-[0.35em] mb-4 block">
                  Services
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight text-slate-900">
                  Full-service animation
                  <span className="pipeline-scan-wrapper block">
                    <span className="pipeline-scan-text">Next gen Pipeline</span>
                    <span className="pipeline-scan-beam" />
                  </span>
                </h1>
                <p className="mt-6 text-lg text-slate-600">
                  From concept to viral distribution, we run the full pipeline with senior talent and obsessive craft.
                  Our production flow is built for transparency, so you can follow every stage, review progress, and
                  step in with feedback at the moments that matter. It's streamlined, advanced, and built to keep
                  teams aligned while the final work stays unmistakably on-brand.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/contact">
                    <Button variant="primary" size="lg">
                      Start a Project
                    </Button>
                  </Link>
                  <Link to="/portfolio">
                    <Button variant="outline" size="lg">
                      View Our Work
                    </Button>
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={160}>
                <div className="rounded-3xl border border-black/10 bg-white/80 p-6 sm:p-8 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                  <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
                    <div className="space-y-8">
                      {primaryGroup && (
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="h-2 w-2 rounded-full bg-sky-400" />
                            <div className="text-xs uppercase tracking-[0.3em] text-slate-500">
                              {primaryGroup.title}
                            </div>
                          </div>
                          <div className="mt-4 space-y-3">
                            {primaryGroup.items.map((service, index) => (
                              <Reveal key={service.title} delay={index * 60}>
                                <Link
                                  to={service.link}
                                  className="group flex items-start gap-4 rounded-2xl p-2 transition-all hover:-translate-y-0.5 hover:bg-slate-50"
                                >
                                  <div
                                    className={`w-11 h-11 rounded-full bg-gradient-to-br ${service.tone} flex items-center justify-center shadow-sm border border-white/50`}
                                  >
                                    {service.icon}
                                  </div>
                                  <div className="min-w-0">
                                    <div className="text-base font-medium text-slate-900 group-hover:text-primary-600 transition-colors">
                                      {service.title}
                                    </div>
                                    <div className="text-sm text-slate-500 leading-relaxed">
                                      {service.description}
                                    </div>
                                  </div>
                                </Link>
                              </Reveal>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-8">
                      {secondaryGroups.map((group, groupIndex) => (
                        <div key={group.title}>
                          <div className="flex items-center gap-3">
                            <span className="h-2 w-2 rounded-full bg-sky-400" />
                            <div className="text-xs uppercase tracking-[0.3em] text-slate-500">
                              {group.title}
                            </div>
                          </div>
                          <div className="mt-4 space-y-3">
                            {group.items.map((service, index) => (
                              <Reveal key={service.title} delay={groupIndex * 120 + index * 60}>
                                <Link
                                  to={service.link}
                                  className="group flex items-start gap-4 rounded-2xl p-2 transition-all hover:-translate-y-0.5 hover:bg-slate-50"
                                >
                                  <div
                                    className={`w-11 h-11 rounded-full bg-gradient-to-br ${service.tone} flex items-center justify-center shadow-sm border border-white/50`}
                                  >
                                    {service.icon}
                                  </div>
                                  <div className="min-w-0">
                                    <div className="text-base font-medium text-slate-900 group-hover:text-primary-600 transition-colors">
                                      {service.title}
                                    </div>
                                    <div className="text-sm text-slate-500 leading-relaxed">
                                      {service.description}
                                    </div>
                                  </div>
                                </Link>
                              </Reveal>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="relative py-20 bg-white overflow-hidden">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(circle at 16% 12%, rgba(56,189,248,0.16), transparent 45%), radial-gradient(circle at 82% 82%, rgba(129,140,248,0.16), transparent 40%)',
            }}
          />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Reveal>
              <div className="max-w-2xl">
                <span className="text-xs font-semibold text-sky-500 uppercase tracking-[0.35em]">
                  Capabilities
                </span>
                <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-slate-900">
                  Built for brands, series, and ambitious launches
                </h2>
                <p className="mt-4 text-lg text-slate-600">
                  Explore our core service pillars. Each team is designed to collaborate seamlessly, so you get
                  cohesive storytelling and polished motion across every deliverable.
                </p>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => {
                const tone = detailTones[index % detailTones.length]
                const accent = detailAccents[index % detailAccents.length]

                return (
                  <Reveal key={service.id} delay={index * 80}>
                    <div className="group relative rounded-3xl border border-black/10 bg-white/90 p-6 sm:p-8 shadow-[0_14px_40px_rgba(15,23,42,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${tone} flex items-center justify-center border border-white/60 shadow-sm`}>
                        <div className={`h-5 w-5 rounded-[8px] ${accent} opacity-80`} />
                      </div>
                      <h3 className="mt-6 text-2xl font-display font-semibold text-slate-900">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-slate-600 leading-relaxed">
                        {service.description}
                      </p>
                      <ul className="mt-6 space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3 text-sm text-slate-600">
                            <span className={`mt-2 h-2 w-2 rounded-full ${accent}`} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        <section className="relative py-20 bg-[#f8fbff] overflow-hidden">
          <div
            className="absolute inset-0 opacity-45"
            style={{
              backgroundImage:
                'radial-gradient(circle at 12% 20%, rgba(56,189,248,0.2), transparent 45%), radial-gradient(circle at 80% 70%, rgba(251,113,133,0.16), transparent 40%)',
            }}
          />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Reveal>
              <div className="rounded-3xl border border-black/10 bg-white/80 p-8 sm:p-12 text-center shadow-[0_18px_50px_rgba(15,23,42,0.1)]">
                <span className="text-xs font-semibold text-sky-500 uppercase tracking-[0.35em]">
                  Let's Build Together
                </span>
                <h2 className="mt-4 text-3xl md:text-4xl font-display font-semibold text-slate-900">
                  Let's create something exceptional
                </h2>
                <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                  Partner with Naolito to bring your next animation project to life with the same quality trusted by
                  Netflix, Amazon, and Disney.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/contact">
                    <Button variant="primary" size="lg">
                      Get in Touch
                    </Button>
                  </Link>
                  <Link to="/portfolio">
                    <Button variant="outline" size="lg">
                      View Our Work
                    </Button>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Services
