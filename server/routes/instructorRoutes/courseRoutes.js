const express = require("express");
const {
  addNewCourse,
  getAllCourses,
  updateCourseById,
  getCourseDetailsById,
} = require("../../controllers/instructorControllers/courseController");
const router = express.Router();

router.post("/add", addNewCourse);
router.get("/get", getAllCourses);
router.get("/get/details/:id", getCourseDetailsById);
router.put("/update/:id", updateCourseById);

module.exports = router;
