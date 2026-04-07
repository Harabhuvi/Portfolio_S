import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { 
  Smartphone, 
  Settings, 
  Cpu, 
  Database, 
  Layout, 
  Activity, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Monitor,
  Search,
  Users,
  PieChart,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import dsizerMobile from '../assets/img/dsizer_mobile.png';
import dsizerAdmin from '../assets/img/dsizer_admin.png';

const DSizer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#070b14] text-slate-200 selection:bg-orange-500/30">
      <div className="orb orb-1 opacity-50" />
      <div className="orb orb-2 opacity-30" />
      <Navbar />

      {/* ─── Hero Section ──────────────────────────────────────────── */}
      <header className="relative z-10 pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 glass border border-orange-500/30 px-4 py-2 rounded-full mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
            <Zap size={14} className="text-orange-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-200">Cutting-Edge AI Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tight text-white mb-6 leading-tight font-grotesk" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
            DSizer<span className="grad-text">:</span>
          </h1>
          <p className="text-2xl md:text-4xl font-bold text-slate-400 mb-8 max-w-3xl leading-snug">
            The Intelligent Size Analysis Ecosystem
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full mb-12" />
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-12">
            A revolutionary platform designed to transform body measurement and size estimation through computer vision and real-time gesture analysis.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="glass border border-white/10 px-6 py-4 rounded-2xl flex items-center gap-3">
              <Smartphone size={24} className="text-orange-500" />
              <div className="text-left">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Platform</p>
                <p className="text-sm font-bold text-white">Flutter Mobile App</p>
              </div>
            </div>
            <div className="glass border border-white/10 px-6 py-4 rounded-2xl flex items-center gap-3">
              <Settings size={24} className="text-purple-500" />
              <div className="text-left">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Admin</p>
                <p className="text-sm font-bold text-white">React & FastAPI Hub</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Mobile App Section ───────────────────────────────────── */}
      <section className="relative z-10 py-24 px-6 border-t border-white/5 bg-[#0a0f1d]/30">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                  <Smartphone size={20} className="text-orange-500" />
                </div>
                <h2 className="text-3xl font-black text-white font-grotesk uppercase tracking-tight" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                  DSizer Mobile Application
                </h2>
              </div>
              <p className="text-slate-400 leading-relaxed text-lg">
                The user-facing interface providing a seamless and interactive experience for personal size analysis.
              </p>
            </div>

            <div className="grid gap-6">
              {[
                { title: 'Interactive Measurement', desc: 'Leverages device camera and specialized gesture overlays to guide users through the measurement process.', icon: <Activity size={18} /> },
                { title: 'Real-time Feedback', desc: 'WebSocket-based communication for instantaneous feedback from the analysis engine.', icon: <Zap size={18} /> },
                { title: 'Biometric Analytics', desc: 'Processes camera input to estimate body dimensions with high precision.', icon: <Search size={18} /> },
                { title: 'Lifestyle Management', desc: 'Securely stores user profiles, measurement history, and analysis records.', icon: <ShieldCheck size={18} /> }
              ].map((feature, i) => (
                <div key={i} className="group flex gap-4 p-5 glass border border-white/5 rounded-2xl hover:border-orange-500/30 transition-all duration-300">
                  <div className="mt-1 text-orange-500 shrink-0 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{feature.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4">Technical Highlights</h4>
              <div className="flex flex-wrap gap-2">
                {['Flutter', 'iOS/Android', 'flutter_animate', 'google_fonts', 'lucide_icons', 'Dio/WS'].map(tech => (
                  <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-400">{tech}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center sticky top-32">
            <div className="relative group">
              <div className="absolute -inset-4 bg-orange-500/20 rounded-[2rem] blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative glass border border-white/10 rounded-[2rem] p-4 shadow-2xl">
                <img 
                  src={dsizerMobile} 
                  alt="DSizer Mobile App Preview" 
                  className="w-full max-w-[320px] rounded-[1.5rem] shadow-xl border border-white/5 grayscale-[0.2] group-hover:grayscale-0 transition duration-700" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Admin Hub Section ───────────────────────────────────── */}
      <section className="relative z-10 py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-purple-500/20 rounded-[2rem] blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative glass border border-white/10 rounded-[2rem] p-4 shadow-2xl">
                <img 
                  src={dsizerAdmin} 
                  alt="DSizer Admin Dashboard" 
                  className="w-full max-w-[500px] rounded-xl shadow-xl border border-white/5 grayscale-[0.2] group-hover:grayscale-0 transition duration-700" 
                />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                  <Monitor size={20} className="text-purple-500" />
                </div>
                <h2 className="text-3xl font-black text-white font-grotesk uppercase tracking-tight" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                  DSizer Admin & Analysis Hub
                </h2>
              </div>
              <p className="text-slate-400 leading-relaxed text-lg">
                The central nervous system platform handling complex image processing, data management, and business intelligence.
              </p>
            </div>

            <div className="grid gap-6">
              {[
                { title: 'Advanced Gesture Engine', desc: 'Python service utilizing OpenCV and Mediapipe for skeletal tracking and measurements.', icon: <Cpu size={18} /> },
                { title: 'Business Intelligence Dashboard', desc: 'Visualizes platform growth and accuracy using interactive Recharts.', icon: <PieChart size={18} /> },
                { title: 'System Administration', desc: 'Full CRUD capabilities for user management, analysis logs, and measurement data.', icon: <Users size={18} /> },
                { title: 'Analysis Sandbox', desc: 'Testing environment to validate accuracy using direct camera stream inputs.', icon: <Layout size={18} /> }
              ].map((feature, i) => (
                <div key={i} className="group flex gap-4 p-5 glass border border-white/5 rounded-2xl hover:border-purple-500/30 transition-all duration-300">
                  <div className="mt-1 text-purple-500 shrink-0 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{feature.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4">Technical Highlights</h4>
              <div className="flex flex-wrap gap-2">
                {['React 19', 'Vite', 'Tailwind CSS 4', 'Framer Motion', 'FastAPI', 'MongoDB', 'OpenCV', 'Mediapipe'].map(tech => (
                  <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-400">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Call to Action ───────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-6 border-t border-white/5 bg-gradient-to-b from-transparent to-orange-500/5">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-black text-white font-grotesk uppercase" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
            Ready to <span className="grad-text">Revolutionize</span> Scaling?
          </h2>
          <p className="text-slate-400 text-lg">
            DSizer combines powerful AI processing with accessible native mobile experiences to bring precision measurement to everyone.
          </p>
          <div className="flex justify-center pt-8">
            <button className="btn-glow px-10 py-5 text-lg flex items-center gap-3">
              <span>View Source Code</span>
              <Github size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/5 py-12 px-6 text-center">
        <p className="text-slate-600 text-[10px] uppercase font-black tracking-[0.5em]">
          DSizer Ecosystem • Case Study
        </p>
      </footer>
    </div>
  );
};

// Internal Github icon component since it's not imported from lucide above
const Github = ({ size }) => (
  <svg 
    xmlns="https://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default DSizer;
