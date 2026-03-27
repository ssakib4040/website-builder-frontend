import { TooltipProvider } from "@/components/ui/tooltip";
import { Editor } from "@/components/builder/Editor";

export default function BuilderPage() {
  return (
    <TooltipProvider delayDuration={200}>
      <Editor />
    </TooltipProvider>
  );
}
