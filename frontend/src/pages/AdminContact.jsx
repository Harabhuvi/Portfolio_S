import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import axios from 'axios';
import { 
  ArrowLeft, 
  MessageSquare, 
  Trash2, 
  Mail, 
  User, 
  Clock, 
  Loader2,
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

export const AdminContact = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/contact`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/contact/${id}`);
      toast.success("Message deleted.");
      setMessages(messages.filter(msg => msg._id !== id));
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message.");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070b14] text-slate-200">
      <Toaster position="top-center" richColors />
      <div className="orb orb-1 opacity-30" />
      <div className="orb orb-2 bg-blue-500/10 opacity-20" />
      <Navbar />

      <main className="relative z-10 pt-24 pb-20 px-6 max-w-5xl mx-auto">
        {/* Breadcrumbs */}
        <div className="mb-12">
          <Link to="/admin" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors duration-300">
            <ArrowLeft size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Back to Hub</span>
          </Link>
          <div className="mt-8 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare size={24} className="text-blue-500" />
                <h1 className="text-4xl font-black text-white font-grotesk" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                  Message <span className="grad-text">Inbox</span>
                </h1>
              </div>
              <p className="text-slate-500">Review and manage contact submissions.</p>
            </div>
            <div className="text-right">
              <span className="text-4xl font-black text-white font-grotesk">{messages.length}</span>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Total Messages</p>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={48} className="animate-spin text-blue-500" />
          </div>
        ) : messages.length === 0 ? (
          <div className="glass border border-white/5 rounded-[2.5rem] p-12 text-center text-slate-500">
            <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">No messages received yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {messages.map((msg) => (
              <div key={msg._id} className="glass border border-white/5 rounded-[2rem] p-8 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
                <div className="absolute top-0 right-0 p-6 flex gap-4">
                  <button 
                    onClick={() => handleDelete(msg._id)}
                    className="text-slate-600 hover:text-red-500 transition-colors"
                    title="Delete Message"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 space-y-4">
                    <div className="flex items-center gap-3 text-white">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                        <User size={18} className="text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-bold">{msg.Name}</h3>
                        <p className="text-xs text-slate-500">Sender</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-slate-400">
                      <Mail size={16} className="text-slate-500" />
                      <a href={`mailto:${msg.Email}`} className="text-sm hover:text-blue-400 transition-colors">{msg.Email}</a>
                    </div>
                    
                    <div className="flex items-center gap-3 text-slate-400">
                      <Clock size={16} className="text-slate-500" />
                      <span className="text-xs">
                        {new Date(msg.createdAt).toLocaleDateString()} {new Date(msg.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 md:border-l border-white/10 md:pl-6 pt-4 md:pt-0">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-2">Message Content</h4>
                    <p className="text-slate-300 whitespace-pre-wrap leading-relaxed text-sm bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                      {msg.Comments}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="relative z-10 border-t border-white/5 py-12 text-center">
        <p className="text-slate-700 text-[10px] uppercase font-black tracking-[0.5em]">SYSTEM STATUS: READY</p>
      </footer>
    </div>
  );
};

export default AdminContact;
