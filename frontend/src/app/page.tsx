"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/auth/login");
  }, [router]);

  return (
    <div className="flex h-dvh w-dvw items-center justify-center text-white/70">
      Redirecting to login lol…
    </div>
  );
}
