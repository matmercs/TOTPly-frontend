export type ApiOptions = RequestInit & { mock?: boolean }

export async function apiFetch<T = any>(path: string, opts: ApiOptions = {}): Promise<T> {
  const base = '/api'
  try{
    const res = await fetch(base + path, opts)
    if(res.status === 404) throw new Error('Not found')
    const contentType = res.headers.get('content-type') || ''
  if(contentType.includes('application/json')) return res.json()
  return (await res.text()) as any
  }catch(err){
    if(opts.mock !== false){
      if(path === '/auth/login' || path === '/auth/register'){
        return { token: btoa(JSON.stringify({ exp: Math.floor(Date.now()/1000) + 1800 })), user: { id: 'demo', email: 'demo@example.com' } } as any
      }
      if(path === '/totp/list'){
        return [
          { id: '1', name: 'GitHub', secret: 'JBSWY3DPEHPK3PXP' },
          { id: '2', name: 'Google', secret: 'MZXW6YTBOI======' }
        ] as any
      }
      if(path === '/totp/codes'){
        const makeCode = ()=> Math.floor(Math.random()*1_000_000).toString().padStart(6,'0')
        return { '1': makeCode(), '2': makeCode() } as any
      }
      if(path.startsWith('/totp')) return { ok: true } as any
    }
    throw err
  }
}
