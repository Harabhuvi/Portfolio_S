const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  CoverLink: { type: String, required: true },
  GitLink: { type: String, required: true },
  Previewlink: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
