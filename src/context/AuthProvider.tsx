import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../hooks/useApi'

type User = { id: string; email: string }

type AuthContextValue = {
  user: User | null
  token: string | null
  tempToken: string | null
  login: (email: string, password: string) => Promise<{ requireEmailCode: boolean }>
  verifyLogin: (code: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  verifyEmail: (email: string, code: string) => Promise<void>
  resendVerification: (email: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  pendingEmail: string | null
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(atob(base64))
  } catch {
    return null
  }
}

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const navigate = useNavigate()

  const initAuth = (): { user: User | null; token: string | null } => {
    const storedToken = localStorage.getItem('auth_token')
    if (storedToken) {
      const payload = parseJwt(storedToken)
      if (payload && payload.exp * 1000 > Date.now()) {
        return { user: { id: payload.sub, email: payload.email }, token: storedToken }
      }
      localStorage.removeItem('auth_token')
    }
    return { user: null, token: null }
  }

  const initial = initAuth()
  const [user, setUser] = useState<User | null>(initial.user)
  const [token, setToken] = useState<string | null>(initial.token)
  const [tempToken, setTempToken] = useState<string | null>(null)
  const [pendingEmail, setPendingEmail] = useState<string | null>(null)

  const login = async (email: string, password: string) => {
    const data = await apiFetch<any>('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (data.requireEmailCode) {
      setTempToken(data.tempToken)
      setPendingEmail(email)
      return { requireEmailCode: true }
    }

    setSession(data.token)
    return { requireEmailCode: false }
  }

  const verifyLogin = async (code: string) => {
    const data = await apiFetch<any>('/auth/verify-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tempToken, code }),
    })
    setTempToken(null)
    setPendingEmail(null)
    setSession(data.token)
  }

  const register = async (email: string, password: string) => {
    await apiFetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    setPendingEmail(email)
  }

  const verifyEmail = async (email: string, code: string) => {
    const data = await apiFetch<any>('/auth/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    })
    setPendingEmail(null)
    setSession(data.token)
  }

  const resendVerification = async (email: string) => {
    await apiFetch('/auth/resend-verification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
  }

  const setSession = (accessToken: string) => {
    const payload = parseJwt(accessToken)
    setToken(accessToken)
    setUser({ id: payload.sub, email: payload.email })
    localStorage.setItem('auth_token', accessToken)
  }

  const logout = async () => {
    try {
      await apiFetch('/auth/logout', { method: 'POST' })
    } catch {}
    localStorage.removeItem('auth_token')
    setUser(null)
    setToken(null)
    navigate('/login')
  }

  const value = useMemo(() => ({
    user, token, tempToken, pendingEmail,
    login, verifyLogin, register, verifyEmail, resendVerification,
    logout, isAuthenticated: !!token,
  }), [user, token, tempToken, pendingEmail])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export default AuthContext
