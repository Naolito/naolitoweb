import { Link } from 'react-router-dom'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import { pipelineSteps, serviceGroups } from '../../data/servicesCatalog'

const ServicesPreview = () => {
  const [primaryGroup, ...secondaryGroups] = serviceGroups

  return (
    <section className="relative py-24 bg-[#f8fbff] text-slate-900 overflow-hidden">
      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 30%, rgba(56,189,248,0.16), transparent 45%), radial-gradient(circle at 80% 70%, rgba(251,113,133,0.12), transparent 40%)',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <div className="relative mb-10">
            <div className="no-scrollbar overflow-x-auto md:overflow-visible pb-2 -mx-4 sm:mx-0 scroll-smooth">
              <div className="relative w-full px-4 sm:px-0">
                <div
                  className="absolute left-0 right-0 h-1 bg-sky-200/80 rounded-full"
                  style={{ top: '10px' }}
                />
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

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 items-start">
          <Reveal className="max-w-xl">
            <span className="text-xs font-semibold text-sky-500 uppercase tracking-[0.35em] mb-4 block">
              What We Do
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight">
              Full-service animation
              <span className="block text-transparent bg-gradient-to-r from-primary-600 via-accent-500 to-primary-500 bg-clip-text">
                Next gen Pipeline
              </span>
            </h2>
            <p className="mt-6 text-lg text-slate-600">
              From concept to viral distribution, we run the full pipeline with senior talent and obsessive craft.
              Our production flow is built for transparency, so you can follow every stage, review progress, and
              step in with feedback at the moments that matter. It’s a streamlined, advanced pipeline designed to
              keep teams aligned, timelines efficient, and the final work unmistakably on‑brand.
            </p>
            <div className="mt-8">
              <Link to="/contact">
                <Button variant="primary" size="md">
                  Start a Project
                </Button>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="rounded-3xl border border-black/10 bg-white/80 p-6 sm:p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
                <div className="space-y-10">
                  {primaryGroup && (
                    <div>
                      <Reveal>
                        <div className="flex items-center gap-3">
                          <span className="h-2 w-2 rounded-full bg-sky-400" />
                          <div className="text-xs uppercase tracking-[0.3em] text-slate-500">
                            {primaryGroup.title}
                          </div>
                        </div>
                      </Reveal>
                    <div className="mt-4 space-y-3">
                      {primaryGroup.items.map((service, index) => (
                          <Reveal key={service.title} delay={index * 80}>
                            <Link
                              to={service.link}
                              className="group flex items-start gap-4 transition-all hover:-translate-y-0.5"
                            >
                            <div
                              className={`w-11 h-11 rounded-full bg-gradient-to-br ${service.tone} flex items-center justify-center shadow-sm`}
                            >
                              {service.icon}
                            </div>
                            <div className="min-w-0">
                              <div className="text-base font-medium text-slate-900 group-hover:text-primary-600 transition-colors">
                                {service.title}
                              </div>
                            </div>
                          </Link>
                        </Reveal>
                      ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-10">
                  {secondaryGroups.map((group, groupIndex) => (
                    <div key={group.title}>
                      <Reveal delay={groupIndex * 120}>
                        <div className="flex items-center gap-3">
                          <span className="h-2 w-2 rounded-full bg-sky-400" />
                          <div className="text-xs uppercase tracking-[0.3em] text-slate-500">
                            {group.title}
                          </div>
                        </div>
                      </Reveal>
                    <div className="mt-4 space-y-3">
                      {group.items.map((service, index) => (
                          <Reveal key={service.title} delay={groupIndex * 120 + index * 80}>
                            <Link
                              to={service.link}
                              className="group flex items-start gap-4 transition-all hover:-translate-y-0.5"
                            >
                            <div
                              className={`w-11 h-11 rounded-full bg-gradient-to-br ${service.tone} flex items-center justify-center shadow-sm`}
                            >
                              {service.icon}
                            </div>
                            <div className="min-w-0">
                              <div className="text-base font-medium text-slate-900 group-hover:text-primary-600 transition-colors">
                                {service.title}
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
  )
}

export default ServicesPreview
