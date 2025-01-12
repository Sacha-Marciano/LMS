// This is the student homepage, it displays all available courses from the db
// Student can navigate from here to all students available pages

//React
import { useContext, useEffect } from "react";

// Contexts
import { StudentContext } from "@/context/student-context";

//Components
import banner from "/Banner.png";

// Third-party librairies UI components
import { Button } from "@/components/ui/button";

// API services

// Initial Config data
import { courseCategories } from "@/config";
import { fetchStudentCourseListService } from "@/services";

function StudentHomePage() {
  const { studentCoursesList, setStudentCoursesList } =
    useContext(StudentContext);

  const getAllStudentCourses = async () => {
    const response = await fetchStudentCourseListService();
    if (response?.success) {
      setStudentCoursesList(response?.data);
    }
  };

  useEffect(() => {
    getAllStudentCourses();
  }, []);
  return (
    <div className="min-h-screen bg-white">
      <section className="flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-8">
        <div className="lg:w-1/2 lg:pr-12">
          <h1 className="text-4xl font-bold mb-4">Learning that gets you</h1>
          <p className="text-xl">
            Skills for your present and future. Get Started with us
          </p>
        </div>
        <div className="lg:w-full mb-8 lg:mb-0">
          <img
            src={banner}
            width={600}
            height={400}
            className="w-full h-auto rounded-lg shadow-lg"
          ></img>
        </div>
      </section>
      <section className="py-8 px-4 lg:px-8 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Courses categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
          {courseCategories.map((category) => {
            return (
              <Button
                variant="outline"
                className="justify-start"
                key={category.id}
              >
                {category.label}
              </Button>
            );
          })}
        </div>
      </section>
      <section className="py-12 px4 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentCoursesList && studentCoursesList.length > 0 ? (
            studentCoursesList.map((course) => {
              return (
                <div className=" border rounded-lg overflow-hidden shadow cursor-pointer">
                  <img
                    src={course?.image}
                    width={300}
                    height={150}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold mb-2">{course?.title}</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      {course?.instructorName}
                    </p>
                    <p className="font-bold text-[16px]">{course?.pricing}$</p>
                  </div>
                </div>
              );
            })
          ) : (
            <h2>No courses found</h2>
          )}
        </div>
      </section>
    </div>
  );
}

export default StudentHomePage;
