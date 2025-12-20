import React from "react";
import {
    Users,
    ArrowBigUpDash,
    MapPin,
    Equal
} from "lucide-react";
import { Card } from "@/app/components/ui/Card";
import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";
import WeekSelector from "@/app/components/WeekSelector";

export const DashboardPreview = () => {
    // Mock Data
    const averageAttendance = "88.5";
    const totalMarks = 274;
    const maxMarks = 320;
    const sortedSchedule = [
        { time: "09:00 - 10:30", courseTitle: "CS 314: Data Structures", courseRoomNo: "GDC 2.216", courseCode: "CS 314", courseType: "Theory" },
        { time: "12:00 - 01:00", courseTitle: "Lunch", courseRoomNo: "Cafeteria", courseCode: "BREAK", courseType: "Personal" },
        { time: "02:00 - 03:30", courseTitle: "CS 331: Algorithms", courseRoomNo: "GDC 6.302", courseCode: "CS 331", courseType: "Theory" },
    ];
    // Mock Date: Friday, Nov 21 matches the preview expectation usually or just a nice static date
    const dateNum = 21;
    const dayName = "Friday";
    const mockDate = new Date('2025-11-21T12:00:00');

    return (
        <div className="w-full max-w-5xl mx-auto p-1 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm border border-white/10 shadow-2xl overflow-hidden">
            <div className="bg-[#09090b] rounded-xl overflow-hidden relative min-h-[600px] flex flex-col">
                {/* Browser Bar Mock */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-[#1A1A1A] border border-white/10 rounded-full px-4 py-1 flex items-center gap-2 shadow-lg z-50">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-[10px] text-gray-400 font-mono">vertex.app/dashboard</span>
                </div>

                {/* Dashboard Content */}
                <div className="relative flex flex-col h-full w-full overflow-hidden text-white selection:bg-lime-500/30">

                    {/* Exact Background from Dashboard */}
                    <div
                        className="absolute inset-0 z-0 pointer-events-none bg-gray"
                        style={{
                            backgroundImage: `
                                radial-gradient(circle at 100% 0%, rgba(227, 250, 110, 0.3) 0%, transparent 20%),
                                linear-gradient(225deg, rgba(132, 204, 22, 0.4) 0%, rgba(50, 211, 171, 0.2) 20%, rgba(61, 73, 73, 0.1) 45% , rgba(9, 9, 11, 0.4) 55%)
                            `
                        }}
                    >
                        <div
                            className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                            }}
                        />
                    </div>

                    <div className="relative z-10 flex flex-col h-full p-6 md:p-8 mx-auto w-full">
                        {/* Header */}
                        <header className="flex flex-col space-y-4 sm:space-y-6 mb-6 mt-8 shrink-0">
                            <div className="flex justify-between items-start gap-4 mb-1">
                                <div className="flex items-baseline gap-3 pl-3">
                                    <h1 className="text-5xl sm:text-7xl font-semibold text-white tracking-tighter font-sans mt-1">
                                        {dateNum}
                                    </h1>
                                    <span className="text-3xl sm:text-3xl text-zinc-500 font-semibold tracking-tight">
                                        {dayName}
                                    </span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="rounded-full mt-4 mr-0 pr-1.5 bg-zinc-900/50 text-zinc-400 hover:text-white hover:bg-white/10 transition-all shrink-0"
                                >
                                    <Equal size={30} />
                                </Button>
                            </div>

                            <div>
                                <WeekSelector currentDate={mockDate} />
                            </div>
                        </header>

                        {/* Main Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                            {/* Left Column */}
                            <div className="flex flex-col gap-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <Card className="p-4 relative overflow-hidden group bg-zinc-900/20 border-zinc-800/10 backdrop-blur-md hover:bg-zinc-900/40 transition-all">
                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <Users size={60} />
                                        </div>
                                        <div className="relative z-10">
                                            <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-4">Attendance</h3>
                                            <div className="flex items-baseline gap-1 mb-2">
                                                <span className="text-4xl font-medium text-white tracking-tighter font-display">{averageAttendance}</span>
                                                <span className="text-lg text-emerald-500">%</span>
                                            </div>
                                            <div className="w-full bg-zinc-800/50 rounded-full h-1.5 overflow-hidden">
                                                <div className="bg-emerald-500 h-full rounded-full shadow-[0_0_10px_rgba(16,185,129,0.4)]" style={{ width: `${averageAttendance}%` }}></div>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="p-4 relative overflow-hidden group bg-zinc-900/20 border-zinc-800/50 backdrop-blur-md hover:bg-zinc-900/40 transition-all">
                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <ArrowBigUpDash size={60} />
                                        </div>
                                        <div className="relative z-10">
                                            <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-4">Performance</h3>
                                            <div className="flex items-baseline gap-1 mb-2">
                                                <span className="text-4xl font-medium text-white tracking-tighter font-display">{totalMarks}</span>
                                                <span className="text-sm text-zinc-500">/ {maxMarks}</span>
                                            </div>
                                            <div className="w-full bg-zinc-800/50 rounded-full h-1.5 overflow-hidden">
                                                <div className="bg-emerald-500 h-full rounded-full w-[85%] shadow-[0_0_10px_rgba(16,185,129,0.3)]"></div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                                <div className="bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-lg p-6 backdrop-blur-sm">
                                    <h2 className="text-xl font-medium text-white/90 leading-tight font-display">
                                        Good morning.
                                    </h2>
                                    <p className="text-zinc-400 mt-2 text-sm">
                                        You have <span className="text-emerald-400 font-medium">{sortedSchedule.length} classes</span> today.
                                    </p>
                                </div>
                            </div>

                            {/* Right Column: Schedule */}
                            <Card className="flex-1 p-0 flex flex-col bg-zinc-900/10 border-zinc-800/50 backdrop-blur-sm overflow-hidden min-h-[300px]">
                                <div className="p-6 border-b border-zinc-800/50 flex justify-between items-center">
                                    <h2 className="text-lg font-medium text-white font-display">Today's Schedule</h2>
                                    <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
                                        {sortedSchedule.length} Events
                                    </span>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar relative">
                                    <div className="space-y-6 relative z-10">
                                        {/* Vertical Line */}
                                        <div className="absolute left-16 top-2 bottom-2 w-px bg-zinc-800/50 z-0"></div>

                                        {sortedSchedule.map((cls, i) => (
                                            <div key={i} className="group flex items-start gap-6">
                                                <div className="w-12 text-right shrink-0 pt-1">
                                                    <p className="text-sm font-medium text-white">{cls.time.split("-")[0]}</p>
                                                    <p className="text-[10px] text-zinc-500 mt-0.5">{cls.time.split("-")[1]}</p>
                                                </div>

                                                <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border-2 border-zinc-700 group-hover:border-emerald-500 group-hover:bg-emerald-500 transition-all shrink-0 mt-1.5 shadow-sm relative z-10"></div>

                                                <div className="flex-1 p-3 rounded-xl border border-zinc-800/50 bg-zinc-900/20 hover:bg-zinc-800/40 hover:border-zinc-700 transition-all group-hover:translate-x-1">
                                                    <div className="flex justify-between items-start gap-2">
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="font-medium text-white text-base mb-1 truncate">{cls.courseTitle}</h3>
                                                            <div className="flex items-center gap-2 text-xs text-zinc-400">
                                                                <span className="flex items-center gap-1"><MapPin size={10} /> {cls.courseRoomNo}</span>
                                                                <span className="px-2 py-0.5 rounded text-xs bg-zinc-800/50 text-zinc-300 border border-zinc-700/50">{cls.courseCode}</span>
                                                            </div>
                                                        </div>
                                                        <Badge variant={cls.courseType === "Theory" ? "default" : "warning"} className="text-[10px]">
                                                            {cls.courseType}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

