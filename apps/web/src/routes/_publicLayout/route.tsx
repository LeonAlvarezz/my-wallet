import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_publicLayout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-dvh items-center justify-center">
      <Outlet />
    </div>
  );
}
