import { useScreen } from "@/hooks/zustand";
import { SidebarToggle } from "@/utils/sidebarToggle";
import {
  BookCopy,
  BookOpenText,
  Calendar1,
  CalendarClock,
  CircleUserRound,
  Hourglass,
  TrendingUp,
  ChevronsLeft,
  Calculator,
  Bell,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CiShare1 } from "react-icons/ci";
import { Zen_Dots } from 'next/font/google';

const zenDots = Zen_Dots({
  weight: '400',
  subsets: ['latin'],
});

type MenuType = {
  name: string;
  url: string;
  icon: React.JSX.Element;
}[];
const Sidebar = () => {
  return (
    <div className="relative h-full w-full flex flex-col vertex-card">
      <Header />
      <Menu />
      {/* <Status /> */}
      {/* <Footer /> / */}
      {/* <div className="absolute inset-0 bg-blue-500/30 blur-3xl -z-50"></div> */}
      <Author />
      {/*<Footer />*/}
    </div>
  );
};

export default Sidebar;

const Header = () => {
  return (
    <div className="grid h-14 w-full grid-cols-3 items-center border-b border-white px-4">
  
  {/* 1. Left Column (Empty spacer) */}
  <div className="justify-self-start">
    {/* If you ever add a hamburger menu, put it here */}
  </div>

  {/* 2. Center Column (Logo + Text) - ALWAYS CENTERED */}
  <div className="flex items-center justify-center gap-3 justify-self-center whitespace-nowrap">
    {/* I added the logo back, remove this line if you only want text */}
    
    <h1 className={`${zenDots.className} vertex-heading text-lg`}>
      VERTEX
    </h1>
  </div>

  {/* 3. Right Column (Toggle) - Pushed to the end */}
  <div className="justify-self-end">
    {useScreen().isMobile && (
      <ChevronsLeft
        onClick={SidebarToggle}
        className="h-5 w-5 cursor-pointer"
      />
    )}
  </div>

</div>
  );
};

const Menu = () => {
  const path = usePathname();
  const item: MenuType = [
    {
      name: "timetable",
      url: "/app/timetable",
      icon: <Hourglass className="w-5 h-5" />,
    },
    {
      name: "attendance",
      url: "/app/attendance",
      icon: <CalendarClock className="w-5 h-5" />,
    },
    {
      name: "marks",
      url: "/app/marks",
      icon: <BookOpenText className="w-5 h-5 " />,
    },
    {
      name: "percentage",
      url: "/app/percentage",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      name: "course",
      url: "/app/course",
      icon: <BookCopy className="w-5 h-5" />,
    },
    {
      name: "calendar",
      url: "/app/calendar",
      icon: <Calendar1 className="w-5 h-5" />,
    },
    {
      name: "profile",
      url: "/app/profile",
      icon: <CircleUserRound className="w-5 h-5" />,
    },
    {
      name: "gradex",
      url: "/app/gradex",
      icon: <Calculator className="w-5 h-5" />,
    },
    {
      name: "notifications",
      url: "/app/notifications",
      icon: <Bell className="w-5 h-5" />,
    },
  ];

  return (
    <div className="px-3 py-3 flex-1 flex-col overflow-y-auto space-y-1">
      {item.map((i) => {
        return (
          <Link
            key={i.name}
            href={i.url}
            onClick={SidebarToggle}
            prefetch={false}
            className={`vertex-nav-item flex gap-3 justify-between px-4 py-2 ${
              i.url === path ? "active" : ""
            }`}
          >
            <h1 className="uppercase tracking-wide">{i.name}</h1>
            <span>{i.icon}</span>
          </Link>
        );
      })}
    </div>
  );
};

const Author = () => {
  return (
    <div className="w-full p-4 h-fit">
      <div
        onClick={() => {
          window.open("https://www.github.com/stealthtensor/", "_blank");
        }}
        className="vertex-card-subtle text-sm w-full h-full border-2 border-dotted border-white/20 flex flex-col gap-4 justify-center p-4 vertex-transition cursor-pointer"
      >
        <div className="flex items-center justify-between ">
          <h1 className="flex gap-2 items-center justify-center vertex-body text-xs">
            VERTEX
          </h1>
          <CiShare1 className="w-4 h-4 text-white" />
        </div>
        <h2 className="vertex-heading text-xs text-white/40">
          -- ELITE v5.0 <span>💀</span>
        </h2>
      </div>
    </div>
  );
};