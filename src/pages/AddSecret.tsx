import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../hooks/useApi'

type Form = { issuer: string; accountName: string; secret: string }

export default function AddSecret(){
  const { register, handleSubmit } = useForm<Form>()
  const navigate = useNavigate()

  const onSubmit = async (data: Form) => {
    try {
      await apiFetch('/totp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      navigate('/dashboard')
    } catch (e: any) {
      alert(e?.message || 'Failed')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 card bg-white border border-slate-200 shadow-lg">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Add TOTP Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Issuer</label>
          <input
             {...register('issuer', { required: true })}
             className="w-full p-3 border border-slate-300 rounded-xl bg-white text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
             placeholder="e.g. GitHub"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Account Name</label>
          <input
             {...register('accountName', { required: true })}
             className="w-full p-3 border border-slate-300 rounded-xl bg-white text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
             placeholder="e.g. user@example.com"
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
