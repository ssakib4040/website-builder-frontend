"use client";

import { DashboardNav } from "@/components/dashboard/DashboardNav";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardNav />
      {/* pt-12 offsets the fixed mobile top bar; removed on lg where sidebar is static */}
      <div className="flex-1 flex flex-col overflow-hidden pt-12 lg:pt-0">
        {children}
      </div>
    </>
  );
}
