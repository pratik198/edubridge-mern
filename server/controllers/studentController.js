// controllers/studentController.js
const Course = require("../models/Course");

// exports.getAllPublishedCourses = async (req, res) => {
//   try {
//     const courses = await Course.find({ isPublished: true })
//       .select("title shortDescription thumbnail category level duration");

//     res.status(200).json({
//       success: true,
//       courses,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

exports.getAllPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true });

    const formattedCourses = courses.map((course) => ({
      _id: course._id,
      title: course.title,
      shortDescription: course.shortDescription,
      thumbnail: course.thumbnail,
      category: course.category,
      level: course.level,
      duration: course.duration,

      modules: course.modules.map((module) => ({
        _id: module._id,
        title: module.title,
        progress: 0,
        lessons: [
          // 🎥 VIDEO LESSONS
          ...module.lessons.map((lesson) => ({
            _id: lesson._id,
            type: "video",
            title: lesson.title,
            duration: lesson.duration,
            videoUrl: lesson.videoUrl, // ✅ THIS WAS MISSING
            completed: false,
          })),

          // 📝 QUIZZES
          ...module.quizzes.map((quiz) => ({
            _id: quiz._id,
            type: "quiz",
            title: quiz.title,
            duration: 0,
            completed: false,
          })),
        ],
      })),
    }));

    res.status(200).json({
      success: true,
      courses: formattedCourses,
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
