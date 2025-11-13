"use server";
import { redirect } from "next/navigation";
import { isDevToken } from "@/utils/devMode";
import {
  mockTimetable,
  mockAttendance,
  mockMarks,
  mockUserInfo,
  mockCourses,
  mockCalendar,
  mockDayOrder,
} from "@/utils/mockData";
import { api } from "@/lib/api";
import { cookies } from "next/headers";

const normalize = (val?: string) =>
  (val ?? "")
    .toString()
    .trim()
    .replace(/\s+/g, "")
    .toLowerCase();

const toFixed2 = (value: number) => Number.isFinite(value) ? value.toFixed(2) : "0.00";

type CourseLite = {
  courseCode: string;
  courseTitle: string;
  courseCredit: number;
  courseCategory: string;
  courseType: string;
  courseFaculty: string;
  courseSlot: string[];
  courseRoomNo: string;
};

// Helper function to get the token value
async function getToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    throw new Error("Missing authentication token");
  }
  return token;
}

async function getAllCourses(): Promise<CourseLite[]> {
  const token = await getToken();
  if (isDevToken(token)) return mockCourses;

  try {
    const res: any = await api.courses(token);
    const rawList =
      (Array.isArray(res?.courseList) && res.courseList) ||
      (Array.isArray(res?.courses) && res.courses) ||
      (Array.isArray(res?.data?.courseList) && res.data.courseList) ||
      [];

    return rawList
      .map((course: any) => {
        const slot = course?.courseSlot ?? course?.slot ?? course?.Slot ?? [];
        const slotArray = Array.isArray(slot)
          ? slot
          : typeof slot === "string"
          ? slot
              .split(/[,/|-]/)
              .map((s) => s.trim())
              .filter(Boolean)
          : [];

        const creditRaw =
          course?.Credit ??
          course?.credit ??
          course?.credits ??
          course?.courseCredit ??
          course?.CourseCredit ??
          "0";

        return {
          courseCode: String(course?.courseCode ?? course?.code ?? course?.CourseCode ?? "").trim(),
          courseTitle: String(course?.courseTitle ?? course?.title ?? course?.CourseTitle ?? "").trim(),
          courseCredit: Number(creditRaw),
          courseCategory: String(course?.courseCategory ?? course?.category ?? course?.CourseCategory ?? "").toLowerCase(),
          courseType: String(course?.courseType ?? course?.type ?? course?.CourseType ?? "").trim(),
          courseFaculty: String(course?.courseFaculty ?? course?.faculty ?? course?.CourseFaculty ?? "").trim(),
          courseSlot: slotArray,
          courseRoomNo: String(course?.courseRoomNo ?? course?.roomNo ?? course?.CourseRoomNo ?? "").trim(),
        };
      })
      .filter((course: CourseLite) => course.courseCode.length > 0);
  } catch (e: any) {
    if (e?.status === 404 || e?.status === 401) redirect("/auth/logout");
    return [];
  }
}

// ------------------------------------------------------------------
// ✅ FIXED: Login now saves the cookie!
// ------------------------------------------------------------------
export async function serverLogin(params: {
  account: string;
  password: string;
  cdigest?: string;
  captcha?: string;
}) {
  const res: any = await api.login(params);
  
  // 🔍 DEBUGGING: Print what the backend actually sent us
  console.log("🔐 DEBUG LOGIN RESPONSE:", JSON.stringify(res, null, 2));

  // Check ALL possible places the token might be hiding
  const token = res?.token || res?.data?.token || res?.body?.token;

  if (token) {
    console.log("✅ Saving Token to Cookie:", token.substring(0, 10) + "...");
    
    (await cookies()).set("token", token, {
      secure: true,            // Required for Vercel
      httpOnly: true,          // Security
      path: "/",               // Valid for whole site
      maxAge: 60 * 60 * 24 * 30, // 30 Days
      sameSite: "lax",         
    });
  } else {
    console.error("❌ Login successful but NO TOKEN found in response!");
  }

  return { res };
}

// ------------------------------------------------------------------
// ✅ FIXED: Logout now deletes the cookie!
// ------------------------------------------------------------------
export async function getLogout() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // Delete the cookie locally
  cookieStore.delete("token");

  if (!token) return { res: { success: true } };

  if (isDevToken(token)) {
    return { res: { success: true } };
  }
  
  try {
      const res = await api.logout(token);
      return { res };
  } catch(e) {
      // Ignore backend errors during logout, just ensure frontend is clear
      return { res: { success: true } };
  }
}

