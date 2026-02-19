
const Course = require("../models/Course");



/* ======================================================
   1️⃣ GET ALL PUBLISHED COURSES (WITH USER PROGRESS)
====================================================== */
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

      modules: course.modules.map((module) => {
        const totalLessons = module.lessons.length;

        const completedLessons = module.lessons.filter((lesson) =>
          lesson.completedBy.some(
            (userId) => userId.toString() === req.user?.id
          )
        ).length;

        const progress =
          totalLessons === 0
            ? 0
            : Math.floor((completedLessons / totalLessons) * 100);

        return {
          _id: module._id,
          title: module.title,
          progress,

          lessons: [
            // 🎥 VIDEO LESSONS
            ...module.lessons.map((lesson) => ({
              _id: lesson._id,
              type: "video",
              title: lesson.title,
              duration: lesson.duration,
              videoUrl: lesson.videoUrl,
              completed: lesson.completedBy.some(
                (userId) => userId.toString() === req.user?.id
              ),
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
        };
      }),
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



/* ======================================================
   2️⃣ GET SINGLE PUBLISHED COURSE
====================================================== */
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



/* ======================================================
   3️⃣ UPDATE LESSON PROGRESS (LIVE TRACKING SUPPORT)
====================================================== */
// exports.updateLessonProgress = async (req, res) => {
//   try {
//     const { courseId, moduleId, lessonId } = req.params;
//     const { progress } = req.body; // percentage from frontend

//     const course = await Course.findOne({
//       _id: courseId,
//       enrolledStudents: req.user.id,
//     });

//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: "Course not found or not enrolled",
//       });
//     }

//     const module = course.modules.id(moduleId);
//     if (!module) {
//       return res.status(404).json({
//         success: false,
//         message: "Module not found",
//       });
//     }

//     const lesson = module.lessons.id(lessonId);
//     if (!lesson) {
//       return res.status(404).json({
//         success: false,
//         message: "Lesson not found",
//       });
//     }

//     // ✅ If watched 90%+ → mark completed
//     if (progress >= 90) {
//       const alreadyCompleted = lesson.completedBy.some(
//         (userId) => userId.toString() === req.user.id
//       );

//       if (!alreadyCompleted) {
//         lesson.completedBy.push(req.user.id);
//       }
//     }

//     await course.save();

//     res.status(200).json({
//       success: true,
//       message: "Progress updated successfully",
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };



// exports.updateLessonProgress = async (req, res) => {
//   try {
//     const { courseId, moduleId, lessonId } = req.params;
//     const { progress } = req.body;

//     const course = await Course.findOne({
//       _id: courseId,
//       enrolledStudents: req.user.id,
//     });

//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: "Course not found or not enrolled",
//       });
//     }

//     const module = course.modules.id(moduleId);
//     if (!module) {
//       return res.status(404).json({
//         success: false,
//         message: "Module not found",
//       });
//     }

//     const lesson = module.lessons.id(lessonId);
//     if (!lesson) {
//       return res.status(404).json({
//         success: false,
//         message: "Lesson not found",
//       });
//     }

//     let isCompletedNow = false;

//     // ✅ Mark complete if 90%+
//     if (progress >= 90) {
//       const alreadyCompleted = lesson.completedBy.some(
//         (userId) => userId.toString() === req.user.id
//       );

//       if (!alreadyCompleted) {
//         lesson.completedBy.push(req.user.id);
//         isCompletedNow = true;
//       }
//     }

//     await course.save();

//     return res.status(200).json({
//       success: true,
//       progress,                  // 🔥 return percent
//       completed: progress >= 90, // 🔥 return completion status
//       message: "Progress updated successfully",
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


exports.updateLessonProgress = async (req, res) => {
  try {
    const { courseId, moduleId, lessonId } = req.params;
    const { progress } = req.body;

    const course = await Course.findOne({
      _id: courseId,
      enrolledStudents: req.user.id,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found or not enrolled",
      });
    }

    const module = course.modules.id(moduleId);
    if (!module) {
      return res.status(404).json({
        success: false,
        message: "Module not found",
      });
    }

    const lesson = module.lessons.id(lessonId);
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }

    let completed = false;

    // ✅ mark completed if 90%+
    if (progress >= 90) {
      const alreadyCompleted = lesson.completedBy.some(
        (userId) => userId.toString() === req.user.id
      );

      if (!alreadyCompleted) {
        lesson.completedBy.push(req.user.id);
      }

      completed = true;
    }

    await course.save();

    return res.status(200).json({
      success: true,

      // 🔥 RETURN IDENTIFIERS
      courseId,
      moduleId,
      lessonId,

      // 🔥 RETURN STATE
      progress,
      completed,

      message: "Progress updated successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
