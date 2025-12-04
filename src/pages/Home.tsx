import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollToSection } from '../hooks/useScrollToSection';
import { useAuth } from '../context/AuthProvider';

export default function Home() {
  useScrollToSection('site-header');
  const { isAuthenticated } = useAuth();

  return (
    <main>
      <section className="relative h-[92vh] flex items-center page-hero overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute top-[-5%] left-[-5%] w-[38vw] h-[38vw] bg-purple-300/30 rounded-full backdrop-blur-sm border border-white/30 shadow-2xl animate-float-slow" />
          <div className="absolute top-[10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-300/30 rounded-full backdrop-blur-sm border border-white/30 shadow-2xl animate-float-delayed" />
          <div className="absolute bottom-[-10%] left-[15%] w-[50vw] h-[50vw] bg-pink-300/30 rounded-full backdrop-blur-sm border border-white/30 shadow-2xl animate-float" />
          <div className="absolute bottom-[35%] right-[5%] w-[25vw] h-[25vw] bg-yellow-200/30 rounded-full backdrop-blur-sm border border-white/30 shadow-2xl animate-float-slow" />
          
          <div className="absolute top-[20%] left-[25%] w-[8vw] h-[8vw] bg-green-200/40 rounded-full backdrop-blur-md border border-white/40 shadow-lg animate-float-fast" />
          <div className="absolute top-[40%] right-[35%] w-[12vw] h-[12vw] bg-purple-200/40 rounded-full backdrop-blur-md border border-white/40 shadow-lg animate-float" />
          <div className="absolute bottom-[30%] left-[10%] w-[6vw] h-[6vw] bg-blue-200/40 rounded-full backdrop-blur-md border border-white/40 shadow-lg animate-float-delayed" />
        </div>

        <div className="hero-bleed" aria-hidden />
        <div className="container relative z-10 text-center text-white hero-content">
          <h1 className="hero-title">Secure. Simple. Stable.</h1>
          <p className="hero-subheadline">
            A straightforward, reliable tool for managing your two-factor authentication codes. Centralize your 
            access keys in one secure place without unnecessary complexity.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 mt-6 hero-cta">
            {isAuthenticated ? (
              <Link 
                to="/dashboard" 
                className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white transition-all duration-200 bg-slate-900 rounded-xl hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transform active:scale-95 shadow-lg hover:shadow-xl" 
                style={{ width: 260 }}
              >
                Enter my Dashboard
              </Link>
            ) : (
              <>
                <Link 
                  to="/register" 
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white transition-all duration-200 bg-slate-900 rounded-xl hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transform active:scale-95 shadow-lg hover:shadow-xl" 
                  style={{ width: 240 }}
                >
                  Get started
                </Link>
                <div className="hero-login" style={{ marginTop: 12 }}>
                  Already have an account?{' '}
                  <Link to="/login" className="underline-link">
                    Log in
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <div className="two-sections relative py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
          <div className="absolute top-[0%] right-[-10%] w-[50vw] h-[50vw] bg-purple-300/40 rounded-full blur-[120px]" />
          <div className="absolute top-[20%] left-[-15%] w-[55vw] h-[55vw] bg-blue-300/40 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[45vw] h-[45vw] bg-pink-300/40 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-5%] left-[10%] w-[40vw] h-[40vw] bg-yellow-200/30 rounded-full blur-[100px]" />
        </div>

        <section id="why" className="section-why">
          <div className="container" style={{ zIndex: 30 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center">Why TOTPly</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/40 backdrop-blur-sm border border-white/50 p-6 rounded-2xl shadow-sm hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 text-purple-600">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Always Accessible</h3>
                <p className="text-slate-700 leading-relaxed">
                  Access your codes from anywhere, not just your phone. Your secrets are securely stored and available whenever you need them.
                </p>
              </div>

              <div className="bg-white/40 backdrop-blur-sm border border-white/50 p-6 rounded-2xl shadow-sm hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 text-blue-600">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Universal & Clean</h3>
                <p className="text-slate-700 leading-relaxed">
                  Works with any service that supports standard TOTP. We removed the clutter so you can find and copy your codes instantly.
                </p>
              </div>

              <div className="bg-white/40 backdrop-blur-sm border border-white/50 p-6 rounded-2xl shadow-sm hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4 text-pink-600">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Zero Friction</h3>
                <p className="text-slate-700 leading-relaxed">
                  No complex setup or hidden tiers. Just a simple, dependable tool designed to protect your accounts without the hassle.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how" className="section-how mt-24 pt-40 pb-24 bg-slate-50/50">
          <div className="container text-center relative" style={{ zIndex: 30 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">How TOTPly Works</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-20">
              TOTPly utilizes the <strong>Time-based One-Time Password (TOTP)</strong> algorithm (RFC 6238). 
              It combines a shared secret key with the current time to generate secure, disposable access tokens.
            </p>

            <div className="relative max-w-5xl mx-auto">
              <div className="hidden md:block absolute top-[2.5rem] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-slate-200 via-indigo-200 to-slate-200 z-0" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                <div className="flex flex-col items-center group">
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-md transition-all duration-300 relative">
                    <div className="absolute inset-0 bg-indigo-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <svg className="w-10 h-10 text-indigo-600 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                      <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">1. Add Secret</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Enter the Base32 secret key provided by your service. This key acts as the "seed" for future codes.
                  </p>
                </div>

                <div className="flex flex-col items-center group">
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-md transition-all duration-300 relative">
                    <div className="absolute inset-0 bg-blue-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <svg className="w-10 h-10 text-blue-600 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">2. Sync & Hash</h3>
                  <p className="text-slate-600 leading-relaxed">
                    TOTPly calculates a hash using HMAC-SHA1, combining your key with the current 30-second timestamp.
                  </p>
                </div>

                <div className="flex flex-col items-center group">
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-md transition-all duration-300 relative">
                    <div className="absolute inset-0 bg-emerald-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <svg className="w-10 h-10 text-emerald-600 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">3. Authenticate</h3>
                  <p className="text-slate-600 leading-relaxed">
                    A unique 6-digit code is generated. Use it to verify your identity securely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="cta" className="relative py-24">
          <div className="container relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Ready to simplify your 2FA?
            </h2>
            <p className="text-lg text-slate-600 max-w-xl mx-auto mb-8">
              Join developers and teams who manage their secrets securely with TOTPly. 
              Open source, secure, and free to start.
            </p>
            
            {isAuthenticated ? (
              <Link 
                to="/dashboard" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-900 transition-all duration-200 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-100 transform active:scale-95 shadow-lg hover:shadow-xl" 
                style={{ width: 280 }}
              >
                Enter my Dashboard
              </Link>
            ) : (
              <Link 
                to="/register" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-900 transition-all duration-200 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-100 transform active:scale-95 shadow-lg hover:shadow-xl" 
                style={{ width: 280 }}
              >
                Get started
              </Link>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}