export async function timetable() {
  const token = await getToken();
  if (isDevToken(token)) {
    return {
      data: {
        timetable: mockTimetable,
        error: null,
        stale: false,
      },
    };
  }
  try {
    const res: any = await api.timetable(token);
    const schedule = Array.isArray(res?.schedule) ? res.schedule : [];
    const times = [
      "08:00 AM - 08:50 AM",
      "08:50 AM - 09:40 AM",
      "09:45 AM - 10:35 AM",
      "10:40 AM - 11:30 PM",
      "11:35 PM - 12:25 PM",
      "12:30 PM - 01:20 PM",
      "01:25 PM - 02:15 PM",
      "02:20 PM - 03:10 PM",
      "03:10 PM - 04:00 PM",
      "04:00 PM - 04:50 PM",
    ];
    const timetable = schedule.map((d: any) => {
      const table = Array.isArray(d?.table) ? d.table : [];
      const classes = table.map((it: any, idx: number) => {
        if (!it) {
          return {
            time: times[idx] || "",
            courseCode: "",
            courseTitle: "",
            courseRoomNo: "",
            courseType: "",
            slot: "",
            isClass: false,
          };
        }
        const ct = it?.courseType ?? it?.CourseType ?? "";
        const courseType = String(ct).toLowerCase().startsWith("p") ? "Lab" : "Theory";
        return {
          time: times[idx] || "",
          courseCode: it?.code ?? it?.Code ?? "",
          courseTitle: it?.name ?? it?.Name ?? "",
          courseRoomNo: it?.roomNo ?? it?.RoomNo ?? "",
          courseType,
          slot: it?.slot ?? it?.Slot ?? "",
          isClass: true,
        };
      });
      return {
        dayOrder: `Day ${d?.day ?? ""}`,
        class: classes,
      };
    });
    const stale = res?.stale === true;
    const data = { timetable, error: null, status: 200, stale } as any;
    return { data };
  } catch (e: any) {
    if (e?.status === 404 || e?.status === 401) redirect("/auth/logout");
    return { data: { timetable: [], error: e?.message ?? "Failed to fetch", status: e?.status ?? 500, stale: false } as any };
  }
}

export async function attendance() {
  const token = await getToken();
  if (isDevToken(token)) {
    return {
      data: {
        attendance: mockAttendance,
        error: null,
      },
    };
  }
  try {
    const [res, courseList] = await Promise.all([api.attendance(token), getAllCourses()]);
    const parsed =
      (Array.isArray(res?.attendance) && res.attendance) ||
      (Array.isArray(res?.data?.attendance) && res.data.attendance) ||
      [];
    const attendance = parsed.map((it: any) => {
      const conducted = Number(
        it?.hoursConducted ??
          it?.HoursConducted ??
          it?.courseConducted ??
          it?.HoursHeld ??
          it?.conducted ??
          0
      );
      const absent = Number(
        it?.hoursAbsent ?? it?.HoursAbsent ?? it?.courseAbsent ?? it?.absent ?? 0
      );
      const present = Math.max(0, conducted - absent);
      const percentRaw =
        it?.attendancePercentage ??
        it?.AttendancePercentage ??
        it?.courseAttendance ??
        (conducted > 0 ? (present / conducted) * 100 : 0);
      const percent = Number(parseFloat(String(percentRaw)).toFixed(2));

      let classes = 0;
      let status: "required" | "margin" = "margin";
      const target = 0.75;
      if (conducted > 0) {
        if (percent < 75) {
          status = "required";
          classes = Math.max(
            0,
            Math.ceil(((target * conducted - present) / (1 - target)) || 0)
          );
        } else {
          status = "margin";
          classes = Math.max(0, Math.floor(present / target - conducted));
        }
      }

      const code = String(it?.courseCode ?? it?.CourseCode ?? "").trim();
      const course = courseList.find((c) => normalize(c.courseCode) === normalize(code));
      const rawType = String(it?.category ?? it?.Category ?? it?.courseType ?? it?.CourseType ?? "").toLowerCase();
      const rawSlot = String(it?.slot ?? it?.Slot ?? "").toUpperCase();

      const derivedCategory =
        rawType.startsWith("p") ||
        rawType.includes("lab") ||
        rawSlot.startsWith("L") || 
        rawSlot.startsWith("P") ||
        (course?.courseType && course.courseType.toLowerCase().startsWith("p"))
          ? "practical"
          : "theory";
      const faculty =
        it?.facultyName ??
        it?.FacultyName ??
        it?.courseFaculty ??
        it?.CourseFaculty ??
        course?.courseFaculty ??
        "";
      const slotRaw =
        it?.slot ??
        it?.Slot ??
        it?.courseSlot ??
        it?.CourseSlot ??
        (course?.courseSlot || []);
      const slot =
        Array.isArray(slotRaw) && slotRaw.length > 0
          ? slotRaw.join(" , ")
          : String(slotRaw ?? "");

      return {
        courseCode: code,
        courseTitle:
          String(it?.courseTitle ?? it?.CourseTitle ?? "").trim() ||
          course?.courseTitle ||
          code,
        courseCategory: derivedCategory,
        courseSlot: slot.toUpperCase().startsWith("P") ? "LAB" : slot,
        courseFaculty: String(faculty).split("(")[0].trim(),
        courseAttendance: toFixed2(percent),
        courseConducted: conducted,
        courseAbsent: absent,
        courseAttendanceStatus: { status, classes },
      };
    });
    const stale = res?.stale === true;
    const data = { attendance, error: null, status: 200, stale } as any;
    return { data };
  } catch (e: any) {
    if (e?.status === 404 || e?.status === 401) redirect("/auth/logout");
    return { data: { attendance: [], error: e?.message ?? "Failed to fetch", status: e?.status ?? 500, stale: false } as any };
  }
}

