
"use client";

import { Loader } from "@/app/app/components/loader";
import { getLogout } from "@/server/action";
import { getCookie } from "@/utils/getCookieClient";
import { emitAuthEvent } from "@/utils/authSync";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const clearSession = async () => {
      const token = getCookie();
      if (token) {
        try {
          await getLogout(token);
        } catch (error) {
          console.error("Logout API failed:", error);
        }

        // Always clear cookies
        Object.keys(Cookies.get()).forEach((cookieName) => {
          Cookies.remove(cookieName);
        });
      }
      window.localStorage.clear();
      emitAuthEvent("logout");
      router.replace("/auth/login");
    };
    clearSession();
  }, [router]);

  return (
    <div className="w-dvw h-dvh items-center justify-center flex flex-col  gap-4 ">
      <Loader className="w-8 h-8 " />
      <h1 className="text-xl text-white/50 animate-pulse">Logging Out Lol</h1>
    </div>
  );
};

export default Page;
