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

export const fetchContent = async <T>(key: string): Promise<T | null> => {
  try {
    const response = await fetch(`/api/content/${key}`)
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
    const response = await fetch(`/api/content/${key}`, {
      method: 'PUT',
      headers: buildJsonHeaders(),
      body: JSON.stringify({ data }),
    })
    return response.ok
  } catch (error) {
    return false
  }
}
