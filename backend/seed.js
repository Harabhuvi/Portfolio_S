require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Blog = require('./models/Blog');
const Profile = require('./models/Profile');

const MONGODB_URI = process.env.MONGODB_URI;

const profileData = {
  name: 'BHUVANESHWARAN S',
  tagline: 'Available for jobs',
  headline: 'BHUVANESHWARAN S',
  subHeadline: 'Software Engineer',
  description: "I'm a Software Engineer at Aviatricks Aerolab Private Limited. I specialize in building scalable web and mobile applications with a focus on Drone Technology and Cloud infrastructure.",
  location: 'Coimbatore, India',
  email: 'bhuvibhuvanesh101@gmail.com',
  phone: '+91 6382475358',
  profilePhoto: '/bhuvi_official.jpg',
  resumeLink: 'https://linkedin.com/in/bhuvaneshwaran-s',
  skills: [
    {
      title: 'FRONT – END',
      skills: [
        { name: 'HTML', pct: 95, color: 'from-orange-400 to-red-500' },
        { name: 'CSS', pct: 90, color: 'from-blue-400 to-indigo-500' },
        { name: 'REACT JS', pct: 90, color: 'from-cyan-400 to-blue-600' },
        { name: 'FLUTTER', pct: 85, color: 'from-blue-500 to-cyan-500' },
        { name: 'QT', pct: 80, color: 'from-green-400 to-emerald-500' }
      ]
    },
    {
      title: 'BACK – END',
      skills: [
        { name: 'JAVA', pct: 90, color: 'from-red-500 to-orange-600' },
        { name: 'PYTHON', pct: 85, color: 'from-blue-600 to-indigo-700' },
        { name: 'GRAPHQL', pct: 75, color: 'from-pink-500 to-purple-600' },
        { name: 'NODE JS', pct: 85, color: 'from-green-500 to-emerald-600' },
        { name: 'EXPRESS JS', pct: 85, color: 'from-gray-500 to-slate-600' }
      ]
    },
    {
      title: 'DATABASE',
      skills: [
        { name: 'MONGODB', pct: 90, color: 'from-green-500 to-emerald-600' },
        { name: 'MYSQL', pct: 85, color: 'from-blue-500 to-cyan-600' },
        { name: 'DBMS', pct: 80, color: 'from-orange-500 to-yellow-600' }
      ]
    },
    {
      title: 'Authentication & Security',
      skills: [
        { name: 'JWT', pct: 90, color: 'from-purple-500 to-indigo-600' },
        { name: 'Firebase Auth', pct: 90, color: 'from-yellow-400 to-orange-500' },
        { name: 'Session Management', pct: 85, color: 'from-blue-400 to-blue-600' }
      ]
    },
    {
      title: 'Tools & DevOps',
      skills: [
        { name: 'Git', pct: 95, color: 'from-gray-600 to-black' },
        { name: 'GitHub', pct: 95, color: 'from-gray-800 to-gray-900' },
        { name: 'Docker', pct: 75, color: 'from-blue-600 to-blue-800' },
        { name: 'RESTful APIs', pct: 90, color: 'from-emerald-500 to-teal-600' },
        { name: 'Postman', pct: 85, color: 'from-orange-500 to-red-600' },
        { name: 'AWS / Vercel / Render / GCloud', pct: 80, color: 'from-blue-400 to-indigo-500' }
      ]
    }
  ],
  education: [
    {
      institution: 'Sri Shakthi Institute of Engineering and Technology',
      location: 'Coimbatore',
      degree: 'BTECH IT (Anna University)',
      duration: '2022 — 2026',
      score: '7* CGPA'
    },
    {
      institution: 'Adharsh vidhyalaya Matric Hr Sec School',
      location: 'Erode',
      degree: 'Higher Secondary Certificate (State Board)',
      duration: '2021 — 2022',
      score: '76%'
    },
    {
      institution: 'Literacy Matric Hr Sec School',
      location: 'Erode',
      degree: 'Secondary School Leaving Certificate (State Board)',
      duration: '2020 — 2021',
      score: '74%'
    }
  ],
  certifications: [
    'Aviatricks Pvt Lmt - Full Stack Developer',
    'Full Stack Development - NoviTech',
    'Web Development - CodSoft',
    'C, C++, PYTHON - CSC',
    'STEP (QA 360) - CDW'
  ],
  patents: [
    {
      title: 'AI-ENHANCED FINANCIAL BEHAVIOUR ADVISOR',
      docket: '86040 (Filed June 20, 2024)',
      status: 'Issued June 27, 2024'
    },
    {
      title: 'THE FLUENT SPEAKER’S GUIDE',
      docket: '141169 (Filed Nov 25, 2024)',
      status: 'Issued Nov 27, 2024'
    }
  ],
  achievements: [
    'JUDO (2016) — 61st National Games (SGFI) Under 14 Junior Browns Medalistist',
    'JUDO (2017-18-19-20) — State Level Gold Medalist'
  ]
};

