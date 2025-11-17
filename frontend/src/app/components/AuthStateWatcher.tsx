"use client";

import Cookies from "js-cookie";
import { useEffect } from "react";
import { listenAuthEvents, type AuthEventPayload } from "@/utils/authSync";

const PROTECTED_PREFIX = "/app";
const AUTH_PREFIX = "/auth";
const AUTH_ALLOW_LIST = ["/auth/logout"];

const redirectTo = (path: string) => {
  if (typeof window === "undefined") return;
  if (window.location.pathname === path) {
    window.location.reload();
    return;
  }
  window.location.href = path;
};

const enforceRouteForState = (hasToken: boolean, forceReload = false) => {
  if (typeof window === "undefined") return;
  const pathname = window.location.pathname;
  const onProtectedRoute = pathname.startsWith(PROTECTED_PREFIX);
  const onAuthRoute = pathname.startsWith(AUTH_PREFIX);
  const authRouteAllowed = AUTH_ALLOW_LIST.some((route) => pathname.startsWith(route));

  if (hasToken) {
    if (onAuthRoute && !authRouteAllowed) {
      redirectTo("/app/timetable");
    } else if (forceReload && onProtectedRoute) {
      window.location.reload();
    }
  } else if (onProtectedRoute) {
    redirectTo("/auth/logout");
  } else if (forceReload && onAuthRoute && !authRouteAllowed) {
    window.location.reload();
  }
};

const handleAuthPayload = (payload: AuthEventPayload) => {
  enforceRouteForState(payload.type === "login", true);
};

export function AuthStateWatcher() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastToken = Cookies.get("token") ?? null;

    enforceRouteForState(Boolean(lastToken));

    const unsubscribe = listenAuthEvents(handleAuthPayload);

    const checkToken = () => {
      const currentToken = Cookies.get("token") ?? null;
      if (currentToken === lastToken) return;
      lastToken = currentToken;
      enforceRouteForState(Boolean(currentToken), true);
    };

    const focusHandler = () => checkToken();

    const visibilityHandler = () => {
      if (document.visibilityState === "visible") {
        checkToken();
      }
    };

    const intervalId = window.setInterval(checkToken, 10000);

    window.addEventListener("focus", focusHandler);
    document.addEventListener("visibilitychange", visibilityHandler);

    return () => {
      unsubscribe();
      window.clearInterval(intervalId);
      window.removeEventListener("focus", focusHandler);
      document.removeEventListener("visibilitychange", visibilityHandler);
    };
  }, []);

  return null;
}
