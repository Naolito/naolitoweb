import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import Hls from 'hls.js'

type StreamVideoProps = Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'src'> & {
  source: string
}

const StreamVideo = forwardRef<HTMLVideoElement, StreamVideoProps>(({ source, ...props }, ref) => {
  const innerRef = useRef<HTMLVideoElement>(null)
  const [resolvedSource, setResolvedSource] = useState<string>(source)
  const [isResolving, setIsResolving] = useState<boolean>(false)

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

    // Start muted to allow autoplay, then unmute on first user interaction
    video.muted = true
    video.volume = 1.0

    const enableSound = () => {
      video.muted = false
      video.removeAttribute('muted')
      video.volume = 1.0
      console.log('[StreamVideo DEBUG] User interacted: unmuted video')
    }

    window.addEventListener('pointerdown', enableSound, { once: true })
    window.addEventListener('keydown', enableSound, { once: true })

    // Force HLS.js for Cloudflare Stream to have full control over quality
    const isCloudflareStream = resolvedSource.includes('cloudflarestream.com') || resolvedSource.includes('videodelivery.net')

    if (video.canPlayType('application/vnd.apple.mpegurl') && !isCloudflareStream) {
      console.log('[StreamVideo DEBUG] Using native HLS (Safari/iOS) for non-Cloudflare video')
      video.src = resolvedSource
      video.load()
      return () => {
        window.removeEventListener('pointerdown', enableSound)
        window.removeEventListener('keydown', enableSound)
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
        window.removeEventListener('pointerdown', enableSound)
        window.removeEventListener('keydown', enableSound)
        hls.destroy()
      }
    }

    video.src = resolvedSource
    video.load()
    return () => {
      window.removeEventListener('pointerdown', enableSound)
      window.removeEventListener('keydown', enableSound)
    }
  }, [resolvedSource, isResolving])

  // Never add muted attribute to HTML - we handle it via JavaScript
  // This keeps the volume control enabled
  const { muted: _, ...videoProps } = props
  return <video ref={innerRef} {...videoProps} />
})

StreamVideo.displayName = 'StreamVideo'

export default StreamVideo
