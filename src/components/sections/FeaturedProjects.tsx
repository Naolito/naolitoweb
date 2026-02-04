import { Link } from 'react-router-dom'
import { useStore } from '../../store/store'
import Reveal from '../ui/Reveal'

const FeaturedProjects = () => {
  const getFeaturedProjects = useStore((state) => state.getFeaturedProjects)
  const featuredProjects = getFeaturedProjects()
  const gridItems = [...featuredProjects, ...featuredProjects, ...featuredProjects].slice(0, 7)
  const [
    banner,
    leftTop,
    leftBottom,
    rightLarge,
    bottomLeft,
    bottomCenter,
    bottomRight,
  ] = gridItems

  return (
    <section className="relative py-24 bg-[#f8fbff] overflow-hidden">
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 15%, rgba(56,189,248,0.16), transparent 45%), radial-gradient(circle at 85% 85%, rgba(251,113,133,0.14), transparent 40%)',
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <span className="text-xs font-semibold text-sky-500 uppercase tracking-[0.35em] mb-4 block">
            Featured Projects
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-slate-900 leading-tight">
            Campaigns that feel like
            <span className="block text-transparent bg-gradient-to-r from-primary-600 via-accent-500 to-primary-500 bg-clip-text">
              cultural events
            </span>
          </h2>
        </Reveal>

        <div className="mt-12 space-y-4">
          <Reveal>
            <Link
              to="/portfolio"
              className="group relative block overflow-hidden rounded-3xl border border-black/10 bg-white h-[240px] md:h-[320px]"
            >
              <img
                src={banner?.thumbnailUrl}
                alt={banner?.title ?? 'Featured work'}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = 'https://picsum.photos/seed/featured-banner/1600/900'
                }}
              />
            </Link>
          </Reveal>

          <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
            <Reveal className="lg:col-span-1 lg:row-span-1 lg:col-start-1 lg:row-start-1">
              <Link
                to="/portfolio"
                className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white h-[160px] md:h-[180px]"
              >
                <img
                  src={leftTop?.thumbnailUrl}
                  alt={leftTop?.title ?? 'Studio'}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = 'https://picsum.photos/seed/left-top/800/600'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                <div className="absolute left-4 bottom-4 text-sm font-semibold text-white">
                  {leftTop?.title ?? 'Studio Work'}
                </div>
              </Link>
            </Reveal>

            <Reveal className="lg:col-span-1 lg:row-span-1 lg:col-start-1 lg:row-start-2">
              <Link
                to="/portfolio"
                className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white h-[160px] md:h-[180px]"
              >
                <img
                  src={leftBottom?.thumbnailUrl}
                  alt={leftBottom?.title ?? 'Studio'}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = 'https://picsum.photos/seed/left-bottom/800/600'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                <div className="absolute left-4 bottom-4 text-sm font-semibold text-white">
                  {leftBottom?.title ?? 'Studio Work'}
                </div>
              </Link>
            </Reveal>

            <Reveal className="lg:col-span-2 lg:row-span-2 lg:col-start-2 lg:row-start-1">
              <Link
                to="/portfolio"
                className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white h-[320px] md:h-[360px] lg:h-full"
              >
                <img
                  src={rightLarge?.thumbnailUrl}
                  alt={rightLarge?.title ?? 'Featured'}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = 'https://picsum.photos/seed/center/1200/900'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                <div className="absolute left-6 bottom-6 text-white">
                  <div className="text-xs uppercase tracking-[0.35em] text-white/70">
                    {rightLarge?.category ?? 'Spotlight'}
                  </div>
                  <div className="mt-2 text-2xl md:text-3xl font-display font-semibold">
                    {rightLarge?.title ?? 'Campaign'}
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[bottomLeft, bottomCenter, bottomRight].map((project, index) => (
              <Reveal key={project?.id ?? `bottom-${index}`}>
                <Link
                  to="/portfolio"
                  className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white h-[200px]"
                >
                  <img
                    src={project?.thumbnailUrl}
                    alt={project?.title ?? 'Featured'}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = `https://picsum.photos/seed/bottom-${index}/900/600`
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute left-5 bottom-5 text-white text-lg font-semibold">
                    {project?.title ?? 'Featured'}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects
