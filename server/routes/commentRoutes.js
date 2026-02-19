const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  createComment,
  getLessonComments,
  deleteComment,
} = require("../controllers/commentController");

router.post("/", auth, createComment);

router.get(
  "/:courseId/:moduleId/:lessonId",
  auth,
  getLessonComments
);

router.delete("/:id", auth, deleteComment);

module.exports = router;
