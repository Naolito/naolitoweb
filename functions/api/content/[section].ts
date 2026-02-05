export interface Env {
  DB: D1Database
  ADMIN_API_TOKEN?: string
}

const jsonResponse = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })

const withAuth = (request: Request, env: Env) => {
  if (!env.ADMIN_API_TOKEN) return true
  const auth = request.headers.get('Authorization')
  return auth === `Bearer ${env.ADMIN_API_TOKEN}`
}

export const onRequestGet: PagesFunction<Env> = async ({ params, env }) => {
  const section = params.section
  if (typeof section !== 'string') {
    return jsonResponse({ error: 'Missing section' }, 400)
  }

  const result = await env.DB.prepare('SELECT data FROM content WHERE key = ?').bind(section).first()
  if (!result) {
    return jsonResponse({ data: null })
  }

  try {
    return jsonResponse({ data: JSON.parse(result.data as string) })
  } catch (error) {
    return jsonResponse({ data: null, error: 'Invalid data format' }, 500)
  }
}

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  })
}

export const onRequestPut: PagesFunction<Env> = async ({ request, params, env }) => {
  if (!withAuth(request, env)) {
    return jsonResponse({ error: 'Unauthorized' }, 401)
  }

  const section = params.section
  if (typeof section !== 'string') {
    return jsonResponse({ error: 'Missing section' }, 400)
  }

  let payload: { data?: unknown }
  try {
    payload = await request.json()
  } catch (error) {
    return jsonResponse({ error: 'Invalid JSON' }, 400)
  }

  if (payload?.data === undefined) {
    return jsonResponse({ error: 'Missing data' }, 400)
  }

  const serialized = JSON.stringify(payload.data)

  await env.DB.prepare(
    `INSERT INTO content (key, data, updated_at)
     VALUES (?1, ?2, datetime('now'))
     ON CONFLICT(key) DO UPDATE SET data = ?2, updated_at = datetime('now')`,
  )
    .bind(section, serialized)
    .run()

  return jsonResponse({ ok: true })
}
