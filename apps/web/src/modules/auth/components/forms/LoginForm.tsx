import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { useState } from "react";


const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Login successful", {
        description: `Welcome back, ${value.email}`,
      });
      formApi.reset();
      setLoading(false);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field
          name="email"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <div className="flex flex-col gap-2">
                  <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-10"
                    />
                    <Icon
                      icon="solar:letter-bold-duotone"
                      className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </div>
              </Field>
            );
          }}
        />
        <form.Field
          name="password"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <div className="flex flex-col gap-2">
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10"
                    />
                    <Icon
                      icon="solar:lock-password-bold-duotone"
                      className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </div>
              </Field>
            );
          }}
        />
      </FieldGroup>
      <div className="mt-6 flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="rounded border-border" />
          <span className="text-muted-foreground">Remember me</span>
        </label>
        <a
          href="#"
          className="text-sm font-medium text-primary hover:underline"
        >
          Forgot password?
        </a>
      </div>
      <Button
        type="submit"
        className="mt-6 w-full"
        loading={loading}
        disabled={loading}
      >
        <Icon icon="solar:login-3-bold" className="mr-2 size-5" />
        Sign In
      </Button>
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button variant="outline" type="button">
            <Icon icon="logos:google-icon" className="mr-2 size-5" />
            Google
          </Button>
          <Button variant="outline" type="button">
            <Icon icon="logos:github-icon" className="mr-2 size-5" />
            GitHub
          </Button>
        </div>
      </div>
    </form>
  );
}