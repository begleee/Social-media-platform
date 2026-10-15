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

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export function LoginForm({ className, ...props }) {
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;
    try {
      const result = await login(email, password);
      if (result?.success) {
        navigate("/feed");
      } else {
        toast.add({
          description: result?.error || "Invalid email or password.",
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
            Login to your account
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm text-muted-foreground">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit}>
            <FieldGroup className="gap-3">
              <Field >
                <FieldLabel htmlFor="email" className="text-xs sm:text-sm font-medium">
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="w-full text-sm"
                  {...register("email")}
                />
              </Field>
              {errors.email && <div className="text-red-500">{errors.email.message}</div>}

              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel
                    htmlFor="password"
                    className="text-xs sm:text-sm font-medium"
                  >
                    Password
                  </FieldLabel>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-muted-foreground underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>

                <PasswordInput
                  id="password"
                  className="w-full text-sm"
                  {...register("password", { required: true })}
                />
                {errors.password && <div className="text-red-500">{errors.password.message}</div>}
              </Field>

              <Field>
                <Button disabled={loading} type="submit" className="w-full">
                  {loading ? "Logging in..." : "Login"}
                </Button>

                <FieldDescription className="text-center text-xs sm:text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Sign up
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
