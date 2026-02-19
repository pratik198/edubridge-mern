
// const express = require("express");
// const router = express.Router();

// const {
//   createCourse,
//   addModule,
//   addLesson,
//   publishCourse,
//   getTeacherCourses,
//   updateCourse,
//   addQuiz,
//   deleteCourse,
//   getSingleCourse,
//   deleteQuiz,
//    enrollCourse,              // ✅ NEW
//   getMyEnrolledCourses       // ✅ NEW
  
// } = require("../controllers/courseController");

// const authMiddleware = require("../middleware/authMiddleware");

// // Create course
// router.post("/", authMiddleware, createCourse);

// // Add module
// router.put("/:courseId/add-module", authMiddleware, addModule);

// // Add lesson
// router.put("/:courseId/:moduleId/add-lesson", authMiddleware, addLesson);

// // Publish course
// router.put("/:courseId/publish", authMiddleware, publishCourse);

// // Get teacher courses
// router.get("/my-courses", authMiddleware, getTeacherCourses);

// // Update course
// router.put("/:courseId", authMiddleware, updateCourse);

// router.put(
//   "/:courseId/:moduleId/add-quiz",
//   authMiddleware,
//   addQuiz
// );

// router.delete("/:courseId", authMiddleware, deleteCourse);

// router.get("/:courseId", authMiddleware, getSingleCourse);   // single course details

// router.delete(
//   "/:courseId/:moduleId/:quizId/delete-quiz",
//   authMiddleware,
//   deleteQuiz
// );

// // ============================
// // STUDENT ROUTES
// // ============================

// // Enroll in course
// router.post("/:courseId/enroll", authMiddleware, enrollCourse);

// // Get my enrolled courses
// // router.get("/student/my-courses", authMiddleware, getMyEnrolledCourses);
// router.get(
//   "/my-enrolled-courses",
//   authMiddleware,
//   getMyEnrolledCourses
// );

// module.exports = router;


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
  enrollCourse,
  getMyEnrolledCourses,
  getStudentCourse
} = require("../controllers/courseController");

const authMiddleware = require("../middleware/authMiddleware");

// ============================
// COURSE CREATION & MANAGEMENT
// ============================

// Create course
router.post("/", authMiddleware, createCourse);

// Add module
router.put("/:courseId/add-module", authMiddleware, addModule);

// Add lesson
router.put("/:courseId/:moduleId/add-lesson", authMiddleware, addLesson);

// Add quiz
router.put("/:courseId/:moduleId/add-quiz", authMiddleware, addQuiz);

// Publish course
router.put("/:courseId/publish", authMiddleware, publishCourse);

// Update course
router.put("/:courseId", authMiddleware, updateCourse);

// Delete quiz
router.delete(
  "/:courseId/:moduleId/:quizId/delete-quiz",
  authMiddleware,
  deleteQuiz
);

// Delete course
router.delete("/:courseId", authMiddleware, deleteCourse);

// ============================
// STATIC ROUTES (MUST BE ABOVE :courseId)
// ============================

// Teacher courses
router.get("/my-courses", authMiddleware, getTeacherCourses);

// Student enrolled courses
router.get("/my-enrolled-courses", authMiddleware, getMyEnrolledCourses);

// ============================
// STUDENT ACTIONS
// ============================

// Enroll in course
router.post("/:courseId/enroll", authMiddleware, enrollCourse);
 
// STUDENT COURSE VIEW
router.get(
  "/student/:courseId",
  authMiddleware,
  getStudentCourse
);

// ============================
// DYNAMIC ROUTE (KEEP LAST)
// ============================

// Single course details
router.get("/:courseId", authMiddleware, getSingleCourse);

module.exports = router;
