const express = require("express");

const {
  getCurrentProgress,
} = require("../../controllers/studentsControllers/courseProgressControllers");

const router = express.Router();

router.get("/get/:userId/:courseId", getCurrentProgress);

module.exports = router;
