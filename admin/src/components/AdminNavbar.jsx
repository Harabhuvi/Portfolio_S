import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, LayoutDashboard, FolderOpen, BookOpen, User, MessageSquare, ExternalLink } from 'lucide-react';
import { useAuth } from '../AuthContext';

const NAV_LINKS = [
  { to: '/',          label: 'Hub',      icon: <LayoutDashboard size={16} /> },
  { to: '/projects',  label: 'Projects', icon: <FolderOpen size={16} />      },
  { to: '/blogs',     label: 'Blogs',    icon: <BookOpen size={16} />        },
  { to: '/profile',   label: 'Profile',  icon: <User size={16} />            },
  { to: '/messages',  label: 'Messages', icon: <MessageSquare size={16} />   },
];

export const AdminNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('isAdmin');
    navigate('/login');
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
              A
            </div>
            <span className="font-bold text-white text-lg tracking-tight hidden sm:block" style={{fontFamily:'Space Grotesk, sans-serif'}}>
              Bhuvi<span className="grad-text">.Admin</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(({ to, label, icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`nav-link flex items-center gap-2 ${isActive(to) ? '!text-orange-400 after:!w-full' : ''}`}
                >
                  {icon}
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://bhuvi.buzz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <span>Main Site</span>
              <ExternalLink size={12} />
            </a>
            <button
              onClick={handleLogout}
              className="btn-outline flex items-center gap-2 text-xs py-1.5 px-3 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500"
            >
              <LogOut size={12} /> Logout
            </button>
          </div>

          {/* Hamburger */}
          <button
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
            <span className="grad-text font-bold text-xl" style={{fontFamily:'Space Grotesk,sans-serif'}}>Navigation</span>
            <button onClick={() => setSidebarOpen(false)} className="text-white/60 hover:text-white">
              <X size={20} />
            </button>
          </div>
          <div className="space-y-1">
            {NAV_LINKS.map(({ to, label, icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(to)
                    ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {icon}
                <span>{label}</span>
              </Link>
            ))}
            <div className="pt-4 border-t border-white/5 mt-4 space-y-2">
              <a
                href="https://bhuvi.buzz"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setSidebarOpen(false)}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-slate-400 hover:bg-white/5 transition-all"
              >
                <ExternalLink size={14} /> View Main Site
              </a>
              <button
                onClick={() => { setSidebarOpen(false); handleLogout(); }}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
