import { Link } from 'react-router-dom'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import { serviceGroups } from '../../data/servicesCatalog'
import PipelineTimeline from './PipelineTimeline'

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
        <div className="mb-10">
          <PipelineTimeline />
        </div>

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 items-start">
          <Reveal className="max-w-xl">
            <span className="text-xs font-semibold text-sky-500 uppercase tracking-[0.35em] mb-4 block">
              What We Do
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight">
              Full-service animation
              <span className="pipeline-scan-wrapper block">
                <span className="pipeline-scan-text">Next gen Pipeline</span>
                <span className="pipeline-scan-beam" />
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
