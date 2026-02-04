export interface Env {
  CLOUDFLARE_ACCOUNT_ID: string
  CLOUDFLARE_API_TOKEN: string
  CLOUDFLARE_STREAM_CUSTOMER_CODE: string
  ADMIN_API_TOKEN?: string
}

const jsonResponse = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  })

const withAuth = (request: Request, env: Env) => {
  if (!env.ADMIN_API_TOKEN) return true
  const auth = request.headers.get('Authorization')
  return auth === `Bearer ${env.ADMIN_API_TOKEN}`
}

const buildStreamUrls = (customerCode: string, uid: string) => {
  const base = `https://customer-${customerCode}.cloudflarestream.com/${uid}`
  return {
    playbackUrl: `${base}/manifest/video.m3u8`,
    thumbnailUrl: `${base}/thumbnails/thumbnail.jpg`,
  }
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!withAuth(request, env)) {
    return jsonResponse({ error: 'Unauthorized' }, 401)
  }

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/stream/direct_upload`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        maxDurationSeconds: 3600,
      }),
    },
  )

  const data = await response.json()
  if (!response.ok) {
    return jsonResponse({ error: 'Cloudflare Stream request failed', details: data }, 500)
  }

  const uid = data.result?.uid
  if (!uid) {
    return jsonResponse({ error: 'Missing Stream uid' }, 500)
  }

  return jsonResponse({
    uploadURL: data.result?.uploadURL,
    uid,
    ...buildStreamUrls(env.CLOUDFLARE_STREAM_CUSTOMER_CODE, uid),
  })
}
