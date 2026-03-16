import * as React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { ThemeProvider } from "@/modules/theme/theme-provider";
import { Toaster } from "sonner";
import type { RouterContext } from "@/router-context";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="max-w-mobile min-h-vh relative m-auto flex flex-col border">
          <Outlet />
          <Toaster position="top-center" />
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}
