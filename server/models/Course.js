const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  duration: String,
  videoUrl: String, // YouTube link
});

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  lessons: [lessonSchema],
});

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    shortDescription: String,
    category: String,
    level: String,
    duration: String,
    thumbnail: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth", // or User (use your actual user model name)
      required: true,
    },
    modules: [moduleSchema],
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
