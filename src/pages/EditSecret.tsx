import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { apiFetch } from '../hooks/useApi'

type Form = { issuer: string; accountName: string }

export default function EditSecret(){
  const { id } = useParams()
  const { register, handleSubmit, reset } = useForm<Form>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      if (!id) return
      try {
        const data = await apiFetch(`/totp/${id}`)
        if (mounted) reset({ issuer: data.issuer, accountName: data.accountName })
      } catch {}
      if (mounted) setLoading(false)
    }
    load()
    return () => { mounted = false }
  }, [id, reset])

  const onSubmit = async (data: Form) => {
    try {
      await apiFetch(`/totp/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      navigate('/dashboard')
    } catch (e: any) {
      alert(e?.message || 'Failed')
    }
  }

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <div className="max-w-md mx-auto mt-12 p-6 card bg-white border border-slate-200 shadow-lg">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Edit TOTP Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Issuer</label>
          <input
            {...register('issuer', { required: true })}
            className="w-full p-3 border border-slate-300 rounded-xl bg-white text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Account Name</label>
          <input
            {...register('accountName', { required: true })}
            className="w-full p-3 border border-slate-300 rounded-xl bg-white text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          />
        </div>
        <div className="flex justify-end pt-4">
          <button type="submit" className="btn btn-primary px-6">Save Changes</button>
        </div>
      </form>
    </div>
  )
}
