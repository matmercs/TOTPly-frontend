import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { apiFetch } from '../hooks/useApi'
import { CONFIG } from '../config'

type Form = { name: string; secret: string }

export default function EditSecret(){
  const { id } = useParams()
  const { register, handleSubmit, reset } = useForm<Form>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    let mounted = true
    const load = async ()=>{
      if(!id) return
      if (CONFIG.MODE === 'test') {
        const stored = localStorage.getItem('mock_totp_items');
        if (stored) {
          const items = JSON.parse(stored);
          const item = items.find((i: any) => i.id === id);
          if (item && mounted) reset({ name: item.name, secret: item.secret });
        }
        if(mounted) setLoading(false);
      } else {
        try{
          const data = await apiFetch(`/totp/${id}`)
          if(mounted) reset({ name: data.name, secret: data.secret })
        }catch(e){ }
        if(mounted) setLoading(false)
      }
    }
    load()
    return ()=>{ mounted = false }
  }, [id, reset])

  const onSubmit = async (data: Form)=>{
    try{
      if (CONFIG.MODE === 'test') {
         const stored = localStorage.getItem('mock_totp_items');
         if (stored) {
           const items = JSON.parse(stored);
           const idx = items.findIndex((i: any) => i.id === id);
           if (idx !== -1) {
             items[idx] = { ...items[idx], ...data };
             localStorage.setItem('mock_totp_items', JSON.stringify(items));
           }
         }
         navigate('/dashboard');
      } else {
        await apiFetch(`/totp/${id}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data) })
        navigate('/dashboard')
      }
    }catch(e:any){ alert(e?.message || 'Failed') }
  }

  if(loading) return <div className="p-6">Loading...</div>
  return (
    <div className="max-w-md mx-auto mt-12 p-6 card bg-white border border-slate-200 shadow-lg">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Edit TOTP Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
          <input 
            {...register('name', { required: true })} 
            className="w-full p-3 border border-slate-300 rounded-xl bg-white text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Base32 Secret</label>
          <input 
            {...register('secret', { required: true })} 
            className="w-full p-3 border border-slate-300 rounded-xl bg-white text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-mono"
          />
        </div>
        <div className="flex justify-end pt-4">
          <button type="submit" className="btn btn-primary px-6">Save Changes</button>
        </div>
      </form>
    </div>
  )
}
