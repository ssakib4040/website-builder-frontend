"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Editor } from "@/components/builder/Editor";
import { useEditorStore } from "@/lib/builder/store";

function BuilderInner() {
  const searchParams = useSearchParams();
  const pageId = searchParams.get("page");
  const { setActivePage, pages } = useEditorStore();

  useEffect(() => {
    if (pageId && pages.some((p) => p.id === pageId)) {
      setActivePage(pageId);
    }
  }, [pageId, pages, setActivePage]);

  return (
    <TooltipProvider delayDuration={200}>
      <Editor />
    </TooltipProvider>
  );
}

export default function BuilderPage() {
  return (
    <Suspense>
      <BuilderInner />
    </Suspense>
  );
}
