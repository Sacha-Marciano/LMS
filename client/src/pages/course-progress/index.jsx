import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import { fetchCurrentCourseProgressService } from "@/services";
import { ChevronLeft } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { useNavigate, useParams } from "react-router-dom";

const StudentCourseProgressPage = () => {
  // Hooks
  const [lock, setLock] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [courseCompletedDialog, setCourseCompletedDialog] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Router hooks
  const navigate = useNavigate();
  const { id } = useParams();

  // Context subscription
  const { auth } = useContext(AuthContext);
  const { studentCourseProgress, setStudentCourseProgress } =
    useContext(StudentContext);

  const getCurrentCourseProgress = async () => {
    const response = await fetchCurrentCourseProgressService(
      auth?.user?._id,
      id
    );
    if (response?.success) {
      if (!response?.data?.isBought) {
        setLock(true);
      } else {
        setStudentCourseProgress({
          courseDetails: response?.data?.courseDetails,
          progress: response?.data?.progress,
        });

        if (response?.data?.completed) {
          setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
          setCourseCompletedDialog(true);
          setShowConfetti(true);

          return;
        }
      }
    }
  };
  // Use effect with dependencies
  useEffect(() => {
    getCurrentCourseProgress();
  }, [id]);

  useEffect(() => {
    if (showConfetti) setTimeout(() => setShowConfetti(false), 10000);
  }, [showConfetti]);

  return (
    <div className="flex flex-col h-screen bg-[#1c1d1f] text-white">
      {showConfetti && <ReactConfetti />}
      <div className=" flex items-center justify-between p-4 bg-[#1c1d1f] border-b border-gray-700">
        <div className=" flex items-center space-x-4">
          <Button
            onClick={() => navigate("/student-courses")}
            variant="ghost"
            size="sm"
            className=" text-black bg-gray-200"
          >
            <ChevronLeft className=" h-4 w-4 mr-2" />
            Back to My Courses
          </Button>
          <h1></h1>
        </div>
      </div>
      <Dialog open={lock}>
        <DialogContent className="sm:w-[425px] bg-gray-200 rounded-sm">
          <DialogHeader>
            <DialogTitle>You can't view this page</DialogTitle>
            <DialogDescription>
              Please purchase this course to get access
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={courseCompletedDialog}>
        <DialogContent className="sm:w-[425px] bg-gray-200 rounded-sm">
          <DialogHeader>
            <DialogTitle>Congratulation ! </DialogTitle>
            <DialogDescription className=" flex flex-col gap-3">
              <Label> You have completed this course</Label>
              <div className=" flex flex-row  gap-3">
                <Button>My Courses</Button>
                <Button>Rewatch Course</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentCourseProgressPage;
