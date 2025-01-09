import {
  courseCurriculumInitialFormData,
  courseLandingPageInitialFormData,
} from "@/config";
import { createContext, useState } from "react";

export const InstructorContext = createContext(null);

export default function InstructorProvider({ children }) {
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
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
}
