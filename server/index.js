// ===== Load ENV first =====
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const studentOnboardingRoutes = require("./routes/studentOnboardingRoutes");
const teacherOnboardingRoutes = require("./routes/teacherOnboardingRoutes");
const courseRoutes = require("./routes/courseRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();


// ===== Middleware =====
app.use(cors());
app.use(express.json());


// ===== Routes =====

app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/student-onboarding", studentOnboardingRoutes);
app.use("/api/teacher-onboarding", teacherOnboardingRoutes);
app.use("/api/courses", courseRoutes);

// ===== Health Check Route =====
app.get("/", (req, res) => {
  res.send("Backend API working 🚀");
});


// ===== Database Connection =====
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.log("❌ ERROR: MONGODB_URI missing in .env file");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("====================================");
    console.log("🟢 MongoDB Connected Successfully");
    console.log(`📂 Database: ${mongoose.connection.name}`);
    console.log("====================================");

    // Start server ONLY after DB connected
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log("====================================");
      console.log(`🚀 Server Started Successfully`);
      console.log(`🌐 URL: http://localhost:${PORT}`);
      console.log("====================================");
    });
  })
  .catch((err) => {
    console.log("====================================");
    console.log("🔴 MongoDB Connection Failed");
    console.log("Reason:", err.message);
    console.log("====================================");
    process.exit(1);
  });
