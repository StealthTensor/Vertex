import Link from "next/link";
import React from "react";
import { FaSkull } from "react-icons/fa";

const Header = ({ value }: { value: string }) => {
  return (
    <div className="w-full min-h-20 flex items-center justify-center lg:px-0 px-3">
      <div className="relative max-w-5xl w-full flex px-4 h-[70%] items-center justify-between apply-border-md rounded-2xl bg-white/5 backdrop-blur-xl">
        <div className="absolute inset-0 bg-white/10 blur-3xl -z-10" />
        <div className="flex gap-4 items-center justify-center">
          <FaSkull className="h-6 w-6 text-white" />
          <h1 className="text-lg tracking-wide font-medium text-white">
            VERTEX
          </h1>
        </div>
        {value !== "root" ? (
          <Link
            href="/"
            className="px-3 py-1.5 rounded-xl apply-border-md bg-white/5 hover:bg-white/10 transition-all"
          >
            Back
          </Link>
        ) : (
          <Link
            href="/auth/login"
            className="px-3 py-1.5 rounded-xl apply-border-md bg-white/5 hover:bg-white/10 transition-all"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
