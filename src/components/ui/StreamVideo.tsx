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
    const response = await fetch(manifestUrl)
    if (!response.ok) return null

    const manifestText = await response.text()

    // Parse HLS manifest to find all stream variants
    // Format: #EXT-X-STREAM-INF:RESOLUTION=1920x1080,...\npath/to/stream.m3u8
    const streamRegex = /#EXT-X-STREAM-INF:.*RESOLUTION=(\d+)x(\d+).*\n(.+)/gm
    const streams: Array<{ width: number; height: number; url: string }> = []

    let match
    while ((match = streamRegex.exec(manifestText)) !== null) {
      const width = parseInt(match[1], 10)
      const height = parseInt(match[2], 10)
      const streamPath = match[3].trim()

      streams.push({ width, height, url: streamPath })
    }

    if (streams.length === 0) return null

    // Sort by resolution (width × height) and get highest
    streams.sort((a, b) => (b.width * b.height) - (a.width * a.height))
    const highestQuality = streams[0]

    // Build full URL (handle relative paths)
    const baseUrl = manifestUrl.substring(0, manifestUrl.lastIndexOf('/'))
    const fullUrl = highestQuality.url.startsWith('http')
      ? highestQuality.url
      : `${baseUrl}/${highestQuality.url}`

    console.log(`[StreamVideo] Found ${streams.length} quality levels, using highest: ${highestQuality.width}x${highestQuality.height}`)

    return fullUrl
  } catch (error) {
    console.warn('[StreamVideo] Failed to parse manifest:', error)
    return null
  }
}

const StreamVideo = forwardRef<HTMLVideoElement, StreamVideoProps>(({ source, ...props }, ref) => {
  const innerRef = useRef<HTMLVideoElement>(null)
  const [resolvedSource, setResolvedSource] = useState<string>(source)

  useImperativeHandle(ref, () => innerRef.current as HTMLVideoElement)

  // Resolve highest quality stream for Cloudflare Stream
  useEffect(() => {
    const isCloudflareStream = source.includes('videodelivery.net') && source.includes('.m3u8')

    if (!isCloudflareStream) {
      setResolvedSource(source)
      return
    }

    let cancelled = false

    getHighestQualityStreamUrl(source).then((highQualityUrl) => {
      if (cancelled) return
      if (highQualityUrl) {
        console.log('[StreamVideo] Using direct high-quality stream URL')
        setResolvedSource(highQualityUrl)
      } else {
        console.log('[StreamVideo] Falling back to original manifest URL')
        setResolvedSource(source)
      }
    })

    return () => {
      cancelled = true
    }
  }, [source])

  useEffect(() => {
    const video = innerRef.current
    if (!video || !resolvedSource) return

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
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
        // Since we're using direct high-quality stream URL, no need to force levels
        capLevelToPlayerSize: false,
      })

      hls.on(Hls.Events.MANIFEST_PARSED, (_event, data) => {
        console.log(`[HLS] Manifest loaded, available levels:`, data.levels)
      })

      hls.loadSource(resolvedSource)
      hls.attachMedia(video)

      return () => {
        hls.destroy()
      }
    }

    video.src = resolvedSource
    video.load()
  }, [resolvedSource])

  return <video ref={innerRef} {...props} />
})

StreamVideo.displayName = 'StreamVideo'

export default StreamVideo
