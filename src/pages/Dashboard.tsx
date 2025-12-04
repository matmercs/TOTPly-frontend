import React, { useEffect, useState } from 'react'
import { apiFetch } from '../hooks/useApi'
import { Link } from 'react-router-dom'
import { IconCopy, IconEdit, IconDelete } from '../components/Icons'
import { Button } from '../components/Button'
import CountdownRing from '../components/CountdownRing'
import { useNavigate } from 'react-router-dom'
import { CONFIG } from '../config'

type Item = { id: string; name: string; secret: string }

const MOCK_ITEMS_DEFAULT: Item[] = [
  { id: '1', name: 'Google (jdoe@gmail.com)', secret: 'JBSWY3DPEHPK3PXP' },
  { id: '2', name: 'GitHub (jdoe)', secret: 'AC45323243243243' },
  { id: '3', name: 'Amazon AWS', secret: 'K345345345345345' },
];

export default function Dashboard(){
  const [items, setItems] = useState<Item[]>([])
  const [codes, setCodes] = useState<Record<string,string>>({})
  const [loading, setLoading] = useState(true)
  const [blurAll, setBlurAll] = useState(true)
  const navigate = useNavigate()

  useEffect(()=>{
    let mounted = true
    const fetchList = async ()=>{
      setLoading(true)
      if (CONFIG.MODE === 'test') {
        await new Promise(r => setTimeout(r, 300));
        if(mounted) {
          const stored = localStorage.getItem('mock_totp_items');
          if (stored) {
            setItems(JSON.parse(stored));
          } else {
            setItems(MOCK_ITEMS_DEFAULT);
            localStorage.setItem('mock_totp_items', JSON.stringify(MOCK_ITEMS_DEFAULT));
          }
        }
        if(mounted) setLoading(false);
      } else {
        try{
          const data = await apiFetch<Item[]>('/totp/list')
          if(mounted) {
            if(Array.isArray(data)) setItems(data)
            else setItems([])
          }
        }catch(e){
          console.error(e);
        }finally{ if(mounted) setLoading(false) }
      }
    }
    fetchList()
    return ()=>{ mounted = false }
  }, [])

  useEffect(()=>{
    let mounted = true
    const update = async ()=>{
      if (CONFIG.MODE === 'test') {
         if(mounted) {
          const newCodes: Record<string,string> = {};
          items.forEach(item => {

            const epoch = Math.floor(Date.now() / 1000);
             const timeStep = Math.floor(epoch / 30);

             let hash = 0;
             const str = item.id + item.secret + timeStep;
             for (let i = 0; i < str.length; i++) {
                hash = ((hash << 5) - hash) + str.charCodeAt(i);
                hash |= 0; 
             }
             const codeVal = Math.abs(hash) % 1000000;
             newCodes[item.id] = codeVal.toString().padStart(6, '0');
          });
          setCodes(newCodes);
        }
      } else {
        try{
          const data = await apiFetch<Record<string,string>>('/totp/codes')
          if(mounted) setCodes(data || {})
        }catch(e){ }
      }
    }
    
    if(items.length > 0) update();
    
    const id = setInterval(update, 1000);

    return ()=>{ mounted = false; clearInterval(id); }
  }, [items])

  const maskSecret = (secret: string) => {
      if (!secret) return '';
      if (blurAll) return '••••••••••••••••';
      if (secret.length <= 4) return secret;
      return secret.substring(0, 4) + '••••••••';
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
            {blurAll ? 'Show Secrets' : 'Blur Secrets'}
          </Button>
          <Button variant="primary" onClick={()=>navigate('/add')}>
            <span className="mr-2">+</span> Add account
          </Button>
        </div>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({length:4}).map((_,i)=> (
            <div key={i} className="card skeleton h-32 rounded-2xl"></div>
          ))}
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map(it=> (
            <li key={it.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4 group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 border border-white shadow-sm flex items-center justify-center text-slate-700 font-bold text-xl">
                    {it.name?.[0]?.toUpperCase() ?? '?'}
                  </div>
                  <div className="overflow-hidden">
                    <div className="font-bold text-slate-900 text-lg leading-tight truncate pr-2" title={it.name}>{it.name}</div>
                    <div className="text-xs text-slate-400 font-mono mt-1 truncate max-w-[160px] tracking-wider" title={it.secret}>
                        {maskSecret(it.secret)}
                    </div>
                  </div>
                </div>
                
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <Link to={`/edit/${it.id}`} className="p-2 text-slate-400 hover:text-purple-600 transition-colors rounded-lg hover:bg-purple-50" title="Edit"><IconEdit/></Link>
                  <button className="p-2 text-slate-400 hover:text-pink-600 transition-colors rounded-lg hover:bg-pink-50" title="Delete"><IconDelete/></button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-50 mt-2">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center">
                    <CountdownRing size={50} stroke={3} total={30} remaining={30 - ((Date.now() / 1000) % 30)} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">TOTP Code</span>
                    <div className={`text-2xl font-mono font-bold text-slate-800 tracking-widest ${codes[it.id] ? '' : 'opacity-50'} ${blurAll ? 'blur-sm select-none transition-all hover:blur-0' : ''}`}>
                      {codes[it.id] ? (
                        <>
                          <span>{codes[it.id].slice(0,3)}</span>
                          <span className="mx-1 text-slate-300"> </span>
                          <span>{codes[it.id].slice(3)}</span>
                        </>
                      ) : '--- ---'}
                    </div>
                  </div>
                </div>
                <button 
                  className="p-3 rounded-xl bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-95 border border-slate-100" 
                  title="Copy code" 
                  onClick={async ()=>{ try{ await navigator.clipboard.writeText(codes[it.id] ?? '') }catch{} }}
                >
                  <IconCopy/>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      {items.length === 0 && !loading && (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-2">No accounts yet</h3>
          <p className="text-slate-500 mb-6">Add your first TOTP account to get started.</p>
          <Button variant="primary" onClick={()=>navigate('/add')}>Add Account</Button>
        </div>
      )}
    </div>
  )
}
