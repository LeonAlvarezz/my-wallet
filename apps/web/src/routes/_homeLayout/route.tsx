import BottomNav from "@/components/bottom-nav/BottomNav";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_homeLayout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      {/* <h1>Pathless layout</h1> */}
      <main className="h-[calc(100dvh-var(--bottom-nav-total-h))]">
        <Outlet />
      </main>
      <BottomNav />
    </>
  );
}
