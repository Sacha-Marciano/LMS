const CourseProgress = require("../../models/CourseProgress");
const Course = require("../../models/Course");
const StudentCourses = require("../../models/StudentCourses");

// mark current lecture as view
const markCurrentLectureViewed = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

// get current course progress
const getCurrentProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    const studentBoughtCourses = await StudentCourses.findOne({ userId });

    const isCurrentCourseBought =
      studentBoughtCourses?.courses?.findIndex(
        (item) => item.courseId === courseId
      ) > -1;

    if (!isCurrentCourseBought) {
      res.status(200).json({
        success: true,
        data: { isBought: false },
        message: "You need to purchase this course",
      });
    }

    const currentUserProgress = await CourseProgress.findOne({
      userId,
      courseId,
    });

    if (
      !currentUserProgress ||
      currentUserProgress?.lecturesProgress?.length === 0
    ) {
      const course = await Course.findById(courseId);

      if (!course) {
        return res.status(500).json({
          success: false,
          message: "Course not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "No progress found, start watching",
        data: {
          courseDetails: course,
          progress: [],
          isBought: true,
        },
      });
    }

    const courseDetails = await Course.findById(courseId);

    res.status(200).json({
      success: true,
      data: {
        courseDetails,
        progress: currentUserProgress.lecturesProgress,
        completed: currentUserProgress.completed,
        completionDate: currentUserProgress.completionDate,
        isBought: true,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

// reset course progress
const resetCurrentProgress = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports = {
  markCurrentLectureViewed,
  getCurrentProgress,
  resetCurrentProgress,
};
