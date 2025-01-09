import Curriculum from "@/components/instructorView/courses/addNewCourse/curriculum";
import LandingPage from "@/components/instructorView/courses/addNewCourse/landingPage";
import Settings from "@/components/instructorView/courses/addNewCourse/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  courseCurriculumInitialFormData,
  courseLandingPageInitialFormData,
} from "@/config";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import {
  addNewCourseService,
  fetchInstructorCourseDetailService,
  updateInstructorCourseService,
} from "@/services";
import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddNewCoursePage() {
  const {
    courseLandingFormData,
    courseCurriculumFormData,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
    currentEditedCourse,
    setCurrentEditedCourse,
  } = useContext(InstructorContext);

  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();
  const params = useParams();

  const isEmpty = (value) => {
    if (Array.isArray(value)) {
      return value.length === 0;
    }

    return value === "" || value === null || value === undefined;
  };

  const validateFormData = () => {
    for (const key in courseLandingFormData) {
      if (isEmpty(courseLandingFormData[key])) {
        return false;
      }
    }

    let hasFreePreview = false;

    for (const item of courseCurriculumFormData) {
      if (
        isEmpty(item.title) ||
        isEmpty(item.videoUrl) ||
        isEmpty(item.public_id)
      ) {
        return false;
      }
      if (item.freePreview) {
        hasFreePreview = true; // Found at least one lecture with free preview
      }
    }

    return hasFreePreview;
  };

  const handleCreateCourse = async () => {
    const courseTotalFormData = {
      instructorId: auth?.user?._id,
      instructorName: auth?.user?.userName,
      date: new Date(),
      ...courseLandingFormData,
      students: [],
      curriculum: courseCurriculumFormData,
      isPublished: true,
    };

    const response =
      currentEditedCourse !== null
        ? await updateInstructorCourseService(
            currentEditedCourse,
            courseTotalFormData
          )
        : await addNewCourseService(courseTotalFormData);

    if (response?.success) {
      setCourseCurriculumFormData(courseCurriculumInitialFormData);
      setCourseLandingFormData(courseLandingPageInitialFormData);
      navigate(-1);
      setCurrentEditedCourse(null);
    }
  };

  const fetchCurrentCourseDetails = async () => {
    const response = await fetchInstructorCourseDetailService(
      currentEditedCourse
    );

    if (response?.success) {
      // Create an object with the same keys as the object in the config
      const getCourseFormData = Object.keys(
        courseLandingPageInitialFormData
      ).reduce((acc, key) => {
        // then select first key and push the received response, save it in acc and do it again for all keys
        acc[key] = response.data[key] || courseLandingPageInitialFormData[key];
        return acc;
      }, {});

      setCourseLandingFormData(getCourseFormData);
      setCourseCurriculumFormData(response?.data?.curriculum);
    }
  };

  useEffect(() => {
    if (currentEditedCourse !== null) {
      fetchCurrentCourseDetails();
    }
  }, [currentEditedCourse]);

  useEffect(() => {
    if (params?.courseId) {
      setCurrentEditedCourse(params?.courseId);
    }
  }, [params?.courseId]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-extrabold mb-5">Create a new course</h1>
        <Button
          disabled={!validateFormData()}
          className="text-sm tracking-wider font-bold px-8"
          onClick={handleCreateCourse}
        >
          SUBMIT
        </Button>
      </div>
      <Card>
        <CardContent>
          <div className="container mx-auto p-4">
            <Tabs defaultValue="curriculum" className="space-y-4">
              <TabsList>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="course-landing-page">
                  Course Landing Page
                </TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="curriculum">
                <Curriculum />
              </TabsContent>
              <TabsContent value="course-landing-page">
                <LandingPage />
              </TabsContent>
              <TabsContent value="settings">
                <Settings />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddNewCoursePage;
