const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the CORS library
require("dotenv").config();

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

const app = express();

// Middleware
app.use(express.json());

// CORS CONFIGURATION (The Fix)
app.use(
  cors({
    origin: "*", // Allow ALL domains to access this API
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// Base Route (To check if server is alive)
app.get("/", (req, res) => {
  res.send("API is working!");
});

// Export for Vercel
module.exports = app;

// Local Development Server
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}
