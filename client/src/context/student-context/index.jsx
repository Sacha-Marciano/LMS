// This context provider ensure critical students related data
// is passed to all relevant components without drilling

//React
import { createContext, useState } from "react";

// Create context
export const StudentContext = createContext(null);

export default function StudentProvider({ children }) {
  // Hooks
  const [studentCoursesList, setStudentCoursesList] = useState([]);

  // Wrap all children of this components in a context provider
  return (
    <StudentContext.Provider
      value={{ studentCoursesList, setStudentCoursesList }}
    >
      {children}
    </StudentContext.Provider>
  );
}
