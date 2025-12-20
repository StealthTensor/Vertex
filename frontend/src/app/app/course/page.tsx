"use client";

import { useCourse } from "@/hooks/query";
import React from "react";
import { CourseDetail } from "srm-academia-api";
import { GlobalLoader } from "../components/loader";
import { Card } from "@/app/components/ui/Card";
import { Badge } from "@/app/components/ui/Badge";
import { Book, User, MapPin, Clock, ChevronLeft } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const { data, isPending } = useCourse();
  if (isPending) return <GlobalLoader className="h-10 w-10 text-white" />;
  if (!data || data.length === 0)
    return (
      <div className="flex h-full w-full justify-center items-center text-zinc-500">
        No course data found
      </div>
    );

  return (
    <main className="flex flex-col gap-6 py-6 pb-20 px-4 sm:px-6 w-full max-w-5xl mx-auto min-h-screen">
      <div className="absolute top-6 left-6 bg-zinc-900/50 p-3 rounded-full border border-zinc-800"><Link href="/app/settings"><ChevronLeft size={24} /></Link></div>
      <div className="flex items-center gap-2 mb-2 mt-10">
        <Book size={20} className="text-emerald-500" />
        <h1 className="text-2xl font-semibold text-white tracking-tight">Registered Courses</h1>
        <Badge className="bg-zinc-800 text-zinc-400 ml-2">{data.length}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Data data={data} />
      </div>
    </main>
  );
};

export default Page;

const Data = ({ data }: { data: CourseDetail[] }) => {
  return (
    <>
      {data.map((item, i) => {
        return (
          <Card key={i} className="flex flex-col p-5 bg-zinc-900/20 border-zinc-800/50 hover:bg-zinc-900/40 transition-colors group gap-4">

            <div className="flex justify-between items-start gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-zinc-500 bg-zinc-800/50 px-1.5 py-0.5 rounded border border-zinc-800">
                    {item.courseCode}
                  </span>
                  <Badge variant="outline" className={`text-[10px] px-1.5 py-0 border-zinc-700 text-zinc-400 font-normal uppercase`}>
                    {item.courseType}
                  </Badge>
                </div>
                <h3 className="font-medium text-white text-base leading-snug">
                  {item.courseTitle}
                </h3>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className="text-xs text-zinc-500 mb-1">Credits</span>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 text-white font-bold text-sm">
                  {item.courseCredit}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800/50 grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
              <div className="col-span-2 flex items-center gap-2 text-zinc-400">
                <User size={14} className="text-zinc-500 shrink-0" />
                <span className="text-zinc-300 truncate">{item.courseFaculty}</span>
              </div>

              <div className="flex items-center gap-2 text-zinc-400">
                <Clock size={14} className="text-zinc-500 shrink-0" />
                <span className="text-zinc-300 font-mono text-xs max-w-full truncate" title={Array.isArray(item.courseSlot) ? item.courseSlot.join(", ") : item.courseSlot}>
                  {Array.isArray(item.courseSlot) ? item.courseSlot.join(", ") : item.courseSlot}
                </span>
              </div>

              <div className="flex items-center gap-2 text-zinc-400 text-right justify-end">
                <MapPin size={14} className="text-zinc-500 shrink-0" />
                <span className="text-zinc-300 font-mono text-xs">{item.courseRoomNo || "N/A"}</span>
              </div>
            </div>

          </Card>
        );
      })}
    </>
  );
};
