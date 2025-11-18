import React from 'react'
import { Link } from 'react-router-dom'
import { colors } from '../styles/colors'

export default function Home(){
  return (
    <main>
  <section className="relative h-[72vh] flex items-center page-hero" style={{ backgroundImage: `url('/images/christina-deravedisian-UJlbhSnptTE-unsplash.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="hero-bleed" aria-hidden />
        <div className="container relative z-10 text-center text-white hero-content">
          <h1 className="hero-title">Secure. Simple. Stable.</h1>
          <p className="hero-subheadline">Trusted TOTP management for teams and developers — centralize your two-factor secrets with enterprise-ready controls and a clean, modern interface.</p>

          <div className="flex flex-col items-center justify-center gap-3 mt-6 hero-cta">
            <Link to="/register" className="gradient-btn" style={{ width: 320 }}>Get started</Link>
            <div className="hero-login" style={{ marginTop: 12 }}>Already have an account? <Link to="/login" className="underline-link">Log in</Link></div>
          </div>
        </div>
      </section>

      <div className="two-sections" style={{ position: 'relative' }}>
        <div className="shared-decor" aria-hidden>
          <div className="decor" style={{ position: 'absolute', width: 520, height: 520, left: '-6%', top: '-8%', borderRadius: 9999, background: 'rgba(232,211,242,0.98)', boxShadow: '0 40px 120px rgba(232,211,242,0.28)', filter: 'blur(160px)', zIndex: 0 }} />
          <div className="decor" style={{ position: 'absolute', width: 480, height: 480, right: '-8%', top: '8%', borderRadius: 9999, background: 'rgba(231,234,205,0.98)', boxShadow: '0 40px 120px rgba(231,234,205,0.28)', filter: 'blur(160px)', zIndex: 0 }} />
          <div className="decor" style={{ position: 'absolute', width: 420, height: 420, right: '-4%', bottom: '-6%', borderRadius: 9999, background: 'rgba(201,228,235,0.98)', boxShadow: '0 40px 120px rgba(201,228,235,0.28)', filter: 'blur(140px)', zIndex: 0 }} />
          <div className="decor" style={{ position: 'absolute', width: 220, height: 220, left: '52%', top: '36%', borderRadius: 9999, background: 'rgba(239,211,225,0.95)', boxShadow: '0 24px 80px rgba(239,211,225,0.18)', filter: 'blur(100px)', zIndex: 0 }} />
        </div>

        <section className="section-why">
          <div className="container text-center" style={{ zIndex: 30 }}>
            <h2 className="why-title">Why TOTPly</h2>
            <p className="why-text">We build secure, reliable and simple TOTP management tools so your team can adopt 2FA with confidence.</p>
          </div>
        </section>

        <section className="section-how">
          <div className="container text-center" style={{ zIndex: 30 }}>
            <h2 className="how-title">How TOTPly works</h2>
            <p className="how-sub">A quick look at the process and the value it delivers for teams and developers.</p>
          </div>
        </section>
      </div>

      <section className="core-capabilities">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Core Capabilities</h2>
          <p className="text-lg text-muted max-w-3xl mx-auto mb-12">A short overview of the flow: create secure entries, share access with teams, audit events and rotate secrets when needed.</p>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 core-grid">
              <div className="card card--purple core-card">
                <h3 className="font-semibold mb-2 text-xl">Create</h3>
                <p className="text-sm text-muted">Add secrets with a few clicks and assign owners.</p>
              </div>
              <div className="card card--blue core-card">
                
                <h3 className="font-semibold mb-2 text-xl">Share</h3>
                <p className="text-sm text-muted">Grant team-level access and manage roles.</p>
              </div>
              <div className="card card--peach core-card">
                
                <h3 className="font-semibold mb-2 text-xl">Audit</h3>
                <p className="text-sm text-muted">Track changes and access with an audit log.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center cta-wrap">
            <div>
              <Link to="/register" className="gradient-btn" style={{ width: 260 }}>Get started</Link>
              <div className="hero-login mt-3">Already have an account? <Link to="/login" className="underline-link">Log in</Link></div>
            </div>
          </div>
        </div>
      </section>

      
    </main>
  )
}
