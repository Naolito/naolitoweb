import { Upload } from 'tus-js-client'
import { detectNetworkSpeed, getAdaptiveChunkSize } from '../hooks/useNetworkSpeed'

export type UploadProgressInfo = {
  percentage: number
  speedMbps: number
  etaSeconds: number
  bytesUploaded: number
  bytesTotal: number
  isSlowConnection: boolean
}

export type ImageUploadResponse = {
  uploadURL: string
}

export type ImageUploadResult = {
  result?: {
    id?: string
    variants?: string[]
  }
}

export type VideoUploadResponse = {
  uploadURL: string
  uid: string
  playbackUrl: string
  thumbnailUrl: string
}

export type VideoUploadRequest = {
  size: number
  maxDurationSeconds?: number
}

const buildJsonHeaders = () => {
  const headers = new Headers({ 'Content-Type': 'application/json' })
  const token = import.meta.env.VITE_ADMIN_API_TOKEN
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }
  return headers
}

const getImageDeliveryBase = () => {
  return import.meta.env.VITE_CLOUDFLARE_IMAGES_DELIVERY_URL as string | undefined
}

const getImageVariant = () => {
  return (import.meta.env.VITE_CLOUDFLARE_IMAGES_VARIANT as string | undefined) ?? 'public'
}

const parseApiError = async (response: Response, fallback: string) => {
  try {
    const data = await response.json()
    const errorMessage =
      data?.error?.message ||
      data?.error ||
      data?.message ||
      data?.details?.message ||
      (Array.isArray(data?.errors) && data.errors.length > 0 ? data.errors[0]?.message : null) ||
      (Array.isArray(data?.details?.errors) && data.details.errors.length > 0
        ? data.details.errors[0]?.message
        : null)
    return errorMessage ? `${fallback} (${errorMessage})` : fallback
  } catch (error) {
    return fallback
  }
}

export const requestImageUpload = async (): Promise<ImageUploadResponse> => {
  const response = await fetch('/api/upload/image', {
    method: 'POST',
    headers: buildJsonHeaders(),
    body: JSON.stringify({ metadata: { source: 'naolito-admin' } }),
  })

  if (!response.ok) {
    const message = await parseApiError(response, 'Could not start image upload.')
    throw new Error(message)
  }

  return response.json()
}

export const requestVideoUpload = async (
  payload: VideoUploadRequest,
): Promise<VideoUploadResponse> => {
  const response = await fetch('/api/upload/video', {
    method: 'POST',
    headers: buildJsonHeaders(),
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const message = await parseApiError(response, 'Could not start video upload.')
    throw new Error(message)
  }

  return response.json()
}

// Slow connection threshold (1 Mbps) - warn user after sustained slow speed
const SLOW_CONNECTION_THRESHOLD_MBPS = 1
const SLOW_CONNECTION_CHECK_DURATION_MS = 30000

export const uploadVideoWithTus = (
  uploadURL: string,
  file: File,
  options?: {
    onProgress?: (info: UploadProgressInfo) => void
  },
): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Track upload metrics for speed calculation
    let lastBytesUploaded = 0
    let lastProgressTime = Date.now()
    let uploadStartTime = Date.now()
    let slowConnectionDetected = false
    let recentSpeeds: number[] = []

    // Get initial chunk size based on detected network speed
    const networkInfo = detectNetworkSpeed()
    let currentChunkSize = networkInfo.recommendedChunkSize

    const calculateProgress = (bytesUploaded: number, bytesTotal: number): UploadProgressInfo => {
      const now = Date.now()
      const timeDeltaMs = now - lastProgressTime
      const bytesDelta = bytesUploaded - lastBytesUploaded

      // Calculate current speed (bytes per second)
      let speedBps = 0
      if (timeDeltaMs > 0 && bytesDelta > 0) {
        speedBps = (bytesDelta / timeDeltaMs) * 1000
      }

      // Keep rolling average of recent speeds (last 5 measurements)
      if (speedBps > 0) {
        recentSpeeds.push(speedBps)
        if (recentSpeeds.length > 5) {
          recentSpeeds.shift()
        }
      }

      // Use average speed for smoother display
      const avgSpeedBps =
        recentSpeeds.length > 0
          ? recentSpeeds.reduce((a, b) => a + b, 0) / recentSpeeds.length
          : speedBps

      const speedMbps = (avgSpeedBps * 8) / (1024 * 1024)

      // Calculate ETA
      const remainingBytes = bytesTotal - bytesUploaded
      const etaSeconds = avgSpeedBps > 0 ? remainingBytes / avgSpeedBps : 0

      // Check for slow connection after initial period
      const elapsedMs = now - uploadStartTime
      if (
        !slowConnectionDetected &&
        elapsedMs > SLOW_CONNECTION_CHECK_DURATION_MS &&
        speedMbps < SLOW_CONNECTION_THRESHOLD_MBPS &&
        speedMbps > 0
      ) {
        slowConnectionDetected = true
      }

      // Update tracking variables
      lastBytesUploaded = bytesUploaded
      lastProgressTime = now

      return {
        percentage: Math.round((bytesUploaded / bytesTotal) * 100),
        speedMbps,
        etaSeconds,
        bytesUploaded,
        bytesTotal,
        isSlowConnection: slowConnectionDetected,
      }
    }

    // Generate fingerprint for resumability
    const fingerprint = `naolito-${file.name}-${file.size}-${file.lastModified}`

    const upload = new Upload(file, {
      uploadUrl: uploadURL,
      uploadSize: file.size,
      metadata: {
        filename: file.name,
        filetype: file.type,
      },
      chunkSize: currentChunkSize,
      retryDelays: [0, 1000, 3000, 5000, 10000],
      // Enable resumability
      fingerprint: () => Promise.resolve(fingerprint),
      storeFingerprintForResuming: true,
      removeFingerprintOnSuccess: true,
      onError: (error) => {
        reject(error)
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        if (!options?.onProgress || bytesTotal === 0) return
        const progressInfo = calculateProgress(bytesUploaded, bytesTotal)
        options.onProgress(progressInfo)

        // Adaptive chunk size: adjust based on measured speed
        // Only adjust if we have enough data points
        if (recentSpeeds.length >= 3 && progressInfo.speedMbps > 0) {
          const newChunkSize = getAdaptiveChunkSize(progressInfo.speedMbps)
          if (newChunkSize !== currentChunkSize) {
            currentChunkSize = newChunkSize
            // Note: tus-js-client doesn't support changing chunk size mid-upload,
            // but this will be used for future uploads in the same session
          }
        }
      },
      onSuccess: () => {
        resolve()
      },
    })

    // Reset start time when actually starting
    uploadStartTime = Date.now()
    upload.start()
  })
}

export const uploadFileToUrl = async (
  url: string,
  file: File,
  options?: {
    mode?: RequestMode
    expectJson?: boolean
  },
): Promise<ImageUploadResult> => {
  const { mode = 'cors', expectJson = true } = options ?? {}
  const form = new FormData()
  form.append('file', file)

  const response = await fetch(url, {
    method: 'POST',
    body: form,
    mode,
  })

  if (expectJson && !response.ok) {
    throw new Error('La subida ha fallado.')
  }

  if (!expectJson) {
    return {}
  }

  return response.json()
}

export const resolveImageUrl = (uploadResult: ImageUploadResult): string | null => {
  const variants = uploadResult?.result?.variants
  if (variants && variants.length > 0) {
    return variants[0]
  }

  const imageId = uploadResult?.result?.id
  const base = getImageDeliveryBase()
  if (imageId && base) {
    return `${base}/${imageId}/${getImageVariant()}`
  }

  return null
}
