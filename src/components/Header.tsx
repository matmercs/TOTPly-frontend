import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { Button } from './Button';

const getAbsoluteTop = (element: HTMLElement): number => {
  if (!element) {
    return 0;
  }
  return element.offsetTop + getAbsoluteTop(element.offsetParent as HTMLElement);
};

export default function Header() {
  const auth = useAuth();
  const loc = useLocation();
  const navigate = useNavigate();
  const isHome = loc.pathname === '/';
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollTo = (id: string) => {
    if (isHome) {
      const element = document.getElementById(id);
      const header = document.getElementById('site-header');
      if (element && header) {
        const top = getAbsoluteTop(element) - header.offsetHeight;
        window.scrollTo({
          top,
          behavior: 'smooth',
        });
      }
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollTo(id);
  };

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollTo(id);
    setMobileOpen(false);
  };

  return (
    <header
      id="site-header"
      className={`site-header ${scrolled ? 'scrolled' : ''} ${isHome ? 'home' : ''}`}
    >
      <div className="container max-w-6xl mx-auto px-4 flex items-center justify-between h-20">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1 no-underline group">
            <span className="text-2xl font-extrabold tracking-tight text-slate-900">TOTPly</span>
            <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#e8d3f2] to-[#c9e4eb] border border-white shadow-[0_2px_5px_rgba(14,23,42,0.1)] backdrop-blur-sm group-hover:scale-125 transition-transform duration-300 mb-1" />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6 text-sm font-medium" style={{ color: '#0e172a' }}>
            <a href="#why" onClick={(e) => handleNavClick(e, 'why')} className="nav-link">
              Why TOTPly
            </a>
            <a href="#how" onClick={(e) => handleNavClick(e, 'how')} className="nav-link">
              How it works
            </a>
          </nav>

          <div className="flex items-center gap-3 pl-2 border-l border-gray-200/60">
            {auth.isAuthenticated ? (
              <>
               <Link to="/dashboard">
                 <Button variant="primary" className="shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    Dashboard
                 </Button>
               </Link>
               <Link to="/profile">
                <Button variant="ghost" className="text-slate-600 hover:text-slate-900">
                  Account
                </Button>
              </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-link">
                    Log in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="signup-btn">Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setMobileOpen((s) => !s)}
            aria-label="menu"
            className="p-2 rounded-md"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0e172a" strokeWidth="2">
              <path d="M3 7h18M3 12h18M3 17h18" />
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="mobile-menu fixed right-0 top-0 h-full w-72 bg-white shadow-2xl p-6 z-50 flex flex-col">
            <div className="flex justify-end mb-4">
              <button onClick={() => setMobileOpen(false)} className="p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0e172a" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-2 text-lg font-semibold text-slate-800">
              <a
                href="#why"
                onClick={(e) => handleMobileNavClick(e, 'why')}
                className="p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Why TOTPly
              </a>
              <a
                href="#how"
                onClick={(e) => handleMobileNavClick(e, 'how')}
                className="p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                How it works
              </a>
              {auth.isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    onClick={() => setMobileOpen(false)}
                    className="p-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 shadow-md mt-2 text-center"
                  >
                    Dashboard
                  </Link>
                   <Link 
                    to="/profile" 
                    onClick={() => setMobileOpen(false)}
                    className="p-3 rounded-xl hover:bg-gray-50 transition-colors text-center"
                  >
                    Account
                  </Link>
                </>
              ) : (
                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-100">
                  <Link 
                    to="/login" 
                    onClick={() => setMobileOpen(false)}
                  >
                     <div className="w-full h-[54px] flex items-center justify-center rounded-[18px] border-2 border-slate-200 text-slate-700 font-bold transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.15)] hover:bg-slate-50 hover:border-slate-300">
                      Log in
                    </div>
                  </Link>
                  <Link 
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className="w-full gradient-btn flex items-center justify-center">Sign up</div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}