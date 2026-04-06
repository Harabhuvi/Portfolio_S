require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Blog = require('./models/Blog');

const MONGODB_URI = process.env.MONGODB_URI;

const projectsData = [
  {
    Title: "FlyHub & FlyTutor",
    Description: "Drone Marketplace & Training Management. Developed FlyHub for buying/selling drones and parts, and FlyTutor for managing training activities, student enrollment, and flight logs. Technology used: React JS, CSS, GraphQL, Flutter, MongoDB, Firebase auth, GCloud.",
    CoverLink: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800",
    GitLink: "https://github.com/Harabhuvi",
    Previewlink: "https://flytutor.in"
  },
  {
    Title: "Aviation Platforms",
    Description: "Flytutor.in, Airspacemap.in, Aviatricks.in. Developed aviation-related web platforms including drone training institution website, drone flight zone visualization, and aviation production showcase. Technology used: React JS, Node JS, Express JS, MongoDB.",
    CoverLink: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=800",
    GitLink: "https://github.com/Harabhuvi",
    Previewlink: "https://airspacemap.in"
  },
  {
    Title: "Drone Commander - GCS",
    Description: "Ground Control Station (GCS) for drone operations using Qt Creator with MAVLink-based communication. Built backend services with Node.js/Express for session monitoring. Technology used: Qt Creator (Qt/QML), MAVLink, Node.js, Express.js.",
    CoverLink: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80&w=800",
    GitLink: "https://github.com/Harabhuvi",
    Previewlink: ""
  },
  {
    Title: "Textile Management System",
    Description: "Implemented a web-based system to reduce commission rates between traders, making trading more cost-effective. Technology used: React JS, Node JS, GraphQL, MongoDB.",
    CoverLink: "https://images.unsplash.com/photo-1558588942-930faae5a389?auto=format&fit=crop&q=80&w=800",
    GitLink: "https://github.com/Harabhuvi",
    Previewlink: ""
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

    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedDB();
