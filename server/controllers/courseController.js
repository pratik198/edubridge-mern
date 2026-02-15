const Course = require("../models/Course");
// ============================
// 1️⃣ Create Course (Step 1)
// ============================

exports.createCourse = async (req, res) => {
  try {
    const {
      title,
      shortDescription,
      category,
      level,
      duration,
      thumbnail,
    } = req.body;

    const course = await Course.create({
      title,
      shortDescription,
      category,
      level,
      duration,
      thumbnail,
      createdBy: req.user.id, // from auth middleware
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ============================
// 2️⃣ Add Module
// ============================
exports.addModule = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { moduleTitle } = req.body;

    // 1️⃣ Find course and ensure teacher owns it
    const course = await Course.findOne({
      _id: courseId,
      createdBy: req.user.id,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found or unauthorized",
      });
    }

    // 2️⃣ Generate default title if empty
    const title =
      moduleTitle && moduleTitle.trim() !== ""
        ? moduleTitle
        : `Module ${course.modules.length + 1}`;

    // 3️⃣ Push new module
    course.modules.push({
      title,
      lessons: [],
      quizzes: [],
    });

    await course.save();

    res.status(200).json({
      success: true,
      message: "Module added successfully",
      modules: course.modules, // return only modules
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};






// Publish Course

exports.publishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findByIdAndUpdate(
      courseId,
      { isPublished: true },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Course published",
      course,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ============================
// 5️⃣ Get Teacher Courses
// ============================
exports.getTeacherCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      createdBy: req.user.id,
    });

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================
// 6️⃣ Update Course (Edit)
// ============================
exports.updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      req.body,
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ============================
// 4️⃣ Add Quiz
// ============================
// ============================
// 4️⃣ Add Quiz (Production Safe)
// ============================
exports.addQuiz = async (req, res) => {
  try {
    const { courseId, moduleId } = req.params;
    const { title, questions } = req.body;

    // 1️⃣ Validate input
    if (!title || !questions) {
      return res.status(400).json({
        success: false,
        message: "Title and questions are required",
      });
    }

    // 2️⃣ Find course (ensure teacher owns it)
    const course = await Course.findOne({
      _id: courseId,
      createdBy: req.user.id,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found or unauthorized",
      });
    }

    // 3️⃣ Find module
    const module = course.modules.id(moduleId);

    if (!module) {
      return res.status(404).json({
        success: false,
        message: "Module not found",
      });
    }

    // 4️⃣ Ensure quizzes array exists (VERY IMPORTANT)
    if (!module.quizzes) {
      module.quizzes = [];
    }

    // 5️⃣ Push quiz
    module.quizzes.push({
      title,
      questions,
    });

    await course.save();

    res.status(200).json({
      success: true,
      message: "Quiz added successfully",
      course,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// DELETE COURSE
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findOneAndDelete({
      _id: courseId,
      createdBy: req.user.id,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSingleCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findOne({
      _id: courseId,
      createdBy: req.user.id,
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
    res.status(500).json({ message: error.message });
  }
};

exports.addLesson = async (req, res) => {
  try {
    const { courseId, moduleId } = req.params;
    const { title, description, duration, videoUrl } = req.body;

    const course = await Course.findOne({
      _id: courseId,
      createdBy: req.user.id,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found or unauthorized",
      });
    }

    const module = course.modules.id(moduleId);

    if (!module) {
      return res.status(404).json({
        success: false,
        message: "Module not found",
      });
    }

    if (!module.lessons) {
      module.lessons = [];
    }

    module.lessons.push({
      title,
      description,
      duration,
      videoUrl,
    });

    await course.save();

    res.status(200).json({
      success: true,
      message: "Lesson added successfully",
      course,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// DELETE QUIZ
// ============================
exports.deleteQuiz = async (req, res) => {
  try {
    const { courseId, moduleId, quizId } = req.params;

    const course = await Course.findOne({
      _id: courseId,
      createdBy: req.user.id,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found or unauthorized",
      });
    }

    const module = course.modules.id(moduleId);

    if (!module) {
      return res.status(404).json({
        success: false,
        message: "Module not found",
      });
    }

    module.quizzes = module.quizzes.filter(
      (quiz) => quiz._id.toString() !== quizId
    );

    await course.save();

    res.status(200).json({
      success: true,
      message: "Quiz deleted successfully",
      course,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL STUDENTS (Teacher)
// =============================
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select(
      "-password"
    );

    res.status(200).json({
      success: true,
      students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};