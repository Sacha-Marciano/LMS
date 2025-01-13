// This components shows all courses according to instructor ID
// It also provides a create course option

// React methods
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

// Contexts
import { InstructorContext } from "@/context/instructor-context";

// Third-party UI components
import { Delete, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Config for forms
import {
  courseCurriculumInitialFormData,
  courseLandingPageInitialFormData,
} from "@/config";

function InstructorCourses({ coursesList }) {
  // Hooks
  const navigate = useNavigate();

  //Context subscription
  const {
    setCurrentEditedCourse,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
  } = useContext(InstructorContext);
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-extrabold">All Courses</CardTitle>
        <Button
          className="p-6"
          onClick={() => {
            // First reset the state to prevent useless redirecting to editing
            setCurrentEditedCourse(null);
            // Then reset page form state to prevent useless data upload
            setCourseLandingFormData(courseLandingPageInitialFormData);
            setCourseCurriculumFormData(courseCurriculumInitialFormData);
            // Then navigate to page
            navigate("/instructor/create-course");
          }}
        >
          Create New Course
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coursesList && coursesList.length > 0
                ? coursesList.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {item?.title}
                        </TableCell>
                        <TableCell>{item?.students.length}</TableCell>
                        <TableCell>
                          {item?.pricing * item?.students.length} $
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            onClick={() => {
                              navigate(`/instructor/edit-course/${item?._id}`);
                            }}
                            variant="ghost"
                            size="sm"
                          >
                            <Edit className="h-6 w-6" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Delete className="h-6 w-6" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                : null}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default InstructorCourses;
