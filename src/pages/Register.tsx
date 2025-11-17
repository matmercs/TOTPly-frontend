import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

type FormData = { name: string; email: string; password: string; confirm: string }

export default function Register(){
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const navigate = useNavigate()
  const auth = useAuth()

  const onSubmit = async (data: FormData) => {
    if(data.password !== data.confirm){
      alert('Passwords do not match')
      return
    }
    try{
      await auth.register(data.email, data.password)
      navigate('/dashboard')
    }catch(err:any){
      alert(err?.message || String(err))
    }
  }

  return (
    <main className="container mx-auto py-12">
      <div className="auth-grid">
        <div className="auth-left">
          <div className="decor circle-1" style={{ background: 'rgba(239,211,225,0.95)', boxShadow: '0 40px 120px rgba(239,211,225,0.28)', left: '-40px', top: '-20px' }} />
          <div className="decor" style={{ width: 380, height: 380, left: '60%', top: '30%', background: 'rgba(231,234,205,0.9)', boxShadow: '0 40px 120px rgba(231,234,205,0.28)' }} />
          <div className="decor spot" />
        </div>
        <div className="auth-right">
          <div className="form-card">
            <div className="mb-4">
              <div className="text-sm text-muted">Join TOTPly</div>
              <h3 className="text-2xl font-extrabold">Create your account</h3>
              <div className="form-sub">A few quick steps to get you up and running</div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-field">
                <label className="block text-sm mb-2">Name</label>
                <input className="form-input" {...register('name', { required: true })} />
                {errors.name && <div className="text-sm text-red-500 mt-1">Name is required</div>}
              </div>

              <div className="form-field">
                <label className="block text-sm mb-2">Email</label>
                <input className="form-input" {...register('email', { required: true })} />
                {errors.email && <div className="text-sm text-red-500 mt-1">Email is required</div>}
              </div>

              <div className="form-field">
                <label className="block text-sm mb-2">Password</label>
                <input type="password" className="form-input" {...register('password', { required: true })} />
                {errors.password && <div className="text-sm text-red-500 mt-1">Password is required</div>}
              </div>

              <div className="form-field">
                <label className="block text-sm mb-2">Confirm Password</label>
                <input type="password" className="form-input" {...register('confirm', { required: true })} />
                {errors.confirm && <div className="text-sm text-red-500 mt-1">Confirm your password</div>}
              </div>

              <div className="form-field">
                <button type="submit" className="gradient-btn" style={{ background: 'linear-gradient(90deg, #c9e4eb 0%, #e8d3f2 100%)' }}>Create account</button>
              </div>
            </form>

            <div className="mt-4 text-center">
              <span className="text-sm">Already have an account? </span>
              <Link to="/login" className="muted-link">Log in</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
