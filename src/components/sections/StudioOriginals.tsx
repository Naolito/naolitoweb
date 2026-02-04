import { useEffect, useMemo, useRef, useState } from 'react'
import { mockProjectImages } from '../../store/mockData'
import Reveal from '../ui/Reveal'

const originals = [
  {
    id: 'orig-01',
    title: 'Paper Worlds',
    description: 'A poetic micro‑short exploring handcrafted textures and character nuance.',
    tag: 'Short Film',
    year: '2025',
    duration: '01:42',
    likes: 871,
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: mockProjectImages.animation2d[0],
    ratio: 'landscape',
  },
  {
    id: 'orig-02',
    title: 'Neon Runner',
    description: 'Fast‑cut animation built for vertical platforms and high replay value.',
    tag: 'Series Pilot',
    year: '2024',
    duration: '02:08',
    likes: 1400,
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    poster: mockProjectImages.motion[0],
    ratio: 'portrait',
  },
  {
    id: 'orig-03',
    title: 'Bloom',
    description: 'A visual poem about growth, resilience, and the power of color.',
    tag: 'Studio Original',
    year: '2025',
    duration: '01:26',
    likes: 632,
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    poster: mockProjectImages.character[1],
    ratio: 'square',
  },
  {
    id: 'orig-04',
    title: 'Orbit',
    description: 'A short built for social feeds with fast hooks and cinematic lighting.',
    tag: 'Social Short',
    year: '2024',
    duration: '00:58',
    likes: 980,
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    poster: mockProjectImages.animation3d[0],
    ratio: 'landscape',
  },
  {
    id: 'orig-05',
    title: 'Paper Parade',
    description: 'Handmade textures meet playful motion in a tiny paper universe.',
    tag: 'Short Film',
    year: '2025',
    duration: '01:18',
    likes: 1200,
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: mockProjectImages.animation2d[1],
    ratio: 'landscape',
  },
  {
    id: 'orig-06',
    title: 'Candy Rockets',
    description: 'A candy-colored sprint through speed lines and neon glows.',
    tag: 'Studio Original',
    year: '2025',
    duration: '00:46',
    likes: 871,
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    poster: mockProjectImages.motion[2],
    ratio: 'landscape',
  },
  {
    id: 'orig-07',
    title: 'Tiny Giants',
    description: 'A vertical-friendly short built for punchy reveals.',
    tag: 'Social Short',
    year: '2024',
    duration: '00:52',
    likes: 1400,
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    poster: mockProjectImages.character[2],
    ratio: 'portrait',
  },
  {
    id: 'orig-08',
    title: 'Glitch Garden',
    description: 'Experimental color blooms and character silhouettes.',
    tag: 'Experimental',
    year: '2023',
    duration: '01:05',
    likes: 632,
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    poster: mockProjectImages.motion[1],
    ratio: 'square',
  },
  {
    id: 'orig-09',
    title: 'Starship Steps',
    description: 'A playful music-driven micro short in a sci‑fi corridor.',
    tag: 'Music Short',
    year: '2024',
    duration: '01:10',
    likes: 980,
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    poster: mockProjectImages.animation3d[1],
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

const StudioOriginals = () => {
  const [activeId, setActiveId] = useState(originals[0]?.id ?? '')
  const [likes, setLikes] = useState<Record<string, number>>(() => (
    Object.fromEntries(originals.map((item) => [item.id, item.likes])) as Record<string, number>
  ))
  const [liked, setLiked] = useState<Record<string, boolean>>(() => (
    Object.fromEntries(originals.map((item) => [item.id, false])) as Record<string, boolean>
  ))
  const active = useMemo(
    () => originals.find((item) => item.id === activeId) ?? originals[0],
    [activeId],
  )
  const isTall = active?.ratio !== 'landscape'

  const videoContainerRef = useRef<HTMLDivElement>(null)
  const [playlistHeight, setPlaylistHeight] = useState<number | undefined>(undefined)

  useEffect(() => {
    const updateHeight = () => {
      if (videoContainerRef.current) {
        setPlaylistHeight(videoContainerRef.current.offsetHeight)
      }
    }
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

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
    <section className="relative py-24 bg-[#f8fbff] overflow-hidden">
      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            'radial-gradient(circle at 18% 20%, rgba(56,189,248,0.18), transparent 45%), radial-gradient(circle at 82% 65%, rgba(251,113,133,0.16), transparent 40%), radial-gradient(circle at 50% 90%, rgba(253,224,71,0.14), transparent 45%)',
        }}
      />

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12">
        <Reveal>
          <span className="text-xs font-semibold text-sky-500 uppercase tracking-[0.35em]">
            Naolito Originals
          </span>
        </Reveal>

        <div className="mt-6 grid lg:grid-cols-[1.35fr_0.65fr] gap-10 items-start">
          <Reveal delay={160}>
            <div
              ref={videoContainerRef}
              className={`relative overflow-hidden rounded-3xl border border-black/10 ${
                isTall ? 'bg-slate-100' : 'bg-white'
              } shadow-[0_20px_60px_rgba(15,23,42,0.08)]`}
            >
              {active && (
                <div className="w-full aspect-video">
                  <video
                    key={active.id}
                    src={active.src}
                    poster={active.poster}
                    controls
                    muted
                    playsInline
                    preload="metadata"
                    className={`w-full h-full ${isTall ? 'object-contain bg-slate-100' : 'object-cover'} rounded-none`}
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
              {originals.map((item, index) => (
                <div
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveId(item.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      setActiveId(item.id)
                    }
                  }}
                  className={`w-full text-left px-5 py-4 transition-all cursor-pointer ${
                    index > 0 ? 'border-t border-black/10' : ''
                  } ${
                    item.id === activeId
                      ? 'bg-sky-50'
                      : 'hover:bg-sky-50/60'
                  }`}
                >
                  <div className="flex gap-4 items-center">
                    <div className="relative w-20 h-14 rounded-xl overflow-hidden border border-black/10 bg-white">
                      <img
                        src={item.poster}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `https://picsum.photos/seed/original-${item.id}/400/300`
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
    </section>
  )
}

export default StudioOriginals
