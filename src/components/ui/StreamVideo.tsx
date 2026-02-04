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
