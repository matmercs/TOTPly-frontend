import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main>
      <section className="relative h-[92vh] flex items-center page-hero overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute top-[-5%] left-[-5%] w-[38vw] h-[38vw] bg-purple-300/20 rounded-full backdrop-blur-sm border border-white/30 shadow-2xl animate-float-slow" />
          <div className="absolute top-[10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-300/20 rounded-full backdrop-blur-sm border border-white/30 shadow-2xl animate-float-delayed" />
          <div className="absolute bottom-[-10%] left-[15%] w-[50vw] h-[50vw] bg-pink-300/20 rounded-full backdrop-blur-sm border border-white/30 shadow-2xl animate-float" />
          <div className="absolute bottom-[35%] right-[5%] w-[25vw] h-[25vw] bg-yellow-200/20 rounded-full backdrop-blur-sm border border-white/30 shadow-2xl animate-float-slow" />
          
          <div className="absolute top-[20%] left-[25%] w-[8vw] h-[8vw] bg-green-200/30 rounded-full backdrop-blur-md border border-white/40 shadow-lg animate-float-fast" />
          <div className="absolute top-[40%] right-[35%] w-[12vw] h-[12vw] bg-purple-200/30 rounded-full backdrop-blur-md border border-white/40 shadow-lg animate-float" />
          <div className="absolute bottom-[30%] left-[10%] w-[6vw] h-[6vw] bg-blue-200/30 rounded-full backdrop-blur-md border border-white/40 shadow-lg animate-float-delayed" />
        </div>

        <div className="hero-bleed" aria-hidden />
        <div className="container relative z-10 text-center text-white hero-content">
          <h1 className="hero-title">Secure. Simple. Stable.</h1>
          <p className="hero-subheadline">
            Trusted TOTP management for teams and developers — centralize your two-factor secrets
            with enterprise-ready controls and a clean, modern interface.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 mt-6 hero-cta">
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
          </div>
        </div>
      </section>

      <div className="two-sections relative py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
          <div className="absolute top-[0%] right-[-10%] w-[50vw] h-[50vw] bg-purple-300/30 rounded-full blur-[120px]" />
          <div className="absolute top-[20%] left-[-15%] w-[55vw] h-[55vw] bg-blue-300/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[45vw] h-[45vw] bg-pink-300/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-5%] left-[10%] w-[40vw] h-[40vw] bg-yellow-200/20 rounded-full blur-[100px]" />
        </div>

        <section id="why" className="section-why">
          <div className="container text-center" style={{ zIndex: 30 }}>
            <h2 className="why-title">Why TOTPly</h2>
            <p className="why-text">
              We build secure, reliable and simple TOTP management tools so your team can adopt 2FA
              with confidence.
            </p>
          </div>
        </section>

        <section id="how" className="section-how">
          <div className="container text-center" style={{ zIndex: 30 }}>
            <h2 className="how-title">How TOTPly works</h2>
            <p className="how-sub">
              A quick look at the process and the value it delivers for teams and developers.
            </p>
          </div>
        </section>
      </div>

      <section id="cta" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#e8d3f2]/20 rounded-full blur-[120px]" />
          <div className="absolute top-[10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-200/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] bg-pink-200/20 rounded-full blur-[100px]" />
        </div>

        <div className="container relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Ready to simplify your 2FA?
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto mb-8">
            Join developers and teams who manage their secrets securely with TOTPly. 
            Open source, secure, and free to start.
          </p>
          
          <Link 
            to="/register" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-900 transition-all duration-200 bg-gradient-to-r from-[#e8d3f2] to-[#c9e4eb] rounded-xl hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-200 transform active:scale-95 shadow-lg hover:shadow-xl border border-white/60" 
            style={{ width: 280 }}
          >
            Get started
          </Link>
        </div>
      </section>
    </main>
  );
}