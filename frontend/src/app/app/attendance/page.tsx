"use client";

import React, { useState } from "react";
import { useAttendance } from "@/hooks/query";
import { AttendanceDetail } from "srm-academia-api";
import { GlobalLoader } from "../components/loader";
import {
  TrendingUp,
  AlertTriangle,
  Calculator,
  CheckCircle2,
  XCircle,
  Info
} from "lucide-react";
import { Card } from "@/app/components/ui/Card";
import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";

const Page = () => {
  const { data, isPending } = useAttendance();

  if (isPending) return <GlobalLoader />;

  if (!data || data.length === 0)
    return (
      <div className="flex h-full w-full justify-center items-center text-vertex-text-grey">
        No attendance data found
      </div>
    );

  return (
    <div className="max-w-[1600px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end"> {/* Optional: z-10 ensures text stays clickable/sharp if blur overlaps too much */}
        <div>
          <h1 className="text-3xl font-medium text-white tracking-tight mb-2">Attendance</h1>
          <p className="text-vertex-text-grey max-w-2xl">
            Monitor your academic presence with precision.
            <span className="text-emerald-500"> Green bars</span> indicate safe zones, while
            <span className="text-red-400"> Red bars</span> require immediate attention.
          </p>
        </div>
      </div>

      {/* Theory Section */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-vertex-text-grey uppercase tracking-widest flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          Theory Modules
        </h2>
        <Data data={data} category="theory" />
      </div>

      {/* Practical Section */}
      <div className="space-y-4 pt-8">
        <h2 className="text-sm font-bold text-vertex-text-grey uppercase tracking-widest flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
          Practical Modules
        </h2>
        <Data data={data} category="practical" />
      </div>
    </div>
  );
};

export default Page;
const Data = ({
  data,
  category,
}: {
  data: AttendanceDetail[];
  category: string;
}) => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [missClasses, setMissClasses] = useState<number>(0);

  const filteredData = data.filter(
    (i) => i.courseCategory.toLowerCase() === category
  );

  const calculatePrediction = (item: AttendanceDetail, missedClasses: number) => {
    const currentAttended = item.courseConducted - item.courseAbsent;
    const totalAfterMissing = item.courseConducted + missedClasses;
    const newPercentage = totalAfterMissing > 0 ? (currentAttended / totalAfterMissing) * 100 : 0;
    return newPercentage.toFixed(2);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredData.map((item, i) => {
        const isSelected = selectedCourse === `${category}-${i}`;
        const attendance = Number(item.courseAttendance);
        const isSafe = attendance >= 75;
        const attended = item.courseConducted - item.courseAbsent;

        return (
          <Card
            key={i}
            className={`
                relative overflow-hidden transition-all duration-300 group cursor-pointer
                ${isSelected ? 'ring-1 ring-emerald-500/50 bg-zinc-900' : 'hover:bg-zinc-900'}
            `}
            onClick={() => setSelectedCourse(isSelected ? null : `${category}-${i}`)}
          >
            {/* Glow Effect */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${isSafe ? 'from-emerald-500/10' : 'from-red-500/10'} to-transparent blur-2xl -mr-10 -mt-10 pointer-events-none`}></div>

            <div className="p-6 relative z-10">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <Badge variant="outline" className="font-mono text-[10px]">
                  {item.courseCode}
                </Badge>
                <Badge variant={isSafe ? "success" : "danger"}>
                  {isSafe ? "Safe" : "Critical"}
                </Badge>
              </div>

              {/* Title */}
              <h3 className="text-lg font-medium text-white -mb-2 line-clamp-2 min-h-[3.5rem]">
                {item.courseTitle}
              </h3>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-4xl font-medium text-white tracking-tighter">
                    {attendance}%
                  </span>
                  <span className="text-xs text-vertex-text-grey mb-1">
                    Target: 75%
                  </span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden relative">
                  {/* Target Marker */}
                  <div className="absolute left-[75%] top-0 bottom-0 w-0.5 bg-white/20 z-20"></div>

                  {/* Bar */}
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out relative z-10 ${isSafe ? 'bg-emerald-signal shadow-glow-emerald' : 'bg-red-500 shadow-glow-red'}`}
                    style={{ width: `${attendance}%` }}
                  ></div>
                </div>
              </div>



              {/* Status Message */}
              <div className="flex items-center gap-2 text-xs text-vertex-text-grey">
                {item.courseAttendanceStatus?.status === "required" ? (
                  <>
                    <AlertTriangle size={14} className="text-red-400" />
                    <span>Need to attend <strong className="text-white">{item.courseAttendanceStatus.classes}</strong> more classes</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    <span className="text-white text-black">Margin - </span><span>Can miss <strong className="text-white">{item.courseAttendanceStatus?.classes}</strong> classes safely</span>
                  </>
                )}
              </div>

              {/* Prediction Calculator (Expandable) */}
              {isSelected && (
                <div className="mt-6 pt-6 border-t border-white/10 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center gap-2 mb-4 text-emerald-400">
                    <Calculator size={16} />
                    <span className="text-sm font-medium uppercase tracking-wider">Prediction Matrix</span>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-center">
                      <div className="text-xs text-vertex-text-grey uppercase tracking-wider mb-1">Total</div>
                      <div className="text-lg font-medium text-white">{item.courseConducted}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-center">
                      <div className="text-xs text-vertex-text-grey uppercase tracking-wider mb-1">Attended</div>
                      <div className="text-lg font-medium text-emerald-400">{attended}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-center">
                      <div className="text-xs text-vertex-text-grey uppercase tracking-wider mb-1">Missed</div>
                      <div className="text-lg font-medium text-red-400">{item.courseAbsent}</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-vertex-text-grey mb-2">
                        If I miss next...
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="0"
                          max="10"
                          value={missClasses}
                          onChange={(e) => setMissClasses(parseInt(e.target.value) || 0)}
                          className="flex-1 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500"
                        />
                        <span className="w-8 text-center font-mono text-white">{missClasses}</span>
                      </div>
                    </div>

                    {missClasses > 0 && (
                      <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex justify-between items-center">
                        <span className="text-xs text-vertex-text-grey">Projected Attendance</span>
                        <span className={`font-mono font-bold ${parseFloat(calculatePrediction(item, missClasses)) >= 75 ? 'text-emerald-400' : 'text-red-400'
                          }`}>
                          {calculatePrediction(item, missClasses)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
};
