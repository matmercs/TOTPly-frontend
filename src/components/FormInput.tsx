import React, { InputHTMLAttributes } from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: FieldError
  registration: UseFormRegisterReturn
}

export const FormInput: React.FC<FormInputProps> = ({ 
  label, 
  error, 
  registration, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="form-field">
      <label className="block text-sm mb-2">{label}</label>
      <input 
        className={`form-input ${error ? '!border-red-500 focus:!border-red-500 focus:!ring-red-500' : ''} ${className}`} 
        {...registration} 
        {...props} 
      />
      {error && (
        <div className="text-sm text-red-500 mt-1">
          {error.message || `${label} is required`}
        </div>
      )}
    </div>
  )
}
