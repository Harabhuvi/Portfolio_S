import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import axios from 'axios';
import { 
  ArrowLeft, 
  Save, 
  User, 
  Image as ImageIcon, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Type,
  Loader2,
  Globe,
  Plus, 
  Trash2,
  List,
  GraduationCap,
  Award,
  BookOpen,
  Trophy
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

export const AdminProfile = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    tagline: '',
    headline: '',
    subHeadline: '',
    description: '',
    location: '',
    email: '',
    phone: '',
    profilePhoto: '',
    resumeLink: '',
    skills: [],
    education: [],
    certifications: [],
    patents: [],
    achievements: []
  });

  const url = `${import.meta.env.VITE_API_BASE_URL}/profile`;

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(url);
      setProfile(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
      toast.error("Failed to load profile data.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  // ── Array Management Helpers ────────────────────────────────────────────────
  
  const addItem = (field, defaultValue) => {
    setProfile(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), defaultValue]
    }));
  };

  const removeItem = (field, index) => {
    setProfile(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateItem = (field, index, value) => {
    setProfile(prev => {
      const newList = [...prev[field]];
      newList[index] = value;
      return { ...prev, [field]: newList };
    });
  };

  const updateNestedItem = (field, index, subField, value) => {
    setProfile(prev => {
      const newList = [...(prev[field] || [])];
      newList[index] = { ...newList[index], [subField]: value };
      return { ...prev, [field]: newList };
    });
  };

  // Specific helpers for Skills
  const addSkillGroup = () => {
    addItem('skills', { title: '', skills: [] });
  };

  const addSkillToGroup = (groupIndex) => {
    setProfile(prev => {
      const newSkills = [...prev.skills];
      newSkills[groupIndex].skills = [...(newSkills[groupIndex].skills || []), { name: '', pct: 0, color: 'from-blue-400 to-indigo-500' }];
      return { ...prev, skills: newSkills };
    });
  };

  const updateSkillInGroup = (groupIndex, skillIndex, subField, value) => {
    setProfile(prev => {
      const newSkills = [...prev.skills];
      newSkills[groupIndex].skills[skillIndex] = { 
        ...newSkills[groupIndex].skills[skillIndex], 
        [subField]: value 
      };
      return { ...prev, skills: newSkills };
    });
  };

  const removeSkillFromGroup = (groupIndex, skillIndex) => {
    setProfile(prev => {
      const newSkills = [...prev.skills];
      newSkills[groupIndex].skills = newSkills[groupIndex].skills.filter((_, i) => i !== skillIndex);
      return { ...prev, skills: newSkills };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(url, profile);
      if (response.status === 200) {
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile.");
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
          <Link to="/admin" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors duration-300">
            <ArrowLeft size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Back to Hub</span>
          </Link>
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-2">
              <User size={24} className="text-blue-500" />
              <h1 className="text-4xl font-black text-white font-grotesk" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                Profile <span className="grad-text">Settings</span>
              </h1>
            </div>
            <p className="text-slate-500">Manage your site-wide personal details and imagery.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass border border-white/5 rounded-[2.5rem] p-8 lg:p-12 space-y-10 shadow-2xl relative overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 ml-1">Full Identity</label>
              <div className="relative group">
                <Type size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400 transition-colors" />
                <input 
                  required 
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="field pl-12 bg-white/[0.02]" 
                  type="text" 
                  placeholder="Your Full Name"
                />
              </div>
            </div>

            {/* Tagline */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 ml-1">Hero Tagline</label>
              <div className="relative group">
                <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400 transition-colors" />
                <input 
                  name="tagline"
                  value={profile.tagline}
                  onChange={handleChange}
                  className="field pl-12 bg-white/[0.02]" 
                  type="text" 
                  placeholder="e.g. Available for Hire"
                />
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 ml-1">Hero Headline</label>
              <div className="relative group">
                <Type size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400 transition-colors" />
                <input 
                  name="headline"
                  value={profile.headline}
                  onChange={handleChange}
                  className="field pl-12 bg-white/[0.02]" 
                  type="text" 
                />
              </div>
            </div>

            {/* Sub-headline */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 ml-1">Sub-Headline</label>
              <div className="relative group">
                <Type size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400 transition-colors" />
                <input 
                  name="subHeadline"
                  value={profile.subHeadline}
                  onChange={handleChange}
                  className="field pl-12 bg-white/[0.02]" 
                  type="text" 
                />
              </div>
            </div>

            {/* Profile Photo */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 ml-1">Profile Image URL</label>
              <div className="relative group">
                <ImageIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400 transition-colors" />
                <input 
                  name="profilePhoto"
                  value={profile.profilePhoto}
                  onChange={handleChange}
                  className="field pl-12 bg-white/[0.02]" 
                  type="text" 
                  placeholder="Direct image link or local path"
                />
              </div>
            </div>

            {/* description */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 ml-1">Bio/About Me</label>
              <div className="relative group">
                <FileText size={18} className="absolute left-4 top-4 text-slate-600 group-focus-within:text-blue-400" />
                <textarea 
                  name="description"
                  value={profile.description}
                  onChange={handleChange}
                  rows="4"
                  className="field pl-12 py-4 bg-white/[0.02] min-h-[120px]" 
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 ml-1">Public Email</label>
              <div className="relative group">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400" />
                <input 
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="field pl-12 bg-white/[0.02]" 
                  type="email" 
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 ml-1">Public Phone</label>
              <div className="relative group">
                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400" />
                <input 
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="field pl-12 bg-white/[0.02]" 
                  type="text" 
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 ml-1">Location</label>
              <div className="relative group">
                <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400" />
                <input 
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  className="field pl-12 bg-white/[0.02]" 
                  type="text" 
                />
              </div>
            </div>

            {/* Resume */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 ml-1">Resume Link</label>
              <div className="relative group">
                <FileText size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400" />
                <input 
                  name="resumeLink"
                  value={profile.resumeLink}
                  onChange={handleChange}
                  className="field pl-12 bg-white/[0.02]" 
                  type="text" 
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-glow w-full flex items-center justify-center gap-2 py-5 text-lg disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={24} className="animate-spin" />
                <span>Optimizing Settings...</span>
              </>
            ) : (
              <>
                <Save size={24} />
                <span>Synchronize Changes</span>
              </>
            )}
          </button>
        </form>

        {/* ── Additional Sections ────────────────────────────────────────────────── */}
        <div className="mt-12 space-y-12 pb-24">
          
          {/* Skills Section */}
          <Section 
            icon={<List className="text-orange-500" />} 
            title="Professional Skills" 
            description="Organize your expertise into categories."
            onAdd={addSkillGroup}
          >
            {(profile.skills || []).map((group, gIdx) => (
              <div key={gIdx} className="glass border border-white/5 p-6 rounded-3xl space-y-6 bg-white/[0.01]">
                <div className="flex items-center gap-4">
                  <input 
                    className="field bg-white/[0.05] font-bold text-orange-400"
                    placeholder="Group Title (e.g. Front-End)"
                    value={group.title}
                    onChange={(e) => updateNestedItem('skills', gIdx, 'title', e.target.value)}
                  />
                  <button onClick={() => removeItem('skills', gIdx)} className="p-2 hover:bg-red-500/10 text-red-500 rounded-xl transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
                
                <div className="pl-6 space-y-4 border-l-2 border-white/5">
                  {(group.skills || []).map((skill, sIdx) => (
                    <div key={sIdx} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <input 
                        className="field md:col-span-2 text-sm bg-white/[0.02]"
                        placeholder="Skill Name"
                        value={skill.name}
                        onChange={(e) => updateSkillInGroup(gIdx, sIdx, 'name', e.target.value)}
                      />
                      <input 
                        type="number"
                        className="field text-sm bg-white/[0.02]"
                        placeholder="%"
                        value={skill.pct}
                        onChange={(e) => updateSkillInGroup(gIdx, sIdx, 'pct', parseInt(e.target.value))}
                      />
                      <div className="flex items-center gap-2">
                        <input 
                          className="field text-xs bg-white/[0.02] flex-1"
                          placeholder="Color Class"
                          value={skill.color}
                          onChange={(e) => updateSkillInGroup(gIdx, sIdx, 'color', e.target.value)}
                        />
                        <button onClick={() => removeSkillFromGroup(gIdx, sIdx)} className="text-red-500/50 hover:text-red-500">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={() => addSkillToGroup(gIdx)}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-orange-500 transition-colors"
                  >
                    <Plus size={14} /> Add Skill
                  </button>
                </div>
              </div>
            ))}
          </Section>

          {/* Education Section */}
          <Section 
            icon={<GraduationCap className="text-blue-500" />} 
            title="Academic Background" 
            description="Your degrees and institutions."
            onAdd={() => addItem('education', { institution: '', location: '', degree: '', duration: '', score: '' })}
          >
            {(profile.education || []).map((edu, idx) => (
              <div key={idx} className="glass border border-white/5 p-6 rounded-3xl grid grid-cols-2 gap-4">
                <input className="field col-span-2 font-bold" placeholder="Institution" value={edu.institution} onChange={(e) => updateNestedItem('education', idx, 'institution', e.target.value)} />
                <input className="field text-sm" placeholder="Degree" value={edu.degree} onChange={(e) => updateNestedItem('education', idx, 'degree', e.target.value)} />
                <input className="field text-sm" placeholder="Duration" value={edu.duration} onChange={(e) => updateNestedItem('education', idx, 'duration', e.target.value)} />
                <input className="field text-sm" placeholder="Location" value={edu.location} onChange={(e) => updateNestedItem('education', idx, 'location', e.target.value)} />
                <input className="field text-sm" placeholder="Score" value={edu.score} onChange={(e) => updateNestedItem('education', idx, 'score', e.target.value)} />
                <button onClick={() => removeItem('education', idx)} className="col-span-2 py-2 flex items-center justify-center gap-2 text-xs font-bold text-red-500 hover:bg-red-500/5 rounded-xl transition-colors">
                  <Trash2 size={14} /> Remove Institution
                </button>
              </div>
            ))}
          </Section>

          {/* Certifications Section */}
          <Section 
            icon={<Award className="text-purple-500" />} 
            title="Certifications" 
            description="Professional certificates and licenses."
            onAdd={() => addItem('certifications', '')}
          >
            <div className="grid gap-3">
              {(profile.certifications || []).map((cert, idx) => (
                <div key={idx} className="flex gap-2">
                  <input className="field flex-1" placeholder="Certificate Name" value={cert} onChange={(e) => updateItem('certifications', idx, e.target.value)} />
                  <button onClick={() => removeItem('certifications', idx)} className="p-4 bg-white/5 hover:bg-red-500/10 text-red-500 rounded-2xl transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </Section>

          {/* Patents Section */}
          <Section 
            icon={<BookOpen className="text-green-500" />} 
            title="Patents & Publications" 
            description="Intellectual property and research."
            onAdd={() => addItem('patents', { title: '', docket: '', status: '' })}
          >
            {(profile.patents || []).map((patent, idx) => (
              <div key={idx} className="glass border border-white/5 p-6 rounded-3xl space-y-4">
                <input className="field font-bold" placeholder="Title" value={patent.title} onChange={(e) => updateNestedItem('patents', idx, 'title', e.target.value)} />
                <div className="grid grid-cols-2 gap-4">
                  <input className="field text-sm" placeholder="Docket Number" value={patent.docket} onChange={(e) => updateNestedItem('patents', idx, 'docket', e.target.value)} />
                  <input className="field text-sm" placeholder="Status (e.g. Issued)" value={patent.status} onChange={(e) => updateNestedItem('patents', idx, 'status', e.target.value)} />
                </div>
                <button onClick={() => removeItem('patents', idx)} className="w-full py-2 flex items-center justify-center gap-2 text-xs font-bold text-red-500 hover:bg-red-500/5 rounded-xl transition-colors">
                  <Trash2 size={14} /> Remove Entry
                </button>
              </div>
            ))}
          </Section>

          {/* Achievements Section */}
          <Section 
            icon={<Trophy className="text-yellow-500" />} 
            title="Key Achievements" 
            description="Your honors, medals, and recognitions."
            onAdd={() => addItem('achievements', '')}
          >
            <div className="grid gap-3">
              {(profile.achievements || []).map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <input className="field flex-1" placeholder="Achievement Detail" value={item} onChange={(e) => updateItem('achievements', idx, e.target.value)} />
                  <button onClick={() => removeItem('achievements', idx)} className="p-4 bg-white/5 hover:bg-red-500/10 text-red-500 rounded-2xl transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </main>
    </div>
  );
};

const Section = ({ icon, title, description, children, onAdd }) => (
  <div className="space-y-6">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white/5 rounded-2xl">
          {icon}
        </div>
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">{title}</h2>
          <p className="text-slate-500 text-sm">{description}</p>
        </div>
      </div>
      <button 
        type="button"
        onClick={onAdd}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all"
      >
        <Plus size={16} /> <span>Initialize New Entry</span>
      </button>
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      {children}
    </div>
    {children.length === 0 && (
      <div className="p-12 border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-700 bg-white/[0.01]">
        <div className="mb-4 opacity-20">{icon}</div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em]">No records found</p>
      </div>
    )}
  </div>
);

export default AdminProfile;
