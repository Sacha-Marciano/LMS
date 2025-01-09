// This component prevents not authenticated users to access content
// It also redirects not authorized users to authorized pages

// React methods
import { Fragment } from "react";
import { useLocation, Navigate } from "react-router-dom";

function ProtectedRoute({ authenticated, user, element }) {
  const location = useLocation();

  // If user is not logged in try to access content
  // redirect to login page
  if (!authenticated && !location.pathname.includes("/auth")) {
    return <Navigate to="/auth" />;
  }

  // If student is logged in and try to access admin/instructor content
  // redirect to student homepage
  if (
    authenticated &&
    user?.role !== "instructor" &&
    (location.pathname.includes("/instructor") ||
      location.pathname.includes("/auth"))
  ) {
    return <Navigate to="/home" />;
  }

  // If admin/instructor  is logged in and try to access student content
  // redirect to instructor homepage
  if (
    authenticated &&
    user?.role === "instructor" &&
    !location.pathname.includes("instructor")
  ) {
    return <Navigate to="/instructor" />;
  }

  // I have no clue what Fragment does
  return <Fragment>{element}</Fragment>;
}

export default ProtectedRoute;
