/**
 * Mock data for development mode
 * These are sample data structures that match the API response format
 */

import {
  DaySchedule,
  AttendanceDetail,
  MarkDetail,
  UserInfo,
  CourseDetail,
  Month,
  DayOrderResponse,
} from "srm-academia-api";

export const mockTimetable: DaySchedule[] = [
  {
    dayOrder: "Day 1",
    class: [
      {
        time: "9:00 AM - 10:00 AM",
        courseCode: "CSE1001",
        courseTitle: "Web Development",
        courseRoomNo: "A101",
        courseType: "Theory",
        slot: "A1",
        isClass: true,
      },
      {
        time: "10:00 AM - 11:00 AM",
        courseCode: "CSE1002",
        courseTitle: "Data Structures",
        courseRoomNo: "A102",
        courseType: "Theory",
        slot: "B1",
        isClass: true,
      },
      {
        time: "11:00 AM - 12:00 PM",
        courseCode: "CSE1003",
        courseTitle: "Algorithms",
        courseRoomNo: "A103",
        courseType: "Theory",
        slot: "C1",
        isClass: true,
      },
      {
        time: "2:00 PM - 3:00 PM",
        courseCode: "CSE1004",
        courseTitle: "Database Systems",
        courseRoomNo: "LAB101",
        courseType: "Lab",
        slot: "L1",
        isClass: true,
      },
    ],
  },
  {
    dayOrder: "Day 2",
    class: [
      {
        time: "9:00 AM - 10:00 AM",
        courseCode: "CSE1005",
        courseTitle: "Operating Systems",
        courseRoomNo: "A201",
        courseType: "Theory",
        slot: "A2",
        isClass: true,
      },
      {
        time: "10:00 AM - 11:00 AM",
        courseCode: "CSE1006",
        courseTitle: "Computer Networks",
        courseRoomNo: "A202",
        courseType: "Theory",
        slot: "B2",
        isClass: true,
      },
      {
        time: "2:00 PM - 4:00 PM",
        courseCode: "CSE1007",
        courseTitle: "Web Development Lab",
        courseRoomNo: "LAB102",
        courseType: "Lab",
        slot: "L2",
        isClass: true,
      },
    ],
  },
  {
    dayOrder: "Day 3",
    class: [
      {
        time: "9:00 AM - 10:00 AM",
        courseCode: "CSE1001",
        courseTitle: "Web Development",
        courseRoomNo: "A101",
        courseType: "Theory",
        slot: "A1",
        isClass: true,
      },
      {
        time: "11:00 AM - 12:00 PM",
        courseCode: "CSE1003",
        courseTitle: "Algorithms",
        courseRoomNo: "A103",
        courseType: "Theory",
        slot: "C1",
        isClass: true,
      },
      {
        time: "3:00 PM - 4:00 PM",
        courseCode: "CSE1008",
        courseTitle: "Software Engineering",
        courseRoomNo: "A203",
        courseType: "Theory",
        slot: "D1",
        isClass: true,
      },
    ],
  },
  {
    dayOrder: "Day 4",
    class: [
      {
        time: "9:00 AM - 11:00 AM",
        courseCode: "CSE1009",
        courseTitle: "Machine Learning",
        courseRoomNo: "A301",
        courseType: "Theory",
        slot: "E1",
        isClass: true,
      },
      {
        time: "2:00 PM - 4:00 PM",
        courseCode: "CSE1010",
        courseTitle: "Data Structures Lab",
        courseRoomNo: "LAB103",
        courseType: "Lab",
        slot: "L3",
        isClass: true,
      },
    ],
  },
  {
    dayOrder: "Day 5",
    class: [
      {
        time: "9:00 AM - 10:00 AM",
        courseCode: "CSE1002",
        courseTitle: "Data Structures",
        courseRoomNo: "A102",
        courseType: "Theory",
        slot: "B1",
        isClass: true,
      },
      {
        time: "10:00 AM - 11:00 AM",
        courseCode: "CSE1005",
        courseTitle: "Operating Systems",
        courseRoomNo: "A201",
        courseType: "Theory",
        slot: "A2",
        isClass: true,
      },
    ],
  },
];

