"use client";

import { useEffect } from "react";

const CACHE_MESSAGE_TYPE = "VERTEX_CACHE_INVALIDATED";

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
      } catch {
        // console.error("SW registration failed", err);
      }
    };

    // register on load to ensure correct scope
    const onLoad = () => {
      void register();
    };

    if (document.readyState === "complete") {
      void register();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    const messageHandler = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== "object") return;
      if (event.data.type === CACHE_MESSAGE_TYPE) {
        window.location.reload();
      }
    };

    navigator.serviceWorker.addEventListener("message", messageHandler);

    return () => {
      window.removeEventListener("load", onLoad);
      navigator.serviceWorker.removeEventListener("message", messageHandler);
    };
  }, []);

  return null;
}
