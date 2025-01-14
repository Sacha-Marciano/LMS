const express = require("express");

const {
  getCurrentProgress,
  markCurrentLectureViewed,
  resetCurrentProgress,
} = require("../../controllers/studentsControllers/courseProgressControllers");

const router = express.Router();

router.get("/get/:userId/:courseId", getCurrentProgress);
router.post("/mark-lecture-viewed", markCurrentLectureViewed);
router.post("/reset-progress", resetCurrentProgress);

module.exports = router;
