import React, { ReactNode } from 'react'

interface AuthLayoutProps {
  welcomeText?: string
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
  decorations?: ReactNode
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  welcomeText,
  title,
  subtitle,
  children,
  footer,
  decorations
}) => {
  return (
    <main className="container mx-auto py-12">
      <div className="auth-grid">
        <div className="auth-left">
          {decorations}
        </div>
        <div className="auth-right">
          <div className="form-card">
            <div className="mb-4">
              {welcomeText && <div className="text-sm text-muted">{welcomeText}</div>}
              <h3 className="text-2xl font-extrabold">{title}</h3>
              <div className="form-sub">{subtitle}</div>
            </div>

            {children}

            {footer && (
              <div className="mt-4 text-center">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
