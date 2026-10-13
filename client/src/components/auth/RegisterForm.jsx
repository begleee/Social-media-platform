import { cn } from "cn";
import { Button } from "#components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#components/ui/card";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "#components/ui/field";

import { Input } from "#components/ui/input";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/authStore";
import PasswordInput from "../PasswordInput";
import { useNavigate, Link } from "react-router";
import { toast } from "#components/ui/toast";

export function RegisterForm({ className, ...props }) {
  const registerRoute = useAuthStore((state) => state.register);
  const loading = useAuthStore((state) => state.loading);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const { name, email, password } = data;
    try {
      const result = await registerRoute(name, email, password);
      if (result?.success) {
        toast.add({ description: "Account created successfully! Please log in." });
        navigate("/login");
      } else {
        toast.add({
          description: result?.error || "Registration failed. Please try again.",
        });
      }
    } catch (err) {
      toast.add({
        description: err.message || "An unexpected error occurred.",
      });
    }
  });

  return (
    <div
      className={cn("w-full max-w-sm sm:max-w-md mx-auto px-4 py-6", className)}
      {...props}
    >
      <Card className="rounded-xl border shadow-sm">
        <CardHeader className="space-y-1 text-center sm:text-left">
          <CardTitle className="text-xl sm:text-2xl font-semibold">
            Create an account
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm text-muted-foreground">
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit}>
            <FieldGroup className="space-y-4">
              <Field className="space-y-1.5">
                <FieldLabel htmlFor="name" className="text-xs sm:text-sm font-medium">
                  Name
                </FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="w-full text-sm"
                  {...register("name", { required: true })}
                />
              </Field>

              <Field className="space-y-1.5">
                <FieldLabel htmlFor="email" className="text-xs sm:text-sm font-medium">
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="w-full text-sm"
                  {...register("email", { required: true })}
                />
              </Field>

              <Field className="space-y-1.5">
                <FieldLabel
                  htmlFor="password"
                  className="text-xs sm:text-sm font-medium"
                >
                  Password
                </FieldLabel>

                <PasswordInput
                  id="password"
                  className="w-full text-sm"
                  {...register("password", { required: true })}
                />
              </Field>

              <Field className="space-y-3 pt-2">
                <Button disabled={loading} type="submit" className="w-full">
                  {loading ? "Creating account..." : "Sign up"}
                </Button>

                <FieldDescription className="text-center text-xs sm:text-sm text-muted-foreground">
                  Have an account already?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Log in
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
