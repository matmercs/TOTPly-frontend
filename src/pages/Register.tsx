import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import { AuthLayout, FormInput, AuthDecor } from '../components'

type FormData = { name: string; email: string; password: string; confirm: string }

export default function Register(){
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>()
  const navigate = useNavigate()
  const auth = useAuth()

  const onSubmit = async (data: FormData) => {
    try{
      await auth.register(data.email, data.password)
      navigate('/dashboard')
    }catch(err:any){
      alert(err?.message || String(err))
    }
  }

  const password = watch('password')

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
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormInput
          label="Name"
          autoComplete="name"
          registration={register('name', { 
            required: 'Name is required',
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters"
            }
          })}
          error={errors.name}
        />

        <FormInput
          label="Email"
          type="text"
          inputMode="email"
          autoComplete="username"
          registration={register('email', { 
            required: 'Email is required',
            validate: (value) => {
              const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
              return pattern.test(value) || "Invalid email address";
            }
          })}
          error={errors.email}
        />

        <FormInput
          label="Password"
          type="password"
          autoComplete="new-password"
          registration={register('password', { 
            required: 'Password is required',
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters"
            },
            validate: (value) => {
              const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W]{8,}$/;
              return pattern.test(value) || "Password must contain at least one uppercase letter, one lowercase letter, and one number";
            }
          })}
          error={errors.password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          registration={register('confirm', { 
            required: 'Confirm your password',
            validate: value => value === password || "Passwords do not match"
          })}
          error={errors.confirm}
        />

        <div className="form-field">
          <button 
            type="submit" 
            className="gradient-btn" 
            style={{ background: 'linear-gradient(90deg, #c9e4eb 0%, #e8d3f2 100%)' }}
            formNoValidate
          >
            Create account
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}