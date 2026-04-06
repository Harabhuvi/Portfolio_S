import { User2, Menu, X, LogOut, Shield } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const NAV_LINKS = [
  { to: '/',        label: 'Home'     },
  { to: '/projects',label: 'Projects' },
  { to: '/blogs',   label: 'Blogs'    },
  { to: '/contact', label: 'Contact'  },
];

export const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loginOpen,   setLoginOpen]   = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const [error,       setError]       = useState('');
  const idref   = useRef(null);
  const passref = useRef(null);

  const { loggedIn, setLoggedIn } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  /* scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* lock body scroll when modal/sidebar open */
  useEffect(() => {
    document.body.style.overflow = loginOpen || sidebarOpen ? 'hidden' : '';
  }, [loginOpen, sidebarOpen]);

  const handleLogin = async () => {
    const enteredId = idref.current?.value;
    const enteredPass = passref.current?.value;
    if (!enteredId || !enteredPass) {
      setError('Please fill all fields.');
      return;
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        username: enteredId,
        password: enteredPass,
      });

      if (res.data.success) {
        setLoginOpen(false);
        setError('');
        setLoggedIn(true);
        navigate('/admin');
      } else {
        setError('Wrong ID or Password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Server error! Please try again later.');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('loggedIn');
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* ─── Top Bar ─────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#070b14]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl'
          : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:shadow-orange-500/30 transition-shadow duration-300">
              B
            </div>
            <span className="font-bold text-white text-lg tracking-tight hidden sm:block" style={{fontFamily:'Space Grotesk, sans-serif'}}>
              Bhuvi<span className="grad-text">.</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`nav-link ${isActive(to) ? '!text-orange-400 after:!w-full' : ''}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            {loggedIn ? (
              <button
                id="nav-logout-btn"
                onClick={handleLogout}
                className="btn-outline flex items-center gap-2 text-sm py-2 px-4"
              >
                <LogOut size={14} /> Logout
              </button>
            ) : (
              <button
                id="nav-admin-btn"
                onClick={() => setLoginOpen(true)}
                className="btn-outline flex items-center gap-2 text-sm py-2 px-4"
              >
                <Shield size={14} /> Admin
              </button>
            )}
          </div>

          {/* Hamburger */}
          <button
            id="nav-hamburger-btn"
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* ─── Mobile Sidebar ───────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${sidebarOpen ? 'visible' : 'invisible'}`}
        onClick={() => setSidebarOpen(false)}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>
      <div className={`fixed top-0 right-0 h-full w-72 z-50 glass border-l border-white/8 shadow-2xl transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <span className="grad-text font-bold text-xl" style={{fontFamily:'Space Grotesk,sans-serif'}}>Menu</span>
            <button id="sidebar-close-btn" onClick={() => setSidebarOpen(false)} className="text-white/60 hover:text-white">
              <X size={20} />
            </button>
          </div>
          <div className="space-y-1">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setSidebarOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(to)
                    ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/5 mt-4">
              {loggedIn ? (
                <button
                  onClick={() => { setSidebarOpen(false); handleLogout(); }}
                  className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <LogOut size={14} /> Logout
                </button>
              ) : (
                <button
                  onClick={() => { setSidebarOpen(false); setLoginOpen(true); }}
                  className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-orange-400 hover:bg-orange-500/10 transition-all"
                >
                  <Shield size={14} /> Admin Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Admin Login Modal ────────────────────────────────────── */}
      {loginOpen && !loggedIn && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setLoginOpen(false)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setLoginOpen(false)} />
          <div className="relative w-full max-w-sm glass rounded-2xl border border-white/10 p-8 shadow-2xl">
            <button
              id="modal-close-btn"
              onClick={() => setLoginOpen(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            <div className="mb-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center mx-auto mb-3">
                <Shield size={20} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-white" style={{fontFamily:'Space Grotesk,sans-serif'}}>Admin Access</h2>
              <p className="text-white/40 text-sm mt-1">Enter your credentials</p>
            </div>

            <div className="space-y-3">
              <input
                ref={idref}
                id="admin-id-input"
                className="field"
                placeholder="Admin ID"
                autoComplete="off"
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
              <input
                ref={passref}
                id="admin-pass-input"
                type="password"
                className="field"
                placeholder="Password"
                autoComplete="off"
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
              {error && (
                <p className="text-red-400 text-xs text-center">{error}</p>
              )}
              <button
                id="admin-login-submit-btn"
                onClick={handleLogin}
                className="btn-glow w-full text-sm mt-2"
              >
                <span>Sign In</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
