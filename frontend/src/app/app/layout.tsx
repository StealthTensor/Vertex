import React from "react";
import { Metadata } from "next";
import QueryProvider from "./components/provider";
export const runtime = "edge";
export const metadata: Metadata = {
  title: "VERTEX App",
  description: "VERTEX - Elite Academic Management System",
};

export const dynamic = "force-dynamic";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <QueryProvider>{children}</QueryProvider>;
}
