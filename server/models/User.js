const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  bio: String,
  phone: String,
  location: String,
  skills: [String],
  dob: Date,
  gender: String,
  linkedin: String,
  github: String,
  website: String,
  address: String,
  avatar: String,
  education: String,
  experience: String,
  languages: [String],
  interests: [String],
  role: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
