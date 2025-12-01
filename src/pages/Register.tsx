import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import { AuthLayout, FormInput, AuthDecor } from '../components'

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

  const decorations = <AuthDecor variant="register" />

  const footer = (
    <>
      <span className="text-sm">Already have an account? </span>
      <Link to="/login" className="muted-link">Log in</Link>
    </>
  )

  return (
    <AuthLayout
      welcomeText="Join TOTPly"
      title="Create your account"
      subtitle="A few quick steps to get you up and running"
      decorations={decorations}
      footer={footer}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Name"
          registration={register('name', { required: 'Name is required' })}
          error={errors.name}
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          registration={register('confirm', { required: 'Confirm your password' })}
          error={errors.confirm}
        />

        <div className="form-field">
          <button 
            type="submit" 
            className="gradient-btn" 
            style={{ background: 'linear-gradient(90deg, #c9e4eb 0%, #e8d3f2 100%)' }}
          >
            Create account
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}