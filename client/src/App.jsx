// React methods
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";

// Contexts
import { AuthContext } from "./context/auth-context";

// Pages
import InstructorDashboardPage from "./pages/instructor";
import StudentHomePage from "./pages/student/home";
import NotFoundPage from "./pages/not-found";
import AddNewCoursePage from "./pages/instructor/addNewCourse";
import AuthPage from "./pages/auth";

// Components
import ProtectedRoute from "./components/protectedRoute";
import StudentView from "./components/studentView/commonLayout";
import StudentCourseViewPage from "./pages/student/courses";
import StudentCourseDetailsPage from "./pages/student/courseDetails";

function App() {
  // Context suscribe
  const { auth } = useContext(AuthContext);
  return (
    <>
      <Routes>
        {/* default route displayed */}
        <Route
          path="/auth"
          element={
            <ProtectedRoute
              element={<AuthPage />}
              authenticated={auth?.authenticate}
              user={auth?.user}
            />
          }
        />
        {/* Displayed according to auth */}

        <Route
          path="/instructor"
          element={
            <ProtectedRoute
              element={<InstructorDashboardPage />}
              authenticated={auth?.authenticate}
              user={auth?.user}
            />
          }
        />
        {/* Displayed according to auth */}

        <Route
          path="/instructor/create-course"
          element={
            <ProtectedRoute
              element={<AddNewCoursePage />}
              authenticated={auth?.authenticate}
              user={auth?.user}
            />
          }
        />
        {/* Displayed according to auth */}

        <Route
          path="/instructor/edit-course/:courseId"
          element={
            <ProtectedRoute
              element={<AddNewCoursePage />}
              authenticated={auth?.authenticate}
              user={auth?.user}
            />
          }
        />
        {/* Displayed according to auth */}
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={<StudentView />}
              authenticated={auth?.authenticate}
              user={auth?.user}
            />
          }
        >
          {/* Displayed according to auth */}
          <Route path="" element={<StudentHomePage />} />
          <Route path="home" element={<StudentHomePage />} />
          <Route path="courses" element={<StudentCourseViewPage />} />
          <Route
            path="course/details/:id"
            element={<StudentCourseDetailsPage />}
          />
        </Route>
        {/* All not-known routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
