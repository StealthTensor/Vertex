"use client";
import { RefreshCw } from "lucide-react";
import React from "react";

export function RefreshButton({
  refresh,
}: {
  refresh: (val: boolean) => void;
}) {
  return (
    <button
      onClick={() => refresh(true)}
      className="vertex-button-subtle p-2"
      aria-label="Refresh data"
    >
      <RefreshCw size={16} />
    </button>
  );
}