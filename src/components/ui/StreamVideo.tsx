import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import Hls from 'hls.js'

type StreamVideoProps = Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'src'> & {
  source: string
}

const StreamVideo = forwardRef<HTMLVideoElement, StreamVideoProps>(({ source, ...props }, ref) => {
  const innerRef = useRef<HTMLVideoElement>(null)

  useImperativeHandle(ref, () => innerRef.current as HTMLVideoElement)

  useEffect(() => {
    const video = innerRef.current
    if (!video || !source) return

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = source
      video.load()
      return
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        backBufferLength: 0,
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
        startLevel: 99, // Start at highest available quality (HLS.js will use max if this exceeds available levels)
        capLevelToPlayerSize: false, // Don't limit quality based on player size
        abrEwmaDefaultEstimate: 50000000, // Assume 50 Mbps connection
        abrEwmaDefaultEstimateMax: 50000000,
      })

      // Force highest quality to stay locked
      hls.on(Hls.Events.MANIFEST_PARSED, (_event, data) => {
        const highestLevel = data.levels.length - 1
        // Lock to highest quality by setting loadLevel (disables ABR when set to non-negative value)
        hls.loadLevel = highestLevel
        console.log(`[HLS] Locked to highest quality level ${highestLevel} of ${data.levels.length}`, data.levels[highestLevel])
      })

      // Monitor level changes (for debugging)
      hls.on(Hls.Events.LEVEL_SWITCHED, (_event, data) => {
        console.log(`[HLS] Now playing level ${data.level}:`, hls.levels[data.level])
      })

      hls.loadSource(source)
      hls.attachMedia(video)

      return () => {
        hls.destroy()
      }
    }

    video.src = source
    video.load()
  }, [source])

  return <video ref={innerRef} {...props} />
})

StreamVideo.displayName = 'StreamVideo'

export default StreamVideo
