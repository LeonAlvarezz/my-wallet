import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@/modules/theme/theme-provider";
import { ThemeToggle } from "@/modules/theme/components/ThemeToggle";
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
          <div className="w-mobile fixed inset-x-0 bottom-0 m-auto">
            <ThemeToggle className="mr-2 mb-24 place-self-end" />
          </div>
          <BottomNav />
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}
