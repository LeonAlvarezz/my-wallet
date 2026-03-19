import RegisterPage from "@/modules/auth/pages/register.page";
import { createFileRoute } from "@tanstack/react-router";
import { publicOnly } from "@/middleware/public-only";

export const Route = createFileRoute("/_publicLayout/auth/register/")({
  beforeLoad: publicOnly,
  component: RegisterPage,
});
