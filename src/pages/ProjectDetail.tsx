import { useEffect, useRef, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import StreamVideo from '../components/ui/StreamVideo'
import Reveal from '../components/ui/Reveal'
import { useStore } from '../store/store'

const imageFallback = (seed: string) => `https://picsum.photos/seed/${seed}/1800/1100`

const getYouTubeId = (url: string): string | null => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const projects = useStore((state) => state.projects)
  const project = projects.find((p) => p.id === id)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  useEffect(() => {
    if (lightboxIndex === null) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxIndex(null)
      if (event.key === 'ArrowRight') setLightboxIndex((prev) => (prev! + 1) % galleryImages.length)
      if (event.key === 'ArrowLeft') setLightboxIndex((prev) => (prev! - 1 + galleryImages.length) % galleryImages.length)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lightboxIndex])

  if (!project) {
    return (
      <div className="min-h-screen bg-[#f8fbff]">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-display font-semibold text-slate-900">Project not found</h1>
            <p className="mt-4 text-slate-600">The project you are looking for does not exist.</p>
            <Link
              to="/portfolio"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Back to Portfolio
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const galleryImages = project.images.length > 0 ? project.images : [project.thumbnailUrl]

  return (
    <div className="min-h-screen bg-[#f8fbff]">
      <Header />
      <main className="pt-24 md:pt-28">
        {/* Back link */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

        {/* Header info */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <Reveal>
            <div className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
              {project.category} &middot; {project.year}
            </div>
            <h1 className="mt-2 text-4xl font-display font-semibold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
              {project.title}
            </h1>
          </Reveal>
        </div>

        {/* Media section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <Reveal delay={100}>
            <div className="overflow-hidden rounded-3xl border border-black/10 bg-black shadow-[0_20px_60px_rgba(15,23,42,0.1)]">
              {project.videoUrl && getYouTubeId(project.videoUrl) ? (
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(project.videoUrl)}?rel=0`}
                    title={project.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
              ) : project.videoUrl ? (
                <div className="aspect-video">
                  <StreamVideo
                    key={project.id}
                    source={project.videoUrl}
                    poster={project.thumbnailUrl}
                    playsInline
                    preload="metadata"
                    ref={videoRef}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video">
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.src = imageFallback(`detail-${project.id}`)
                    }}
                  />
                </div>
              )}
            </div>
          </Reveal>
        </div>

        {/* Info section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_300px]">
            <Reveal delay={180}>
              <p className="text-lg leading-relaxed text-slate-700">
                {project.description}
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="space-y-4">
                {project.client && (
                  <div className="rounded-2xl border border-black/10 bg-white p-4">
                    <div className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Client</div>
                    <div className="mt-1 text-lg font-semibold text-slate-900">{project.client}</div>
                  </div>
                )}
                <div className="rounded-2xl border border-black/10 bg-white p-4">
                  <div className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Year</div>
                  <div className="mt-1 text-lg font-semibold text-slate-900">{project.year}</div>
                </div>
                <div className="rounded-2xl border border-black/10 bg-white p-4">
                  <div className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Category</div>
                  <div className="mt-1">
                    <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700">
                      {project.category}
                    </span>
                  </div>
                </div>
                {project.featured && (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-semibold text-amber-700">Featured Project</span>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Gallery grid */}
        {galleryImages.length > 1 && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <Reveal>
              <div className="text-[11px] uppercase tracking-[0.3em] text-slate-500 mb-5">Gallery</div>
            </Reveal>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {galleryImages.map((image, index) => (
                <Reveal key={`gallery-${index}`} delay={40 + (index % 8) * 40}>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    className="group/thumb w-full overflow-hidden rounded-2xl border border-black/10 bg-slate-100 cursor-zoom-in"
                  >
                    <div className="aspect-[4/3]">
                      <img
                        src={image}
                        alt={`${project.title} still ${index + 1}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover/thumb:scale-[1.05]"
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.src = `https://picsum.photos/seed/gallery-${project.id}-${index}/800/600`
                        }}
                      />
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center overlay-enter">
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute inset-0 bg-black/90"
            aria-label="Close lightbox"
          />

          <div className="relative z-10 max-h-[90vh] max-w-[90vw]">
            <img
              src={galleryImages[lightboxIndex]}
              alt={`${project.title} still ${lightboxIndex + 1}`}
              className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
              onError={(event) => {
                event.currentTarget.src = `https://picsum.photos/seed/lb-${project.id}-${lightboxIndex}/1600/1000`
              }}
            />
          </div>

          {galleryImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length)}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/15 p-3 text-white backdrop-blur-sm transition hover:bg-white/25"
                aria-label="Previous image"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setLightboxIndex((lightboxIndex + 1) % galleryImages.length)}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/15 p-3 text-white backdrop-blur-sm transition hover:bg-white/25"
                aria-label="Next image"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/15 p-2.5 text-white backdrop-blur-sm transition hover:bg-white/25"
            aria-label="Close lightbox"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/15 px-4 py-2 text-sm text-white backdrop-blur-sm">
            {lightboxIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default ProjectDetail
