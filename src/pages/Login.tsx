import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import { AuthLayout, FormInput, AuthDecor } from '../components'

type FormData = { email: string; password: string }

export default function Login(){
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()
  const auth = useAuth()

  const onSubmit = async (data: FormData) => {
    if (loading) return
    setLoading(true)
    try{
      const result = await auth.login(data.email, data.password)
      if (result.requireEmailCode) {
        navigate('/verify-email')
      } else {
        navigate('/dashboard')
      }
    }catch(err:any){
      alert(err?.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  const decorations = <AuthDecor variant="login" />

  const footer = (
    <>
      <span className="text-sm">Don't have an account? </span>
      <Link to="/register" className="muted-link">Create one</Link>
    </>
  )

  return (
    <AuthLayout
      welcomeText="Welcome back"
      title="Log in to TOTPly"
      subtitle="Enter your credentials to access your account"
      decorations={decorations}
      footer={footer}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormInput
          label="Email"
          type="text"
          inputMode="email"
          autoComplete="username"
          registration={register('email', { required: 'Email is required' })}
          error={errors.email}
        />

        <FormInput
          label="Password"
          type="password"
          autoComplete="current-password"
          registration={register('password', { required: 'Password is required' })}
          error={errors.password}
        />

        <div className="flex justify-end mb-6">
          <Link to="/forgot-password" className="text-sm text-slate-500 hover:text-slate-800 font-medium">Forgot password?</Link>
        </div>

        <div className="form-field">
          <button type="submit" className="gradient-btn" formNoValidate disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
        </div>
      </form>
    </AuthLayout>
  )
}
