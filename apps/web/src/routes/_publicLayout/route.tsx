import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_publicLayout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-vh flex items-center justify-center">
      <Outlet />
    </div>
  );
}
