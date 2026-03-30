import React, { useEffect, useState } from 'react'
import { apiFetch, ApiError } from '../hooks/useApi'
import { CONFIG } from '../config'
import { Link } from 'react-router-dom'
import { IconCopy, IconEdit, IconDelete } from '../components/Icons'
import { Button } from '../components/Button'
import CountdownRing from '../components/CountdownRing'
import { useNavigate } from 'react-router-dom'

type Item = { id: string; issuer: string; accountName: string }
type CodeData = { id: string; issuer: string; accountName: string; code: string; remainingSeconds: number; period: number }

export default function Dashboard(){
  const [items, setItems] = useState<Item[]>([])
  const [codes, setCodes] = useState<Record<string, { code: string; remainingSeconds: number; period: number }>>({})
  const [loading, setLoading] = useState(true)
  const [blurAll, setBlurAll] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    let mounted = true
    const fetchList = async () => {
      setLoading(true)
      try {
        const data = await apiFetch<Item[]>('/totp')
        if (mounted && Array.isArray(data)) setItems(data)
      } catch (e) {
        console.error(e)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchList()
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    if (items.length === 0) return

    const token = localStorage.getItem('auth_token')
    if (!token) return

    const es = new EventSource(`${CONFIG.API_BASE}/totp/codes/stream?token=${encodeURIComponent(token)}`)

    es.onmessage = (event) => {
      try {
        const data: CodeData[] = JSON.parse(event.data)
        if (Array.isArray(data)) {
          const map: Record<string, { code: string; remainingSeconds: number; period: number }> = {}
          data.forEach(c => {
            map[c.id] = { code: c.code, remainingSeconds: c.remainingSeconds, period: c.period }
          })
          setCodes(map)
        }
      } catch {}
    }

    es.onerror = () => {
      // EventSource auto-reconnects; close only if component unmounts
    }

    return () => { es.close() }
  }, [items])

  useEffect(() => {
    const tickId = setInterval(() => {
      setCodes(prev => {
        const next = { ...prev }
        for (const id in next) {
          next[id] = { ...next[id], remainingSeconds: Math.max(0, next[id].remainingSeconds - 1) }
        }
        return next
      })
    }, 1000)
    return () => clearInterval(tickId)
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this entry?')) return
    try {
      await apiFetch(`/totp/${id}`, { method: 'DELETE' })
      setItems(items.filter(i => i.id !== id))
    } catch (e: any) {
      if (e instanceof ApiError && e.statusCode === 429) {
        alert('Too many requests. Please wait a moment and try again.')
      } else if (e instanceof ApiError && e.statusCode === 404) {
        setItems(items.filter(i => i.id !== id))
      } else {
        alert(e?.message || 'Failed to delete')
      }
    }
  }

  const displayName = (item: Item) => {
    if (item.issuer && item.accountName) return `${item.issuer} (${item.accountName})`
    return item.issuer || item.accountName
  }

  return (
    <div className="container max-w-4xl mx-auto p-6 py-10">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Manage your secure access codes</p>
        </div>
        <div className="flex gap-3">
          <Button
             variant="ghost"
             onClick={() => setBlurAll(!blurAll)}
             className="text-slate-900 border-slate-200 hover:text-teal-600 hover:border-teal-200 hover:bg-teal-50"
          >
            {blurAll ? 'Show Codes' : 'Blur Codes'}
          </Button>
          <Button variant="primary" onClick={() => navigate('/add')}>
            <span className="mr-2">+</span> Add account
          </Button>
        </div>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({length: 4}).map((_, i) => (
            <div key={i} className="card skeleton h-32 rounded-2xl"></div>
          ))}
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map(it => {
            const codeInfo = codes[it.id]
            const remaining = codeInfo?.remainingSeconds ?? 0
            const period = codeInfo?.period ?? 30
            return (
              <li key={it.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4 group">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 border border-white shadow-sm flex items-center justify-center text-slate-700 font-bold text-xl">
                      {it.issuer?.[0]?.toUpperCase() ?? '?'}
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-bold text-slate-900 text-lg leading-tight truncate pr-2" title={displayName(it)}>{displayName(it)}</div>
                    </div>
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <Link to={`/edit/${it.id}`} className="p-2 text-slate-400 hover:text-purple-600 transition-colors rounded-lg hover:bg-purple-50" title="Edit"><IconEdit/></Link>
                    <button onClick={() => handleDelete(it.id)} className="p-2 text-slate-400 hover:text-pink-600 transition-colors rounded-lg hover:bg-pink-50" title="Delete"><IconDelete/></button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-50 mt-2">
                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center">
                      <CountdownRing size={50} stroke={3} total={period} remaining={remaining} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">TOTP Code</span>
                      <div className={`text-2xl font-mono font-bold text-slate-800 tracking-widest ${codeInfo?.code ? '' : 'opacity-50'} ${blurAll ? 'blur-sm select-none transition-all hover:blur-0' : ''}`}>
                        {codeInfo?.code ? (
                          <>
                            <span>{codeInfo.code.slice(0, 3)}</span>
                            <span className="mx-1 text-slate-300"> </span>
                            <span>{codeInfo.code.slice(3)}</span>
                          </>
                        ) : '--- ---'}
                      </div>
                    </div>
                  </div>
                  <button
                    className="p-3 rounded-xl bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-95 border border-slate-100"
                    title="Copy code"
                    onClick={async () => { try { await navigator.clipboard.writeText(codeInfo?.code ?? '') } catch {} }}
                  >
                    <IconCopy/>
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}

      {items.length === 0 && !loading && (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-2">No accounts yet</h3>
          <p className="text-slate-500 mb-6">Add your first TOTP account to get started.</p>
          <Button variant="primary" onClick={() => navigate('/add')}>Add Account</Button>
        </div>
      )}
    </div>
  )
}
