import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { fetchContent, saveContent } from '../lib/contentApi'
import {
  requestImageUpload,
  requestVideoUpload,
  resolveImageUrl,
  uploadFileToUrl,
  uploadVideoWithTus,
  type UploadProgressInfo,
} from '../lib/cloudflareUpload'
import { formatSpeed, formatEta } from '../hooks/useNetworkSpeed'
import {
  ClientLogo,
  MediaItem,
  Ratio,
  normalizeClientLogo,
  normalizeMediaItem,
} from '../lib/contentSections'

const emptyMediaItem = (): MediaItem => normalizeMediaItem({})
const emptyLogo = (): ClientLogo => normalizeClientLogo({})

const formatDuration = (value: number) => {
  if (!Number.isFinite(value) || value <= 0) return ''
  const total = Math.round(value)
  const minutes = Math.floor(total / 60)
  const seconds = total % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

const getRatio = (width: number, height: number): Ratio => {
  if (!width || !height) return 'landscape'
  const ratio = width / height
  if (ratio < 0.85) return 'portrait'
  if (ratio > 1.15) return 'landscape'
  return 'square'
}

const readVideoMetadata = (file: File): Promise<{ duration: string; ratio: Ratio }> =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const video = document.createElement('video')
    video.preload = 'metadata'
    video.src = url
    video.onloadedmetadata = () => {
      const duration = formatDuration(video.duration)
      const ratio = getRatio(video.videoWidth, video.videoHeight)
      URL.revokeObjectURL(url)
      resolve({ duration, ratio })
    }
    video.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('No se pudo leer el metadata del video.'))
    }
  })

const VideoUploadStatus = ({ progress }: { progress: UploadProgressInfo | null }) => {
  if (!progress) {
    return <span className="text-xs text-slate-500">Iniciando...</span>
  }

  const { percentage, speedMbps, etaSeconds, isSlowConnection } = progress

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden min-w-[80px]">
          <div
            className="h-full bg-sky-500 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-xs font-medium text-slate-600 tabular-nums">{percentage}%</span>
      </div>
      <div className="flex items-center gap-2 text-[10px] text-slate-400">
        {speedMbps > 0 && <span>{formatSpeed(speedMbps * 1024 * 1024 / 8)}</span>}
        {etaSeconds > 0 && <span>{formatEta(etaSeconds)}</span>}
      </div>
      {isSlowConnection && (
        <div className="text-[10px] text-amber-600">
          Conexion lenta detectada
        </div>
      )}
    </div>
  )
}

