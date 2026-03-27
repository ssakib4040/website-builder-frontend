"use client";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ApiBuilder } from "@/components/builder/api/ApiBuilder";

export default function ApiPage() {
  return (
    <DashboardShell>
      <ApiBuilder />
    </DashboardShell>
  );
}
