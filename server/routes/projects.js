// server/routes/projects.js

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// If you haven't created a model, create this inline or import it from models/
const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});
const Project = mongoose.model("Project", ProjectSchema);

// GET all jobs
router.get("/", async (req, res) => {
  const jobs = await Project.find().sort({ createdAt: -1 });
  res.json(jobs);
});

// POST a new job
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  const newJob = new Project({ title, description });
  await newJob.save();
  res.status(201).json(newJob);
});

module.exports = router;
