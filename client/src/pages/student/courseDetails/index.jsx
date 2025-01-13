import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle, Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import VideoPlayer from "@/components/videoPlayer";
import { StudentContext } from "@/context/student-context";
import {
  checkBoughtCourseService,
  createPaymentService,
  fetchStudentCourseDetailsService,
} from "@/services";
import { CheckCircle, Globe, Lock, PlayCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AuthContext } from "@/context/auth-context";

const StudentCourseDetailsPage = () => {
  // Hooks
  const [displayFreePreview, setDisplayFreePreview] = useState(null);
  const [showFreePreviewDialog, setShowFreePreviewDialog] = useState(false);
  const [approvalUrl, setApprovalUrl] = useState("");

  // Router hooks
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Context subscription
  const {
    studentCourseDetails,
    setStudentCourseDetails,
    currentCourseDetailsId,
    setCurrentCourseDetailsId,
    loadingState,
    setLoadingState,
  } = useContext(StudentContext);
  const { auth } = useContext(AuthContext);

  // constants

  const getFreePreviewUrl =
    studentCourseDetails !== null
      ? studentCourseDetails?.curriculum?.findIndex((item) => item.freePreview)
      : -1;

  //Methods

  const getStudentCourseDetails = async () => {
    const checkCoursePurchaseInfo = await checkBoughtCourseService(
      currentCourseDetailsId,
      auth?.user?._id
    );

    if (checkCoursePurchaseInfo?.success && checkCoursePurchaseInfo?.data) {
      navigate(`course-progress/${currentCourseDetailsId}`);
      return;
    }

    const response = await fetchStudentCourseDetailsService(
      currentCourseDetailsId
    );
    if (response.success) {
      setStudentCourseDetails(response?.data);
      setLoadingState(false);
    } else {
      setStudentCourseDetails(null);
      setLoadingState(false);
    }
  };

  const handleSetFreePreview = (currentVideoInfo) => {
    setDisplayFreePreview(currentVideoInfo?.videoUrl);
  };

  const handleCreatePayment = async () => {
    const paymentPayload = {
      userId: auth?.user?._id,
      userName: auth?.user?.userName,
      userEmail: auth?.user?.userEmail,
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "initiated",
      orderDate: new Date(),
      paymentId: "",
      payerId: "",
      instructorId: studentCourseDetails?.instructorId,
      instructorName: studentCourseDetails?.instructorName,
      courseImage: studentCourseDetails?.image,
      courseTitle: studentCourseDetails?.title,
      courseId: studentCourseDetails?._id,
      coursePricing: studentCourseDetails?.pricing,
    };

    const response = await createPaymentService(paymentPayload);

    if (response.success) {
      sessionStorage.setItem(
        "currentOrderId",
        JSON.stringify(response?.data?.orderId)
      );
      setApprovalUrl(response?.data?.approveUrl);
    }
  };

  // Use effect with dependencies

  useEffect(() => {
    if (displayFreePreview !== null) {
      setShowFreePreviewDialog(true);
    }
  }, [displayFreePreview]);

  useEffect(() => {
    if (id) {
      setCurrentCourseDetailsId(id);
    }
  }, [id]);

  useEffect(() => {
    if (currentCourseDetailsId !== null) {
      getStudentCourseDetails();
    }
  }, [currentCourseDetailsId]);

  useEffect(() => {
    if (!location.pathname.includes("/course/details")) {
      studentCourseDetails(null);
      setCurrentCourseDetailsId(null);
    }
  }, [location.pathname]);

  // On loading don't render the page
  if (loadingState) {
    return <Skeleton />;
  }

  // If payment is done redirect to approvalUrl
  if (approvalUrl !== "") {
    window.location.href = approvalUrl;
  }

  // After loading
  return (
    <div className="mx-auto p-4">
      <div className="bg-gray-900 text-white p-8 rounded-t-lg">
        <h1 className=" text-3xl font-bold mb-4">
          {studentCourseDetails?.title}
        </h1>
        <p className="text-xl mb-4">{studentCourseDetails?.subtitle} </p>
        <div className=" flex items-center space-x-4 mt-2 text-sm">
          <span>Created By {studentCourseDetails?.instructorName} </span>
          <span> Created On {studentCourseDetails?.date.split("T")[0]} </span>
          <span className="flex items-center">
            <Globe className="mr-1 h-4 w-4" />
            {studentCourseDetails?.primaryLanguage}
          </span>
          <span>
            {studentCourseDetails?.students.length}{" "}
            {studentCourseDetails?.students.length <= 1
              ? "Students"
              : "Students"}
          </span>
        </div>
      </div>
      <div className=" flex flex-col md:flex-row gap-8 mt-8">
        <main className="flex-grow">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Description</CardTitle>
            </CardHeader>
            <CardContent>{studentCourseDetails?.description}</CardContent>
          </Card>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What you'll learn</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {studentCourseDetails?.objectives
                  .split(",")
                  .map((item, index) => {
                    return (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>{item} </span>
                      </li>
                    );
                  })}
              </ul>
            </CardContent>
          </Card>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
            </CardHeader>
            <CardContent>
              {studentCourseDetails?.curriculum.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={`${
                      item?.freePreview
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
                    } flex items-center mb-4`}
                    onClick={
                      item?.freePreview
                        ? () => handleSetFreePreview(item)
                        : null
                    }
                  >
                    {item?.freePreview ? (
                      <PlayCircle className="mr-2 h4 w4 " />
                    ) : (
                      <Lock className="mr-2 h4 w4 " />
                    )}
                    <span>{item?.title} </span>
                  </li>
                );
              })}
            </CardContent>
          </Card>
        </main>
        <aside className=" w-full md:w-[500px]">
          <Card className=" sticky top-4">
            <CardContent className="p-6">
              <div className="aspect-video mb-4 rounded-lg flex items-center justify-center">
                <VideoPlayer
                  url={
                    getFreePreviewUrl !== -1
                      ? studentCourseDetails?.curriculum[getFreePreviewUrl]
                          .videoUrl
                      : ""
                  }
                  width="450px"
                  height="200px"
                />
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">
                  {studentCourseDetails?.pricing}$
                </span>
              </div>
              <Button onClick={handleCreatePayment} className="w-full">
                Buy Now
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
      <Dialog
        open={showFreePreviewDialog}
        onOpenChange={() => {
          setShowFreePreviewDialog(false);
          setDisplayFreePreview(null);
        }}
      >
        <DialogContent className="bg-white w-[600px]">
          <DialogHeader>
            <DialogTitle>Course Preview</DialogTitle>
          </DialogHeader>
          <div className="aspect-video rounded-lg flex items-center justify-center">
            <VideoPlayer
              url={displayFreePreview}
              width="450px"
              height="200px"
            />
          </div>
          <div className=" flex flex-col gap-2">
            {studentCourseDetails?.curriculum
              ?.filter((item) => item.freePreview)
              .map((filtered, index) => (
                <p
                  key={index}
                  onClick={() => handleSetFreePreview(filtered)}
                  className=" cursor-pointer text-[16px] font-medium"
                >
                  {filtered.title}
                </p>
              ))}
          </div>
          <DialogFooter className=" sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentCourseDetailsPage;
