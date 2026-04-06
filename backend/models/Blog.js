const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Body: { type: String, required: true },
  Blog: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