export async function marks() {
  const token = await getToken();
  if (isDevToken(token)) {
    return {
      data: {
        markList: mockMarks,
        error: null,
      },
    };
  }
  try {
    const [res, courseList] = await Promise.all([api.marks(token), getAllCourses()]);
    const list =
      (Array.isArray(res?.marks) && res.marks) ||
      (Array.isArray(res?.markList) && res.markList) ||
      (Array.isArray(res?.data?.markList) && res.data.markList) ||
      [];
    const markList = list.map((m: any) => {
      const code = String(m?.courseCode ?? m?.course ?? m?.CourseCode ?? "").trim();
      const ctRaw = String(m?.courseType ?? m?.category ?? m?.CourseType ?? "").trim();
      const course = courseList.find((c) => normalize(c.courseCode) === normalize(code));
      const category =
        ctRaw.toLowerCase().startsWith("p") ||
        course?.courseType.toLowerCase().startsWith("p")
          ? "practical"
          : "theory";

      const marksSource = Array.isArray(m?.marks)
        ? m.marks
        : Array.isArray(m?.testPerformance)
        ? m.testPerformance
        : Array.isArray(m?.TestPerformance)
        ? m.TestPerformance
        : [];
      const marks = marksSource.map((t: any) => ({
        exam: String(t?.exam ?? t?.test ?? t?.Test ?? "").trim(),
        obtained: Number(
          t?.obtained ??
            t?.marks?.scored ??
            t?.marks?.Scored ??
            t?.Marks?.Scored ??
            t?.score ??
            0
        ),
        maxMark: Number(
          t?.maxMark ??
            t?.marks?.total ??
            t?.marks?.Total ??
            t?.Marks?.Total ??
            t?.total ??
            0
        ),
      }));

      const totalObtained =
        m?.overall?.scored ??
        m?.overall?.Scored ??
        m?.Overall?.Scored ??
        m?.total?.obtained ??
        m?.Total?.obtained ??
        0;
      const totalMax =
        m?.overall?.total ??
        m?.overall?.Total ??
        m?.Overall?.Total ??
        m?.total?.maxMark ??
        m?.Total?.maxMark ??
        0;

      return {
        course: code,
        credits: course?.courseCredit ?? 0,
        category,
        marks,
        total: {
          obtained: Number(totalObtained ?? 0),
          maxMark: Number(totalMax ?? 0),
        },
      };
    });
    const stale = res?.stale === true;
    const data = { markList, error: null, status: 200, stale } as any;
    return { data };
  } catch (e: any) {
    if (e?.status === 404 || e?.status === 401) redirect("/auth/logout");
    return { data: { markList: [], error: e?.message ?? "Failed to fetch", status: e?.status ?? 500, stale: false } as any };
  }
}