export const mockAttendance: AttendanceDetail[] = [
  {
    courseCode: "CSE1001",
    courseTitle: "Web Development",
    courseCategory: "theory",
    courseSlot: "THEORY",
    courseFaculty: "Dr. Smith",
    courseAttendance: "85.5",
    courseConducted: 20,
    courseAbsent: 3,
    courseAttendanceStatus: {
      status: "margin",
      classes: 5,
    },
  },
  {
    courseCode: "CSE1002",
    courseTitle: "Data Structures",
    courseCategory: "theory",
    courseSlot: "THEORY",
    courseFaculty: "Dr. Johnson",
    courseAttendance: "90.0",
    courseConducted: 18,
    courseAbsent: 2,
    courseAttendanceStatus: {
      status: "margin",
      classes: 3,
    },
  },
  {
    courseCode: "CSE1003",
    courseTitle: "Algorithms",
    courseCategory: "theory",
    courseSlot: "THEORY",
    courseFaculty: "Dr. Williams",
    courseAttendance: "78.5",
    courseConducted: 20,
    courseAbsent: 4,
    courseAttendanceStatus: {
      status: "required",
      classes: 8,
    },
  },
  {
    courseCode: "CSE1004",
    courseTitle: "Database Systems",
    courseCategory: "practical",
    courseSlot: "LAB",
    courseFaculty: "Dr. Brown",
    courseAttendance: "92.0",
    courseConducted: 12,
    courseAbsent: 1,
    courseAttendanceStatus: {
      status: "margin",
      classes: 2,
    },
  },
  {
    courseCode: "CSE1005",
    courseTitle: "Operating Systems",
    courseCategory: "theory",
    courseSlot: "THEORY",
    courseFaculty: "Dr. Davis",
    courseAttendance: "88.0",
    courseConducted: 19,
    courseAbsent: 2,
    courseAttendanceStatus: {
      status: "margin",
      classes: 4,
    },
  },
  {
    courseCode: "CSE1006",
    courseTitle: "Computer Networks",
    courseCategory: "theory",
    courseSlot: "THEORY",
    courseFaculty: "Dr. Wilson",
    courseAttendance: "82.5",
    courseConducted: 20,
    courseAbsent: 3,
    courseAttendanceStatus: {
      status: "margin",
      classes: 6,
    },
  },
];

export const mockMarks: MarkDetail[] = [
  {
    course: "CSE1001",
    category: "theory",
    marks: [
      {
        exam: "Mid Term",
        obtained: 45,
        maxMark: 50,
      },
      {
        exam: "Assignment",
        obtained: 18,
        maxMark: 20,
      },
      {
        exam: "Quiz",
        obtained: 9,
        maxMark: 10,
      },
      {
        exam: "Attendance",
        obtained: 5,
        maxMark: 5,
      },
    ],
    total: {
      obtained: 77,
      maxMark: 85,
    },
  },
  {
    course: "CSE1002",
    category: "theory",
    marks: [
      {
        exam: "Mid Term",
        obtained: 42,
        maxMark: 50,
      },
      {
        exam: "Assignment",
        obtained: 19,
        maxMark: 20,
      },
      {
        exam: "Quiz",
        obtained: 8,
        maxMark: 10,
      },
      {
        exam: "Attendance",
        obtained: 5,
        maxMark: 5,
      },
    ],
    total: {
      obtained: 74,
      maxMark: 85,
    },
  },
  {
    course: "CSE1003",
    category: "theory",
    marks: [
      {
        exam: "Mid Term",
        obtained: 48,
        maxMark: 50,
      },
      {
        exam: "Assignment",
        obtained: 20,
        maxMark: 20,
      },
      {
        exam: "Quiz",
        obtained: 10,
        maxMark: 10,
      },
      {
        exam: "Attendance",
        obtained: 4,
        maxMark: 5,
      },
    ],
    total: {
      obtained: 82,
      maxMark: 85,
    },
  },
];

export const mockUserInfo: UserInfo = {
  name: "Dev User",
  regNumber: "RA2011003010XXX",
  department: "Computer Science and Engineering",
  semester: "5",
  section: "A",
  mobile: "9876543210",
  program: "B.Tech",
  batch: "2021-2025",
};

