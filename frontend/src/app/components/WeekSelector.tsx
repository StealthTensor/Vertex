"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface WeekSelectorProps {
    currentDate?: Date;
}

const WeekSelector = ({ currentDate = new Date() }: WeekSelectorProps) => {
    // Generate current week days (assuming week starts on Monday for this academic context, or Sunday based on image)
    // Image shows M T W T F S S -> Monday start

    const getWeekDays = (date: Date) => {
        const startOfWeek = new Date(date);
        const day = startOfWeek.getDay();
        const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        startOfWeek.setDate(diff);

        const days = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(startOfWeek);
            d.setDate(startOfWeek.getDate() + i);
            days.push(d);
        }
        return days;
    };

    const weekDays = getWeekDays(currentDate);
    const today = currentDate.getDate();

return (
    <div className="flex justify-between items-center w-full max-w-full px-1 py-1 bg-zinc-900/20 rounded-2xl backdrop-blur-md border-white/5 shadow-inner">
        {weekDays.map((date, index) => {
            const isToday = date.getDate() === today;
            const dayName = date.toLocaleDateString("en-US", { weekday: "narrow" }); // M, T, W...
            const dayNumber = date.getDate();

            return (
                <div
                    key={index} 
                    className={cn(
                        // CONTAINER: Tall, Rounded-2xl (Squaricle), Flex Column
                        "flex flex-col items-center justify-center w-[54px] h-[54px] rounded-2xl transition-all duration-300 cursor-pointer select-none",
                        
                        // ACTIVE STATE: Glass background, subtle border, backdrop blur
                        isToday 
                            ? "bg-green-100/10 backdrop-blur-md shadow-inner" 
                            : "bg-transparent border border-transparent hover:bg-zinc-900/30"
                    )}
                >
                    {/* Day Name (M, T, W) - Top */}
                    <span className={cn(
                        "text-[16px] font-semibold uppercase tracking-wider -mb-1",
                        isToday ? "text-white" : "text-zinc-500"
                    )}>
                        {dayName}
                    </span>

                    {/* Date Number (26) - Center */}
                    <span className={cn(
                        "text-[15px] font-semibold font-display mb-1.5 mt-0.5",
                        isToday ? "text-white" : "text-zinc-500"
                    )}>
                        {dayNumber}
                    </span>

                    {/* The Red Dot - Bottom (Only if active) */}
                     <div className={cn(
                        "w-[8px] h-[8px] rounded-full mt-1 transition-all absolute -bottom-[2.5px]",
                        isToday ? "z-100 bg-rose-500 " : "bg-transparent"
                    )} /> 
                </div>
            );
        })}
    </div>
);
};

export default WeekSelector;
