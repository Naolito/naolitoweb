import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import Hls from 'hls.js'

type StreamVideoProps = Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'src'> & {
  source: string
}

/**
 * Extract highest quality stream URL from Cloudflare Stream HLS manifest
 * This bypasses ABR and forces highest quality from the start
 */
const getHighestQualityStreamUrl = async (manifestUrl: string): Promise<string | null> => {
  try {
    console.log('[StreamVideo DEBUG] Fetching manifest from:', manifestUrl)
    const response = await fetch(manifestUrl)

    console.log('[StreamVideo DEBUG] Response status:', response.status, response.statusText)
    if (!response.ok) {
      console.error('[StreamVideo DEBUG] Failed to fetch manifest')
      return null
    }

    const manifestText = await response.text()
    console.log('[StreamVideo DEBUG] Manifest content:\n', manifestText)

    // Parse HLS manifest to find all stream variants
    // Format: #EXT-X-STREAM-INF:RESOLUTION=1920x1080,...\npath/to/stream.m3u8
    const streamRegex = /#EXT-X-STREAM-INF:.*RESOLUTION=(\d+)x(\d+).*\n(.+)/gm
    const streams: Array<{ width: number; height: number; url: string }> = []

    let match
    while ((match = streamRegex.exec(manifestText)) !== null) {
      const width = parseInt(match[1], 10)
      const height = parseInt(match[2], 10)
      const streamPath = match[3].trim()

      console.log('[StreamVideo DEBUG] Found stream:', { width, height, path: streamPath })
      streams.push({ width, height, url: streamPath })
    }

    console.log('[StreamVideo DEBUG] Total streams found:', streams.length)

    if (streams.length === 0) {
      console.error('[StreamVideo DEBUG] No streams found in manifest')
      return null
    }

    // Sort by resolution (width × height) and get highest
    streams.sort((a, b) => (b.width * b.height) - (a.width * a.height))
    const highestQuality = streams[0]

    // Build full URL (handle relative paths)
    const baseUrl = manifestUrl.substring(0, manifestUrl.lastIndexOf('/'))
    const fullUrl = highestQuality.url.startsWith('http')
      ? highestQuality.url
      : `${baseUrl}/${highestQuality.url}`

    console.log('[StreamVideo DEBUG] Selected highest quality:', highestQuality)
    console.log('[StreamVideo DEBUG] Final URL:', fullUrl)

    return fullUrl
  } catch (error) {
    console.error('[StreamVideo DEBUG] Exception while parsing manifest:', error)
    return null
  }
}

const StreamVideo = forwardRef<HTMLVideoElement, StreamVideoProps>(({ source, ...props }, ref) => {
  const innerRef = useRef<HTMLVideoElement>(null)
  const [resolvedSource, setResolvedSource] = useState<string>(source)
  const [isResolving, setIsResolving] = useState<boolean>(false)

  useImperativeHandle(ref, () => innerRef.current as HTMLVideoElement)

  // Resolve highest quality stream for Cloudflare Stream
  useEffect(() => {
    console.log('[StreamVideo DEBUG] Source changed:', source)
    const isCloudflareStream = (
      (source.includes('videodelivery.net') || source.includes('cloudflarestream.com')) &&
      source.includes('.m3u8')
    )
    console.log('[StreamVideo DEBUG] Is Cloudflare Stream:', isCloudflareStream)

    if (!isCloudflareStream) {
      console.log('[StreamVideo DEBUG] Not Cloudflare Stream, using source as-is')
      setIsResolving(false)
      setResolvedSource(source)
      return
    }

    let cancelled = false
    setIsResolving(true)

    console.log('[StreamVideo DEBUG] Attempting to resolve highest quality URL...')
    getHighestQualityStreamUrl(source).then((highQualityUrl) => {
      if (cancelled) return
      if (highQualityUrl) {
        console.log('[StreamVideo DEBUG] ✅ Using direct high-quality stream URL:', highQualityUrl)
        setResolvedSource(highQualityUrl)
      } else {
        console.log('[StreamVideo DEBUG] ❌ Failed to resolve, falling back to original:', source)
        setResolvedSource(source)
      }
      setIsResolving(false)
    })

    return () => {
      cancelled = true
    }
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

    // Force HLS.js for Cloudflare Stream to have full control over quality
    const isCloudflareStream = resolvedSource.includes('cloudflarestream.com') || resolvedSource.includes('videodelivery.net')

    if (video.canPlayType('application/vnd.apple.mpegurl') && !isCloudflareStream) {
      console.log('[StreamVideo DEBUG] Using native HLS (Safari/iOS) for non-Cloudflare video')
      video.src = resolvedSource
      video.load()
      return
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
        hls.destroy()
      }
    }

    video.src = resolvedSource
    video.load()
  }, [resolvedSource, isResolving])

  // Explicitly ensure volume control is available
  return <video ref={innerRef} controls={true} {...props} />
})

StreamVideo.displayName = 'StreamVideo'

export default StreamVideo
