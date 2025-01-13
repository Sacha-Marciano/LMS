// This is the instructor homepage, it displays all available actions to the instructor
// Instructors can navigate from here to all admin available pages

//React methods
import { useContext, useEffect, useState } from "react";

// Contexts
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";

//Components
import InstructorCourses from "@/components/instructorView/courses";
import InstructorDashboard from "@/components/instructorView/dashboard";

// Third-party librairies UI components
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { BarChart, Book, LogOut } from "lucide-react";

// API services
import { fetchInstructorCourseListService } from "@/services";

function InstructorDashboardPage() {
  // Context suscribe
  const { resetCredentials } = useContext(AuthContext);
  const { instructorCourseList, setInstructorCourseList } =
    useContext(InstructorContext);

  // Hooks
  const [activeTab, setActiveTab] = useState("courses");

  // Methods
  const handleLogout = () => {
    resetCredentials();
    sessionStorage.clear();
  };

  const fetchAllCourses = async () => {
    const response = await fetchInstructorCourseListService();
    if (response?.success) {
      setInstructorCourseList(response.data);
    }
  };

  // When component renders for first time
  useEffect(() => {
    fetchAllCourses();
  }, []);

  const menuItems = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      component: <InstructorDashboard />,
    },
    {
      icon: Book,
      label: "Courses",
      value: "courses",
      component: <InstructorCourses coursesList={instructorCourseList} />,
    },
    {
      icon: LogOut,
      label: "Log out",
      value: "logout",
      component: null,
    },
  ];

  return (
    <div className="flex h-full min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Admin View</h2>
          <nav>
            {menuItems.map((item) => {
              return (
                <Button
                  className=" w-full justify-start mb-2"
                  key={item.value}
                  variant={activeTab === item.value ? "secondary" : "ghost"}
                  onClick={
                    item.value === "logout"
                      ? handleLogout
                      : () => setActiveTab(item.value)
                  }
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {menuItems.map((item) => {
              return (
                <TabsContent value={item.value} key={item.value}>
                  {item.component !== null ? item.component : null}
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default InstructorDashboardPage;
