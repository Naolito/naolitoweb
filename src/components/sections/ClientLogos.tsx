import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { mockProjectImages } from '../../store/mockData'
import { fetchContent } from '../../lib/contentApi'
import { ClientLogo as AdminClientLogo, MediaItem, normalizeClientLogo, normalizeMediaItem } from '../../lib/contentSections'
import Reveal from '../ui/Reveal'
import StreamVideo from '../ui/StreamVideo'

const makeWordmark = (label: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="80" viewBox="0 0 320 80">
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Syne, Sora, Arial, sans-serif" font-size="36" letter-spacing="2" fill="#0f172a">${label}</text>
    </svg>`
  )}`

type ClientLogo = {
  name: string
  logo: string
  fallback?: string
}

type ClientProject = {
  id: string
  title: string
  description: string
  tag: string
  year: string
  duration: string
  likes: number
  src: string
  poster: string
  ratio: 'landscape' | 'portrait' | 'square'
}


const fallbackClients: ClientLogo[] = [
  {
    name: 'Netflix',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    fallback: makeWordmark('Netflix'),
  },
  {
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    fallback: makeWordmark('Amazon'),
  },
  {
    name: 'PlayStation',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg',
    fallback: makeWordmark('PlayStation'),
  },
  { name: 'Disney', logo: makeWordmark('Disney'), fallback: makeWordmark('Disney') },
  { name: 'Nestlé', logo: makeWordmark('Nestlé'), fallback: makeWordmark('Nestlé') },
]

const fallbackPastProjects: ClientProject[] = [
  {
    id: 'client-01',
    title: 'Netflix Holiday Campaign',
    description: 'Character-first storytelling with a global rollout.',
    tag: 'Campaign',
    year: '2024',
    duration: '01:42',
    likes: 1400,
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: mockProjectImages.character[0],
    ratio: 'landscape',
  },
  {
    id: 'client-02',
    title: 'PlayStation 5 Launch Spot',
    description: 'Next-gen cinematic spot with bold character moments.',
    tag: 'Launch Spot',
    year: '2023',
    duration: '00:58',
    likes: 871,
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    poster: mockProjectImages.animation3d[0],
    ratio: 'landscape',
  },
  {
    id: 'client-03',
    title: 'Amazon Prime Series Titles',
    description: 'Motion-driven title system with editorial energy.',
    tag: 'Motion Graphics',
    year: '2024',
    duration: '01:12',
    likes: 1100,
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    poster: mockProjectImages.motion[0],
    ratio: 'landscape',
  },
  {
    id: 'client-04',
    title: 'Disney+ Character Development',
    description: 'Design-led character exploration for episodic content.',
    tag: 'Character Design',
    year: '2023',
    duration: '01:05',
    likes: 932,
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    poster: mockProjectImages.animation2d[0],
    ratio: 'landscape',
  },
]

const formatCount = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1).replace('.0', '')}m`
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1).replace('.0', '')}k`
  }
  return `${value}`
}

