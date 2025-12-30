const mongoose = require("mongoose");

const onboardingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one onboarding per user
    },

    // COMMON FIELDS
    country: String,
    profession: String,
    experience: String,
    expertise: String,

    // TEACHING PREFS (optional for teachers)
    defaultLanguage: String,
    courseFormat: String,
    audience: String,

    role: {
      type: String,
      enum: ["student", "educator"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Onboarding", onboardingSchema);
