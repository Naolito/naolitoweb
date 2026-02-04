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

export const requestImageUpload = async (): Promise<ImageUploadResponse> => {
  const response = await fetch('/api/upload/image', {
    method: 'POST',
    headers: buildJsonHeaders(),
    body: JSON.stringify({ metadata: { source: 'naolito-admin' } }),
  })

  if (!response.ok) {
    throw new Error('No se pudo iniciar la subida de imagen.')
  }

  return response.json()
}

export const requestVideoUpload = async (): Promise<VideoUploadResponse> => {
  const response = await fetch('/api/upload/video', {
    method: 'POST',
    headers: buildJsonHeaders(),
  })

  if (!response.ok) {
    throw new Error('No se pudo iniciar la subida de video.')
  }

  return response.json()
}

export const uploadFileToUrl = async (url: string, file: File): Promise<ImageUploadResult> => {
  const form = new FormData()
  form.append('file', file)

  const response = await fetch(url, {
    method: 'POST',
    body: form,
  })

  if (!response.ok) {
    throw new Error('La subida ha fallado.')
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
