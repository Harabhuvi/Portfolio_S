const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true },
  Comments: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
