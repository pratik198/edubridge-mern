
const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  duration: String,
  videoUrl: String,
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: {
    type: Array,
    default: [],
  },
});

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  lessons: {
    type: [lessonSchema],
    default: [],
  },
  quizzes: {
    type: [quizSchema],   // 🔥 THIS WAS MISSING
    default: [],
  },
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
      ref: "User",
      required: true,
    },
    modules: {
      type: [moduleSchema],
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
