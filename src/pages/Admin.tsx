import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from 'react'
import { fetchContent, saveContent } from '../lib/contentApi'
import {
  requestImageUpload,
  requestVideoUpload,
  resolveImageUrl,
  uploadFileToUrl,
  uploadVideoWithTus,
} from '../lib/cloudflareUpload'
import {
  ClientLogo,
  MediaItem,
  Ratio,
  normalizeClientLogo,
  normalizeMediaItem,
} from '../lib/contentSections'

const emptyMediaItem = (): MediaItem => normalizeMediaItem({})
const emptyLogo = (): ClientLogo => normalizeClientLogo({})

const Admin = () => {
  const [originals, setOriginals] = useState<MediaItem[]>([])
  const [clientProjects, setClientProjects] = useState<MediaItem[]>([])
  const [clientLogos, setClientLogos] = useState<ClientLogo[]>([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<Record<string, string>>({})
  const [uploading, setUploading] = useState<Record<string, boolean>>({})
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})

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
  const setProgress = (key: string, value: number) => {
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
      setProgress(uploadKey, 0)
      const upload = await requestVideoUpload({ size: file.size })
      await uploadVideoWithTus(upload.uploadURL, file, {
        onProgress: (percentage) => setProgress(uploadKey, percentage),
      })

      setter((prev) => {
        const next = [...prev]
        const current = next[index]
        next[index] = {
          ...current,
          videoUrl: upload.playbackUrl,
          posterUrl: current.posterUrl || upload.thumbnailUrl,
        }
        return next
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No se pudo subir el video. Reintenta.'
      setSectionStatus('upload', message)
    } finally {
      stopUploading(uploadKey)
      setProgress(uploadKey, 0)
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

  const ratioOptions = useMemo(() => ['landscape', 'portrait', 'square'] as Ratio[], [])

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

          <div className="mt-6 space-y-6">
            {originals.map((item, index) => (
              <div key={item.id} className="rounded-2xl border border-slate-200/70 bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="font-semibold text-slate-900">#{index + 1} {item.title || 'Nuevo original'}</div>
                  <button
                    onClick={() => setOriginals((prev) => prev.filter((entry) => entry.id !== item.id))}
                    className="text-xs uppercase tracking-[0.2em] text-rose-500"
                  >
                    Eliminar
                  </button>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
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
                    Ano
                    <input
                      value={item.year}
                      onChange={(event) => handleMediaChange(setOriginals, index, 'year', event.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-800"
                    />
                  </label>
                  <label className="text-sm text-slate-600">
                    Duracion (mm:ss)
                    <input
                      value={item.duration}
                      onChange={(event) => handleMediaChange(setOriginals, index, 'duration', event.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-800"
                    />
                  </label>
                  <label className="text-sm text-slate-600">
                    Likes
                    <input
                      type="number"
                      value={item.likes}
                      onChange={(event) => handleMediaChange(setOriginals, index, 'likes', Number(event.target.value))}
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-800"
                    />
                  </label>
                  <label className="text-sm text-slate-600">
                    Ratio
                    <select
                      value={item.ratio}
                      onChange={(event) => handleMediaChange(setOriginals, index, 'ratio', event.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-800"
                    >
                      {ratioOptions.map((ratio) => (
                        <option key={ratio} value={ratio}>
                          {ratio}
                        </option>
                      ))}
                    </select>
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
                        <span className="text-xs text-slate-500">
                          Subiendo {uploadProgress[`${item.id}-video`] ?? 0}%
                        </span>
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

          <div className="mt-6 space-y-6">
            {clientProjects.map((item, index) => (
              <div key={item.id} className="rounded-2xl border border-slate-200/70 bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="font-semibold text-slate-900">#{index + 1} {item.title || 'Nuevo proyecto'}</div>
                  <button
                    onClick={() => setClientProjects((prev) => prev.filter((entry) => entry.id !== item.id))}
                    className="text-xs uppercase tracking-[0.2em] text-rose-500"
                  >
                    Eliminar
                  </button>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
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
                    Ano
                    <input
                      value={item.year}
                      onChange={(event) => handleMediaChange(setClientProjects, index, 'year', event.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-800"
                    />
                  </label>
                  <label className="text-sm text-slate-600">
                    Duracion (mm:ss)
                    <input
                      value={item.duration}
                      onChange={(event) => handleMediaChange(setClientProjects, index, 'duration', event.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-800"
                    />
                  </label>
                  <label className="text-sm text-slate-600">
                    Likes
                    <input
                      type="number"
                      value={item.likes}
                      onChange={(event) => handleMediaChange(setClientProjects, index, 'likes', Number(event.target.value))}
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-800"
                    />
                  </label>
                  <label className="text-sm text-slate-600">
                    Ratio
                    <select
                      value={item.ratio}
                      onChange={(event) => handleMediaChange(setClientProjects, index, 'ratio', event.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-800"
                    >
                      {ratioOptions.map((ratio) => (
                        <option key={ratio} value={ratio}>
                          {ratio}
                        </option>
                      ))}
                    </select>
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
                        <span className="text-xs text-slate-500">
                          Subiendo {uploadProgress[`${item.id}-video`] ?? 0}%
                        </span>
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

          <div className="mt-6 space-y-4">
            {clientLogos.map((item, index) => (
              <div key={item.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200/70 bg-white p-4">
                <div className="flex-1 min-w-[200px]">
                  <label className="text-sm text-slate-600">
                    Nombre
                    <input
                      value={item.name}
                      onChange={(event) => handleLogoChange(index, 'name', event.target.value)}
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-800"
                    />
                  </label>
                </div>
                <div className="flex-1 min-w-[240px]">
                  <div className="text-sm text-slate-600">Logo</div>
                  <div className="mt-1 text-xs text-slate-500 break-all">{item.logoUrl || 'Sin logo'}</div>
                  <div className="mt-2 flex items-center gap-3">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                      Subir imagen
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
                  </div>
                </div>
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
