import * as React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { ThemeProvider } from "@/modules/theme/theme-provider";
import BottomNav from "@/components/bottom-nav/BottomNav";
import { Toaster } from "sonner";
import type { RouterContext } from "@/router-context";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="max-w-mobile relative m-auto flex min-h-dvh flex-col border">
          <main className="h-[calc(100dvh-var(--bottom-nav-total-h))]">
            <Outlet />
          </main>
          <BottomNav />
          <Toaster position="top-center" />
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}
