import React, { useEffect, useState } from 'react'
import { apiFetch } from '../hooks/useApi'
import { Link } from 'react-router-dom'
import { IconCopy, IconEdit, IconDelete } from '../components/Icons'
import { Button } from '../components/Button'
import CountdownRing from '../components/CountdownRing'
import { useNavigate } from 'react-router-dom'

type Item = { id: string; name: string; secret: string }

export default function Dashboard(){
  const [items, setItems] = useState<Item[]>([])
  const [codes, setCodes] = useState<Record<string,string>>({})
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(()=>{
    let mounted = true
    const fetchList = async ()=>{
      setLoading(true)
      try{
        const data = await apiFetch<Item[]>('/totp/list')
        if(mounted) {
          if(Array.isArray(data)) setItems(data)
          else {
            console.warn('apiFetch /totp/list returned non-array, falling back to empty list', data)
            setItems([])
          }
        }
      }catch(e){
      }finally{ if(mounted) setLoading(false) }
    }
    fetchList()
    return ()=>{ mounted = false }
  }, [])

  useEffect(()=>{
    let mounted = true
    const update = async ()=>{
      try{
        const data = await apiFetch<Record<string,string>>('/totp/codes')
        if(mounted) setCodes(data || {})
      }catch(e){ if(mounted) setCodes({}) }
    }
    update()
    const id = setInterval(update, 1000)
    return ()=>{ mounted = false; clearInterval(id) }
  }, [items])

  return (
    <div className="container max-w-4xl mx-auto p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">TOTP Accounts</h1>
        <div className="space-x-2">
          <Button variant="primary" onClick={()=>navigate('/add')}>Add account</Button>
        </div>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({length:4}).map((_,i)=> (
            <div key={i} className="card skeleton h-28"></div>
          ))}
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map(it=> (
            <li key={it.id} className="card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-semibold">{it.name?.[0] ?? '?'}</div>
                <div>
                  <div className="font-medium text-lg">{it.name}</div>
                  <div className="text-sm text-muted">{it.secret}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center">
                    <CountdownRing size={56} stroke={4} total={30} remaining={30 - (Math.floor(Date.now() / 1000) % 30)} />
                    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none`}>
                      <div className={`code-pill ${codes[it.id] ? 'pulse' : ''}`}>{codes[it.id] ?? '----'}</div>
                    </div>
                  </div>
                  <button className="icon-btn" title="Copy code" onClick={async ()=>{ try{ await navigator.clipboard.writeText(codes[it.id] ?? '') }catch{} }}><IconCopy/></button>
                </div>
                <div className="flex items-center gap-2">
                  <Link to={`/edit/${it.id}`} className="icon-btn" title="Edit"><IconEdit/></Link>
                  <button className="icon-btn" title="Delete"><IconDelete/></button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
