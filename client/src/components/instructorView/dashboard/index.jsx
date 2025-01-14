// Instructor Dashboard showing all instructors stats

//React methods
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, Users } from "lucide-react";
import React from "react";

function InstructorDashboard({ coursesList }) {
  const calculateTotalStudentsAndProfits = () => {
    const { totalStudents, totalProfit, students } = coursesList.reduce(
      (acc, course) => {
        const studentCount = course.students.length;

        acc.totalStudents += studentCount;
        acc.totalProfit += course.pricing * studentCount;

        console.log(course);

        course.students.forEach((student) => {
          acc.students.push({
            courseTitle: course.title,
            studentName: student.studentName,
            studentEmail: student.studentEmail,
          });
        });

        return acc;
      },
      {
        totalStudents: 0,
        totalProfit: 0,
        students: [],
      }
    );

    return { totalStudents, totalProfit, students };
  };

  const config = [
    {
      icon: Users,
      label: "Total Students",
      value: calculateTotalStudentsAndProfits().totalStudents,
    },
    {
      icon: DollarSign,
      label: "Total Revenue",
      value: `${calculateTotalStudentsAndProfits().totalProfit} $`,
    },
  ];

  return (
    <div className="">
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {config.map((item, index) => {
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
                <CardTitle className="text-sm font-medium">
                  {item.label}
                </CardTitle>
                <item.icon className=" h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className=" text-2xl font-bold">{item.value} </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Students List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className=" overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Student Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {calculateTotalStudentsAndProfits().students.map(
                  (student, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {student.courseTitle}
                      </TableCell>
                      <TableCell>{student.studentName} </TableCell>
                      <TableCell>{student.studentEmail} </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default InstructorDashboard;
