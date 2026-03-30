import { CONFIG } from '../config'

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public retryAfter?: number,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

const etagCache = new Map<string, { etag: string; data: any }>()

export async function apiFetch<T = any>(path: string, opts: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('auth_token')
  const headers: Record<string, string> = {
    ...(opts.headers as Record<string, string> || {}),
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const url = CONFIG.API_BASE + path
  const method = opts.method?.toUpperCase() || 'GET'

  if (method === 'GET') {
    const cached = etagCache.get(url)
    if (cached) {
      headers['If-None-Match'] = cached.etag
    }
  }

  const res = await fetch(url, { ...opts, headers })

  if (res.status === 304) {
    const cached = etagCache.get(url)
    if (cached) return cached.data as T
  }

  if (!res.ok) {
    if (res.status === 429) {
      const retryAfter = parseInt(res.headers.get('Retry-After') || '', 10) || undefined
      throw new ApiError(429, 'Too many requests, please try again later', retryAfter)
    }

    const body = await res.json().catch(() => ({}))
    const message = body.message || `Request failed with status ${res.status}`
    throw new ApiError(res.status, typeof message === 'string' ? message : JSON.stringify(message), undefined)
  }

  const contentType = res.headers.get('content-type') || ''
  let data: T
  if (contentType.includes('application/json')) {
    data = await res.json()
  } else {
    data = (await res.text()) as any
  }

  if (method === 'GET') {
    const etag = res.headers.get('etag')
    if (etag) {
      etagCache.set(url, { etag, data })
    }
  }

  return data
}
