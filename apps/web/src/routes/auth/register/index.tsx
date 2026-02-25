import RegisterPage from "@/modules/auth/pages/register";
import { createFileRoute } from "@tanstack/react-router";
import { publicOnly } from "@/middleware/public-only";

export const Route = createFileRoute("/auth/register/")({
  beforeLoad: publicOnly,
  component: RegisterPage,
});