const projectsData = [
  {
    Title: "FlyHub & FlyTutor",
    Description: "Drone Marketplace & Training Management. Developed FlyHub for buying/selling drones and parts, and FlyTutor for managing training activities, student enrollment, and flight logs. Technology used: React JS, CSS, GraphQL, Flutter, MongoDB, Firebase auth, GCloud.",
    CoverLink: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800",
    GitLink: "https://github.com/Harabhuvi",
    Previewlink: "https://flytutor.in",
    Category: "aviatricks"
  },
  {
    Title: "Aviation Platforms",
    Description: "Flytutor.in, Airspacemap.in, Aviatricks.in. Developed aviation-related web platforms including drone training institution website, drone flight zone visualization, and aviation production showcase. Technology used: React JS, Node JS, Express JS, MongoDB.",
    CoverLink: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=800",
    GitLink: "https://github.com/Harabhuvi",
    Previewlink: "https://airspacemap.in",
    Category: "aviatricks"
  },
  {
    Title: "Drone Commander - GCS",
    Description: "Ground Control Station (GCS) for drone operations using Qt Creator with MAVLink-based communication. Built backend services with Node.js/Express for session monitoring. Technology used: Qt Creator (Qt/QML), MAVLink, Node.js, Express.js.",
    CoverLink: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80&w=800",
    GitLink: "https://github.com/Harabhuvi",
    Previewlink: "",
    Category: "aviatricks"
  },
  {
    Title: "Textile Management System",
    Description: "Implemented a web-based system to reduce commission rates between traders, making trading more cost-effective. Technology used: React JS, Node JS, GraphQL, MongoDB.",
    CoverLink: "https://images.unsplash.com/photo-1558588942-930faae5a389?auto=format&fit=crop&q=80&w=800",
    GitLink: "https://github.com/Harabhuvi",
    Previewlink: "",
    Category: "Own idea"
  },
  {
    Title: "DSizer",
    Description: "A cutting-edge platform designed to revolutionize body measurement and size estimation through computer vision and real-time gesture analysis. Featuring a high-performance Flutter app and a robust React/FastAPI admin panel.",
    CoverLink: "/src/assets/img/dsizer_admin.png",
    GitLink: "https://github.com/Harabhuvi",
    Previewlink: "/projects/dsizer",
    Category: "Own idea"
  },
  {
    Title: "Busify-Ticket Booking System",
    Description: "A comprehensive bus ticket booking application developed for college project requirements. Streamlines the booking process for commuters. Technology used: Flutter, Firebase.",
    CoverLink: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800",
    GitLink: "https://github.com/Harabhuvi",
    Previewlink: "",
    Category: "College"
  },
  {
    Title: "fluents-speakers-guide",
    Description: "An AI-enhanced guide for speakers to improve their fluency and communication skills. Developed as a college project and also registered as a patent. Technology used: React, Python, Gemini API.",
    CoverLink: "https://images.unsplash.com/photo-1475721027785-f74dea327912?auto=format&fit=crop&q=80&w=800",
    GitLink: "https://github.com/Harabhuvi",
    Previewlink: "",
    Category: "College"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing projects
    await Project.deleteMany({});
    console.log('Cleared existing projects.');

    // Insert new projects
    await Project.insertMany(projectsData);
    console.log('Inserted projects successfully!');

    // Synchronize Profile Data
    await Profile.deleteMany({});
    const profile = new Profile(profileData);
    await profile.save();
    console.log('Profile data synchronized successfully!');

    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedDB();
