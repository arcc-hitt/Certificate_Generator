const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  name: String,
  course: String,
  date: Date,
  email: String,
  certificateLink: String
});

module.exports = mongoose.model('Certificate', certificateSchema);