import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import { Button } from './Button'
import { useLocation } from 'react-router-dom'

export default function Header(){
  const auth = useAuth()
  const loc = useLocation()
  const isHome = loc.pathname === '/'
  const [scrolled, setScrolled] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  React.useEffect(()=>{
    const onScroll = ()=> setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return ()=> window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''} ${isHome ? 'home' : ''}`}>
      <div className="container max-w-6xl mx-auto px-4 flex items-center justify-between h-20">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3 no-underline">
            <span className="logo text-xl font-bold" style={{ color: '#0e172a', lineHeight: 1 }}>TOTPly</span>
            <span className="logo-dot" aria-hidden />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: '#0e172a' }}>
          <a href="#why" className="nav-link">Why TOTPly</a>
          <a href="#how" className="nav-link">How it works</a>
          <a href="#features" className="nav-link">Features</a>
          {auth.isAuthenticated ? <Link to="/dashboard" className="nav-link">Dashboard</Link> : null}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login"><Button variant="ghost" className="text-link">Log in</Button></Link>
          <Link to="/register"><Button className="signup-btn">Sign up</Button></Link>
        </div>

  <div className="md:hidden flex items-center gap-3">
          <button onClick={()=> setMobileOpen(s=>!s)} aria-label="menu" className="p-2 rounded-md">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0e172a" strokeWidth="2"><path d="M3 7h18M3 12h18M3 17h18"/></svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="mobile-menu fixed right-0 top-0 h-full w-72 bg-white shadow-lg p-6">
            <div className="flex flex-col gap-4">
              <a href="#why" className="p-2 rounded-md hover:bg-[rgba(201,228,235,0.18)]">Why TOTPly</a>
              <a href="#how" className="p-2 rounded-md hover:bg-[rgba(231,211,242,0.18)]">How it works</a>
              <a href="#features" className="p-2 rounded-md hover:bg-[rgba(231,234,205,0.18)]">Features</a>
              {auth.isAuthenticated ? <Link to="/dashboard" className="p-2 rounded-md">Dashboard</Link> : <Link to="/login" className="p-2 rounded-md">Login</Link>}
              <div className="mt-4">
                <Link to="/register"><button className="gradient-btn">Sign up</button></Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
