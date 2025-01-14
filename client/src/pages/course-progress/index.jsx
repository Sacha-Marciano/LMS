import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoPlayer from "@/components/videoPlayer";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import {
  fetchCurrentCourseProgressService,
  markLectureViewedService,
  resetProgressService,
} from "@/services";
import { Check, ChevronLeft, ChevronRight, Play } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { useNavigate, useParams } from "react-router-dom";

const StudentCourseProgressPage = () => {
  // Hooks
  const [lock, setLock] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [courseCompletedDialog, setCourseCompletedDialog] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

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

        if (response?.data?.progress.length === 0) {
          setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
        } else {
          const indexOfLastViewed = response?.data?.progress.reduceRight(
            (acc, obj, index) => {
              return acc === -1 && obj.viewed ? index : acc;
            },
            -1
          );

          setCurrentLecture(
            response?.data?.courseDetails?.curriculum[indexOfLastViewed + 1]
          );
        }
      }
    }
  };

  const updateCourseProgress = async () => {
    if (currentLecture) {
      const response = await markLectureViewedService(
        auth?.user?._id,
        studentCourseProgress?.courseDetails?._id,
        currentLecture?._id
      );

      if (response?.success) {
        getCurrentCourseProgress();
      }
    }
  };

  const handleRewatch = async () => {
    const response = await resetProgressService(
      auth?.user?._id,
      studentCourseProgress?.courseDetails?._id
    );

    if (response?.success) {
      setCurrentLecture(null);
      setShowConfetti(false);
      setCourseCompletedDialog(false);
      getCurrentCourseProgress();
    }
  };

  // Use effect with dependencies
  useEffect(() => {
    getCurrentCourseProgress();
  }, [id]);

  useEffect(() => {
    if (currentLecture?.progressValue === 1) {
      updateCourseProgress();
    }
  }, [currentLecture]);

  useEffect(() => {
    if (showConfetti) setTimeout(() => setShowConfetti(false), 10000);
  }, [showConfetti]);

  console.log(currentLecture);

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
          <h1 className=" text-white text-lg font-bold hidden md:block">
            {studentCourseProgress?.courseDetails?.title}
          </h1>
        </div>
        <Button onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
          {isSideBarOpen ? (
            <ChevronRight className=" h-5 w-5" />
          ) : (
            <ChevronLeft className=" h-5 w-5" />
          )}
        </Button>
      </div>
      <div className=" flex flex-1 overflow-hidden">
        <div
          className={`flex-1 ${
            isSideBarOpen ? "mr-[400px]" : ""
          } transition-all duration-300`}
        >
          <VideoPlayer
            width="100%"
            height="500px"
            url={currentLecture?.videoUrl}
            onProgressUpdate={setCurrentLecture}
            progressData={currentLecture}
          />
          <div className=" p-6 bg-[#1c1d1f]">
            <h2 className="text-2xl font-bold mb-2 text-white">
              {currentLecture?.title}
            </h2>
          </div>
        </div>
        <div
          className={` fixed top-[10%] right-0 bottom-0 w-[400px] bg-[#1c1d1f] border-l border-gray-700 transition-all duration-300 ${
            isSideBarOpen ? " translate-x-0" : "translate-x-full"
          }`}
        >
          <Tabs defaultValue="content" className=" h-full flex flex-col">
            <TabsList className=" grid w-full grid-cols-2 p-0 h-14 bg-[#1c1d1f]">
              <TabsTrigger
                value="content"
                className="data-[state=active]:bg-white data-[state=active]:text-black text-white rounded-none h-full"
              >
                Course Content
              </TabsTrigger>
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-white data-[state=active]:text-black text-white rounded-none h-full"
              >
                Overview
              </TabsTrigger>
            </TabsList>
            <TabsContent value="content">
              <ScrollArea className=" h-full ">
                <div className=" p-4 space-y-4">
                  {studentCourseProgress?.courseDetails?.curriculum.map(
                    (item) => {
                      return (
                        <div
                          key={item._id}
                          className=" flex space-x-2 text-sm text-white font-bold cursor-pointer"
                        >
                          {studentCourseProgress?.progress?.find(
                            (progress) => progress.lectureId === item._id
                          )?.viewed ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                          <span>{item.title}</span>
                        </div>
                      );
                    }
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="overview" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className=" p-4">
                  <h2 className="text-xl font-bold mb-4"> About this course</h2>
                  <p className=" text-gray-500">
                    {" "}
                    {studentCourseProgress?.courseDetails?.description}
                  </p>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {/* Dialogs */}
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
        <DialogContent
          showOverlay={false}
          className="sm:w-[425px] bg-gray-200 rounded-sm"
        >
          <DialogHeader>
            <DialogTitle>Congratulation ! </DialogTitle>
            <DialogDescription className=" flex flex-col gap-3">
              <Label> You have completed this course</Label>
              <div className=" flex flex-row  gap-3">
                <Button onClick={() => navigate("/student-courses")}>
                  My Courses
                </Button>
                <Button onClick={handleRewatch}>Rewatch Course</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentCourseProgressPage;
