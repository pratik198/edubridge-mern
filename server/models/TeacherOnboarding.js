const mongoose = require("mongoose");

const teacherOnboardingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    country: String,
    profession: String,
    experience: String,
    expertise: String,

    defaultLanguage: String,
    courseFormat: String,
    audience: String
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "TeacherOnboarding",
  teacherOnboardingSchema
);
