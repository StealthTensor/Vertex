import React from "react";
import { Metadata } from "next";
import QueryProvider from "./components/provider";
export const metadata: Metadata = {
  title: "VERTEX",
  description: "VERTEX - Academic Management System",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <QueryProvider>{children}</QueryProvider>;
}
