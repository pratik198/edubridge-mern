
const express = require("express");
const router = express.Router();

const {
  createCourse,
  addModule,
  addLesson,
  publishCourse,
  getTeacherCourses,
  updateCourse,
  addQuiz,
  deleteCourse,
  getSingleCourse,
  deleteQuiz,
} = require("../controllers/courseController");

const authMiddleware = require("../middleware/authMiddleware");

// Create course
router.post("/", authMiddleware, createCourse);

// Add module
router.put("/:courseId/add-module", authMiddleware, addModule);

// Add lesson
router.put("/:courseId/:moduleId/add-lesson", authMiddleware, addLesson);

// Publish course
router.put("/:courseId/publish", authMiddleware, publishCourse);

// Get teacher courses
router.get("/my-courses", authMiddleware, getTeacherCourses);

// Update course
router.put("/:courseId", authMiddleware, updateCourse);

router.put(
  "/:courseId/:moduleId/add-quiz",
  authMiddleware,
  addQuiz
);

router.delete("/:courseId", authMiddleware, deleteCourse);

router.get("/:courseId", authMiddleware, getSingleCourse);   // single course details

router.delete(
  "/:courseId/:moduleId/:quizId/delete-quiz",
  authMiddleware,
  deleteQuiz
);

module.exports = router;
