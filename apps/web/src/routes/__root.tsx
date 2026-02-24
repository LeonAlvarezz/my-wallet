import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@/modules/theme/theme-provider";
import BottomNav from "@/components/bottom-nav/BottomNav";

export const Route = createRootRoute({
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
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}