export async function Calendar() {
  const token = await getToken();
  if (isDevToken(token)) {
    return {
      data: {
        calendar: mockCalendar,
        error: null,
      },
    };
  }
  try {
    const res: any = await api.calendar(token);
    if (res?.status === 404) redirect("/auth/logout");

    const calendarRaw =
      (Array.isArray(res?.calendar) && res.calendar) ||
      (Array.isArray(res?.months) && res.months) ||
      (Array.isArray(res?.data?.calendar) && res.data.calendar) ||
      [];

    const calendar = calendarRaw.map((month: any) => ({
      month: String(month?.month ?? month?.Month ?? "").trim(),
      days: Array.isArray(month?.days)
        ? month.days.map((day: any) => ({
            day: String(day?.day ?? day?.Day ?? "").trim(),
            date: String(day?.date ?? day?.Date ?? "").trim(),
            dayOrder: String(day?.dayOrder ?? day?.DayOrder ?? "").trim(),
            event: String(day?.event ?? day?.Event ?? "").trim(),
          }))
        : [],
    }));

    return {
      data: {
        calendar,
        error: null,
        status: res?.status ?? res?.Status ?? 200,
      },
    };
  } catch (e: any) {
    if (e?.status === 404 || e?.status === 401) redirect("/auth/logout");
    return {
      data: {
        calendar: [],
        error: e?.message ?? "Failed to fetch calendar",
        status: e?.status ?? 500,
      },
    };
  }
}

export async function Course() {
  const token = await getToken();
  if (isDevToken(token)) {
    return {
      data: {
        courseList: mockCourses,
        error: null,
      },
    };
  }
  try {
    const courseList = await getAllCourses();
    const res: any = await api.courses(token);
    if (res?.status === 404) redirect("/auth/logout");
    
    const stale = res?.stale === true;
    return {
      data: {
        courseList,
        batch: res?.batch ?? res?.data?.batch ?? "",
        error: null,
        status: res?.status ?? 200,
        stale,
      },
    };
  } catch (e: any) {
    if (e?.status === 404 || e?.status === 401) redirect("/auth/logout");
    return {
      data: {
        courseList: [],
        error: e?.message ?? "Failed to fetch courses",
        status: e?.status ?? 500,
        stale: false,
      },
    };
  }
}

export async function userInfo() {
  const token = await getToken();
  if (isDevToken(token)) {
    return {
      data: {
        userInfo: mockUserInfo,
        error: null,
      },
    };
  }
  try {
    const res: any = await api.user(token);
    const userInfo = {
      name: res?.name ?? res?.Name ?? "",
      regNumber: res?.regNumber ?? res?.RegNumber ?? "",
      department: res?.department ?? res?.Department ?? "",
      semester: String(res?.semester ?? res?.Semester ?? ""),
      section: res?.section ?? res?.Section ?? "",
      mobile: res?.mobile ?? res?.Mobile ?? "",
      program: res?.program ?? res?.Program ?? "",
      batch: res?.batch ?? res?.Batch ?? "",
    } as any;
    const data = { userInfo, error: null, status: 200 } as any;
    return { data };
  } catch (e: any) {
    if (e?.status === 404 || e?.status === 401) redirect("/auth/logout");
    return { data: { userInfo: null, error: e?.message ?? "Failed to fetch", status: e?.status ?? 500 } as any };
  }
}

export async function dayOrder() {
  const token = await getToken();
  if (isDevToken(token)) {
    return {
      data: {
        ...mockDayOrder,
        error: null,
      },
    };
  }
  try {
    const cal: any = await api.calendar(token);
    const dayOrder = String(cal?.today?.dayOrder || cal?.Today?.dayOrder || cal?.Today?.DayOrder || "0");
    const data = { dayOrder, status: 200 } as any;
    return { data };
  } catch (e: any) {
    if (e?.status === 404 || e?.status === 401) redirect("/auth/logout");
    return { data: { dayOrder: "0", status: e?.status ?? 500, error: e?.message ?? "Failed to fetch" } as any };
  }
}