export const mockCourses: CourseDetail[] = [
  {
    courseCode: "CSE1001",
    courseTitle: "Web Development",
    courseCredit: "3",
    courseType: "Theory",
    courseCategory: "theory",
    courseFaculty: "Dr. Smith",
    courseSlot: ["A1"],
    courseRoomNo: "A101",
  },
  {
    courseCode: "CSE1002",
    courseTitle: "Data Structures",
    courseCredit: "3",
    courseType: "Theory",
    courseCategory: "theory",
    courseFaculty: "Dr. Johnson",
    courseSlot: ["B1"],
    courseRoomNo: "A102",
  },
  {
    courseCode: "CSE1003",
    courseTitle: "Algorithms",
    courseCredit: "3",
    courseType: "Theory",
    courseCategory: "theory",
    courseFaculty: "Dr. Williams",
    courseSlot: ["C1"],
    courseRoomNo: "A103",
  },
  {
    courseCode: "CSE1004",
    courseTitle: "Database Systems",
    courseCredit: "2",
    courseType: "Lab",
    courseCategory: "practical",
    courseFaculty: "Dr. Brown",
    courseSlot: ["L1"],
    courseRoomNo: "LAB101",
  },
];

// Generate mock calendar data with current month format
const now = new Date();
const currentYear = String(now.getFullYear()).slice(-2);
const monthsShort = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const currentMonthIndex = now.getMonth();
const currentMonthName = `${monthsShort[currentMonthIndex]} '${currentYear}`;
const nextMonthIndex = (currentMonthIndex + 1) % 12;
const nextMonthName = `${monthsShort[nextMonthIndex]} '${currentYear}`;
const prevMonthIndex = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;
const prevYear = currentMonthIndex === 0 ? String(now.getFullYear() - 1).slice(-2) : currentYear;
const prevMonthName = `${monthsShort[prevMonthIndex]} '${prevYear}`;

export const mockCalendar: Month[] = [
  {
    month: prevMonthName,
    days: [
      { day: "Monday", date: "1", dayOrder: "1", event: "" },
      { day: "Tuesday", date: "2", dayOrder: "2", event: "" },
      { day: "Wednesday", date: "3", dayOrder: "3", event: "" },
      { day: "Thursday", date: "4", dayOrder: "4", event: "" },
      { day: "Friday", date: "5", dayOrder: "5", event: "" },
      { day: "Saturday", date: "6", dayOrder: "-", event: "" },
      { day: "Sunday", date: "7", dayOrder: "-", event: "" },
      { day: "Monday", date: "15", dayOrder: "1", event: "Holiday" },
      { day: "Tuesday", date: "26", dayOrder: "2", event: "Event" },
    ],
  },
  {
    month: currentMonthName,
    days: [
      { day: "Monday", date: "1", dayOrder: "1", event: "New Year" },
      { day: "Tuesday", date: "2", dayOrder: "2", event: "" },
      { day: "Wednesday", date: "3", dayOrder: "3", event: "" },
      { day: "Thursday", date: "4", dayOrder: "4", event: "" },
      { day: "Friday", date: "5", dayOrder: "5", event: "" },
      { day: "Saturday", date: "6", dayOrder: "-", event: "" },
      { day: "Sunday", date: "7", dayOrder: "-", event: "" },
      { day: "Monday", date: "15", dayOrder: "1", event: "Holiday" },
      { day: "Tuesday", date: "26", dayOrder: "2", event: "Republic Day" },
    ],
  },
  {
    month: nextMonthName,
    days: [
      { day: "Wednesday", date: "1", dayOrder: "1", event: "" },
      { day: "Thursday", date: "2", dayOrder: "2", event: "" },
      { day: "Friday", date: "3", dayOrder: "3", event: "" },
      { day: "Saturday", date: "4", dayOrder: "4", event: "" },
      { day: "Sunday", date: "5", dayOrder: "5", event: "" },
      { day: "Monday", date: "14", dayOrder: "1", event: "Valentine's Day" },
      { day: "Tuesday", date: "15", dayOrder: "2", event: "" },
      { day: "Wednesday", date: "16", dayOrder: "3", event: "" },
    ],
  },
];

export const mockDayOrder: DayOrderResponse = {
  dayOrder: "1",
  status: 200,
};

