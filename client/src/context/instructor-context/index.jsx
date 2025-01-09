// This context provider ensure critical instructor related data
// is passed to all components without drilling

// React methods
import { createContext, useState } from "react";

// Config data for courses forms
import {
  courseCurriculumInitialFormData,
  courseLandingPageInitialFormData,
} from "@/config";

// Create context
export const InstructorContext = createContext(null);

export default function InstructorProvider({ children }) {
  // Hooks
  const [courseLandingFormData, setCourseLandingFormData] = useState(
    courseLandingPageInitialFormData
  );
  const [courseCurriculumFormData, setCourseCurriculumFormData] = useState(
    courseCurriculumInitialFormData
  );

  const [mediaUploadProgress, setMediaUploadProgress] = useState(false);
  const [mediaUploadProgressPercent, setMediaUploadProgressPercent] =
    useState(0);

  const [instructorCourseList, setInstructorCourseList] = useState([]);
  const [currentEditedCourse, setCurrentEditedCourse] = useState(null);

  // Wrap all children of this components in a context provider
  return (
    <InstructorContext.Provider
      value={{
        courseLandingFormData,
        setCourseLandingFormData,
        courseCurriculumFormData,
        setCourseCurriculumFormData,
        mediaUploadProgress,
        setMediaUploadProgress,
        mediaUploadProgressPercent,
        setMediaUploadProgressPercent,
        instructorCourseList,
        setInstructorCourseList,
        currentEditedCourse,
        setCurrentEditedCourse,
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
}
