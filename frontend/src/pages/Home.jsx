import React, { useEffect, useState, useRef } from 'react';
import { Navbar } from '../components/Navbar';
import axios from 'axios';
import profileImg from '../assets/img/bhuvip2.jpg';
import java from '../assets/img/java.png';
import js from '../assets/img/java-script.png';
import rea from '../assets/img/rea.png';
import sql from '../assets/img/sql.png';
import git from '../assets/img/git.png';
import dsizerMobile from '../assets/img/dsizer_mobile.png';
import dsizerAdmin from '../assets/img/dsizer_admin.png';
import Typewriter from 'typewriter-effect';
import { Github, Linkedin, Code, ArrowRight, Download, MapPin, Briefcase, GraduationCap, Award, BookOpen, Star, Heart, Mail, Phone, Zap, Smartphone, Cpu, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

// We use placeholders if the database is empty
const DEFAULT_SKILLS = [
  {
    title: 'Front-End',
    skills: [
      { name: 'React JS', pct: 85, color: 'from-cyan-400 to-blue-500' },
      { name: 'Flutter', pct: 75, color: 'from-blue-400 to-indigo-500' },
      { name: 'HTML/CSS', pct: 95, color: 'from-orange-400 to-red-500' },
    ]
  }
];

// Fallback achievements
const DEFAULT_ACHIEVEMENTS = [
  'JUDO (2016) — 61st National Games (SGFI) Under 14 Junior Bronze Medalist',
  'JUDO (2017-20) — State Level Gold Medalist'
];

export const Home = () => {
  const [activeTab, setActiveTab] = useState('skills');
  const [progress, setProgress] = useState({});
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const skillsRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/profile`);
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (!profile) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const map = {};
        const skillsToMap = (profile.skills && profile.skills.length > 0) ? profile.skills : DEFAULT_SKILLS;
        skillsToMap.forEach(group => {
          group.skills.forEach(s => map[s.name] = s.pct);
        });
        setProgress(map);
      }
    }, { threshold: 0.1 });

    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => { if (skillsRef.current) observer.unobserve(skillsRef.current); };
  }, [profile]);

  if (loading) return (
    <div className="min-h-screen bg-[#070b14] flex flex-col items-center justify-center gap-4">
      <Loader2 className="text-orange-500 animate-spin" size={40} />
      <p className="text-white/20 text-xs font-black uppercase tracking-[0.4em]">Initializing Portfolio...</p>
    </div>
  );

  const heroProfile = profile || {
    name: 'BHUVANESHWARAN S',
    tagline: 'Available for jobs',
    headline: 'BHUVANESHWARAN S',
    subHeadline: 'Software Engineer',
    description: "I'm a Software Engineer at Aviatricks Aerolab Private Limited. I specialize in building scalable web and mobile applications with a focus on Drone Technology and Cloud infrastructure.",
    location: 'Coimbatore, India',
    email: 'bhuvibhuvanesh101@gmail.com',
    phone: '+91 6382475358',
    profilePhoto: profileImg,
    resumeLink: '#'
  };

  return (
    <div className="relative min-h-screen bg-[#070b14] text-slate-200 selection:bg-orange-500/30">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <Navbar />

      {/* ─── Hero Section ──────────────────────────────────────────── */}
      <section className="relative z-10 min-h-screen flex items-center pt-20 pb-10">
        <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 order-2 md:order-1">
            <div className="inline-flex items-center gap-3 glass border border-orange-500/20 rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-white/80">{heroProfile.tagline}</span>
            </div>

            <div className="space-y-4">
              <p className="text-orange-400 font-mono tracking-tighter text-lg">Hello World, I'm</p>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-none font-grotesk break-words" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                {heroProfile.headline.split(' ')[0]}<br/><span className="grad-text">{heroProfile.headline.split(' ').slice(1).join(' ')}</span>
              </h1>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-400 h-10 font-mono">
                <Typewriter
                  options={{ strings: [heroProfile.subHeadline, 'Java Enthusiast', 'UI/UX Designer', 'Drone Tech Specialist'], autoStart: true, loop: true, deleteSpeed: 50 }}
                />
              </div>
            </div>

            <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
              {heroProfile.description}
            </p>

            <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-500">
              <span className="flex items-center gap-2"><MapPin size={16} className="text-orange-500" /> {heroProfile.location}</span>
              <span className="flex items-center gap-2 font-mono"><Mail size={16} className="text-orange-500" /> {heroProfile.email}</span>
              <span className="flex items-center gap-2"><Phone size={16} className="text-orange-500" /> {heroProfile.phone}</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/projects">
                <button className="btn-glow px-8 py-4 text-base flex items-center gap-2">
                  <span>View My Work</span>
                  <ArrowRight size={18} />
                </button>
              </Link>
              <a href={heroProfile.resumeLink} target="_blank" rel="noreferrer">
                <button className="btn-outline px-8 py-4 text-base">Linked In</button>
              </a>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-orange-500 to-purple-600 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative">
                <img src={heroProfile.profilePhoto} alt={heroProfile.name} className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-white/10 shadow-2xl relative z-10" />
                <div className="absolute -bottom-4 right-0 glass border border-white/10 px-6 py-3 rounded-2xl shadow-xl z-20">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Experience</p>
                  <p className="text-xl font-bold grad-text">1 Year</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* ─── Featured Innovation ──────────────────────────────────── */}
      <section className="relative z-10 py-16 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <Link to="/projects/dsizer">
            <div className="glass border border-orange-500/10 rounded-[2.5rem] p-4 group hover:bg-orange-500/[0.02] transition-colors duration-700 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[100px] -mr-32 -mt-32 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 p-6 lg:p-10">
                <div className="lg:w-1/2 space-y-6 relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full">
                    <Zap size={12} className="text-orange-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-200">Latest Innovation</span>
                  </div>
                  
                  <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight font-grotesk" style={{fontFamily:'Space Grotesk,sans-serif'}}>
                    DSizer<span className="grad-text">:</span> The Future of Measurements
                  </h2>
                  
                  <p className="text-slate-400 text-lg leading-relaxed">
                    Revolutionizing body analysis through computer vision. A full-stack ecosystem featuring real-time gesture tracking and Flutter-powered mobile interfaces.
                  </p>

                  <div className="flex items-center gap-6 pt-4">
                    <div className="flex items-center gap-2">
                       <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-orange-500"><Smartphone size={16} /></div>
                       <span className="text-xs font-bold text-slate-300">Flutter Mobile</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-purple-500"><Cpu size={16} /></div>
                       <span className="text-xs font-bold text-slate-300">FastAPI & OpenCV</span>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button className="btn-glow inline-flex items-center gap-2 px-8 py-4">
                      <span>Explore Showcase</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>

                <div className="lg:w-1/2 relative">
                  <div className="relative z-10 flex gap-4 lg:gap-6 items-end scale-90 lg:scale-100 origin-center transition-transform duration-700 group-hover:scale-105">
                     <div className="glass border border-white/10 rounded-2xl p-2 shadow-2xl shadow-orange-500/10">
                        <img src={dsizerMobile} className="w-[180px] lg:w-[220px] rounded-xl hover:grayscale-0 transition duration-500" alt="DSizer app" />
                     </div>
                     <div className="glass border border-white/10 rounded-2xl p-2 shadow-2xl shadow-purple-500/10 hidden sm:block mb-8 translate-y-12">
                        <img src={dsizerAdmin} className="w-[280px] lg:w-[320px] rounded-xl hover:grayscale-0 transition duration-500" alt="DSizer admin" />
                     </div>
                  </div>
                  {/* Decorative element */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-orange-500/20 to-purple-600/20 blur-[120px] -z-10 opacity-30" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ─── Tabs Section ─────────────────────────────────────────── */}
      <section ref={skillsRef} className="relative z-10 py-24 px-6 border-t border-white/5 bg-[#0a0f1d]/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {['skills', 'education', 'certifications', 'patents'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 border ${
                  activeTab === tab
                    ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:border-orange-500/40 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content: Skills */}
          {activeTab === 'skills' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {((profile?.skills && profile.skills.length > 0) ? profile.skills : DEFAULT_SKILLS).map(group => (
                <div key={group.title} className="glass border border-white/10 p-6 rounded-3xl space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-orange-500/80 mb-4">{group.title}</h3>
                  <div className="space-y-6">
                    {group.skills.map(s => (
                      <div key={s.name} className="space-y-2">
                        <div className="flex justify-between text-xs font-bold uppercase">
                          <span>{s.name}</span>
                          <span className="text-slate-500">{progress[s.name] || 0}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full bg-gradient-to-r ${s.color} transition-all duration-1000 ease-out`} style={{ width: `${progress[s.name] || 0}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab Content: Education */}
          {activeTab === 'education' && (
            <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-500">
              {(profile?.education || []).map((edu, idx) => (
                <div key={idx} className="glass border border-white/10 p-8 rounded-3xl flex flex-col md:flex-row gap-6 items-start">
                  <div className="bg-orange-500/10 p-4 rounded-2xl">
                    <GraduationCap className="text-orange-500" size={32} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <h3 className="text-xl font-bold text-white">{edu.institution}</h3>
                      <span className="text-xs font-black bg-white/5 px-3 py-1 rounded-full border border-white/10">{edu.duration}</span>
                    </div>
                    <p className="text-orange-400 font-medium">{edu.degree}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><MapPin size={14} /> {edu.location}</span>
                      <span className="flex items-center gap-1 font-bold text-slate-300"><Star size={14} className="text-yellow-500" /> {edu.score}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab Content: Certifications */}
          {activeTab === 'certifications' && (
            <div className="grid md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-left-4 duration-500">
              {(profile?.certifications || []).map((cert, idx) => (
                <div key={idx} className="glass border border-white/10 p-5 rounded-2xl flex items-center gap-4 hover:border-orange-500/40 transition-colors">
                  <Award size={20} className="text-orange-500 shrink-0" />
                  <span className="font-semibold text-slate-300">{cert}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tab Content: Patents */}
          {activeTab === 'patents' && (
            <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
              {(profile?.patents || []).map((patent, idx) => (
                <div key={idx} className="glass border border-white/10 p-8 rounded-3xl space-y-4">
                  <BookOpen size={24} className="text-orange-500" />
                  <h3 className="text-xl font-bold text-white leading-snug">{patent.title}</h3>
                  <div className="flex justify-between items-center text-sm font-bold uppercase tracking-wider">
                    <span className="text-slate-500">Docket: {patent.docket}</span>
                    <span className="text-green-500">{patent.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── Achievements & Interest ──────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h2 className="text-3xl font-black uppercase tracking-tighter grad-text">Achievements</h2>
            <div className="space-y-4">
              {((profile?.achievements && profile.achievements.length > 0) ? profile.achievements : DEFAULT_ACHIEVEMENTS).map((item, i) => (
                <div key={i} className="flex gap-4 p-4 glass border border-white/5 rounded-2xl items-center">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <p className="font-bold text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl font-black uppercase tracking-tighter grad-text">Areas of Interest</h2>
            <div className="flex flex-wrap gap-3">
              {['Web Development', 'App Development', 'UI/UX Designing', 'Database Management', 'Drone Technology', 'Cloud Computing'].map(item => (
                <div key={item} className="px-6 py-3 glass border border-white/10 rounded-full font-bold text-xs uppercase tracking-widest text-slate-400">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-2xl font-black text-white">BHUVANESHWARAN S</h2>
            <p className="text-slate-500 text-sm font-medium italic">"Building the future through code and innovation."</p>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/Harabhuvi" target="_blank" rel="noreferrer" className="p-3 glass border border-white/10 rounded-xl hover:text-orange-500 transition-colors">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/bhuvaneshwaran-undefined-a5249b276" target="_blank" rel="noreferrer" className="p-3 glass border border-white/10 rounded-xl hover:text-orange-500 transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        <div className="text-center mt-12 text-[10px] uppercase font-black tracking-[0.4em] text-slate-700">
          © 2024 Portfolio_S • All Rights Reserved
        </div>
      </footer>
    </div>
  );
};

export default Home;
