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
            {auth.isAuthenticated ? (
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            ) : null}
          </nav>

          <div className="flex items-center gap-3 pl-2 border-l border-gray-200/60">
            <Link to="/login">
              <Button variant="ghost" className="text-link">
                Log in
              </Button>
            </Link>
            <Link to="/register">
              <Button className="signup-btn">Sign up</Button>
            </Link>
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
          <div className="mobile-menu fixed right-0 top-0 h-full w-72 bg-white shadow-lg p-6">
            <div className="flex flex-col gap-4">
              <a
                href="#why"
                onClick={(e) => handleMobileNavClick(e, 'why')}
                className="p-2 rounded-md hover:bg-[rgba(201,228,235,0.18)]"
              >
                Why TOTPly
              </a>
              <a
                href="#how"
                onClick={(e) => handleMobileNavClick(e, 'how')}
                className="p-2 rounded-md hover:bg-[rgba(231,211,242,0.18)]"
              >
                How it works
              </a>
              {auth.isAuthenticated ? (
                <Link to="/dashboard" className="p-2 rounded-md">
                  Dashboard
                </Link>
              ) : (
                <Link to="/login" className="p-2 rounded-md">
                  Login
                </Link>
              )}
              <div className="mt-4">
                <Link to="/register">
                  <button className="gradient-btn">Sign up</button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}