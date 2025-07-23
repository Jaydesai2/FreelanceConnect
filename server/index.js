require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
const atlastUrl = process.env.MONGO_URI;
mongoose.connect(atlastUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB connected");
  console.log("📦 Connected to DB:", mongoose.connection.name);
})
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/Jobs"); // ✅ ADD THIS LINE

app.use("/api", authRoutes);
app.use("/api/jobs", jobRoutes); // ✅ ADD THIS LINE

// ✅ Serve frontend static files
const clientDistPath = path.join(__dirname, "..", "client", "dist");
app.use(express.static(clientDistPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
