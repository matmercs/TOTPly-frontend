import React from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

export function Button({ children, variant = 'primary', className = '', ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; className?: string }){
  const base = 'btn'
  const v = variant === 'primary'
    ? 'glass-btn glass-btn--dark'
    : variant === 'secondary'
      ? 'glass-btn glass-btn--light'
      : 'btn-ghost'
  return (
    <button className={[base, v, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </button>
  )
}
