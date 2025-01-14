// This layout is displayed on all students pages
// The Outlet component renders the proper child page depending on user location

//React
import { Outlet, useLocation } from "react-router-dom";

// Components
import StudentHeader from "./header";

function StudentView() {
  const location = useLocation();
  return (
    <div>
      {!location.pathname.includes("course-progress") ? (
        <StudentHeader />
      ) : null}

      <Outlet />
    </div>
  );
}

export default StudentView;
