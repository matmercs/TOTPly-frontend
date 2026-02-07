import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout, FormInput, AuthDecor } from '../components'
import { CONFIG } from '../config'

type FormData = { email: string }

export default function ForgotPassword(){
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const navigate = useNavigate()
  
  const onSubmit = async (data: FormData) => {
    if (CONFIG.MODE === 'test') {
        await new Promise(r => setTimeout(r, 500));
        navigate('/verify-email');
    } else {
        try {
            await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            navigate('/verify-email');
        } catch (e) {
            alert('Failed to send reset email');
        }
    }
  }

  const decorations = <AuthDecor variant="login" />

  const footer = (
    <>
      <Link to="/login" className="muted-link">Back to Log in</Link>
    </>
  )

  return (
    <AuthLayout
      welcomeText="Recover Account"
      title="Forgot Password?"
      subtitle="Enter your email to receive a reset link"
      decorations={decorations}
      footer={footer}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormInput
          label="Email"
          type="text"
          inputMode="email"
          autoComplete="username"
          registration={register('email', { 
              required: 'Email is required',
              pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
              }
          })}
          error={errors.email}
        />

        <div className="form-field">
          <button type="submit" className="gradient-btn" formNoValidate>Send Link</button>
        </div>
      </form>
    </AuthLayout>
  )
}
