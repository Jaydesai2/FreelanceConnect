const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  budgetRange: String,
  location: String,
  image: String,
  eligibleCourses: [String],
  registrationOpens: Date,
  registrationCloses: Date,
  organisationWebsite: String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Job", jobSchema);
