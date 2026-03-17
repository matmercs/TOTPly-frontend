import { CONFIG } from '../config'

export async function apiFetch<T = any>(path: string, opts: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('auth_token')
  const headers: Record<string, string> = {
    ...(opts.headers as Record<string, string> || {}),
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(CONFIG.API_BASE + path, { ...opts, headers })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message || `Request failed with status ${res.status}`)
  }

  const contentType = res.headers.get('content-type') || ''
  if (contentType.includes('application/json')) return res.json()
  return (await res.text()) as any
}
