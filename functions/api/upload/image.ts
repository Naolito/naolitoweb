export interface Env {
  CLOUDFLARE_ACCOUNT_ID: string
  CLOUDFLARE_API_TOKEN: string
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

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!withAuth(request, env)) {
    return jsonResponse({ error: 'Unauthorized' }, 401)
  }

  let payload: { metadata?: Record<string, string> }
  try {
    payload = await request.json()
  } catch (error) {
    payload = {}
  }

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requireSignedURLs: false,
        metadata: payload?.metadata ?? {},
      }),
    },
  )

  const data = await response.json()
  if (!response.ok) {
    return jsonResponse({ error: 'Cloudflare Images request failed', details: data }, 500)
  }

  return jsonResponse({ uploadURL: data.result?.uploadURL })
}
