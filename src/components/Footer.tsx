import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__top grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="footer-col flex flex-col items-center text-center md:items-start md:text-left">
            <div className="flex items-center gap-3">
              <div>
                <h4 className="footer-logo">TOTPly <span className="footer-dot" aria-hidden></span></h4>
                <p className="mt-2 text-sm text-white/90">Secure TOTP codes made simple</p>
              </div>
            </div>
          </div>

          <div className="footer-col flex flex-col items-center text-center">
            <h5 className="col-title">Navigation</h5>
            <ul className="mt-3 space-y-2 flex flex-col items-center">
              <li><a href="#why" className="footer-link">Why TOTPly</a></li>
              <li><a href="#how" className="footer-link">How it works</a></li>
              <li><a href="#features" className="footer-link">Features</a></li>
              <li><a href="/docs" className="footer-link">Docs</a></li>
            </ul>
          </div>

          <div className="footer-col flex flex-col items-center text-center md:items-end md:text-right">
            <h5 className="col-title">Contact</h5>
            <ul className="mt-3 flex items-center gap-3 justify-center md:justify-end">
              <li>
                <a href="mailto:hello@totply.example" aria-label="email" className="social-icon" title="Email">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8.5v7.5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5"/><path d="M21 6.5l-9 6-9-6"/></svg>
                </a>
              </li>
              <li>
                <a href="#" aria-label="github" className="social-icon" title="GitHub">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 .5C5.73.5.75 5.48.75 11.76c0 4.95 3.29 9.14 7.86 10.62.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.36-1.3-1.72-1.3-1.72-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.72 1.27 3.38.97.11-.75.41-1.27.75-1.56-2.56-.29-5.25-1.29-5.25-5.73 0-1.27.45-2.3 1.2-3.11-.12-.29-.52-1.47.11-3.07 0 0 .98-.31 3.2 1.19a11.1 11.1 0 0 1 5.82 0c2.22-1.5 3.2-1.19 3.2-1.19.63 1.6.23 2.78.11 3.07.75.81 1.2 1.84 1.2 3.11 0 4.45-2.7 5.44-5.27 5.72.42.36.8 1.07.8 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.67.8.56 4.57-1.48 7.86-5.67 7.86-10.62C23.25 5.48 18.27.5 12 .5z"/></svg>
                </a>
              </li>
              <li>
                <a href="#" aria-label="linkedin" className="social-icon" title="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-2-2h-.02c-1.63 0-2.98 1.3-2.98 3v5H10v-10h4v1.4c.56-.86 1.67-1.9 3.1-1.9z"/><rect x="2" y="9" width="4" height="12" rx="1"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom mt-8 pt-6">
          <div className="site-footer__bottom-inner flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-sm" style={{ color: 'rgba(249,250,251,0.9)' }}>© TOTPly {new Date().getFullYear()}</div>
            <div className="text-sm" style={{ color: 'rgba(249,250,251,0.75)' }}>
              <a href="/privacy" className="footer-link muted-inline">Privacy</a>
              <span className="mx-3">/</span>
              <a href="/terms" className="footer-link muted-inline">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}