import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import Hls from 'hls.js'

type StreamVideoProps = Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'src'> & {
  source: string
}

const formatTime = (value: number) => {
  if (!Number.isFinite(value) || value < 0) return '0:00'
  const totalSeconds = Math.floor(value)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const StreamVideo = forwardRef<HTMLVideoElement, StreamVideoProps>(({ source, ...props }, ref) => {
  const innerRef = useRef<HTMLVideoElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [resolvedSource, setResolvedSource] = useState<string>(source)
  const [isResolving, setIsResolving] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [volume, setVolume] = useState(1)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [showControls, setShowControls] = useState(false)
  const hideTimerRef = useRef<number | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isScrubbing, setIsScrubbing] = useState(false)

  useImperativeHandle(ref, () => innerRef.current as HTMLVideoElement)

  // Resolve stream source (keep Cloudflare master manifest to preserve audio tracks)
  useEffect(() => {
    console.log('[StreamVideo DEBUG] Source changed:', source)
    const isCloudflareStream = (
      (source.includes('videodelivery.net') || source.includes('cloudflarestream.com')) &&
      source.includes('.m3u8')
    )
    console.log('[StreamVideo DEBUG] Is Cloudflare Stream:', isCloudflareStream)

    if (!isCloudflareStream) {
      console.log('[StreamVideo DEBUG] Not Cloudflare Stream, using source as-is')
    } else {
      console.log('[StreamVideo DEBUG] Cloudflare Stream detected, using master manifest to preserve audio tracks')
    }

    setIsResolving(false)
    setResolvedSource(source)
  }, [source])

  useEffect(() => {
    const video = innerRef.current
    if (!video || !resolvedSource || isResolving) return

    console.log('[StreamVideo DEBUG] Setting up video with resolved source:', resolvedSource)
    console.log('[StreamVideo DEBUG] Video element muted:', video.muted)
    console.log('[StreamVideo DEBUG] Video has muted attribute:', video.hasAttribute('muted'))
    console.log('[StreamVideo DEBUG] Browser:', navigator.userAgent)
    console.log('[StreamVideo DEBUG] canPlayType HLS:', video.canPlayType('application/vnd.apple.mpegurl'))
    console.log('[StreamVideo DEBUG] HLS.isSupported:', Hls.isSupported())

    // Start muted to allow autoplay; user can enable sound via UI
    video.muted = true
    video.volume = 1.0
    setIsMuted(true)

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleTime = () => setCurrentTime(video.currentTime || 0)
    const handleMetadata = () => setDuration(video.duration || 0)
    const handleVolume = () => {
      setIsMuted(video.muted || video.volume === 0)
      setVolume(video.volume)
    }

    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('timeupdate', handleTime)
    video.addEventListener('loadedmetadata', handleMetadata)
    video.addEventListener('durationchange', handleMetadata)
    video.addEventListener('volumechange', handleVolume)

    // Force HLS.js for Cloudflare Stream to have full control over quality
    const isCloudflareStream = resolvedSource.includes('cloudflarestream.com') || resolvedSource.includes('videodelivery.net')

    if (video.canPlayType('application/vnd.apple.mpegurl') && !isCloudflareStream) {
      console.log('[StreamVideo DEBUG] Using native HLS (Safari/iOS) for non-Cloudflare video')
      video.src = resolvedSource
      video.load()
      return () => {
        video.removeEventListener('play', handlePlay)
        video.removeEventListener('pause', handlePause)
        video.removeEventListener('timeupdate', handleTime)
        video.removeEventListener('loadedmetadata', handleMetadata)
        video.removeEventListener('durationchange', handleMetadata)
        video.removeEventListener('volumechange', handleVolume)
      }
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        backBufferLength: 0,
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
        capLevelToPlayerSize: false,
        debug: true, // Enable HLS.js debug logs
      })

      console.log('[HLS DEBUG] Loading source:', resolvedSource)

      hls.on(Hls.Events.MANIFEST_PARSED, (_event, data) => {
        console.log('[HLS DEBUG] Manifest parsed, available levels:')
        data.levels.forEach((level, index) => {
          console.log(`  Level ${index}: ${level.width}x${level.height} @ ${level.bitrate} bps`)
        })
        console.log('[HLS DEBUG] Current level:', hls.currentLevel)
        console.log('[HLS DEBUG] Load level:', hls.loadLevel)
        console.log('[HLS DEBUG] Auto level enabled:', hls.autoLevelEnabled)
      })

      hls.on(Hls.Events.LEVEL_LOADING, (_event, data) => {
        console.log('[HLS DEBUG] Loading level:', data.level)
      })

      hls.on(Hls.Events.LEVEL_LOADED, (_event, data) => {
        const level = hls.levels[data.level]
        console.log('[HLS DEBUG] Level loaded:', data.level, `${level?.width}x${level?.height}`)
      })

      hls.on(Hls.Events.LEVEL_SWITCHED, (_event, data) => {
        const level = hls.levels[data.level]
        console.log('[HLS DEBUG] ⚠️ SWITCHED TO LEVEL:', data.level, `${level?.width}x${level?.height}`)
      })

      hls.on(Hls.Events.FRAG_LOADING, (_event, data) => {
        console.log('[HLS DEBUG] Loading fragment:', data.frag.sn, 'level:', data.frag.level)
      })

      hls.on(Hls.Events.FRAG_LOADED, (_event, data) => {
        console.log('[HLS DEBUG] Fragment loaded:', data.frag.sn, 'level:', data.frag.level)
      })

      hls.loadSource(resolvedSource)
      hls.attachMedia(video)

      return () => {
        video.removeEventListener('play', handlePlay)
        video.removeEventListener('pause', handlePause)
        video.removeEventListener('timeupdate', handleTime)
        video.removeEventListener('loadedmetadata', handleMetadata)
        video.removeEventListener('durationchange', handleMetadata)
        video.removeEventListener('volumechange', handleVolume)
        hls.destroy()
      }
    }

    video.src = resolvedSource
    video.load()
    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('timeupdate', handleTime)
      video.removeEventListener('loadedmetadata', handleMetadata)
      video.removeEventListener('durationchange', handleMetadata)
      video.removeEventListener('volumechange', handleVolume)
    }
  }, [resolvedSource, isResolving])

  // Never add muted attribute to HTML - we handle it via JavaScript
  // This keeps the volume control enabled
  const { muted: _, className, ...videoProps } = props

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const handleFsChange = () => {
      const isFs = document.fullscreenElement === wrapper
      setIsFullscreen(isFs)
    }

    document.addEventListener('fullscreenchange', handleFsChange)
    return () => document.removeEventListener('fullscreenchange', handleFsChange)
  }, [])

  const scheduleHide = () => {
    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current)
    }
    if (!isPlaying) {
      setShowControls(true)
      return
    }
    setShowControls(true)
    hideTimerRef.current = window.setTimeout(() => {
      setShowControls(false)
    }, 2200)
  }

  const togglePlay = () => {
    const video = innerRef.current
    if (!video) return
    if (video.paused) {
      const playPromise = video.play()
      if (playPromise?.catch) playPromise.catch(() => undefined)
    } else {
      video.pause()
    }
  }

  const toggleMute = () => {
    const video = innerRef.current
    if (!video) return
    const nextMuted = !(video.muted || video.volume === 0)
    video.muted = nextMuted
    if (!nextMuted && video.volume === 0) {
      video.volume = 1.0
    }
    setIsMuted(video.muted || video.volume === 0)
  }

  const enableSound = () => {
    const video = innerRef.current
    if (!video) return
    video.muted = false
    video.removeAttribute('muted')
    if (video.volume === 0) {
      video.volume = 1.0
    }
    setIsMuted(false)
    setVolume(video.volume)
  }

  const handleSeek = (value: number) => {
    const video = innerRef.current
    if (!video) return
    video.currentTime = value
    setCurrentTime(value)
  }

  const handleVolume = (value: number) => {
    const video = innerRef.current
    if (!video) return
    video.volume = value
    video.muted = value === 0
    setIsMuted(video.muted || video.volume === 0)
    setVolume(video.volume)
  }

  const toggleFullscreen = () => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    if (!document.fullscreenElement) {
      wrapper.requestFullscreen().catch(() => undefined)
    } else {
      document.exitFullscreen().catch(() => undefined)
    }
  }

  return (
    <div
      ref={wrapperRef}
      className="group relative w-full h-full"
      onMouseMove={scheduleHide}
      onMouseEnter={scheduleHide}
      onMouseLeave={() => setShowControls(false)}
      onTouchStart={scheduleHide}
    >
      <video
        ref={innerRef}
        {...videoProps}
        className={`w-full h-full object-cover ${className ?? ''}`}
        onClick={togglePlay}
      />

      {isMuted && (
        <button
          type="button"
          onClick={enableSound}
          className="pointer-events-auto absolute right-4 top-4 flex items-center gap-2 rounded-full bg-black/65 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-white backdrop-blur transition hover:bg-black/80"
          aria-label="Enable sound"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
            <path d="M4 10v4h4l5 4V6L8 10H4z" />
            <path d="M16 8a5 5 0 0 1 0 8" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Enable sound
        </button>
      )}

      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/50 via-black/20 to-transparent transition-opacity duration-200 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        className={`absolute inset-x-0 bottom-0 px-4 pb-4 pt-12 transition-opacity duration-200 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
        onMouseEnter={scheduleHide}
      >
        <div className="pointer-events-auto flex items-center gap-3 rounded-2xl bg-black/40 px-4 py-3 text-white/90 backdrop-blur-md">
          <button
            type="button"
            onClick={togglePlay}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
            aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
                <path d="M8 5.5a1 1 0 0 1 1.5-.86l10 6a1 1 0 0 1 0 1.72l-10 6A1 1 0 0 1 8 17.5v-12z" />
              </svg>
            )}
          </button>

          <div className="flex items-center gap-3 text-[12px] text-white/85">
            <span className="tabular-nums">{formatTime(currentTime)}</span>
            <span className="text-white/50">/</span>
            <span className="tabular-nums">{formatTime(duration)}</span>
          </div>

          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={(event) => handleSeek(Number(event.target.value))}
            onPointerDown={() => setIsScrubbing(true)}
            onPointerUp={() => setIsScrubbing(false)}
            className="flex-1 accent-white"
            aria-label="Progreso del video"
          />

          <button
            type="button"
            onClick={toggleMute}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
            aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
          >
            {isMuted ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
                <path d="M4 10v4h4l5 4V6L8 10H4z" />
                <path d="M16 9l4 6M20 9l-4 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
                <path d="M4 10v4h4l5 4V6L8 10H4z" />
                <path d="M16 8a5 5 0 0 1 0 8" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>

          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={isMuted ? 0 : Math.max(0.05, volume)}
            onChange={(event) => handleVolume(Number(event.target.value))}
            className="hidden w-24 accent-white sm:block"
            aria-label="Volumen"
          />

          <button
            type="button"
            onClick={toggleFullscreen}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
            aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
          >
            {isFullscreen ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-white" strokeWidth="2" strokeLinecap="round">
                <path d="M9 3H3v6M15 3h6v6M9 21H3v-6M15 21h6v-6" />
                <path d="M9 9H6M9 9V6M15 9h3M15 9V6M9 15H6M9 15v3M15 15h3M15 15v3" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-white" strokeWidth="2">
                <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {!isPlaying && !isScrubbing && (
        <button
          type="button"
          onClick={togglePlay}
          className="pointer-events-auto absolute inset-0 flex items-center justify-center"
          aria-label="Reproducir"
        >
          <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/30">
            <svg viewBox="0 0 24 24" className="ml-0.5 h-8 w-8 fill-white">
              <path d="M8 5.5a1 1 0 0 1 1.5-.86l10 6a1 1 0 0 1 0 1.72l-10 6A1 1 0 0 1 8 17.5v-12z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  )
})

StreamVideo.displayName = 'StreamVideo'

export default StreamVideo
