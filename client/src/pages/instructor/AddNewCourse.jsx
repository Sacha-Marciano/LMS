// Add new course page - used also to edit courses

//React
import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Contexts
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";

//Components
import Curriculum from "@/components/instructorView/courses/addNewCourse/curriculum";
import LandingPage from "@/components/instructorView/courses/addNewCourse/landingPage";
import Settings from "@/components/instructorView/courses/addNewCourse/settings";

// Third-party librairies UI components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// API services
import {
  addNewCourseService,
  fetchInstructorCourseDetailService,
  updateInstructorCourseService,
} from "@/services";

// Initial form data template to display
import {
  courseCurriculumInitialFormData,
  courseLandingPageInitialFormData,
} from "@/config";

function AddNewCoursePage() {
  // Hooks
  const navigate = useNavigate();
  const params = useParams();

  // Context subscription
  const {
    courseLandingFormData,
    courseCurriculumFormData,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
    currentEditedCourse,
    setCurrentEditedCourse,
  } = useContext(InstructorContext);
  const { auth } = useContext(AuthContext);

  // Methods
  // Checks the value is empty
  const isEmpty = (value) => {
    if (Array.isArray(value)) {
      return value.length === 0;
    }

    return value === "" || value === null || value === undefined;
  };

  // Validate all form data is complete
  const validateFormData = () => {
    // Checking no values are empty
    for (const key in courseLandingFormData) {
      if (isEmpty(courseLandingFormData[key])) {
        return false;
      }
    }

    let hasFreePreview = false;

    for (const item of courseCurriculumFormData) {
      // checking lectures data is complete
      if (
        isEmpty(item.title) ||
        isEmpty(item.videoUrl) ||
        isEmpty(item.public_id)
      ) {
        return false;
      }
      // Checking if at least one lecture with free preview
      if (item.freePreview) {
        hasFreePreview = true;
      }
    }

    return hasFreePreview;
  };

  // Creates a complete course object and uses API services
  const handleCreateCourse = async () => {
    const courseTotalFormData = {
      instructorId: auth?.user?._id, // Provided by context
      instructorName: auth?.user?.userName, // Provided by context
      date: new Date(),
      ...courseLandingFormData, // Provided by state
      students: [],
      curriculum: courseCurriculumFormData, // Provided by state
      isPublished: true,
    };

    // Checking what to display (create/edit)
    const response =
      // if not editing - update the course by ID
      currentEditedCourse !== null
        ? await updateInstructorCourseService(
            currentEditedCourse,
            courseTotalFormData
          )
        : // if not editing - add the course
          await addNewCourseService(courseTotalFormData);

    // if response is successfull, reset id of edited and  all inputs with initial templates
    if (response?.success) {
      setCourseCurriculumFormData(courseCurriculumInitialFormData);
      setCourseLandingFormData(courseLandingPageInitialFormData);
      navigate(-1);
      setCurrentEditedCourse(null);
    }
  };

  // Get course details by ID
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

  // If the ID state is changed, fetch new course id details
  useEffect(() => {
    if (currentEditedCourse !== null) {
      fetchCurrentCourseDetails();
    }
  }, [currentEditedCourse]);

  // If the params of course ID exists, set the new ID state
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
