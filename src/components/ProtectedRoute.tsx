import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

const BYPASS_AUTH = true

const ProtectedRoute: React.FC<{children: React.ReactNode}> = ({ children }) =>{
  if(BYPASS_AUTH) return <>{children}</>
  const auth = useAuth()
  if(!auth.isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default ProtectedRoute
