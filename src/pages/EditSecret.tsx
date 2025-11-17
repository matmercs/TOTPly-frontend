import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { apiFetch } from '../hooks/useApi'

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
      try{
        const data = await apiFetch(`/totp/${id}`)
        if(mounted) reset({ name: data.name, secret: data.secret })
      }catch(e){ }
      if(mounted) setLoading(false)
    }
    load()
    return ()=>{ mounted = false }
  }, [id, reset])

  const onSubmit = async (data: Form)=>{
    try{
      await apiFetch(`/totp/${id}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data) })
      navigate('/dashboard')
    }catch(e:any){ alert(e?.message || 'Failed') }
  }

  if(loading) return <div className="p-6">Loading...</div>
  return (
    <div className="max-w-md mx-auto mt-12 p-6 card">
      <h2 className="text-xl mb-4">Edit TOTP Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm">Name</label>
          <input {...register('name', { required: true })} className="w-full mt-1 p-2 border rounded bg-gray-50 dark:bg-gray-900" />
        </div>
        <div>
          <label className="block text-sm">Base32 Secret</label>
          <input {...register('secret', { required: true })} className="w-full mt-1 p-2 border rounded bg-gray-50 dark:bg-gray-900" />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  )
}
