import React, { useRef, useState } from 'react';
import { AdminNavbar as Navbar } from '../components/AdminNavbar';
import axios from 'axios';
import { 
  ArrowLeft, 
  FolderPlus, 
  PlusCircle, 
  Image as ImageIcon, 
  Hash, 
  Terminal, 
  Globe, 
  Loader2 
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

export const Adminproject = () => {
  const titleref = useRef(null);
  const descref = useRef(null);
  const coverref = useRef(null);
  const gitref = useRef(null);
  const previewref = useRef(null);
  const categoryref = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const url = `${import.meta.env.VITE_API_BASE_URL}/projects`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      Title: titleref.current.value,
      Description: descref.current.value,
      CoverLink: coverref.current.value,
      GitLink: gitref.current.value,
      Previewlink: previewref.current.value,
      Category: categoryref.current.value
    };

    try {
      const response = await axios.post(url, formData);
      if (response.status === 201 || response.status === 200) {
        toast.success("Project added successfully!");
        // Reset form
        titleref.current.value = '';
        descref.current.value = '';
        coverref.current.value = '';
        gitref.current.value = '';
        previewref.current.value = '';
        categoryref.current.value = 'Own idea';
      }
    } catch (error) {
      console.error('Error posting data:', error);
      toast.error("Failed to add project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070b14] text-slate-200">
      <Toaster position="top-center" richColors />
      <div className="orb orb-1 opacity-40" />
      <div className="orb orb-2 opacity-20" />
      <Navbar />

      <main className="relative z-10 pt-24 pb-20 px-6 max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors duration-300">
            <ArrowLeft size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Back to Hub</span>
          </Link>
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-2">
              <FolderPlus size={24} className="text-orange-500" />
              <h1 className="text-4xl font-black text-white font-grotesk" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                New <span className="grad-text">Work</span> Submission
              </h1>
            </div>
            <p className="text-slate-500">Provide the details to showcase your latest project.</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass border border-white/5 rounded-[2.5rem] p-8 lg:p-12 space-y-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-[80px] -mr-32 -mt-32 pointer-events-none" />

          <div className="grid md:grid-cols-2 gap-8">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 ml-1">Project Name</label>
              <div className="relative group">
                <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-orange-500 transition-colors" />
                <input 
                  required 
                  ref={titleref} 
                  className="field pl-12 bg-white/[0.02] hover:bg-white/[0.04] transition-all" 
                  type="text" 
                  placeholder="e.g. DSizer Ecosystem" 
                />
              </div>
            </div>

            {/* Cover Link */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 ml-1">Cover Image Link</label>
              <div className="relative group">
                <ImageIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-orange-500 transition-colors" />
                <input 
                  required 
                  ref={coverref} 
                  className="field pl-12 bg-white/[0.02] hover:bg-white/[0.04] transition-all" 
                  type="text" 
                  placeholder="https://imgur.com/..." 
                />
              </div>
            </div>

            {/* description */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 ml-1">Work Description</label>
              <div className="relative group">
                <Terminal size={18} className="absolute left-4 top-4 text-slate-600 group-focus-within:text-orange-500 transition-colors" />
                <textarea 
                  required 
                  ref={descref} 
                  rows="4"
                  className="field pl-12 py-4 bg-white/[0.02] hover:bg-white/[0.04] transition-all min-h-[120px]" 
                  placeholder="Describe your project's technical hurdles and achievements..." 
                />
              </div>
            </div>

            {/* links grid */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 ml-1">GitHub Repository</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-orange-500">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </div>
                <input 
                  required 
                  ref={gitref} 
                  className="field pl-12 bg-white/[0.02] hover:bg-white/[0.04] transition-all text-xs" 
                  type="text" 
                  placeholder="https://github.com/..." 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 ml-1">Live Preview (Optional)</label>
              <div className="relative group">
                <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-orange-500 transition-colors" />
                <input 
                  ref={previewref} 
                  className="field pl-12 bg-white/[0.02] hover:bg-white/[0.04] transition-all text-xs" 
                  type="text" 
                  placeholder="https://mysite.com" 
                />
              </div>
            </div>

            {/* Category selection */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 ml-1">Project Category</label>
              <div className="relative group">
                <FolderPlus size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-orange-500 transition-colors" />
                <select 
                  required 
                  ref={categoryref} 
                  className="field pl-12 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
                >
                  <option value="aviatricks" className="bg-[#070b14]">Company Related (aviatricks)</option>
                  <option value="Own idea" className="bg-[#070b14]">Own idea</option>
                  <option value="College" className="bg-[#070b14]">College</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit" 
              disabled={loading}
              className="btn-glow w-full flex items-center justify-center gap-2 py-5 text-lg disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={24} className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <PlusCircle size={24} />
                  <span>Finalize & Publish</span>
                </>
              )}
            </button>
          </div>
        </form>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-12 text-center">
        <p className="text-slate-700 text-[10px] uppercase font-black tracking-[0.5em]">SYSTEM STATUS: READY</p>
      </footer>
    </div>
  );
};

export default Adminproject;
