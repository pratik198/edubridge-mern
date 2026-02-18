// routes/studentRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllPublishedCourses,
  getSinglePublishedCourse,
} = require("../controllers/studentController");

router.get("/courses", getAllPublishedCourses);
router.get("/courses/:courseId", getSinglePublishedCourse);

module.exports = router;
