import LoginPage from "@/modules/auth/pages/login";
import { createFileRoute } from "@tanstack/react-router";
import { publicOnly } from "@/middleware/public-only";

export const Route = createFileRoute("/_publicLayout/auth/login/")({
  beforeLoad: publicOnly,
  component: LoginPage,
});
