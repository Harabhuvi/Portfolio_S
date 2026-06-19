import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Shield, Loader2, ArrowLeft } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { setLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, { username, password });

      if (res.data.success) {
        setLoggedIn(true);
        navigate("/");
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Server error! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070b14] flex flex-col items-center justify-center p-6 selection:bg-orange-500/30">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      
      <a href="https://bhuvi.buzz" className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-white transition-colors group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-bold uppercase tracking-widest">Back to Portfolio</span>
      </a>

      <div className="relative z-10 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-orange-500/10">
            <Shield size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Admin Portal</h2>
          <p className="text-slate-500 text-sm mt-1">Provide credentials to enter</p>
        </div>

        <div className="glass border border-white/10 p-8 rounded-3xl shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block pl-1">Username</label>
              <input
                type="text"
                placeholder="Ex. Admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="field py-3"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block pl-1">Password</label>
              <input
                type="password"
                placeholder="Your secret password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="field py-3"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                 <p className="text-red-400 text-xs text-center font-bold tracking-wide">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-glow w-full py-4 text-base flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span>Sign In</span>
                  <Shield size={18} />
                </>
              )}
            </button>
          </form>
        </div>
        
        <p className="text-center mt-8 text-[10px] text-slate-700 font-black uppercase tracking-[0.3em]">
          Restricted Access Only
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
