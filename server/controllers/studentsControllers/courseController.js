const Course = require("../../models/Course");

const getAllStudentCourses = async (req, res) => {
  try {
    const coursesList = await Course.find({});
    if (coursesList.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No course found", data: [] });
    }

    return res.status(200).json({ success: true, data: coursesList });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const getStudentCourseDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const courseDetails = await Course.findById(id);

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "No course details found",
        data: null,
      });
    }
    return res.status(200).json({ success: true, data: courseDetails });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports = { getAllStudentCourses, getStudentCourseDetails };
