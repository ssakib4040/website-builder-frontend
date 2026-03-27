"use client";

import { DashboardNav } from "@/components/dashboard/DashboardNav";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardNav />
      <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
    </>
  );
}
