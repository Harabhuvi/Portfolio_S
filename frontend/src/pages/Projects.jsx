import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from '../components/Navbar';
import { Procomponent } from '../components/Procomponent';
import { Loader2, FolderOpen } from 'lucide-react';

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

        {/* Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="text-orange-400 animate-spin w-10 h-10" />
            <p className="text-white/30 text-sm">Loading projects…</p>
          </div>
        ) : projects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((item) => (
              <Procomponent
                key={item.id}
                id={item.id}
                title={item.Title}
                description={item.Description}
                coverlink={item.CoverLink}
                gitlink={item.GitLink}
                previewlink={item.Previewlink}
                fetchData={fetchData}
              />
            ))}
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
        <p className="text-white/20 text-xs">© 2024 Bhuvaneshwaran. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Projects;
