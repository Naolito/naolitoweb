import { useEffect, useMemo, useRef, useState } from 'react'
import { mockProjectImages } from '../../store/mockData'
import { fetchContent } from '../../lib/contentApi'
import { MediaItem, normalizeMediaItem } from '../../lib/contentSections'
import Reveal from '../ui/Reveal'
import StreamVideo from '../ui/StreamVideo'

type OriginalItem = {
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


const fallbackOriginals: OriginalItem[] = [
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
  const [items, setItems] = useState<OriginalItem[]>(fallbackOriginals)
  const [activeId, setActiveId] = useState(fallbackOriginals[0]?.id ?? '')
  const [scrollFade, setScrollFade] = useState({ top: 0, bottom: 0 })
  const active = useMemo(
    () => items.find((item) => item.id === activeId) ?? items[0],
    [activeId, items],
  )
  const playlistRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let isCancelled = false

    fetchContent<MediaItem[]>('originals').then((data) => {
      if (isCancelled) return
      if (!Array.isArray(data) || data.length === 0) return

      const mapped = data.map((item) => {
        const normalized = normalizeMediaItem(item)
        return {
          id: normalized.id,
          title: normalized.title,
          description: normalized.description,
          tag: normalized.tag,
          year: normalized.year,
          duration: normalized.duration,
          likes: normalized.likes,
          src: normalized.videoUrl,
          poster: normalized.posterUrl || mockProjectImages.motion[0],
          ratio: normalized.ratio,
        }
      })

      setItems(mapped)
      setActiveId((prev) => (mapped.some((item) => item.id === prev) ? prev : mapped[0].id))
    })

    return () => {
      isCancelled = true
    }
  }, [])

  const videoRef = useRef<HTMLVideoElement>(null)

  const updateScrollFade = () => {
    const playlist = playlistRef.current
    if (!playlist) return

    const { scrollTop, scrollHeight, clientHeight } = playlist
    const maxScroll = Math.max(scrollHeight - clientHeight, 0)

    if (maxScroll <= 1) {
      setScrollFade({ top: 0, bottom: 0 })
      return
    }

    const edgeRange = 96
    const nextTop = Math.min(scrollTop / edgeRange, 1)
    const nextBottom = Math.min((maxScroll - scrollTop) / edgeRange, 1)

    setScrollFade({ top: nextTop, bottom: nextBottom })
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const attemptPlay = () => {
      if (video.readyState >= 2) {
        const playPromise = video.play()
        if (playPromise?.catch) {
          playPromise.catch(() => undefined)
        }
      } else {
        video.addEventListener('loadeddata', () => {
          const playPromise = video.play()
          if (playPromise?.catch) {
            playPromise.catch(() => undefined)
          }
        }, { once: true })
      }
    }

    attemptPlay()
  }, [activeId])

  useEffect(() => {
    updateScrollFade()
    const handleResize = () => updateScrollFade()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [items.length])

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

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.65fr] items-start">
          <Reveal delay={160}>
            <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-black shadow-[0_20px_60px_rgba(15,23,42,0.1)]">
              {active && (
                <div className="relative w-full aspect-video">
                  <StreamVideo
                    key={active.id}
                    source={active.src}
                    poster={active.poster}
                    playsInline
                    muted
                    loop
                    preload="metadata"
                    ref={videoRef}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="text-[11px] uppercase tracking-[0.35em] text-slate-500">Playlist</div>
            <div className="relative mt-4">
              <div
                ref={playlistRef}
                onScroll={updateScrollFade}
                className="max-h-[72vh] overflow-y-auto no-scrollbar space-y-3"
              >
                {items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveId(item.id)}
                    className={`group relative block w-full text-left overflow-hidden rounded-2xl border transition-all ${
                      item.id === activeId
                        ? 'border-sky-300 shadow-[0_8px_24px_rgba(14,165,233,0.2)]'
                        : 'border-black/10 hover:border-slate-300'
                    }`}
                  >
                    <div className="relative h-80 sm:h-[22rem] bg-slate-100">
                      <img
                        src={item.poster}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(event) => {
                          event.currentTarget.src = `https://picsum.photos/seed/original-${item.id}/640/360`
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent opacity-100" />
                      <div className="absolute inset-x-0 bottom-0 p-6 opacity-100">
                        <div className="text-[0.95rem] sm:text-[1.05rem] uppercase tracking-[0.22em] text-white/75">
                          {item.tag || 'Studio Original'}
                        </div>
                        <div className="mt-2 text-3xl sm:text-4xl font-semibold text-white truncate">{item.title}</div>
                        <div className="mt-2 text-[0.95rem] sm:text-[1.05rem] uppercase tracking-[0.2em] text-white/75">
                          {formatCount(item.likes)} likes
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[#f8fbff] to-transparent transition-opacity duration-200"
                style={{ opacity: scrollFade.top }}
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#f8fbff] to-transparent transition-opacity duration-200"
                style={{ opacity: scrollFade.bottom }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default StudioOriginals
