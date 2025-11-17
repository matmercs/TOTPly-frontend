import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

type FormData = { email: string; password: string }

export default function Login(){
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const navigate = useNavigate()
  const auth = useAuth()
  const onSubmit = async (data: FormData) => {
    try{
      await auth.login(data.email, data.password)
      navigate('/dashboard')
    }catch(err:any){
      alert(err?.message || String(err))
    }
  }

  return (
    <main className="container mx-auto py-12">
      <div className="auth-grid">
        <div className="auth-left">
          <div className="decor circle-1" />
          <div className="decor circle-2" />
          <div className="decor spot" />
        </div>
        <div className="auth-right">
          <div className="form-card">
            <div className="mb-4">
              <div className="text-sm text-muted">Welcome back</div>
              <h3 className="text-2xl font-extrabold">Log in to TOTPly</h3>
              <div className="form-sub">Enter your credentials to access your account</div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
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
                <button type="submit" className="gradient-btn">Sign in</button>
              </div>
            </form>

            <div className="mt-4 text-center">
              <span className="text-sm">Don’t have an account? </span>
              <Link to="/register" className="muted-link">Create one</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
