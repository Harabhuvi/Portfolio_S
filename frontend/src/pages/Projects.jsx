import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from '../components/Navbar';
import { Procomponent } from '../components/Procomponent';
import { Loader2, FolderOpen, Star, ArrowRight, Smartphone, Monitor } from 'lucide-react';

const Projects = () => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/projects`;
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      if (response.status === 200 || response.status === 201) {
        setProjects(response.data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div className="relative min-h-screen">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <Navbar />

      <main className="relative z-10 pt-24 pb-20 px-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="tag mb-4 inline-block">Portfolio</p>
          <h1 className="section-heading text-white mb-4">My Projects</h1>
          <p className="text-white/40 max-w-md mx-auto text-sm leading-relaxed">
            A collection of things I've built — from full‑stack web apps to standalone tools.
          </p>
          <div className="mt-6 w-16 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto" />
        </div>

        {/* Featured Project */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Star size={16} className="text-orange-500 fill-orange-500" />
            <h2 className="text-white font-bold uppercase tracking-widest text-xs">Featured Innovation</h2>
          </div>
          
          <Link to="/projects/dsizer">
            <div className="glass border border-orange-500/20 rounded-[2rem] overflow-hidden group hover:border-orange-500/40 transition-all duration-500 cursor-pointer relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="flex flex-col lg:flex-row items-center">
                <div className="lg:w-2/5 p-8 lg:p-12 space-y-6 relative z-10">
                  <div className="tag">Full-Stack Ecosystem</div>
                  <h3 className="text-3xl md:text-4xl font-black text-white font-grotesk" style={{fontFamily:'Space Grotesk,sans-serif'}}>
                    DSizer<span className="grad-text">:</span> Intelligent Size Analysis
                  </h3>
                  <p className="text-slate-400 leading-relaxed line-clamp-4">
                    A cutting-edge platform designed to revolutionize body measurement and size estimation through computer vision and real-time gesture analysis. Featuring a high-performance Flutter app and a robust React/FastAPI admin panel.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {['Flutter', 'React 19', 'FastAPI', 'OpenCV', 'Mediapipe'].map(t => (
                      <span key={t} className="px-2 py-1 bg-white/5 rounded-md text-[10px] font-bold text-slate-500 border border-white/5">{t}</span>
                    ))}
                  </div>

                  <div className="pt-4">
                    <button className="btn-glow flex items-center gap-2 px-6 py-3 text-sm">
                      <span>Explore Showcase</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

                <div className="lg:w-3/5 h-64 lg:h-[400px] bg-slate-900 relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-r from-[#070b14] via-transparent to-transparent z-10 hidden lg:block" />
                   <img 
                    src="/src/assets/img/dsizer_admin.png" 
                    className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 opacity-60 group-hover:opacity-100" 
                    alt="DSizer Preview"
                   />
                   <div className="absolute bottom-8 right-8 z-20 flex gap-2">
                      <div className="glass p-2 rounded-lg border-white/10 backdrop-blur-md">
                        <Smartphone size={16} className="text-orange-500" />
                      </div>
                      <div className="glass p-2 rounded-lg border-white/10 backdrop-blur-md">
                        <Monitor size={16} className="text-purple-500" />
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="text-orange-400 animate-spin w-10 h-10" />
            <p className="text-white/30 text-sm">Loading projects…</p>
          </div>
        ) : projects.length > 0 ? (
          <div className="space-y-20">
            {[
              { id: 'aviatricks', title: 'Company Related (Aviatricks)' },
              { id: 'Own idea', title: 'Own Creations' },
              { id: 'College', title: 'College Projects' }
            ].map((category) => {
              const categoryProjects = projects.filter(p => 
                (p.Category === category.id) || 
                (category.id === 'Own idea' && !p.Category)
              );

              if (categoryProjects.length === 0) return null;

              return (
                <div key={category.id} className="space-y-8">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-black text-white font-grotesk whitespace-nowrap">
                      {category.title}
                    </h2>
                    <div className="h-px w-full bg-gradient-to-r from-orange-500/50 to-transparent" />
                  </div>
                  
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categoryProjects.map((item) => (
                      <Procomponent
                        key={item._id}
                        id={item._id}
                        title={item.Title}
                        description={item.Description}
                        category={item.Category}
                        coverlink={item.CoverLink}
                        gitlink={item.GitLink}
                        previewlink={item.Previewlink}
                        fetchData={fetchData}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="glass border border-white/8 rounded-2xl p-8 text-center">
              <FolderOpen className="w-12 h-12 text-white/20 mx-auto mb-3" />
              <p className="text-white/30 text-sm">No projects yet. Check back soon!</p>
            </div>
          </div>
        )}
      </main>

      <footer className="relative z-10 border-t border-white/5 py-8 px-6 text-center">
        <p className="text-white/20 text-xs">© 2026 Bhuvaneshwaran. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Projects;
