import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CONFIG } from '../config'

type User = { id: string; email: string }

type AuthContextValue = {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function makeToken(user: User, ttlSeconds = 60 * 60) {
  const payload = { sub: user.id, email: user.email, exp: Math.floor(Date.now()/1000) + ttlSeconds }
  return btoa(JSON.stringify(payload))
}

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children })=>{
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(()=>{
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      setToken(storedToken);
      try {
         const payload = JSON.parse(atob(storedToken));
         setUser({ id: payload.sub, email: payload.email });
      } catch {
         setUser({ id: 'mock-user', email: 'user@example.com' });
      }
    }

    if(token && CONFIG.MODE === 'real'){
      try{
        const payload = JSON.parse(atob(token))
        if(payload.exp && payload.exp * 1000 < Date.now()){
          logout()
        }
      }catch(e){
        logout()
      }
    }
  }, [token])

  const login = async (email: string, password: string) => {
    if (CONFIG.MODE === 'test') {
      await new Promise(r => setTimeout(r, 500));
      const dummyUser = { id: 'mock-user-id', email };
      const mockToken = makeToken(dummyUser);
      setToken(mockToken);
      setUser(dummyUser);
      localStorage.setItem('auth_token', mockToken);
    } else {
      try{
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })
        if(!res.ok) throw new Error((await res.json()).message || 'Login failed')
        const data = await res.json()
        setToken(data.token)
        setUser(data.user)
        
        localStorage.setItem('auth_token', data.token)
      }catch(err){
        throw err
      }
    }
  }

  const register = async (email: string, password: string) => {
    if (CONFIG.MODE === 'test') {
      await new Promise(r => setTimeout(r, 500));
      const dummyUser = { id: 'mock-user-id', email };
      const mockToken = makeToken(dummyUser);
      setToken(mockToken);
      setUser(dummyUser);
      localStorage.setItem('auth_token', mockToken);
    } else {
      try{
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })
        if(!res.ok) throw new Error((await res.json()).message || 'Register failed')
        const data = await res.json()
        setToken(data.token)
        setUser(data.user)
        localStorage.setItem('auth_token', data.token)
      }catch(err){
        throw err
      }
    }
  }

  const logout = ()=>{
    localStorage.removeItem('auth_token')
    setUser(null)
    setToken(null)
    navigate('/login')
  }

  const value = useMemo(()=>({ user, token, login, register, logout, isAuthenticated: !!token }), [user, token])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(){
  const ctx = useContext(AuthContext)
  if(!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export default AuthContext
