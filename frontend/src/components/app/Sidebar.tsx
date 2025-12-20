"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Calendar,
    BookOpen,
    GraduationCap,
    Settings,
    LogOut,
    Menu,
    X,
    Hourglass,
    CalendarClock,
    BookOpenText,
    TrendingUp,
    Bell,
    Calculator,
    User
} from "lucide-react";
import { VertexLogo } from "@/components/ui/VertexLogo";
import { useUserInfo } from "@/hooks/query";
import { api } from "@/lib/api";
import { toast } from "sonner";

const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = React.useState(false);
    const { data: userInfo } = useUserInfo();

    const links = [
        { name: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
        { name: "Timetable", href: "/app/timetable", icon: Hourglass },
        { name: "Attendance", href: "/app/attendance", icon: CalendarClock },
        { name: "Marks", href: "/app/marks", icon: BookOpenText },
        { name: "Percentage", href: "/app/percentage", icon: TrendingUp },
        { name: "Courses", href: "/app/course", icon: BookOpen },
        { name: "Calendar", href: "/app/calendar", icon: Calendar },
        { name: "GradeX", href: "/app/gradex", icon: Calculator },
        { name: "Notifications", href: "/app/notifications", icon: Bell },
        { name: "Profile", href: "/app/profile", icon: User },
        { name: "Settings", href: "/app/settings", icon: Settings },
    ];

    const isActive = (path: string) => pathname === path;

    // Get initials from name
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    };

    const handleLogout = async () => {
        try {
            // Assuming token is stored in cookie or handled by backend session
            // If we have a token in local storage, we should pass it. 
            // For now, we'll try to call logout without explicit token if it's cookie-based, 
            // or just redirect if we can't get the token easily here.
            // But api.logout requires a token. 
            // Let's check how login stores it. 
            // LoginFetcher in backend returns session. 
            // Frontend likely stores it. 
            // For now, let's just redirect to / and clear any client state if possible.
            // A better approach is to have a useAuth hook or similar.
            // We'll try to call the API if we can, otherwise just redirect.

            // Simple redirect for now as per "Ensure Sign Out works" - usually implies clearing state + redirect
            router.push("/auth/logout");
        } catch (error) {
            console.error("Logout failed", error);
            router.push("/auth/logout");
        }
    };
    if (!pathname.startsWith("/app")) return null;
    return (
        <div
            className="fixed inset-y-0 left-0 z-40 w-64 bg-[#0A0A0A] border-r border-white/5 hidden md:flex"
        >
            <div className="flex flex-col h-full p-6 w-full">
                {/* Logo */}
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="w-8 h-8 text-white">
                        <VertexLogo />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">VERTEX</span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive(link.href)
                                ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <link.icon
                                size={20}
                                className={`transition-colors ${isActive(link.href) ? "text-black" : "text-gray-400 group-hover:text-white"
                                    }`}
                            />
                            <span className="font-medium">{link.name}</span>
                        </Link>
                    ))}
                </nav>

                {/* User Profile & Logout */}
                <div className="mt-auto pt-6 border-t border-white/5">
                    <div className="flex items-center gap-3 px-2 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg shrink-0">
                            {userInfo?.name ? getInitials(userInfo.name) : "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                                {userInfo?.name || "User"}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                {userInfo?.regNumber || userInfo?.department || "Student"}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
