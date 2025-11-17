import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../hooks/useApi'

type Form = { name: string; secret: string }

export default function AddSecret(){
  const { register, handleSubmit } = useForm<Form>()
  const navigate = useNavigate()
  const onSubmit = async (data: Form)=>{
    try{
      await apiFetch('/totp/create', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data) })
      navigate('/dashboard')
    }catch(e:any){
      alert(e?.message || 'Failed')
    }
  }
  return (
    <div className="max-w-md mx-auto mt-12 p-6 card">
      <h2 className="text-xl mb-4">Add TOTP Account</h2>
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
