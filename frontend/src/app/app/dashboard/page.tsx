"use client";
import React from "react";
import {
    Users,
    ArrowBigUpDash,
    Zap,
    MapPin,
    RotateCcw,
    Calendar as CalendarIcon,
    Equal
} from "lucide-react";
import { useAttendance, useTimetable, useMarks, useUserInfo, useDayOrder } from "@/hooks/query";
import { Card } from "@/app/components/ui/Card";
import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";
import ShinyText from '@/app/components/ShinyText';
import { TotalMarksCard } from "@/app/components/TotalMarksCard";

// Helper to parse time string "08:00 AM - 09:50 AM" to minutes from 8:00 AM
const parseTime = (timeStr: string) => {
    try {
        const [startStr] = timeStr.split("-").map(t => t.trim());

        const parseToMinutes = (t: string) => {
            const [time, modifier] = t.split(" ");
            let [hours, minutes] = time.split(":").map(Number);

            if (modifier === "PM" && hours < 12) hours += 12;
            if (modifier === "AM" && hours === 12) hours = 0;

            return hours * 60 + minutes;
        };

        return parseToMinutes(startStr);
    } catch (e) {
        return 0;
    }
};

const DashboardPage = () => {
    const { data: attendanceData } = useAttendance();
    const { data: timetableData, refetch: refetchTimetable, isFetching: isFetchingTimetable } = useTimetable();
    const { data: marksData } = useMarks();
    const { data: userInfo } = useUserInfo();
    const { data: dayOrderData, refetch: refetchDayOrder, isFetching: isFetchingDayOrder } = useDayOrder();

    // Calculate aggregate attendance
    const averageAttendance = attendanceData && attendanceData.length > 0
        ? (attendanceData.reduce((acc, curr) => acc + Number(curr.courseAttendance), 0) / attendanceData.length).toFixed(1)
        : "0.0";

    // Determine today's schedule based on day order from API
    let todayScheduleRaw = [] as any[];
    let dayOrderLabel = "";
    let isHoliday = false;

    if (dayOrderData && typeof dayOrderData.dayOrder !== "undefined") {
        const d = Number(dayOrderData.dayOrder);
        if (isNaN(d) || d === 0) {
            // Holiday or unknown
            isHoliday = true;
            dayOrderLabel = "Holiday";
            todayScheduleRaw = [];
        } else {
            const idx = d - 1;
            if (timetableData && timetableData.length > idx && idx >= 0) {
                todayScheduleRaw = timetableData[idx]?.class ?? [];
                dayOrderLabel = `Day ${d}`;
            } else if (timetableData && timetableData.length > 0) {
                // fallback to first day
                todayScheduleRaw = timetableData[0]?.class ?? [];
                dayOrderLabel = `Day ${d}`;
            }
        }
    } else {
        // No day order info; fallback to first day
        todayScheduleRaw = timetableData && timetableData.length > 0 ? timetableData[0]?.class : [];
        dayOrderLabel = timetableData && timetableData.length > 0 ? (timetableData[0]?.dayOrder ?? "") : "";
    }

    // Filter out empty classes and sort
    const sortedSchedule = [...(todayScheduleRaw || [])]
        .filter(cls => cls.isClass && cls.courseTitle) // Ensure it's a class and has a title
        .sort((a, b) => {
            return parseTime(a.time) - parseTime(b.time);
        });

    const currentDate = new Date();
    const dateNum = currentDate.getDate();
    const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });

    return (
        // OUTER WRAPPER: Full screen, no max-width, relative positioning
        <main className="relative min-h-screen w-full  overflow-hidden text-white selection:bg-gray bg-zinc-950">

            {/* === BACKGROUND LAYER (The "Slant" Fix) === */}
            <div
                className="fixed inset-0 z-0 pointer-events-none bg-gray opacity-0"
                style={{
                    backgroundImage: `
                        radial-gradient(circle at 100% 0%, rgba(227, 250, 110, 0) 0%, transparent 20%),
                        
                        linear-gradient(240deg, rgba(252, 255, 104, 0.3) 0%, rgba(198, 255, 105, 0.24) 13%, rgba(50, 211, 58, 0.15) 25%, rgba(97, 196, 196, 0.08) 35% , rgba(9, 9, 11, 0.06) 55%)
                    `
                }}
            >
                {/* Noise Texture (Keep this, it's crucial for the premium look) */}
                <div
                    className="absolute inset-0 opacity-[0.005] mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                    }}
                />
            </div>

            {/* === CONTENT LAYER === 
                Max-width constraint lives here, floats ON TOP of fixed background.
            */}
            <div className="relative z-10 flex flex-col h-full p-1 sm:p-6 md:p-8 mx-auto">

                {/* Header Section - Mobile Optimized */}
                <header className="flex flex-col space-y-4 sm:space-y-6 mb-8 mt-3 sm:mb-8 shrink-0">
                    {/* Date and Menu */}
                    <div className="flex justify-between items-start gap-4 mb-1">
                        <div className="flex items-baseline gap-3 pl-3">
                            {/* The Number: Huge, White, Tight */}
                            <h1 className="text-5xl sm:text-7xl md:text-8xl font-semibold text-white tracking-tighter font-sans mt-1">
                                {dateNum}
                            </h1>
                            <p> </p>
                            {/* The Day: Grey, Medium weight, blended into background */}
                            <span className="text-[35px] sm:text-3xl md:text-4xl text-zinc-500 font-semibold tracking-tight mt--1">
                                {dayName}
                            </span>
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-full mt-4 mr-0 pr-1.5 bg-zinc-900/50 text-zinc-400 hover:text-white hover:bg-white/10 transition-all shrink-0"
                            onClick={async () => {
                                // refetch both timetable and day order
                                try {
                                    await Promise.all([refetchTimetable?.(), refetchDayOrder?.()]);
                                } catch (e) {
                                    // ignore, react-query handles errors
                                }
                            }}
                            aria-label="Refresh timetable"
                        >
                            {(isFetchingTimetable || isFetchingDayOrder) ? <RotateCcw size={22} className="animate-spin" /> : <RotateCcw size={22} />}
                        </Button>
                    </div>

                    {/* Week Selector - Hidden on very small screens */}
                    {/* <div className="">
                    <WeekSelector />
                </div> */}
                    <div className="ml-3">
                        {/* <span className="text-zinc-200 text-2xl font-bold capitalize tracking-widest">
                    {userInfo?.name?.toLowerCase()}
                    </span> */}

                        <ShinyText
                            text={`${userInfo?.name?.toLowerCase()}`}
                            disabled={false}
                            speed={3}
                            className="text-2xl font-bold capitalize tracking-widest"
                        />
                    </div>
                </header>

                {/* Main Content - Mobile-first Vertical Stack */}
                <div className="flex-1 flex flex-col gap-4 sm:gap-6 min-h-0 overflow-y-auto custom-scrollbar relative z-10">

                    {/* Stats Cards - Full Width on Mobile, 2-column on sm and up */}
                    <div className="grid grid-cols-2 gap-4 sm:gap-6 shrink-0 h-auto">
                        {/* Attendance Stat */}
                        <Card className="p-4 sm:p-6 relative overflow-hidden group bg-zinc-900/20 glass backdrop-blur-md hover:bg-zinc-900/40 transition-all flex flex-col justify-between">
                            <div className="absolute top-0 right-0 p-4 sm:p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Users size={80} className="sm:size-100" />
                            </div>
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="flex justify-between items-start mb-4 sm:mb-6">
                                    <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Attendance</h3>
                                </div>
                                <div className="mt-4 sm:mt-6">
                                    <div className="flex items-baseline gap-1 mb-2 sm:mb-3">
                                        <span className="text-4xl sm:text-5xl font-medium text-white tracking-tighter font-display">{averageAttendance}</span>
                                        <span className="text-lg sm:text-xl text-emerald-500">%</span>
                                    </div>

                                    <div className="w-full bg-zinc-800/50 rounded-full h-1.5 overflow-hidden">
                                        <div
                                            className="bg-emerald-500 h-full rounded-full shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                                            style={{ width: `${averageAttendance}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Marks Stat using new Component */}
                        <TotalMarksCard marks={marksData || []} />
                    </div>

                    {/* Greeting Section */}
                    <div className="bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-lg p-4 sm:p-6 backdrop-blur-sm shrink-0">
                        <h2 className="text-xl sm:text-2xl font-medium text-white/90 leading-tight font-display">
                            Good morning.
                        </h2>
                        <p className="text-zinc-400 mt-2 text-sm sm:text-base">
                            You have <span className="text-emerald-400 font-medium">{sortedSchedule.length} classes</span> today.
                        </p>
                    </div>

                    {/* Schedule Section */}
                    <Card className="flex-1 p-0 flex flex-col bg-zinc-900/10 border-zinc-800/50 backdrop-blur-sm overflow-hidden shrink-0 sm:shrink">
                        <div className="p-4 sm:p-6 border-b border-zinc-800/50 flex justify-between items-center shrink-0">
                            <div>
                                <h2 className="text-base sm:text-lg font-medium text-white font-display">Today's Schedule</h2>
                                <div className="flex items-center gap-2 text-vertex-text-grey text-sm">
                                    <CalendarIcon size={14} />
                                    <span>{dayOrderLabel}</span>
                                </div>
                            </div>
                            <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
                                {isHoliday ? "Holiday" : `${sortedSchedule.length} Events`}
                            </span>
                        </div>

                        {/* Timeline View - Scrollable */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar relative min-h-0">
                            {/* Vertical Line - Hidden on mobile, shown on sm and up */}
                            <div className="hidden sm:block absolute left-20 top-6 bottom-6 w-px bg-zinc-800/50 z-0"></div>

                            <div className="space-y-4 sm:space-y-6 relative z-10">
                                {sortedSchedule.length > 0 ? (
                                    sortedSchedule.map((cls, i) => (
                                        <div key={i} className="group flex items-start gap-3 sm:gap-8">
                                            {/* Time Column */}
                                            <div className="w-12 sm:w-16 text-right shrink-0 pt-1">
                                                <p className="text-xs sm:text-sm font-medium text-white">{cls.time.split("-")[0]}</p>
                                                <p className="text-[9px] sm:text-[10px] text-zinc-500 mt-0.5">{cls.time.split("-")[1]}</p>
                                            </div>

                                            {/* Dot */}
                                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-zinc-900 border-2 border-zinc-700 group-hover:border-emerald-500 group-hover:bg-emerald-500 transition-all shrink-0 mt-1.5 shadow-sm"></div>

                                            {/* Card */}
                                            <div className="flex-1 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-zinc-800/50 bg-zinc-900/20 hover:bg-zinc-800/40 hover:border-zinc-700 transition-all group-hover:translate-x-1">
                                                <div className="flex justify-between items-start gap-2">
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-medium text-white text-sm sm:text-base mb-1 truncate">{cls.courseTitle}</h3>
                                                        <div className="flex items-center gap-2 text-xs text-zinc-400 flex-wrap">
                                                            <span className="flex items-center gap-1 truncate"><MapPin size={10} className="sm:size-3 shrink-0" /> {cls.courseRoomNo}</span>
                                                            <span className="px-2 py-0.5 rounded text-xs bg-zinc-800/50 text-zinc-300 border border-zinc-700/50 whitespace-nowrap">{cls.courseCode}</span>
                                                        </div>
                                                    </div>
                                                    <Badge variant={cls.courseType === "Practical" ? "warning" : "default"} className="shrink-0 text-[9px] sm:text-[10px]">
                                                        {cls.courseType || "Theory"}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 sm:py-20 text-zinc-500 flex flex-col items-center justify-center h-full">
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-zinc-900/20 flex items-center justify-center mb-3 sm:mb-4 border border-zinc-800">
                                            <Zap className="text-zinc-700" size={24} />
                                        </div>
                                        <p className="text-base sm:text-lg font-medium text-white">{isHoliday ? "No Classes today" : "No classes scheduled"}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </main>
    );
};

export default DashboardPage;
