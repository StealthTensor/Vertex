"use client";
import React from "react";
import { useCourse, useMarks } from "@/hooks/query";
import { GlobalLoader } from "../components/loader";
import { formatNumber, formatPercentage, roundTo } from "@/utils/number";

const PercentagePage = () => {
  const { data: marks, isPending } = useMarks();
  const { data: courses } = useCourse();

  if (isPending) return <GlobalLoader className="h-10 w-10 text-white" />;
  if (!marks || marks.length === 0)
    return (
      <div className="flex h-full w-full justify-center items-center">
        No data found
      </div>
    );

  const totalObtained = marks.reduce((acc, m) => acc + (m.total?.obtained || 0), 0);
  const totalMax = marks.reduce((acc, m) => acc + (m.total?.maxMark || 0), 0);
  const totalPercentage = totalMax > 0 ? (totalObtained / totalMax) * 100 : 0;
  const roundedTotalObtained = roundTo(totalObtained, 1);
  const roundedTotalMax = roundTo(totalMax, 1);
  const roundedTotalPercentage = formatPercentage(totalPercentage, 2);

  const normalize = (val?: string) => (val ?? "").replace(/\s+/g, "").toLowerCase();

  const withCourseMeta = marks.map((m) => {
    const c = courses?.find((cc) => normalize(cc.courseCode) === normalize(m.course));
    const percent = m.total?.maxMark ? (m.total.obtained / m.total.maxMark) * 100 : 0;
    const roundedPercent = roundTo(percent, 2);
    const roundedObtained = roundTo(m.total?.obtained || 0, 1);
    const roundedMax = roundTo(m.total?.maxMark || 0, 1);
    return {
      code: m.course,
      title: c?.courseTitle || m.course,
      type: m.category,
      percent: roundedPercent,
      obtained: roundedObtained,
      max: roundedMax,
    };
  });

  return (
    <div className="flex flex-col gap-6 py-2 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2 lg:px-5">
        <div className="rounded-xl apply-border-md bg-white/5 p-4 text-center">
          <div className="text-white/60 text-sm">Total Marks</div>
          <div className="text-white text-2xl font-semibold">{formatNumber(roundedTotalObtained, 1)} / {formatNumber(roundedTotalMax, 1)}</div>
        </div>
        <div className="rounded-xl apply-border-md bg-white/5 p-4 text-center">
          <div className="text-white/60 text-sm">Total Percentage</div>
          <div className="text-white text-2xl font-semibold">{roundedTotalPercentage}%</div>
        </div>
        <div className="rounded-xl apply-border-md bg-white/5 p-4 text-center">
          <div className="text-white/60 text-sm">Courses</div>
          <div className="text-white text-2xl font-semibold">{withCourseMeta.length}</div>
        </div>
      </div>

      <div className="py-2 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full grid gap-4 px-2 lg:px-5">
        {withCourseMeta.map((item) => (
          <div
            key={`${item.code}-${item.type ?? ""}`}
            className="rounded-xl apply-border-md bg-[#16171b] p-4 text-white/80 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-white font-medium truncate pr-2">{item.title}</span>
              <span className="px-2 py-0.5 rounded-lg text-sm bg-black text-white/80 apply-border-sm">{item.code}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">Marks</span>
              <span className="text-white">{formatNumber(item.obtained, 1)} / {formatNumber(item.max, 1)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">Percentage</span>
              <span className={item.percent >= 75 ? "text-green-400" : "text-yellow-300"}>{formatPercentage(item.percent, 2)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PercentagePage;
