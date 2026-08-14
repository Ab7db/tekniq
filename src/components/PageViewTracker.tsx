import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

import { trackPageView } from "@/lib/analytics";

const IGNORED = ["/admin", "/auth"];

export function PageViewTracker() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (IGNORED.some((p) => pathname.startsWith(p))) return;
    void trackPageView(pathname);
  }, [pathname]);

  return null;
}
