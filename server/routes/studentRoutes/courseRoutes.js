const express = require("express");
const {
  getAllStudentCourses,
  getStudentCourseDetails,
  checkBoughtCourseInfo,
} = require("../../controllers/studentsControllers/courseController");
const router = express.Router();

router.get("/get", getAllStudentCourses);
router.get("/get/details/:id/", getStudentCourseDetails);
router.get("/purchase-info/:id/:studentId", checkBoughtCourseInfo);

module.exports = router;
