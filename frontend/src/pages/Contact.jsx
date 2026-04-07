import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from '../components/Navbar';
import { Github, Linkedin, Code, Mail, Phone, Send, Loader2, CheckCircle2 } from 'lucide-react';

export const Contact = () => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/contact`;
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const commentsRef = useRef(null);
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/profile`);
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      Name: nameRef.current.value,
      Email: emailRef.current.value,
      Comments: commentsRef.current.value
    };

    try {
      const response = await axios.post(url, formData);
      if (response.status === 201 || response.status === 200) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
        nameRef.current.value = '';
        emailRef.current.value = '';
        commentsRef.current.value = '';
      }
    } catch (error) {
      console.error('Error posting data:', error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactProfile = profile || {
    email: 'bhuvibhuvanesh101@gmail.com',
    phone: '+91 6382475358',
  };

  return (
    <div className="relative min-h-screen bg-[#070b14] text-slate-200">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <Navbar />

      <main className="relative z-10 pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="tag mb-4 inline-block">Contact</p>
          <h1 className="section-heading text-white mb-4">Get In Touch</h1>
          <p className="text-white/40 max-w-md mx-auto text-sm leading-relaxed">
            Have a project in mind or just want to chat? Drop me a message below.
          </p>
          <div className="mt-6 w-16 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Info Side */}
          <div className="space-y-8">
            <div className="glass border border-white/10 p-8 rounded-3xl space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
              
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email</p>
                  <p className="text-white font-medium">{contactProfile.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phone</p>
                  <p className="text-white font-medium">{contactProfile.phone}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Social Profiles</p>
                <div className="flex gap-4">
                  <a href="https://github.com/Harabhuvi" target="_blank" rel="noreferrer" className="p-3 glass border border-white/10 rounded-xl hover:text-orange-500 transition-colors">
                    <Github size={20} />
                  </a>
                  <a href="https://linkedin.com/in/bhuvaneshwaran-undefined-a5249b276" target="_blank" rel="noreferrer" className="p-3 glass border border-white/10 rounded-xl hover:text-orange-500 transition-colors">
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="glass border border-white/10 p-8 rounded-3xl">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Message Sent!</h2>
                <p className="text-slate-500">Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 block">Your Name</label>
                  <input required ref={nameRef} className="field text-base py-3" type="text" placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 block">Email Address</label>
                  <input required ref={emailRef} className="field text-base py-3" type="email" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 block">Message</label>
                  <textarea required ref={commentsRef} rows={5} className="field text-base py-3 min-h-[150px]" placeholder="Tell me about your project..." />
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-glow w-full py-4 text-base flex items-center justify-center gap-2 group"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-10 px-6 text-center text-xs font-bold text-slate-700 tracking-[0.4em] uppercase">
        © 2026 Portfolio_S • Inspired by Innovation
      </footer>
    </div>
  );
};

export default Contact;