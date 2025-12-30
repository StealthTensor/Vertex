"use client";
import { useCalendar } from "@/hooks/query";
import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from "lucide-react";
import { Month } from "srm-academia-api";
import { GlobalLoader } from "../components/loader";
import { formattedMonth, getIndex } from "@/utils/currentMonth";
import { Card } from "@/app/components/ui/Card";
import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";

const Page = () => {
  const { data, isPending } = useCalendar();
  if (isPending) return <main className="w-full text-white flex items-center justify-center p-4 h-screen"><GlobalLoader /></main>;
  if (!data || data.length === 0)
    return (
      <main className="flex h-screen w-full justify-center items-center text-zinc-500">
        No calendar data found
      </main>
    );
  return <DayChange data={data} />;
};

export default Page;

const DayChange = ({ data }: { data: Month[] }) => {
  const initialIndex = getIndex({ data });
  const [month, setMonth] = useState<number>(initialIndex >= 0 ? initialIndex : 0);

  // Ensure month index is valid
  useEffect(() => {
    if (month < 0 || month >= data.length) {
      setMonth(0);
    }
  }, [month, data.length]);

  // Guard against invalid data
  if (!data || data.length === 0 || !data[month]) {
    return (
      <main className="flex h-screen w-full justify-center items-center text-zinc-500">
        No calendar data available
      </main>
    );
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden min-h-screen pb-20">
      {/* Header */}
      <div className="w-full py-6 flex-none bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-10 border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => month > 0 && setMonth(month - 1)}
            disabled={month <= 0}
            className="text-zinc-400 hover:text-white disabled:opacity-30"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <div className="flex items-center gap-3">
            <CalendarIcon className="w-5 h-5 text-emerald-500 hidden sm:block" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight uppercase font-display">
              {data[month].month}
            </h1>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => month < data.length - 1 && setMonth(month + 1)}
            disabled={month >= data.length - 1}
            className="text-zinc-400 hover:text-white disabled:opacity-30"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto w-full">
        <div className="max-w-[1920px] mx-auto">
          <Data data={data} month={month} formattedMonth={formattedMonth} />
        </div>
      </div>
    </div>
  );
};

const Data = ({
  data,
  month,
  formattedMonth,
}: {
  data: Month[];
  month: number;
  formattedMonth: string;
}) => {
  const today = new Date();
  const currentDate = today.getDate().toString();
  const currentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentRef.current) {
      currentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      });
    }
  }, [month]);

  // Safety check
  if (!data || !data[month] || !data[month].days) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 p-4 sm:p-6">
      {data[month].days.map((item, i) => {
        const holiday = item.dayOrder === "-";
        const isCurrent =
          item.date === currentDate && formattedMonth === data[month].month;

        return (
          <Card
            key={i}
            // @ts-ignore
            ref={isCurrent ? currentRef : undefined}
            className={`
              flex flex-col justify-between p-5 min-h-[160px] transition-all duration-300
              ${holiday ? "bg-red-500/5 border-red-500/10" : "bg-zinc-900/20 border-zinc-800/50"}
              ${isCurrent ? "ring-2 ring-emerald-500 border-emerald-500/50 shadow-2xl shadow-emerald-500/10 bg-zinc-900/40" : "hover:border-zinc-700 hover:bg-zinc-900/40"}
            `}
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className={`text-3xl font-bold font-display tracking-tight ${isCurrent ? "text-emerald-400" : "text-white"}`}>
                  {item.date}
                </span>
                <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
                  {item.day}
                </span>
              </div>

              <div className="flex flex-col items-end gap-2">
                {isCurrent && (
                  <Badge variant="default" className="bg-emerald-500 text-black font-bold text-[10px] px-2 py-0.5">
                    TODAY
                  </Badge>
                )}
                <span className={`text-lg font-mono font-bold ${holiday ? "text-red-400" : "text-zinc-600"}`}>
                  {item.dayOrder}
                </span>
              </div>
            </div>

            {item.event.length !== 0 && (
              <div className="mt-4 pt-3 border-t border-dashed border-zinc-800/50">
                <p className="text-xs text-red-400 font-medium line-clamp-2">
                  {item.event}
                </p>
              </div>
            )}

            {!holiday && item.event.length === 0 && (
              <div className="mt-4 pt-3 border-t border-zinc-800/30 flex items-center gap-2 text-zinc-600">
                <Clock size={12} />
                <span className="text-[10px] uppercase">Regular Schedule</span>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
};
