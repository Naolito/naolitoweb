import { Upload } from 'tus-js-client'

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
    const details =
      data?.error?.message ||
      data?.message ||
      (Array.isArray(data?.errors) && data.errors.length > 0 ? data.errors[0]?.message : null)
    return details ? `${fallback} (${details})` : fallback
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
    const message = await parseApiError(response, 'No se pudo iniciar la subida de imagen.')
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
    const message = await parseApiError(response, 'No se pudo iniciar la subida de video.')
    throw new Error(message)
  }

  return response.json()
}

export const uploadVideoWithTus = (
  uploadURL: string,
  file: File,
  options?: {
    onProgress?: (percentage: number) => void
  },
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const upload = new Upload(file, {
      uploadUrl: uploadURL,
      uploadSize: file.size,
      metadata: {
        filename: file.name,
        filetype: file.type,
      },
      chunkSize: 8 * 1024 * 1024,
      retryDelays: [0, 1000, 3000, 5000, 10000],
      onError: (error) => {
        reject(error)
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        if (!options?.onProgress || bytesTotal === 0) return
        const percentage = Math.round((bytesUploaded / bytesTotal) * 100)
        options.onProgress(percentage)
      },
      onSuccess: () => {
        resolve()
      },
    })

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
