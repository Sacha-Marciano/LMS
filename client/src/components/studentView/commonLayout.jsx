import { Outlet } from "react-router-dom";

function StudentView() {
  return (
    <div>
      Common content
      <Outlet />
    </div>
  );
}

export default StudentView;
