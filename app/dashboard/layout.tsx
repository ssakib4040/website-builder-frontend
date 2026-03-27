import { TooltipProvider } from "@/components/ui/tooltip";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="h-screen flex bg-background">{children}</div>
    </TooltipProvider>
  );
}
