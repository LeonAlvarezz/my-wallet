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

const formSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Account created", {
        description: `Welcome to the app, ${value.name}!`,
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
          name="name"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <div className="flex flex-col gap-2">
                  <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-10"
                    />
                    <Icon
                      icon="solar:user-circle-bold-duotone"
                      className="text-muted-foreground absolute top-1/2 left-3 size-5 -translate-y-1/2"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </div>
              </Field>
            );
          }}
        />
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
                      className="text-muted-foreground absolute top-1/2 left-3 size-5 -translate-y-1/2"
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
            const password = field.state.value;
            const strength =
              password.length >= 8
                ? 3
                : password.length >= 6
                  ? 2
                  : password.length >= 4
                    ? 1
                    : 0;
            const strengthColors = [
              "bg-destructive",
              "bg-orange-500",
              "bg-yellow-500",
              "bg-green-500",
            ];
            const strengthLabels = ["Very Weak", "Weak", "Fair", "Strong"];
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
                      className="w-full pl-10 duration-300"
                    />
                    <Icon
                      icon="solar:lock-password-bold-duotone"
                      className="text-muted-foreground absolute top-1/2 left-3 size-5 -translate-y-1/2"
                    />
                  </div>
                  {password.length > 0 && (
                    <div className="animate-in fade-in slide-in-from-top-2 mt-2 space-y-1 duration-500">
                      <div className="bg-border flex h-1.5 w-full gap-1 overflow-hidden rounded-full">
                        {[0, 1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className={`h-full flex-1 rounded-full transition-all duration-500 ${
                              i <= strength
                                ? strengthColors[strength]
                                : "bg-transparent"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground text-xs">
                        Strength:{" "}
                        <span className="font-medium">
                          {strengthLabels[strength]}
                        </span>
                      </p>
                    </div>
                  )}
                  <p className="text-muted-foreground mt-1 text-xs">
                    Must be at least 6 characters
                  </p>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </div>
              </Field>
            );
          }}
        />
        <form.Field
          name="confirmPassword"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <div className="flex flex-col gap-2">
                  <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
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
                      icon="solar:shield-check-bold-duotone"
                      className="text-muted-foreground absolute top-1/2 left-3 size-5 -translate-y-1/2"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </div>
              </Field>
            );
          }}
        />
      </FieldGroup>

      <Button
        type="submit"
        className="mt-6 w-full"
        loading={loading}
        disabled={loading}
      >
        <Icon icon="solar:user-plus-bold" className="mr-2 size-5" />
        Create Account
      </Button>
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="border-border w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background text-muted-foreground px-2">
              Or sign up with
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
