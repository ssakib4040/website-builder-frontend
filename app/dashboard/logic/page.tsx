"use client";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { LogicBuilder } from "@/components/builder/logic/LogicBuilder";

export default function LogicPage() {
  return (
    <DashboardShell>
      <LogicBuilder />
    </DashboardShell>
  );
}
