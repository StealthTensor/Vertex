"use client";

import React from "react";
import { useCourse, useMarks } from "@/hooks/query";
import GradeCalculator from "@/components/gradex/GradeCalculator";
import { GlobalLoader } from "../components/loader";
import { Mark, Course } from "@/types/gradex";
import { MarkDetail } from "srm-academia-api";

// Transform MarkDetail to Mark format
function transformMarks(markList: MarkDetail[]): Mark[] {
  return markList.map((m) => ({
    courseName: m.course || "",
    courseCode: m.course || "",
    courseType: m.category === "practical" ? "Practical" : "Theory",
    overall: {
      scored: String(m.total?.obtained || 0),
      total: String(m.total?.maxMark || 0),
    },
    testPerformance: m.marks?.map((test) => ({
      test: test.exam,
      marks: {
        scored: String(test.obtained),
        total: String(test.maxMark),
      },
    })),
  }));
}

// Transform CourseDetail to Course format
function transformCourses(courseList: any[]): Course[] {
  return courseList.map((c) => ({
    code: c.courseCode || "",
    title: c.courseTitle || "",
    credit: c.courseCredit || "0",
    category: c.courseCategory || "",
    courseCategory: c.courseCategory || "",
    type: c.courseType || "",
    slotType: c.courseType || "",
    faculty: c.courseFaculty || "",
    slot: Array.isArray(c.courseSlot) ? c.courseSlot.join(", ") : c.courseSlot || "",
    room: c.courseRoomNo || "",
  }));
}

export default function GradeX() {
  const { data: marksData, isPending: marksPending } = useMarks();
  const { data: coursesData, isPending: coursesPending } = useCourse();

  if (marksPending || coursesPending) {
    return <GlobalLoader className="h-10 w-10 text-white" />;
  }

  if (!marksData || marksData.length === 0) {
    return (
      <div className="flex h-full w-full justify-center items-center">
        <div className="text-white">No data found</div>
      </div>
    );
  }

  const marks = transformMarks(marksData);
  const courses = transformCourses(coursesData || []);

  return (
    <div className="flex flex-col gap-12 h-screen px-3 py-2">
      <GradeCalculator marks={marks} courses={courses} />
    </div>
  );
}

