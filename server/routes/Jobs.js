const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
const upload = multer({ dest: 'uploads/' });

// POST /api/jobs
router.post("/", upload.single('image'), async (req, res) => {
  try {
    const { title, description, budgetRange, location } = req.body;
    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'job_images',
        overwrite: true
      });
      imageUrl = result.secure_url;
    }

    if (!title || !description || !budgetRange || !location) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newJob = new Job({ title, description, budgetRange, location, image: imageUrl });
    await newJob.save();

    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while posting job" });
  }
});

module.exports = router;
