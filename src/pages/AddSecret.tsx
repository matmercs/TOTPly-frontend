import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../hooks/useApi'
import { CONFIG } from '../config'

type Form = { name: string; secret: string }

export default function AddSecret(){
  const { register, handleSubmit } = useForm<Form>()
  const navigate = useNavigate()

  const onSubmit = async (data: Form)=>{
    try{
      if (CONFIG.MODE === 'test') {
        await new Promise(r => setTimeout(r, 300));
        const stored = localStorage.getItem('mock_totp_items');
        const items = stored ? JSON.parse(stored) : [];
        const newItem = { ...data, id: Math.random().toString(36).substring(2, 9) };
        items.push(newItem);
        localStorage.setItem('mock_totp_items', JSON.stringify(items));
        navigate('/dashboard');
      } else {
        await apiFetch('/totp/create', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data) })
        navigate('/dashboard')
      }
    }catch(e:any){
      alert(e?.message || 'Failed')
    }
  }
  return (
    <div className="max-w-md mx-auto mt-12 p-6 card bg-white border border-slate-200 shadow-lg">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Add TOTP Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
          <input 
             {...register('name', { required: true })} 
             className="w-full p-3 border border-slate-300 rounded-xl bg-white text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
             placeholder="e.g. Google (user@example.com)"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Base32 Secret</label>
          <input 
             {...register('secret', { required: true })} 
             className="w-full p-3 border border-slate-300 rounded-xl bg-white text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-mono"
             placeholder="JBSWY3DPEHPK3PXP"
          />
        </div>
        <div className="flex justify-end pt-4">
          <button type="submit" className="btn btn-primary px-6">Save Account</button>
        </div>
      </form>
    </div>
  )
}
