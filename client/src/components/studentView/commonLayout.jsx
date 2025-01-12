// This layout is displayed on all students pages
// The Outlet component renders the proper child page depending on user location

//React
import { Outlet } from "react-router-dom";

// Components
import StudentHeader from "./header";

function StudentView() {
  return (
    <div>
      <StudentHeader />
      <Outlet />
    </div>
  );
}

export default StudentView;
