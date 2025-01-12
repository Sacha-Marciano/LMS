import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { filterOptions, sortOptions } from "@/config";
import { StudentContext } from "@/context/student-context";
import { fetchStudentCourseListService } from "@/services";
import { ArrowUpDownIcon } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const StudentCourseViewPage = () => {
  // Hooks
  const [sort, setSort] = useState("price-lowtohigh");
  const [filters, setFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  // Context subscription
  const {
    studentCoursesList,
    setStudentCoursesList,
    loadingState,
    setLoadingState,
  } = useContext(StudentContext);

  const navigate = useNavigate();

  const getAllStudentCourses = async (filters, sort) => {
    const query = new URLSearchParams({
      ...filters,
      sortBy: sort,
    });
    const response = await fetchStudentCourseListService(query);
    if (response?.success) {
      setStudentCoursesList(response?.data);
      setLoadingState(false);
    }
  };

  const handleFilterChange = (currentSection, currentOption) => {
    let copyFilters = { ...filters };
    const sectionIndex = Object.keys(copyFilters).indexOf(currentSection);
    if (sectionIndex === -1) {
      copyFilters = {
        ...copyFilters,
        [currentSection]: [currentOption.id],
      };
    } else {
      const optionIndex = copyFilters[currentSection].indexOf(currentOption.id);

      if (optionIndex === -1) {
        copyFilters[currentSection].push(currentOption.id);
      } else {
        copyFilters[currentSection].splice(optionIndex, 1);
      }
    }
    setFilters(copyFilters);

    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  };

  const createSearchParamsHelper = (filterParams) => {
    const queryParams = [];

    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");

        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    }

    return queryParams.join("&");
  };

  useEffect(() => {
    const buildQueryString = createSearchParamsHelper(filters);
    setSearchParams(new URLSearchParams(buildQueryString));
  }, [filters]);

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filters !== null && sort !== null) {
      getAllStudentCourses(filters, sort);
    }
  }, [filters, sort]);

  useEffect(() => {
    return sessionStorage.removeItem("filters");
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4"> All Courses</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <aside className="w-full md:w-64 space-y-4">
          <div>
            {Object.keys(filterOptions).map((key, index) => {
              return (
                <div key={index} className="p-4 border-b">
                  <h3 className=" font-bold mb-3">{key.toUpperCase()}</h3>
                  <div className="grid gap-2 mt-2">
                    {filterOptions[key].map((option, index) => {
                      return (
                        <Label
                          key={index}
                          className="flex font-medium items-center gap-3"
                        >
                          <Checkbox
                            checked={
                              filters &&
                              Object.keys(filters).length > 0 &&
                              filters[key] &&
                              filters[key].indexOf(option.id) > -1
                            }
                            onCheckedChange={() =>
                              handleFilterChange(key, option)
                            }
                          />
                          {option.label}
                        </Label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
        <main className="flex-1">
          <div className="flex justify-end items-center mb-4 gap-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 p-5 "
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span className="text-[16px] font-medium">Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={(value) => setSort(value)}
                >
                  {sortOptions.map((item) => {
                    return (
                      <DropdownMenuRadioItem value={item.id} key={item.id}>
                        {item.label}
                      </DropdownMenuRadioItem>
                    );
                  })}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-sm text-black font-bold">
              {studentCoursesList.length} Results
            </span>
          </div>
          <div className=" space-y-4 ">
            {studentCoursesList && studentCoursesList.length > 0 ? (
              studentCoursesList.map((item) => {
                return (
                  <Card
                    onClick={() => navigate(`/course/details/${item?._id}`)}
                    className="cursor-pointer"
                    key={item?._id}
                  >
                    <CardContent className=" flex gap-4 p-4">
                      <div className="w-48 h-32 flex-shrink-0">
                        <img
                          src={item?.image}
                          className="w-full h-full object-cover"
                          alt="Course image"
                        />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">
                          {item?.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mb-1">
                          Created by <strong>{item?.instructorName}</strong>
                        </p>
                        <p className="text-[16px] text-gray-600 mb-2 mt-3">
                          {item?.curriculum?.length}{" "}
                          {item?.curriculum?.length <= 1
                            ? "Lecture"
                            : "Lectures"}{" "}
                          - {item?.level.toUpperCase()}
                        </p>
                        <p className="font-bold text-lg">{item?.pricing}$</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : loadingState ? (
              <Skeleton />
            ) : (
              <h1 className="font-extrabold text-4xl">No courses found</h1>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentCourseViewPage;
