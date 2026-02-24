import { Link } from "@tanstack/react-router";
import LoginForm from "../components/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-y-auto p-6">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-primary/10 absolute -top-40 -right-40 h-80 w-80 rounded-full blur-3xl" />
        <div className="bg-primary/5 absolute -bottom-40 -left-40 h-80 w-80 rounded-full blur-3xl" />
      </div>
      <div className="border-border/50 bg-background/80 w-full max-w-md space-y-8 rounded-2xl border p-8 backdrop-blur-sm">
        <div className="text-center">
          <h1 className="text-primary text-3xl font-bold tracking-tight">
            Welcome Back
          </h1>
          <p className="text-muted-foreground animate-in fade-in slide-in-from-top-2 mt-2 duration-700">
            Sign in to your account to continue
          </p>
        </div>
        <LoginForm />
        <div className="animate-in fade-in slide-in-from-bottom-2 mt-6 text-center text-sm duration-1000">
          <p className="text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-semibold transition-all hover:tracking-wide hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
