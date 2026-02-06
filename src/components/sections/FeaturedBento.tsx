import { Link } from 'react-router-dom'
import type { Project } from '../../types'
import Reveal from '../ui/Reveal'

type FeaturedBentoProps = {
  projects: Project[]
}

const imageFallback = (seed: string) => `https://picsum.photos/seed/${seed}/1600/1000`

const FeaturedBento = ({ projects }: FeaturedBentoProps) => {
  if (projects.length === 0) return null

  const [hero, ...rest] = projects.slice(0, 5)
  const secondary = rest.slice(0, 2)
  const tertiary = rest.slice(2, 4)

  return (
    <section className="relative bg-[#f8fbff] pt-14 pb-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-500 mb-6">
            Featured Projects
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-2">
          <Reveal delay={80} className="lg:col-span-2 lg:row-span-2">
            <BentoCard project={hero} size="hero" />
          </Reveal>

          {secondary.map((project, index) => (
            <Reveal key={project.id} delay={160 + index * 100}>
              <BentoCard project={project} size="standard" />
            </Reveal>
          ))}
        </div>

        {tertiary.length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {tertiary.map((project, index) => (
              <Reveal key={project.id} delay={360 + index * 100}>
                <BentoCard project={project} size="wide" />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

type BentoCardProps = {
  project: Project
  size: 'hero' | 'standard' | 'wide'
}

const sizeClasses = {
  hero: 'aspect-[4/3] lg:aspect-auto lg:h-full min-h-[320px]',
  standard: 'aspect-[16/10] min-h-[200px]',
  wide: 'aspect-[21/10] min-h-[200px]',
}

const BentoCard = ({ project, size }: BentoCardProps) => {
  return (
    <Link
      to={`/portfolio/${project.id}`}
      className={`group relative block w-full overflow-hidden rounded-3xl border border-black/10 bg-black text-left shadow-[0_14px_38px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(15,23,42,0.16)] ${sizeClasses[size]}`}
    >
      <img
        src={project.thumbnailUrl}
        alt={project.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        loading="lazy"
        onError={(event) => {
          event.currentTarget.src = imageFallback(`bento-${project.id}`)
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-100 backdrop-blur-sm">
          {project.category}
        </div>
        <h3
          className={`mt-3 font-display font-semibold leading-tight text-white ${
            size === 'hero' ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-xl md:text-2xl'
          }`}
        >
          {project.title}
        </h3>
        {size === 'hero' && (
          <p className="mt-2 max-w-lg text-sm text-white/70 line-clamp-2 md:text-base">
            {project.description}
          </p>
        )}
        <div className="mt-2 text-xs font-semibold uppercase tracking-[0.26em] text-slate-300/80">
          {project.client || 'Original IP'} &middot; {project.year}
        </div>
      </div>

      {project.featured && (
        <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
          <svg className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      )}
    </Link>
  )
}

export default FeaturedBento
