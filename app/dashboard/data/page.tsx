"use client";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DataBuilder } from "@/components/builder/data/DataBuilder";

export default function DataPage() {
  return (
    <DashboardShell>
      <DataBuilder />
    </DashboardShell>
  );
}
