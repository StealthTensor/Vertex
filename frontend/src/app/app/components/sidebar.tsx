import { VertexLogo } from "@/components/ui/VertexLogo";
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
  Settings2,
  X,
  Calculator,
  Bell,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CiShare1 } from "react-icons/ci";

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
    <div
      className={`flex px-4 w-full min-h-14 items-center border-b border-white gap-4 ${
        useScreen().isMobile ? "justify-between" : "justify-center"
      }`}
    >
      <div className="flex gap-3 items-center justify-center">
        <VertexLogo className="w-7 h-7 text-white" />
        <h1 className="vertex-heading text-lg">
          VERTEX <span className="text-white/50 text-xs font-normal">SYSTEM</span>
        </h1>
      </div>
      {useScreen().isMobile && (
        <div className="vertex-btn-secondary p-1">
          <X onClick={SidebarToggle} className="w-5 h-5 cursor-pointer" />
        </div>
      )}
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
          -- ELITE v3.0 <span>💀</span>
        </h2>
      </div>
    </div>
  );
};
// const Status = () => {
//   const item = [
//     { name: "timetable", query: useTimetable() },
//     { name: "attendance", query: useAttendance() },
//     { name: "marks", query: useMarks() },
//     { name: "course", query: useCourse() },
//     { name: "calendar", query: useCalendar() },
//     { name: "profile", query: useUserInfo() },
//   ];
//   return (
//     <div className="min-h-50 w-full p-3">
//       <div className=" bg-white/5  apply-border-md rounded-lg flex flex-col gap-4 px-1 py-2 text-white/60 ">
//         <h1 className="w-full text-center p-2  border-b border-white/5">
//           Status
//         </h1>
//         {item.map((item, i) => {
//           return (
//             <div
//               key={i}
//               className="w-full flex px-3 items-center justify-between"
//             >
//               <h1 className="capitalize ">{item.name}</h1>
//               <span>
//                 {item.query.isPending || item.query.isRefetching ? (
//                   <div>
//                     <Loader className="w-5 h-5" />
//                   </div>
//                 ) : item.query.isError ? (
//                   <div>
//                     <CircleX className="w-5 h-5 text-red-400" />
//                   </div>
//                 ) : (
//                   <div>
//                     <CircleCheck className="w-5 h-5 text-green-400" />
//                   </div>
//                 )}
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// const Footer = () => {
//   const { data, isPending } = useUserInfo();
//   return (
//     <div className=" flex w-full justify-center items-center border-t border-white/5 min-h-20 ">
//       {!isPending ? (
//         <div className="p-3 flex flex-col gap-2 ">
//           <h1>{data?.name}</h1>
//           <h1>{data?.regNumber}</h1>
//         </div>
//       ) : (
//         <Loader className="w-5 h-5 " />
//       )}
//     </div>
//   );
// };
