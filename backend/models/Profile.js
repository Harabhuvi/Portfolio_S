const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'BHUVANESHWARAN S' },
  tagline: { type: String, default: 'Available for Internships' },
  headline: { type: String, default: 'BHUVANESHWARAN S' },
  subHeadline: { type: String, default: 'Full Stack Developer' },
  description: { type: String, default: "I'm a passionate Full Stack Developer currently pursuing B.Tech IT at Sri Shakthi Institute. I specialize in building scalable web and mobile applications with a focus on Drone Technology and Cloud infrastructure." },
  location: { type: String, default: 'Coimbatore, India' },
  email: { type: String, default: 'bhuvibhuvanesh101@gmail.com' },
  phone: { type: String, default: '+91 6382475358' },
  profilePhoto: { type: String, default: '/bhuvi_official.jpg' },
  resumeLink: { type: String, default: '#' },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
