import { useEffect, useMemo, useRef, useState } from 'react'
import { mockProjectImages } from '../../store/mockData'
import { fetchContent } from '../../lib/contentApi'
import { MediaItem, normalizeMediaItem } from '../../lib/contentSections'
import Reveal from '../ui/Reveal'
import StreamVideo from '../ui/StreamVideo'

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
  if (value >= 1000000) return `${(value / 1000000).toFixed(1).replace('.0', '')}m`
  if (value >= 1000) return `${(value / 1000).toFixed(1).replace('.0', '')}k`
  return `${value}`
}

const PastClientProjects = () => {
  const [projects, setProjects] = useState<ClientProject[]>(fallbackPastProjects)
  const [activeId, setActiveId] = useState(fallbackPastProjects[0]?.id ?? '')
  const [hasInteracted, setHasInteracted] = useState(false)
  const [likes, setLikes] = useState<Record<string, number>>(
    Object.fromEntries(fallbackPastProjects.map((item) => [item.id, item.likes])) as Record<string, number>,
  )
  const [liked, setLiked] = useState<Record<string, boolean>>(
    Object.fromEntries(fallbackPastProjects.map((item) => [item.id, false])) as Record<string, boolean>,
  )
  const active = useMemo(
    () => projects.find((item) => item.id === activeId) ?? projects[0],
    [activeId, projects],
  )

  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [playlistHeight, setPlaylistHeight] = useState<number | undefined>(undefined)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    let isCancelled = false

    fetchContent<MediaItem[]>('client-projects').then((projectData) => {
      if (isCancelled) return

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

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), {
      threshold: 0.5,
    })

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) setPlaylistHeight(containerRef.current.offsetHeight)
    }
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (!(hasInteracted || isInView)) return

    const attemptPlay = () => {
      if (video.readyState >= 2) {
        const playPromise = video.play()
        if (playPromise?.catch) playPromise.catch(() => undefined)
      } else {
        video.addEventListener(
          'loadeddata',
          () => {
            const playPromise = video.play()
            if (playPromise?.catch) playPromise.catch(() => undefined)
          },
          { once: true },
        )
      }
    }

    attemptPlay()
  }, [activeId, hasInteracted, isInView])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (!isInView && !video.paused) video.pause()
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
                    playsInline
                    preload="metadata"
                    ref={videoRef}
                    className="w-full h-full object-cover rounded-3xl"
                  />
                </div>
              )}
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
                  } ${item.id === activeId ? 'bg-sky-50' : 'hover:bg-sky-50/60'}`}
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
                      <div className="text-lg font-semibold text-slate-900 truncate">{item.title}</div>
                      <div className="text-sm text-slate-600 line-clamp-2">{item.description}</div>
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
    </section>
  )
}

export default PastClientProjects
