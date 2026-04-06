import React, { useEffect, useState, useRef } from 'react';
import { Navbar } from '../components/Navbar';
import profile from '../assets/img/bhuvip2.jpg';
import java from '../assets/img/java.png';
import js from '../assets/img/java-script.png';
import rea from '../assets/img/rea.png';
import sql from '../assets/img/sql.png';
import git from '../assets/img/git.png';
import Typewriter from 'typewriter-effect';
import { Github, Linkedin, Code, ArrowRight, Download, MapPin, Briefcase, GraduationCap, Award, BookOpen, Star, Heart, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const SKILL_GROUPS = [
  {
    title: 'Front-End',
    skills: [
      { name: 'React JS', pct: 85, color: 'from-cyan-400 to-blue-500' },
      { name: 'Flutter', pct: 75, color: 'from-blue-400 to-indigo-500' },
      { name: 'HTML/CSS', pct: 95, color: 'from-orange-400 to-red-500' },
      { name: 'Qt/QML', pct: 70, color: 'from-green-400 to-emerald-500' },
    ]
  },
  {
    title: 'Back-End',
    skills: [
      { name: 'Java', pct: 90, color: 'from-orange-500 to-red-600' },
      { name: 'Node JS / Express', pct: 80, color: 'from-green-500 to-emerald-600' },
      { name: 'Python', pct: 75, color: 'from-blue-500 to-indigo-600' },
      { name: 'GraphQL', pct: 70, color: 'from-pink-500 to-purple-600' },
    ]
  },
  {
    title: 'Database & Auth',
    skills: [
      { name: 'MongoDB', pct: 85, color: 'from-green-400 to-emerald-500' },
      { name: 'MySQL / DBMS', pct: 80, color: 'from-blue-400 to-cyan-500' },
      { name: 'JWT / Firebase', pct: 85, color: 'from-yellow-400 to-orange-500' },
    ]
  },
  {
    title: 'Tools & DevOps',
    skills: [
      { name: 'Git / GitHub', pct: 90, color: 'from-gray-600 to-gray-800' },
      { name: 'Docker', pct: 65, color: 'from-blue-500 to-blue-700' },
      { name: 'AWS / GCloud / Vercel', pct: 70, color: 'from-orange-500 to-yellow-500' },
    ]
  }
];

const EDUCATION = [
  {
    institution: 'Sri Shakthi Institute of Engineering and Technology',
    location: 'Coimbatore',
    degree: 'B.Tech - Information Technology',
    duration: '2022 — 2026',
    score: '7.0* CGPA'
  },
  {
    institution: 'Adharsh Vidhyalaya Matric Hr Sec School',
    location: 'Erode',
    degree: 'Higher Secondary Certificate (HSC)',
    duration: '2021 — 2022',
    score: '76%'
  },
  {
    institution: 'Literacy Matric Hr Sec School',
    location: 'Erode',
    degree: 'Secondary School Leaving Certificate (SSLC)',
    duration: '2020 — 2021',
    score: '74%'
  }
];

const CERTIFICATIONS = [
  'Aviatricks Pvt Lmt — Full Stack Developer',
  'Full Stack Development — NoviTech',
  'Web Development — CodSoft',
  'C, C++, PYTHON — CSC',
  'STEP (QA 360) — CDW'
];

const PATENTS = [
  {
    title: 'AI-ENHANCED FINANCIAL BEHAVIOUR ADVISOR',
    docket: '86040',
    status: 'Issued June 27 2024'
  },
  {
    title: "THE FLUENT SPEAKER'S GUIDE",
    docket: '141169',
    status: 'Issued November 27 2024'
  }
];

const ACHIEVEMENTS = [
  'JUDO (2016) — 61st National Games (SGFI) Under 14 Junior Bronze Medalist',
  'JUDO (2017-20) — State Level Gold Medalist'
];

export const Home = () => {
  const [activeTab, setActiveTab] = useState('skills');
  const [progress, setProgress] = useState({});
  const skillsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const map = {};
        SKILL_GROUPS.forEach(group => {
          group.skills.forEach(s => map[s.name] = s.pct);
        });
        setProgress(map);
      }
    }, { threshold: 0.1 });
    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => { if (skillsRef.current) observer.unobserve(skillsRef.current); };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#070b14] text-slate-200 selection:bg-orange-500/30">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <Navbar />

      {/* ─── Hero Section ──────────────────────────────────────────── */}
      <section className="relative z-10 min-h-screen flex items-center pt-20 pb-10">
        <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 order-2 md:order-1">
            <div className="inline-flex items-center gap-3 glass border border-orange-500/20 rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-white/80">Available for Internships</span>
            </div>

            <div className="space-y-4">
              <p className="text-orange-400 font-mono tracking-tighter text-lg">Hello World, I'm</p>
              <h1 className="text-6xl md:text-7xl font-black tracking-tight text-white leading-none font-grotesk" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                BHUVANESH<br/><span className="grad-text">WARAN S</span>
              </h1>
              <div className="text-2xl md:text-3xl font-bold text-slate-400 h-10 font-mono">
                <Typewriter
                  options={{ strings: ['Full Stack Developer', 'Java Enthusiast', 'UI/UX Designer', 'Drone Tech Specialist'], autoStart: true, loop: true, deleteSpeed: 50 }}
                />
              </div>
            </div>

            <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
              I'm a passionate Full Stack Developer currently pursuing B.Tech IT at Sri Shakthi Institute. I specialize in building scalable web and mobile applications with a focus on Drone Technology and Cloud infrastructure.
            </p>

            <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-500">
              <span className="flex items-center gap-2"><MapPin size={16} className="text-orange-500" /> Coimbatore, India</span>
              <span className="flex items-center gap-2 font-mono"><Mail size={16} className="text-orange-500" /> bhuvibhuvanesh101@gmail.com</span>
              <span className="flex items-center gap-2"><Phone size={16} className="text-orange-500" /> +91 6382475358</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/projects">
                <button className="btn-glow px-8 py-4 text-base flex items-center gap-2">
                  <span>View My Work</span>
                  <ArrowRight size={18} />
                </button>
              </Link>
              <a href="https://linkedin.com/in/bhuvaneshwaran-undefined-a5249b276" target="_blank" rel="noreferrer">
                <button className="btn-outline px-8 py-4 text-base">Linked In</button>
              </a>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-orange-500 to-purple-600 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative">
                <img src={profile} alt="Bhuvi" className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-white/10 shadow-2xl relative z-10" />
                <div className="absolute -bottom-4 right-0 glass border border-white/10 px-6 py-3 rounded-2xl shadow-xl z-20">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Experience</p>
                  <p className="text-xl font-bold grad-text">Undergraduate</p>
                </div>
              </div>
            </div>
          </div>
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
              {SKILL_GROUPS.map(group => (
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
              {EDUCATION.map((edu, idx) => (
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
              {CERTIFICATIONS.map((cert, idx) => (
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
              {PATENTS.map((patent, idx) => (
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
              {ACHIEVEMENTS.map((item, i) => (
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
