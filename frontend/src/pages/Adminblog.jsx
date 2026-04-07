import React, { useRef, useState } from 'react';
import { Navbar } from '../components/Navbar';
import axios from 'axios';
import { 
  ArrowLeft, 
  PenTool, 
  BookPlus, 
  Hash, 
  AlignLeft, 
  Type, 
  CheckCircle2, 
  Loader2,
  ListRestart
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

export const Adminblog = () => {
  const titleref = useRef(null);
  const bodyref = useRef(null);
  const blogref = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const url = `${import.meta.env.VITE_API_BASE_URL}/blogs`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      Title: titleref.current.value,
      Body: bodyref.current.value,
      Blog: blogref.current.value
    };

    try {
      const response = await axios.post(url, formData);
      if (response.status === 201 || response.status === 200) {
        toast.success("Blog published successfully!");
        // Reset form
        titleref.current.value = '';
        bodyref.current.value = '';
        blogref.current.value = '';
      }
    } catch (error) {
      console.error('Error posting data:', error);
      toast.error("Failed to publish blog. Please try check fields.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070b14] text-slate-200">
      <Toaster position="top-center" richColors />
      <div className="orb orb-1 opacity-30" />
      <div className="orb orb-2 bg-purple-500/10 opacity-20" />
      <Navbar />

      <main className="relative z-10 pt-24 pb-20 px-6 max-w-4xl mx-auto">
        {/* Breadcrumbs Breadcrumbs */}
        <div className="mb-12">
          <Link to="/admin" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors duration-300">
            <ArrowLeft size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Back to Hub</span>
          </Link>
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-2">
              <PenTool size={24} className="text-purple-500" />
              <h1 className="text-4xl font-black text-white font-grotesk" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                Article <span className="grad-text">Composer</span>
              </h1>
            </div>
            <p className="text-slate-500">Draft your next insight and share it with the world.</p>
          </div>
        </div>

        {/* Form Form */}
        <form onSubmit={handleSubmit} className="glass border border-white/5 rounded-[2.5rem] p-8 lg:p-12 space-y-10 shadow-2xl relative overflow-hidden">
          {/* Subtle accent icon */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[80px] -mr-32 -mt-32 pointer-events-none" />

          <div className="grid grid-cols-1 gap-8">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-500 ml-1">Article Headline</label>
              <div className="relative group">
                <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-500 transition-colors" />
                <input 
                  required 
                  ref={titleref} 
                  className="field pl-12 bg-white/[0.02] hover:bg-white/[0.04] transition-all text-lg font-bold" 
                  type="text" 
                  placeholder="e.g. Master React in 2024" 
                />
              </div>
            </div>

            {/* short body/desc */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-500 ml-1">Summary Snapshot</label>
              <div className="relative group">
                <AlignLeft size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-500 transition-colors" />
                <input 
                  required 
                  ref={bodyref} 
                  className="field pl-12 bg-white/[0.02] hover:bg-white/[0.04] transition-all" 
                  type="text" 
                  placeholder="A one-sentence hook for the readers..." 
                />
              </div>
            </div>

            {/* Full blog blog */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-500 ml-1">Complete Content</label>
              <div className="relative group">
                <Type size={18} className="absolute left-4 top-4 text-slate-600 group-focus-within:text-purple-500 transition-colors" />
                <textarea 
                  required 
                  ref={blogref} 
                  rows="12"
                  className="field pl-12 py-4 bg-white/[0.02] hover:bg-white/[0.04] transition-all min-h-[300px] font-sans" 
                  placeholder="Deep dive into your topic here..." 
                />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit" 
              disabled={loading}
              className="btn-glow w-full flex items-center justify-center gap-2 py-5 text-xl disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={24} className="animate-spin" />
                  <span>Publishing Insights...</span>
                </>
              ) : (
                <>
                  <BookPlus size={24} />
                  <span>Go Live Now</span>
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

export default Adminblog;