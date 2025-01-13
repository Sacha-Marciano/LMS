const express = require("express");

const {
  getCoursesByStudentId,
} = require("../../controllers/studentsControllers/studentCoursesControllers");

const router = express.Router();

router.get("/get/:studentId", getCoursesByStudentId);

module.exports = router;
