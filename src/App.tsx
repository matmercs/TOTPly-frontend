import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AddSecret from './pages/AddSecret'
import EditSecret from './pages/EditSecret'
import Home from './pages/Home'
import { AuthProvider } from './context/AuthProvider'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import ScrollToTop from './components/ScrollToTop'
import './i18n'

export default function App(){
  return (
    <AuthProvider>
      <ErrorBoundary>
      <div className="min-h-screen bg-[var(--color-white)] text-gray-900">
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path="/add" element={<ProtectedRoute><AddSecret/></ProtectedRoute>} />
          <Route path="/edit/:id" element={<ProtectedRoute><EditSecret/></ProtectedRoute>} />
          <Route path="/" element={<Home/>} />
        </Routes>
        <Footer />
      </div>
      </ErrorBoundary>
    </AuthProvider>
  )
}
