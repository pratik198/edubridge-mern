const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");

const studentOnboardingRoutes = require("./routes/studentOnboardingRoutes");
const teacherOnboardingRoutes = require("./routes/teacherOnboardingRoutes");

const app = express();

// --- middleware ---
app.use(cors());
app.use(express.json());

// --- routes ---
app.use("/api/auth", authRoutes);

app.use("/api/student-onboarding", studentOnboardingRoutes);
app.use("/api/teacher-onboarding", teacherOnboardingRoutes);

// --- db connection ---
const mongoUri = process.env.MONGODB_URI;
mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// ---server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
