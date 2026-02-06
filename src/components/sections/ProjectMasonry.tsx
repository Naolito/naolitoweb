import { Link } from 'react-router-dom'
import type { Project } from '../../types'
import Reveal from '../ui/Reveal'

type ProjectMasonryProps = {
  projects: Project[]
}

const imageFallback = (seed: string) => `https://picsum.photos/seed/${seed}/1600/1000`

const aspectPatterns = [
  'aspect-[3/4]',   // portrait
  'aspect-[16/10]', // landscape
  'aspect-[1/1]',   // square
  'aspect-[16/9]',  // wide
  'aspect-[4/5]',   // tall portrait
  'aspect-[3/2]',   // standard landscape
]

const ProjectMasonry = ({ projects }: ProjectMasonryProps) => {
  if (projects.length === 0) {
    return (
      <section className="bg-[#f8fbff] pb-20 pt-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-black/10 bg-white p-12 text-center">
            <div className="text-4xl mb-4">0</div>
            <div className="text-lg font-semibold text-slate-900">No projects found</div>
            <p className="mt-2 text-slate-500">Try selecting a different category.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[#f8fbff] pb-20 pt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={80 + (index % 6) * 60}>
              <Link
                to={`/portfolio/${project.id}`}
                className="group mb-4 block w-full overflow-hidden rounded-3xl border border-black/10 bg-black text-left shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(15,23,42,0.14)] break-inside-avoid"
              >
                <div className="relative">
                  <div className={aspectPatterns[index % aspectPatterns.length]}>
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.src = imageFallback(`masonry-${project.id}`)
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                  <div className="absolute left-4 top-4">
                    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                    <h3 className="text-lg font-display font-semibold leading-tight text-white md:text-xl">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-white/65 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-300/75">
                      {project.client || 'Original IP'} &middot; {project.year}
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectMasonry
