import React from "react";
import { Metadata } from "next";
import QueryProvider from "./components/provider";
export const metadata: Metadata = {
  title: "VERTEX",
  description: "VERTEX - Academic Management System",
  verification: {
    google: "lqZoy4RwbD94xx4x_rz8CjmuvarmsG32kB5obHt0kdc",
  },
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <QueryProvider>{children}</QueryProvider>;
}
