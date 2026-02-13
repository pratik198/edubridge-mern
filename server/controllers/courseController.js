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

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.modules.push({ title: moduleTitle });

    await course.save();

    res.status(200).json({
      success: true,
      message: "Module added",
      course,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ============================
// 3️⃣ Add Lesson (YouTube)
// ============================
exports.addLesson = async (req, res) => {
  try {
    const { courseId, moduleId } = req.params;
    const { title, description, duration, videoUrl } = req.body;

    const course = await Course.findById(courseId);

    const module = course.modules.id(moduleId);

    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    module.lessons.push({
      title,
      description,
      duration,
      videoUrl, // YouTube link
    });

    await course.save();

    res.status(200).json({
      success: true,
      message: "Lesson added",
      course,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ============================
// 4️⃣ Publish Course
// ============================
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
