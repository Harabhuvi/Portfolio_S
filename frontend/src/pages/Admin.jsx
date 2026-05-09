import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { 
  PlusIcon, 
  LayoutDashboard, 
  Briefcase, 
  PenTool, 
  LogOut, 
  User, 
  Clock, 
  ArrowUpRight,
  TrendingUp,
  FolderOpen,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../AuthContext';
import axios from 'axios';

export const Admin = () => {
  const { loggedIn, setLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ projects: 0, blogs: 0, messages: 0 });

  useEffect(() => {
    if (!loggedIn) {
      navigate("/adminlogin");
    } else {
      fetchStats();
    }
  }, [loggedIn, navigate]);

  const fetchStats = async () => {
    try {
      const [projRes, blogRes, msgRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/projects`),
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/blogs`),
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/contact`)
      ]);
      setStats({
        projects: projRes.data.length || 0,
        blogs: blogRes.data.length || 0,
        messages: msgRes.data.length || 0
      });
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("isAdmin");
    navigate("/adminlogin");
  };

  const dashboardCards = [
    {
      title: "Projects",
      count: stats.projects,
      icon: <Briefcase className="text-orange-500" size={24} />,
      link: "/adminproject",
      color: "from-orange-500/20 to-orange-500/5",
      border: "border-orange-500/20"
    },
    {
      title: "Blogs",
      count: stats.blogs,
      icon: <PenTool className="text-purple-500" size={24} />,
      link: "/adminblog",
      color: "from-purple-500/20 to-purple-500/5",
      border: "border-purple-500/20"
    },
    {
      title: "Messages",
      count: stats.messages,
      icon: <MessageSquare className="text-blue-500" size={24} />,
      link: "/admincontact",
      color: "from-blue-500/20 to-blue-500/5",
      border: "border-blue-500/20"
    },
    {
      title: "Innovations",
      count: 1, // Featured DSizer
      icon: <TrendingUp className="text-green-500" size={24} />,
      link: "/projects/dsizer",
      color: "from-green-500/20 to-green-500/5",
      border: "border-green-500/20"
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#070b14] text-slate-200">
      <div className="orb orb-1 opacity-30" />
      <div className="orb orb-2 opacity-20" />
      <Navbar />

      <main className="relative z-10 pt-24 pb-12 px-6 max-w-6xl mx-auto">
        {/* Header Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <LayoutDashboard size={16} className="text-orange-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Admin Control Center</span>
            </div>
            <h1 className="text-4xl font-black text-white font-grotesk" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
              Welcome back, <span className="grad-text">Bhuvi</span>
            </h1>
            <p className="text-slate-500 mt-1 flex items-center gap-2">
              <Clock size={14} /> Last session: {new Date().toLocaleDateString()}
            </p>
          </div>

          <button 
            onClick={handleLogout}
            className="group flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 px-4 py-2 rounded-xl transition-all duration-300"
          >
            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Logout Session</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {dashboardCards.map((card, idx) => (
            <Link key={idx} to={card.link}>
              <div className={`glass border ${card.border} rounded-[2rem] p-8 group hover:scale-[1.02] transition-all duration-500 h-full`}>
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 bg-gradient-to-br ${card.color} rounded-2xl`}>
                    {card.icon}
                  </div>
                  <ArrowUpRight size={16} className="text-slate-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">{card.title}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white font-grotesk">{card.count}</span>
                  <span className="text-xs text-slate-600 font-bold uppercase">Total Live</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 px-1">
            <PlusIcon size={18} className="text-orange-500" /> Quick Management
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/adminproject" className="group">
              <div className="glass border border-white/5 rounded-[2rem] p-8 flex items-center justify-between hover:border-orange-500/30 transition-all duration-500">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/10 group-hover:scale-110 transition-transform duration-500">
                    <FolderOpen size={28} className="text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:grad-text transition-all duration-300">Add New Project</h3>
                    <p className="text-sm text-slate-500">Upload new showcase project to portfolio</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                  <PlusIcon size={20} />
                </div>
              </div>
            </Link>

            <Link to="/adminblog" className="group">
              <div className="glass border border-white/5 rounded-[2rem] p-8 flex items-center justify-between hover:border-purple-500/30 transition-all duration-500">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/10 group-hover:scale-110 transition-transform duration-500">
                    <BookOpen size={28} className="text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:grad-text transition-all duration-300">Publish New Blog</h3>
                    <p className="text-sm text-slate-500">Write and share a new tech article</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-all duration-500">
                  <PlusIcon size={20} />
                </div>
              </div>
            </Link>

            <Link to="/admincontact" className="group">
              <div className="glass border border-white/5 rounded-[2rem] p-8 flex items-center justify-between hover:border-blue-500/30 transition-all duration-500">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/10 group-hover:scale-110 transition-transform duration-500">
                    <MessageSquare size={28} className="text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:grad-text transition-all duration-300">View Messages</h3>
                    <p className="text-sm text-slate-500">Read and manage contact form submissions</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </Link>

            <Link to="/adminprofile" className="group">
              <div className="glass border border-white/5 rounded-[2rem] p-8 flex items-center justify-between hover:border-cyan-500/30 transition-all duration-500">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/10 group-hover:scale-110 transition-transform duration-500">
                    <User size={28} className="text-cyan-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:grad-text transition-all duration-300">Update Profile</h3>
                    <p className="text-sm text-slate-500">Change headline, photo, contacts and description</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-all duration-500">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-8 text-center">
        <p className="text-[10px] uppercase font-black tracking-[0.5em] text-slate-800">Admin System • Secured by JWT</p>
      </footer>
    </div>
  );
};

export default Admin;