const ClientLogos = () => {
  const [logos, setLogos] = useState<ClientLogo[]>(fallbackClients)
  const [projects, setProjects] = useState<ClientProject[]>(fallbackPastProjects)
  const [activeId, setActiveId] = useState(fallbackPastProjects[0]?.id ?? '')
  const [hasInteracted, setHasInteracted] = useState(false)
  const [likes, setLikes] = useState<Record<string, number>>(() => (
    Object.fromEntries(fallbackPastProjects.map((item) => [item.id, item.likes])) as Record<string, number>
  ))
  const [liked, setLiked] = useState<Record<string, boolean>>(() => (
    Object.fromEntries(fallbackPastProjects.map((item) => [item.id, false])) as Record<string, boolean>
  ))
  const active = useMemo(
    () => projects.find((item) => item.id === activeId) ?? projects[0],
    [activeId, projects],
  )

  useEffect(() => {
    let isCancelled = false

    Promise.all([
      fetchContent<AdminClientLogo[]>('client-logos'),
      fetchContent<MediaItem[]>('client-projects'),
    ]).then(([logoData, projectData]) => {
      if (isCancelled) return

      const mappedLogos = (logoData || [])
        .map((item) => normalizeClientLogo(item))
        .filter((item) => item.logoUrl)
        .map((item) => ({
          name: item.name,
          logo: item.logoUrl,
          fallback: makeWordmark(item.name),
        }))

      if (mappedLogos.length > 0) {
        setLogos(mappedLogos)
      }

      const mappedProjects = (projectData || [])
        .map((item) => normalizeMediaItem(item))
        .filter((item) => item.videoUrl)
        .map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          tag: item.tag,
          year: item.year,
          duration: item.duration,
          likes: item.likes,
          src: item.videoUrl,
          poster: item.posterUrl || mockProjectImages.motion[0],
          ratio: item.ratio,
        }))

      if (mappedProjects.length > 0) {
        setProjects(mappedProjects)
        setLikes(Object.fromEntries(mappedProjects.map((item) => [item.id, item.likes])) as Record<string, number>)
        setLiked(Object.fromEntries(mappedProjects.map((item) => [item.id, false])) as Record<string, boolean>)
        setActiveId((prev) => (mappedProjects.some((item) => item.id === prev) ? prev : mappedProjects[0].id))
      }
    })

    return () => {
      isCancelled = true
    }
  }, [])

  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [playlistHeight, setPlaylistHeight] = useState<number | undefined>(undefined)
  const [isInView, setIsInView] = useState(false)

  // Custom IntersectionObserver for viewport detection
  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('[ClientLogos] Intersection changed:', entry.isIntersecting)
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.5 }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setPlaylistHeight(containerRef.current.offsetHeight)
      }
    }
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    console.log('[ClientLogos] Play check:', { hasInteracted, isInView, activeId })

    // Only play if: (user interacted and changed video) OR (video is in viewport for first time)
    const shouldPlay = (hasInteracted || isInView)

    if (!shouldPlay) {
      console.log('[ClientLogos] Should not play yet')
      return
    }

    console.log('[ClientLogos] Attempting to play video...')

    // Wait for video to be ready before playing
    const attemptPlay = () => {
      if (video.readyState >= 2) { // HAVE_CURRENT_DATA or better
        const playPromise = video.play()
        if (playPromise?.catch) {
          playPromise.catch(() => undefined)
        }
      } else {
        // Video not ready yet, wait for it
        video.addEventListener('loadeddata', () => {
          const playPromise = video.play()
          if (playPromise?.catch) {
            playPromise.catch(() => undefined)
          }
        }, { once: true })
      }
    }

    attemptPlay()
  }, [activeId, hasInteracted, isInView])

  // Debug isInView changes
  useEffect(() => {
    console.log('[ClientLogos] isInView changed:', isInView)
  }, [isInView])

  // Pause video when out of view
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (!isInView && !video.paused) {
      console.log('[ClientLogos] Pausing video (out of view)')
      video.pause()
    }
  }, [isInView])

  const toggleLike = (id: string) => {
    setLiked((prev) => {
      const nextValue = !prev[id]
      setLikes((current) => ({
        ...current,
        [id]: Math.max(0, current[id] + (nextValue ? 1 : -1)),
      }))
      return { ...prev, [id]: nextValue }
    })
  }

  return (
    <section className="relative py-24 bg-[#f8fbff]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rounded-3xl border border-black/10 bg-white/90 p-6 sm:p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
          <div className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-500">Global brands who trust us</div>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {logos.map((client, index) => (
              <div
                key={client.name}
                className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white px-6 py-6 flex items-center justify-center hover:border-black/20 hover:bg-slate-50 transition-all client-card-animate"
                style={{ '--delay': `${index * 120 + 140}ms` } as CSSProperties}
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-7 md:h-8 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0 client-logo-animate"
                  loading="lazy"
                  onError={(event) => {
                    const target = event.currentTarget
                    if (target.dataset.fallback === '1') return
                    if (client.fallback) {
                      target.dataset.fallback = '1'
                      target.src = client.fallback
                    }
                  }}
                />
              </div>
            ))}
          </div>
          </div>
        </Reveal>

        <div className="mt-14">
          <Reveal>
            <div className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-500">
              Past Client Projects
            </div>
          </Reveal>

          <div className="mt-6 grid lg:grid-cols-[1.35fr_0.65fr] gap-10 items-start">
            <Reveal delay={160}>
              <div
                ref={containerRef}
                className="relative overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
              >
                {active && (
                  <div className="w-full aspect-video rounded-3xl overflow-hidden">
                    <StreamVideo
                      key={active.id}
                      source={active.src}
                      poster={active.poster}
                      controls
                      playsInline
                      preload="metadata"
                      ref={videoRef}
                      className="w-full h-full object-cover rounded-3xl"
                    />
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/90 px-3 py-1.5 text-[11px] uppercase tracking-[0.35em] text-sky-600 backdrop-blur">
                    Now Playing
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={240} className="relative">
              <div
                className="overflow-y-auto pr-2"
                style={{ maxHeight: playlistHeight ? `${playlistHeight}px` : undefined }}
              >
                {projects.map((item, index) => (
                  <div
                    key={item.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setHasInteracted(true)
                      setActiveId(item.id)
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        setHasInteracted(true)
                        setActiveId(item.id)
                      }
                    }}
                    className={`w-full text-left px-5 py-4 transition-all cursor-pointer playlist-item-animate ${
                      index > 0 ? 'border-t border-black/10' : ''
                    } ${
                      item.id === activeId
                        ? 'bg-sky-50'
                        : 'hover:bg-sky-50/60'
                    }`}
                    style={{ animationDelay: `${180 + index * 140}ms` }}
                  >
                    <div className="flex gap-4 items-center">
                      <div className="relative w-20 h-14 rounded-xl overflow-hidden border border-black/10 bg-white">
                        <img
                          src={item.poster}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = `https://picsum.photos/seed/client-${item.id}/400/300`
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                          {item.tag} • {item.year}
                        </div>
                        <div className="text-lg font-semibold text-slate-900 truncate">
                          {item.title}
                        </div>
                        <div className="text-sm text-slate-600 line-clamp-2">
                          {item.description}
                        </div>
                        <div className="mt-2 text-[11px] uppercase tracking-[0.3em] text-slate-500">
                          {item.duration} • {formatCount(likes[item.id] ?? item.likes)} likes
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation()
                          toggleLike(item.id)
                        }}
                        className={`shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                          liked[item.id]
                            ? 'border-sky-300 bg-sky-100 text-sky-600'
                            : 'border-black/10 text-slate-500 hover:text-slate-900 hover:border-black/20 hover:bg-sky-50'
                        }`}
                        aria-pressed={liked[item.id]}
                        aria-label={`Like ${item.title}`}
                      >
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill={liked[item.id] ? 'currentColor' : 'none'}
                          stroke="currentColor"
                          strokeWidth={1.8}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pointer-events-none absolute top-0 left-0 right-2 h-8 bg-gradient-to-b from-[#f8fbff] to-transparent" />
              <div className="pointer-events-none absolute bottom-0 left-0 right-2 h-8 bg-gradient-to-t from-[#f8fbff] to-transparent" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ClientLogos
