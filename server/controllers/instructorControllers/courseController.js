const Course = require("../../models/Course");

// Create a new course based on course model and call save to collection function
const addNewCourse = async (req, res) => {
  try {
    const courseData = req.body;
    const newCourse = new Course(courseData);
    const saveCourse = await newCourse.save();

    if (saveCourse) {
      res.status(201).json({
        success: true,
        message: "Course saved successfully",
        data: saveCourse,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Some error occured" });
  }
};

// Returns all courses collection
const getAllCourses = async (req, res) => {
  try {
    const coursesList = await Course.find({});

    res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: coursesList,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Some error occured" });
  }
};

// Return specific course from collection by ID
const getCourseDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const courseDetails = await Course.findById(id);

    if (!courseDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    res.status(200).json({
      success: true,
      message: "Course saved successfully",
      data: courseDetails,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Some error occured" });
  }
};

// Finds a course by its id then replace it entirely by request body
const updateCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourseData = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      updatedCourseData,
      { new: true }
    );
    if (!updatedCourse) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Some error occured" });
  }
};

module.exports = {
  addNewCourse,
  getAllCourses,
  updateCourseById,
  getCourseDetailsById,
};
