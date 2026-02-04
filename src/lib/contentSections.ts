export type Ratio = 'landscape' | 'portrait' | 'square'

export type MediaItem = {
  id: string
  title: string
  description: string
  tag: string
  year: string
  duration: string
  likes: number
  videoUrl: string
  posterUrl: string
  ratio: Ratio
}

export type ClientLogo = {
  id: string
  name: string
  logoUrl: string
}

export const normalizeMediaItem = (item: Partial<MediaItem>): MediaItem => ({
  id: item.id ?? `id-${Math.random().toString(36).slice(2, 10)}`,
  title: item.title ?? '',
  description: item.description ?? '',
  tag: item.tag ?? '',
  year: item.year ?? '',
  duration: item.duration ?? '',
  likes: item.likes ?? 0,
  videoUrl: item.videoUrl ?? '',
  posterUrl: item.posterUrl ?? '',
  ratio: item.ratio ?? 'landscape',
})

export const normalizeClientLogo = (item: Partial<ClientLogo>): ClientLogo => ({
  id: item.id ?? `id-${Math.random().toString(36).slice(2, 10)}`,
  name: item.name ?? '',
  logoUrl: item.logoUrl ?? '',
})