const Admin = () => {
  const [originals, setOriginals] = useState<MediaItem[]>([])
  const [clientProjects, setClientProjects] = useState<MediaItem[]>([])
  const [clientLogos, setClientLogos] = useState<ClientLogo[]>([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<Record<string, string>>({})
  const [uploading, setUploading] = useState<Record<string, boolean>>({})
  const [uploadProgress, setUploadProgress] = useState<Record<string, UploadProgressInfo | null>>({})

  const setSectionStatus = (key: string, message: string) => {
    setStatus((prev) => ({ ...prev, [key]: message }))
  }

  useEffect(() => {
    let isMounted = true
    const load = async () => {
      const [originalData, clientProjectData, clientLogoData] = await Promise.all([
        fetchContent<MediaItem[]>('originals'),
        fetchContent<MediaItem[]>('client-projects'),
        fetchContent<ClientLogo[]>('client-logos'),
      ])

      if (!isMounted) return

      setOriginals(
        Array.isArray(originalData) ? originalData.map((item) => normalizeMediaItem(item)) : [],
      )
      setClientProjects(
        Array.isArray(clientProjectData) ? clientProjectData.map((item) => normalizeMediaItem(item)) : [],
      )
      setClientLogos(
        Array.isArray(clientLogoData) ? clientLogoData.map((item) => normalizeClientLogo(item)) : [],
      )
      setLoading(false)
    }

    load()

    return () => {
      isMounted = false
    }
  }, [])

  const handleSave = async (key: string, data: unknown) => {
    setSectionStatus(key, 'Guardando...')
    const ok = await saveContent(key, data)
    setSectionStatus(key, ok ? 'Guardado.' : 'No se pudo guardar. Reintenta.')
  }

  const handleMediaChange = (
    setter: Dispatch<SetStateAction<MediaItem[]>>,
    index: number,
    field: keyof MediaItem,
    value: string | number,
  ) => {
    setter((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  const handleLogoChange = (index: number, field: keyof ClientLogo, value: string) => {
    setClientLogos((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  const startUploading = (key: string) => setUploading((prev) => ({ ...prev, [key]: true }))
  const stopUploading = (key: string) => setUploading((prev) => ({ ...prev, [key]: false }))
  const setProgress = (key: string, value: UploadProgressInfo | null) => {
    setUploadProgress((prev) => ({ ...prev, [key]: value }))
  }

  const handleVideoUpload = async (
    items: MediaItem[],
    setter: Dispatch<SetStateAction<MediaItem[]>>,
    index: number,
    file: File,
  ) => {
    const item = items[index]
    if (!item) return
    const uploadKey = `${item.id}-video`

    try {
      startUploading(uploadKey)
      setProgress(uploadKey, null)
      const metadata = await readVideoMetadata(file).catch(() => null)
      const upload = await requestVideoUpload({ size: file.size })
      await uploadVideoWithTus(upload.uploadURL, file, {
        onProgress: (info) => setProgress(uploadKey, info),
      })

      setter((prev) => {
        const next = [...prev]
        const current = next[index]
        next[index] = {
          ...current,
          videoUrl: upload.playbackUrl,
          posterUrl: current.posterUrl || upload.thumbnailUrl,
          duration: metadata?.duration ?? current.duration,
          ratio: metadata?.ratio ?? current.ratio,
        }
        return next
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No se pudo subir el video. Reintenta.'
      setSectionStatus('upload', message)
    } finally {
      stopUploading(uploadKey)
      setProgress(uploadKey, null)
    }
  }

  const handleImageUpload = async (
    onSuccess: (url: string) => void,
    file: File,
    uploadKey: string,
  ) => {
    try {
      startUploading(uploadKey)
      const upload = await requestImageUpload()
      const result = await uploadFileToUrl(upload.uploadURL, file)
      const url = resolveImageUrl(result)
      if (!url) {
        throw new Error('No se pudo resolver la URL de la imagen.')
      }
      onSuccess(url)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No se pudo subir la imagen. Reintenta.'
      setSectionStatus('upload', message)
    } finally {
      stopUploading(uploadKey)
    }
  }

  const handlePosterUpload = (
    items: MediaItem[],
    setter: Dispatch<SetStateAction<MediaItem[]>>,
    index: number,
    file: File,
  ) => {
    const item = items[index]
    if (!item) return
    const uploadKey = `${item.id}-poster`

    handleImageUpload(
      (url) =>
        setter((prev) => {
          const next = [...prev]
          next[index] = { ...next[index], posterUrl: url }
          return next
        }),
      file,
      uploadKey,
    )
  }

  const handleLogoUpload = (index: number, file: File) => {
    const item = clientLogos[index]
    if (!item) return
    const uploadKey = `${item.id}-logo`

    handleImageUpload(
      (url) =>
        setClientLogos((prev) => {
          const next = [...prev]
          next[index] = { ...next[index], logoUrl: url }
          return next
        }),
      file,
      uploadKey,
    )
  }


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fbff]">
        <div className="text-slate-500">Cargando panel...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8fbff]">
      <div className="relative overflow-hidden border-b border-slate-200/70 bg-white/70">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'radial-gradient(circle at 15% 20%, rgba(56,189,248,0.18), transparent 45%), radial-gradient(circle at 85% 0%, rgba(129,140,248,0.12), transparent 40%)',
          }}
        />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-12">
          <div className="text-xs font-semibold uppercase tracking-[0.4em] text-sky-500">Naolito Admin</div>
          <h1 className="mt-3 text-4xl font-display font-semibold text-slate-900">Panel de contenido</h1>
          <p className="mt-3 text-slate-600 max-w-2xl">
            Sube videos e imágenes directamente a Cloudflare y actualiza el contenido de la web sin tocar código.
          </p>
          {status.upload && <div className="mt-3 text-sm text-rose-500">{status.upload}</div>}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12 space-y-12">
        <section className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.4)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-slate-500">Studio Originals</div>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Playlist principal</h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOriginals((prev) => [...prev, emptyMediaItem()])}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                + Añadir
              </button>
              <button
                onClick={() => handleSave('originals', originals)}
                className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600"
              >
                Guardar
              </button>
            </div>
          </div>
          {status.originals && <div className="mt-2 text-sm text-slate-500">{status.originals}</div>}

          <div className="mt-6 space-y-3">
            {originals.map((item, index) => (
              <details key={item.id} className="group rounded-2xl border border-slate-200/70 bg-white">
                <summary className="flex items-center gap-4 px-4 py-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <div className="relative w-16 h-12 rounded-xl overflow-hidden border border-black/10 bg-slate-50">
                    {item.posterUrl ? (
                      <img src={item.posterUrl} alt={item.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-[0.25em] text-slate-400">
                        Poster
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-900 truncate">
                      {item.title || `Original ${index + 1}`}
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.3em] text-slate-500 truncate">
                      {item.tag || 'Sin tag'}
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-3 text-xs text-slate-400">
                    <span>{item.videoUrl ? 'Video listo' : 'Sin video'}</span>
                    <span>{item.posterUrl ? 'Poster ok' : 'Sin poster'}</span>
                  </div>
                  <button
                    onClick={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      setOriginals((prev) => prev.filter((entry) => entry.id !== item.id))
                    }}
                    className="text-xs uppercase tracking-[0.2em] text-rose-500"
                  >
                    Eliminar
                  </button>
                </summary>

                <div className="border-t border-slate-100 px-4 pb-5 pt-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="text-sm text-slate-600">
                      Titulo
                      <input
                        value={item.title}
                        onChange={(event) => handleMediaChange(setOriginals, index, 'title', event.target.value)}
                        className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-800"
                      />
                    </label>
                    <label className="text-sm text-slate-600">
                      Tag
                      <input
                        value={item.tag}
                        onChange={(event) => handleMediaChange(setOriginals, index, 'tag', event.target.value)}
                        className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-800"
                      />
                    </label>
                    <label className="text-sm text-slate-600 md:col-span-2">
                      Descripcion
                      <textarea
                        value={item.description}
                        onChange={(event) => handleMediaChange(setOriginals, index, 'description', event.target.value)}
                        className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-800"
                        rows={3}
                      />
                    </label>
                    <label className="text-sm text-slate-600">
                      Likes (opcional)
                      <input
                        type="number"
                        value={item.likes}
                        onChange={(event) => handleMediaChange(setOriginals, index, 'likes', Number(event.target.value))}
                        className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-800"
                      />
                    </label>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-dashed border-slate-200 p-4">
                      <div className="text-sm font-semibold text-slate-700">Video</div>
                      <div className="mt-2 text-xs text-slate-500 break-all">{item.videoUrl || 'Sin video'}</div>
                      <div className="mt-3 flex items-center gap-3">
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                          Subir video
                          <input
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={(event) => {
                              const file = event.target.files?.[0]
                              if (file) {
                                handleVideoUpload(originals, setOriginals, index, file)
                              }
                            }}
                          />
                        </label>
                        {uploading[`${item.id}-video`] && (
                          <VideoUploadStatus progress={uploadProgress[`${item.id}-video`]} />
                        )}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-dashed border-slate-200 p-4">
                      <div className="text-sm font-semibold text-slate-700">Poster</div>
                      <div className="mt-2 text-xs text-slate-500 break-all">{item.posterUrl || 'Sin poster'}</div>
                      <div className="mt-3 flex items-center gap-3">
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                          Subir imagen
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(event) => {
                              const file = event.target.files?.[0]
                              if (file) {
                                handlePosterUpload(originals, setOriginals, index, file)
                              }
                            }}
                          />
                        </label>
                        {uploading[`${item.id}-poster`] && (
                          <span className="text-xs text-slate-500">Subiendo...</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.4)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-slate-500">Past Clients</div>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Proyectos con clientes</h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setClientProjects((prev) => [...prev, emptyMediaItem()])}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                + Añadir
              </button>
              <button
                onClick={() => handleSave('client-projects', clientProjects)}
                className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600"
              >
                Guardar
              </button>
            </div>
          </div>
          {status['client-projects'] && <div className="mt-2 text-sm text-slate-500">{status['client-projects']}</div>}

          <div className="mt-6 space-y-3">
            {clientProjects.map((item, index) => (
              <details key={item.id} className="group rounded-2xl border border-slate-200/70 bg-white">
                <summary className="flex items-center gap-4 px-4 py-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <div className="relative w-16 h-12 rounded-xl overflow-hidden border border-black/10 bg-slate-50">
                    {item.posterUrl ? (
                      <img src={item.posterUrl} alt={item.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-[0.25em] text-slate-400">
                        Poster
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-900 truncate">
                      {item.title || `Proyecto ${index + 1}`}
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.3em] text-slate-500 truncate">
                      {item.tag || 'Sin tag'}
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-3 text-xs text-slate-400">
                    <span>{item.videoUrl ? 'Video listo' : 'Sin video'}</span>
                    <span>{item.posterUrl ? 'Poster ok' : 'Sin poster'}</span>
                  </div>
                  <button
                    onClick={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      setClientProjects((prev) => prev.filter((entry) => entry.id !== item.id))
                    }}
                    className="text-xs uppercase tracking-[0.2em] text-rose-500"
                  >
                    Eliminar
                  </button>
                </summary>

                <div className="border-t border-slate-100 px-4 pb-5 pt-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="text-sm text-slate-600">
                      Titulo
                      <input
                        value={item.title}
                        onChange={(event) => handleMediaChange(setClientProjects, index, 'title', event.target.value)}
                        className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-800"
                      />
                    </label>
                    <label className="text-sm text-slate-600">
                      Tag
                      <input
                        value={item.tag}
                        onChange={(event) => handleMediaChange(setClientProjects, index, 'tag', event.target.value)}
                        className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-800"
                      />
                    </label>
                    <label className="text-sm text-slate-600 md:col-span-2">
                      Descripcion
                      <textarea
                        value={item.description}
                        onChange={(event) => handleMediaChange(setClientProjects, index, 'description', event.target.value)}
                        className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-800"
                        rows={3}
                      />
                    </label>
                    <label className="text-sm text-slate-600">
                      Likes (opcional)
                      <input
                        type="number"
                        value={item.likes}
                        onChange={(event) => handleMediaChange(setClientProjects, index, 'likes', Number(event.target.value))}
                        className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-800"
                      />
                    </label>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-dashed border-slate-200 p-4">
                      <div className="text-sm font-semibold text-slate-700">Video</div>
                      <div className="mt-2 text-xs text-slate-500 break-all">{item.videoUrl || 'Sin video'}</div>
                      <div className="mt-3 flex items-center gap-3">
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                          Subir video
                          <input
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={(event) => {
                              const file = event.target.files?.[0]
                              if (file) {
                                handleVideoUpload(clientProjects, setClientProjects, index, file)
                              }
                            }}
                          />
                        </label>
                        {uploading[`${item.id}-video`] && (
                          <VideoUploadStatus progress={uploadProgress[`${item.id}-video`]} />
                        )}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-dashed border-slate-200 p-4">
                      <div className="text-sm font-semibold text-slate-700">Poster</div>
                      <div className="mt-2 text-xs text-slate-500 break-all">{item.posterUrl || 'Sin poster'}</div>
                      <div className="mt-3 flex items-center gap-3">
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                          Subir imagen
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(event) => {
                              const file = event.target.files?.[0]
                              if (file) {
                                handlePosterUpload(clientProjects, setClientProjects, index, file)
                              }
                            }}
                          />
                        </label>
                        {uploading[`${item.id}-poster`] && (
                          <span className="text-xs text-slate-500">Subiendo...</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.4)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-slate-500">Client Logos</div>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Logos destacados</h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setClientLogos((prev) => [...prev, emptyLogo()])}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                + Añadir
              </button>
              <button
                onClick={() => handleSave('client-logos', clientLogos)}
                className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600"
              >
                Guardar
              </button>
            </div>
          </div>
          {status['client-logos'] && <div className="mt-2 text-sm text-slate-500">{status['client-logos']}</div>}

          <div className="mt-6 space-y-3">
            {clientLogos.map((item, index) => (
              <div key={item.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200/70 bg-white p-3">
                <div className="h-12 w-16 overflow-hidden rounded-xl border border-black/10 bg-slate-50">
                  {item.logoUrl ? (
                    <img src={item.logoUrl} alt={item.name} className="h-full w-full object-contain p-2" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-[0.25em] text-slate-400">
                      Logo
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-[200px]">
                  <input
                    value={item.name}
                    onChange={(event) => handleLogoChange(index, 'name', event.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800"
                    placeholder="Nombre del cliente"
                  />
                </div>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                  Subir logo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0]
                      if (file) {
                        handleLogoUpload(index, file)
                      }
                    }}
                  />
                </label>
                {uploading[`${item.id}-logo`] && <span className="text-xs text-slate-500">Subiendo...</span>}
                <button
                  onClick={() => setClientLogos((prev) => prev.filter((entry) => entry.id !== item.id))}
                  className="text-xs uppercase tracking-[0.2em] text-rose-500"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Admin
