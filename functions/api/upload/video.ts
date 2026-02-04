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

  let payload: { size?: number; maxDurationSeconds?: number }
  try {
    payload = await request.json()
  } catch (error) {
    payload = {}
  }

  const size = typeof payload.size === 'number' ? payload.size : undefined
  const maxDurationSeconds =
    typeof payload.maxDurationSeconds === 'number' && payload.maxDurationSeconds > 0
      ? payload.maxDurationSeconds
      : 3600

  if (size) {
    const metadata = `maxdurationseconds ${btoa(String(maxDurationSeconds))}`
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/stream?direct_user=true`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
          'Tus-Resumable': '1.0.0',
          'Upload-Length': `${size}`,
          'Upload-Metadata': metadata,
        },
      },
    )

    if (!response.ok) {
      const details = await response.text()
      return jsonResponse({ error: 'Cloudflare Stream TUS request failed', details }, 500)
    }

    const rawUploadURL = response.headers.get('Location')
    const uploadURL = rawUploadURL
      ? new URL(rawUploadURL, 'https://upload.cloudflarestream.com').toString()
      : null
    const uid = response.headers.get('stream-media-id') ?? uploadURL?.split('/').pop()

    if (!uploadURL || !uid) {
      return jsonResponse({ error: 'Missing Stream upload URL' }, 500)
    }

    return jsonResponse({
      uploadURL,
      uid,
      ...buildStreamUrls(env.CLOUDFLARE_STREAM_CUSTOMER_CODE, uid),
    })
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
        maxDurationSeconds,
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
