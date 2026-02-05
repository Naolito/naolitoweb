export interface Env {
  SOCIAL_STATS_CACHE_TTL?: string
  TIKTOK_PROFILE_URL?: string
  INSTAGRAM_PROFILE_URL?: string
  FACEBOOK_PROFILE_URL?: string
}

type StatsPayload = {
  tiktok: number | null
  instagram: number | null
  facebook: number | null
  updatedAt: string
}

const DEFAULT_TIKTOK_URL = 'https://www.tiktok.com/@naolitok'
const DEFAULT_INSTAGRAM_URL = 'https://www.instagram.com/naolito/'
const DEFAULT_FACEBOOK_URL = 'https://www.facebook.com/naolito'
const DEFAULT_CACHE_TTL = 300

const parseCompactNumber = (raw: string): number | null => {
  const normalized = raw.trim().replace(/,/g, '').toUpperCase()
  const match = normalized.match(/^([0-9]+(?:\.[0-9]+)?)([KMB])?$/)
  if (!match) return null

  const value = Number(match[1])
  const suffix = match[2]
  if (!Number.isFinite(value)) return null

  if (suffix === 'K') return Math.round(value * 1_000)
  if (suffix === 'M') return Math.round(value * 1_000_000)
  if (suffix === 'B') return Math.round(value * 1_000_000_000)
  return Math.round(value)
}

const parseTikTokFollowers = (html: string): number | null => {
  const jsonLikePatterns = [
    /"followerCount":\s*([0-9]+)/i,
    /"followers":\s*([0-9]+)/i,
    /"follower_count":\s*([0-9]+)/i,
  ]

  for (const pattern of jsonLikePatterns) {
    const match = html.match(pattern)
    if (match?.[1]) {
      const value = Number(match[1])
      if (Number.isFinite(value)) return value
    }
  }

  const textPattern = html.match(/([0-9]+(?:\.[0-9]+)?[KMB]?)\s+Followers/i)
  if (!textPattern?.[1]) return null
  return parseCompactNumber(textPattern[1])
}

const parseInstagramFollowers = (html: string): number | null => {
  const patterns = [
    /"edge_followed_by":\{"count":([0-9]+)\}/i,
    /"followers_count":\s*([0-9]+)/i,
    /"follower_count":\s*([0-9]+)/i,
  ]

  for (const pattern of patterns) {
    const match = html.match(pattern)
    if (match?.[1]) {
      const value = Number(match[1])
      if (Number.isFinite(value)) return value
    }
  }

  const textPattern = html.match(/([0-9]+(?:\.[0-9]+)?[KMB]?)\s+followers/i)
  if (!textPattern?.[1]) return null
  return parseCompactNumber(textPattern[1])
}

const parseFacebookFollowers = (html: string): number | null => {
  const patterns = [
    /"followers_count":\s*([0-9]+)/i,
    /"followed_by_count":\{"text":"([0-9.,KMB]+)\s+followers"/i,
    /([0-9]+(?:\.[0-9]+)?[KMB]?)\s+followers/i,
  ]

  for (const pattern of patterns) {
    const match = html.match(pattern)
    if (match?.[1]) {
      const numeric = parseCompactNumber(match[1])
      if (numeric !== null) return numeric
    }
  }

  return null
}

const fetchPage = async (url: string): Promise<string | null> => {
  const response = await fetch(url, {
    method: 'GET',
    redirect: 'follow',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  })

  if (!response.ok) return null
  return response.text()
}

const toJsonResponse = (payload: StatsPayload, cacheTtl: number) =>
  new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': `public, max-age=${cacheTtl}, stale-while-revalidate=${cacheTtl}`,
    },
  })

export const onRequestGet: PagesFunction<Env> = async ({ request, env, waitUntil }) => {
  const ttl = Number(env.SOCIAL_STATS_CACHE_TTL ?? DEFAULT_CACHE_TTL)
  const cacheTtl = Number.isFinite(ttl) && ttl > 0 ? Math.round(ttl) : DEFAULT_CACHE_TTL

  const cacheKey = new Request(request.url, request)
  const cache = caches.default
  const cached = await cache.match(cacheKey)
  if (cached) {
    return cached
  }

  const tiktokUrl = env.TIKTOK_PROFILE_URL ?? DEFAULT_TIKTOK_URL
  const instagramUrl = env.INSTAGRAM_PROFILE_URL ?? DEFAULT_INSTAGRAM_URL
  const facebookUrl = env.FACEBOOK_PROFILE_URL ?? DEFAULT_FACEBOOK_URL

  const [tiktokHtml, instagramHtml, facebookHtml] = await Promise.all([
    fetchPage(tiktokUrl).catch(() => null),
    fetchPage(instagramUrl).catch(() => null),
    fetchPage(facebookUrl).catch(() => null),
  ])

  const payload: StatsPayload = {
    tiktok: tiktokHtml ? parseTikTokFollowers(tiktokHtml) : null,
    instagram: instagramHtml ? parseInstagramFollowers(instagramHtml) : null,
    facebook: facebookHtml ? parseFacebookFollowers(facebookHtml) : null,
    updatedAt: new Date().toISOString(),
  }

  const response = toJsonResponse(payload, cacheTtl)
  waitUntil(cache.put(cacheKey, response.clone()))
  return response
}
