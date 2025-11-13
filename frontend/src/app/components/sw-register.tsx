"use client";

import { useEffect } from "react";

export default function SwRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    const swUrl = "/sw.js";

    const register = async () => {
      try {
        const registration = await navigator.serviceWorker.register(swUrl);
        // optional: listen for updates
        registration.addEventListener?.("updatefound", () => {
          const newWorker = registration.installing;
          if (!newWorker) return;
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed") {
              // When a new version is installed, you could prompt the user to refresh
              // console.log("New content is available; please refresh.");
            }
          });
        });
      } catch (err) {
        // console.error("SW registration failed", err);
      }
    };

    // register on load to ensure correct scope
    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register, { once: true });
    }

    return () => {
      window.removeEventListener("load", register as any);
    };
  }, []);

  return null;
}
