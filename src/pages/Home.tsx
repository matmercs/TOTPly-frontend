import React from 'react'
import { Link } from 'react-router-dom'
import { colors } from '../styles/colors'

export default function Home(){
  return (
    <main>
  <section className="relative h-[72vh] flex items-center" style={{ backgroundImage: `url('/images/christina-deravedisian-UJlbhSnptTE-unsplash.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container relative z-10 text-center text-white">
          <h1 className="text-5xl font-extrabold mb-6">Secure. Simple. Stable.</h1>
          <div className="flex items-center justify-center gap-4 mb-8 hero-cta">
            <Link to="/register" className="glass-btn glass-btn--dark">Get started</Link>
            <Link to="/login" className="glass-btn glass-btn--light">Sign in</Link>
          </div>
          <div className="max-w-3xl mx-auto text-white/90">
            <h2 className="text-2xl font-semibold mb-3">Trusted TOTP management for teams and developers</h2>
            <p className="text-md">Centralize your two-factor secrets with enterprise-ready controls and a clean, modern interface.</p>
          </div>
        </div>
      </section>

      <section className="container my-24">
        <h2 className="text-3xl font-bold mb-4">Why TOTPly</h2>
        <p className="text-lg text-muted max-w-3xl mb-12">We build secure, reliable and simple TOTP management tools so your team can adopt 2FA with confidence.</p>

        
      </section>

      <section className="container my-24">
        <h2 className="text-3xl font-bold mb-4">How TOTPly works</h2>
  <p className="text-lg text-muted max-w-3xl mb-12">A short overview of the flow: create secure entries, share access with teams, audit events and rotate secrets when needed.</p>

  <div className="max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="card glass">
              <h3 className="font-semibold mb-2">Create</h3>
              <p className="text-sm text-muted">Add secrets with a few clicks and assign owners.</p>
            </div>
            <div className="card glass">
              <h3 className="font-semibold mb-2">Share</h3>
              <p className="text-sm text-muted">Grant team-level access and manage roles.</p>
            </div>
            <div className="card glass">
              <h3 className="font-semibold mb-2">Audit</h3>
              <p className="text-sm text-muted">Track changes and access with an audit log.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Link to="/register" className="glass-btn glass-btn--dark">Get started</Link>
          <Link to="/login" className="glass-btn glass-btn--light">Sign in</Link>
        </div>
      </section>

      
    </main>
  )
}
