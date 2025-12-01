import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import { AuthLayout, FormInput, AuthDecor } from '../components'

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

  const decorations = <AuthDecor variant="login" />

  const footer = (
    <>
      <span className="text-sm">Don’t have an account? </span>
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Email"
          type="email" 
          registration={register('email', { required: 'Email is required' })}
          error={errors.email}
        />

        <FormInput
          label="Password"
          type="password"
          registration={register('password', { required: 'Password is required' })}
          error={errors.password}
        />

        <div className="form-field">
          <button type="submit" className="gradient-btn">Sign in</button>
        </div>
      </form>
    </AuthLayout>
  )
}