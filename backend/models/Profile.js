const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'BHUVANESHWARAN S' },
  tagline: { type: String, default: 'Available for jobs' },
  headline: { type: String, default: 'BHUVANESHWARAN S' },
  subHeadline: { type: String, default: 'Software Engineer' },
  description: { type: String, default: "I'm a Software Engineer at Aviatricks Aerolab Private Limited. I specialize in building scalable web and mobile applications with a focus on Drone Technology and Cloud infrastructure." },
  location: { type: String, default: 'Coimbatore, India' },
  email: { type: String, default: 'bhuvibhuvanesh101@gmail.com' },
  phone: { type: String, default: '+91 6382475358' },
  profilePhoto: { type: String, default: '/bhuvi_official.jpg' },
  resumeLink: { type: String, default: '#' },
  skills: [
    {
      title: String,
      skills: [{ name: String, pct: Number, color: String }]
    }
  ],
  education: [
    {
      institution: String,
      location: String,
      degree: String,
      duration: String,
      score: String
    }
  ],
  certifications: [String],
  patents: [
    {
      title: String,
      docket: String,
      status: String
    }
  ],
  achievements: [String]
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
