const express = require("express");
const {
  getAllStudentCourses,
  getStudentCourseDetails,
} = require("../../controllers/studentsControllers");
const router = express.Router();

router.get("/get", getAllStudentCourses);
router.get("/get/details/:id", getStudentCourseDetails);

module.exports = router;
