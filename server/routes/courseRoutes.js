const express = require("express");
const router = express.Router();


const {
  createCourse,
  addModule,
  addLesson,
  publishCourse,
  getTeacherCourses,
  updateCourse,
} = require("../controllers/courseController");

const authMiddleware = require("../middleware/authMiddleware");

// Create course
router.post("/", authMiddleware, createCourse);

// Add module
router.put("/:courseId/add-module", authMiddleware, addModule);

// Add lesson
router.put(
  "/:courseId/:moduleId/add-lesson",
  authMiddleware,
  addLesson
);

// Publish
router.put("/:courseId/publish", authMiddleware, publishCourse);

// Get teacher courses
router.get("/my-courses", authMiddleware, getTeacherCourses);

module.exports = router;
//edit
router.put(
  "/:courseId",
  authMiddleware,
  updateCourse
);

// const authMiddleware = require("../middleware/authMiddleware");

// Create course
router.post("/", authMiddleware, createCourse);

// Add module
router.put("/:courseId/add-module", authMiddleware, addModule);

// Add lesson
router.put(
  "/:courseId/:moduleId/add-lesson",
  authMiddleware,
  addLesson
);

// Publish
router.put("/:courseId/publish", authMiddleware, publishCourse);

// Get teacher courses
router.get("/my-courses", authMiddleware, getTeacherCourses);

module.exports = router;
//edit
router.put(
  "/:courseId",
  authMiddleware,
  updateCourse
);
