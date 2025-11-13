"use client";
import { useAttendance } from "@/hooks/query";
import React, { useState } from "react";
import { AttendanceDetail } from "srm-academia-api";
import { GlobalLoader } from "../components/loader";
import { Calculator, TrendingUp, AlertTriangle } from "lucide-react";

const Page = () => {
  const { data, isPending } = useAttendance();
  if (isPending) return <GlobalLoader className="h-10 w-10 text-blue-400" />;
  if (!data || data.length === 0)
    return (
      <div className="flex h-full w-full justify-center items-center">
        No data found
      </div>
    );

  return (
    <div className="flex flex-col gap-4 py-2 ">
      <div className="vertex-card p-6 mb-4">
        <h1 className="text-2xl vertex-heading flex items-center gap-2">
          <TrendingUp size={24} />
          ATTENDANCE
        </h1>
        <p className="vertex-body text-white/70 mt-2">
          Monitor attendance protocols and predict system thresholds
        </p>
      </div>
      
      <h1 className="text-2xl vertex-heading">THEORY MODULES</h1>
      <Data data={data} category="theory" />
      <h1 className="text-2xl vertex-heading">PRACTICAL MODULES</h1>
      <Data data={data} category="practical" />
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
    <div className=" py-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full grid gap-4 px-2 lg:px-5 auto-rows-[minmax(14rem,auto)]">
      {filteredData.map((item, i) => {
        const isSelected = selectedCourse === `${category}-${i}`;
        return (
          <div
            key={i}
            className="vertex-card vertex-hover-lift vertex-transition cursor-pointer min-h-56"
            onClick={() => setSelectedCourse(isSelected ? null : `${category}-${i}`)}
          >
            <div className="w-full h-full text-white/70 flex flex-col gap-4 p-4">
              <div className="flex justify-between w-full items-center border-b border-white/20 pb-3">
                <div className="flex gap-1 vertex-card-subtle px-2 py-0.5 text-sm">
                  <span className="vertex-card-subtle px-2.5 py-0.5 text-xs text-white">
                    {item.courseConducted}
                  </span>
                  <span className="vertex-card-subtle px-2.5 py-0.5 text-xs">
                    {item.courseConducted - item.courseAbsent}
                  </span>
                </div>
                <span className="text-white vertex-body font-medium">{item.courseCode}</span>
                <span
                  className={`px-3 py-1 text-sm font-semibold vertex-card-subtle ${
                    Number(item.courseAttendance) >= 75
                      ? "text-green-400 border-green-400/50"
                      : "vertex-error-text border-red-500/50"
                  }`}
                >
                  {item.courseAttendance}%
                </span>
              </div>
              <div className="flex-1 flex items-center justify-center w-full mx-auto text-white text-center vertex-heading font-medium">
                {item.courseTitle}
              </div>
              <div className="flex justify-between w-full items-center pt-3 border-t border-white/20">
                <span className="vertex-card-subtle px-3 py-1 text-xs vertex-body">
                  {item.courseCategory}
                </span>
                <div className="flex gap-1 vertex-card-subtle pl-2 pr-1 py-0.5 text-sm items-center">
                  <span className="uppercase vertex-body text-xs">
                    {item.courseAttendanceStatus?.status}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium vertex-card ${
                      item.courseAttendanceStatus?.status === "required"
                        ? "vertex-error-text"
                        : "text-green-400"
                    }`}
                  >
                    {item.courseAttendanceStatus?.classes}
                  </span>
                </div>
              </div>
              
              {/* Attendance Prediction Section */}
              {isSelected && (
                <div className="vertex-card p-4 mt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Calculator size={16} className="text-[var(--accent)]" />
                    <h3 className="vertex-heading font-semibold text-white">PREDICTION MATRIX</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm vertex-body text-white/70 mb-1">
                        Classes you plan to miss:
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={missClasses}
                        onChange={(e) => setMissClasses(parseInt(e.target.value) || 0)}
                        className="vertex-input w-full"
                      />
                    </div>
                    {missClasses > 0 && (
                      <div className="vertex-card-subtle p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle size={16} className="text-yellow-400" />
                          <span className="text-sm vertex-heading font-medium text-white">PREDICTION RESULT</span>
                        </div>
                        <p className="text-sm vertex-body text-white/70">
                          After missing <strong>{missClasses}</strong> classes, your attendance will be:
                        </p>
                        <p className={`text-lg font-bold mt-1 ${
                          parseFloat(calculatePrediction(item, missClasses)) >= 75
                            ? 'text-green-400'
                            : 'vertex-error-text'
                        }`}>
                          {calculatePrediction(item, missClasses)}%
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
