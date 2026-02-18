// controllers/studentController.js
const Course = require("../models/Course");

exports.getAllPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .select("title shortDescription thumbnail category level duration");

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getSinglePublishedCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findOne({
      _id: courseId,
      isPublished: true,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
