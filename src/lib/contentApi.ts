export type ContentResponse<T> = {
  data: T | null
}

const buildJsonHeaders = () => {
  const headers = new Headers({ 'Content-Type': 'application/json' })
  const token = import.meta.env.VITE_ADMIN_API_TOKEN
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }
  return headers
}

const getContentBaseUrl = () => {
  const raw = import.meta.env.VITE_CONTENT_API_BASE
  if (!raw) return ''
  return raw.endsWith('/') ? raw.slice(0, -1) : raw
}

export const fetchContent = async <T>(key: string): Promise<T | null> => {
  try {
    const baseUrl = getContentBaseUrl()
    const url = baseUrl ? `${baseUrl}/api/content/${key}` : `/api/content/${key}`
    console.log(`[fetchContent] GET ${url}`)
    const response = await fetch(url)
    if (!response.ok) {
      console.warn(`[fetchContent] ${key} returned ${response.status}`)
      return null
    }
    const payload = (await response.json()) as ContentResponse<T>
    console.log(`[fetchContent] ${key}:`, payload?.data ? 'loaded' : 'empty')
    return payload?.data ?? null
  } catch (error) {
    console.error(`[fetchContent] ${key} error:`, error)
    return null
  }
}

export const saveContent = async (key: string, data: unknown): Promise<boolean> => {
  try {
    const baseUrl = getContentBaseUrl()
    const url = baseUrl ? `${baseUrl}/api/content/${key}` : `/api/content/${key}`
    console.log(`[fetchContent] PUT ${url}`)
    const response = await fetch(url, {
      method: 'PUT',
      headers: buildJsonHeaders(),
      body: JSON.stringify({ data }),
    })
    return response.ok
  } catch (error) {
    return false
  }
}
