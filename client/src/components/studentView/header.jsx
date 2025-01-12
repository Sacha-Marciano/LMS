// Header for students pages

//React
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Contexts
import { AuthContext } from "@/context/auth-context";

//Components

// Third-party librairies UI components
import { Button } from "../ui/button";
import { GraduationCap, TvMinimalPlay } from "lucide-react";

// API services

// Initial Config data

//
const StudentHeader = () => {
  const navigate = useNavigate();

  const { resetCredentials } = useContext(AuthContext);

  const handleLogout = () => {
    resetCredentials();
    sessionStorage.clear();
  };
  return (
    <header className="flex items-center justify-between p-4 relative">
      <div className="flex items-center space-x-4">
        <Link to="/home" className="flex items-center hover:text-black ">
          <GraduationCap className="h-8 w-8 mr-4 hover:text-black " />
          <span className="font-extrabold md:text-xl text-[14px]">
            LMS LEARN
          </span>
        </Link>
        <div className="flex items-center space-x-1 ">
          <Button
            onClick={() => navigate("/courses")}
            variant="ghost"
            className="text-[14px] md:text-[16px] font-medium"
          >
            Explore Courses
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-3">
            <span className="font-extrabold md:text-xl text-[14px]">
              My Courses
            </span>
            <TvMinimalPlay className="w-8 h-8 cursor-pointer" />
          </div>
          <Button onClick={handleLogout}>Sign out</Button>
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;
