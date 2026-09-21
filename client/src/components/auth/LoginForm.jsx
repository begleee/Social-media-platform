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
import { useAuthStore } from "../../store/authStore"
import PasswordInput from "../PasswordInput"
import { useNavigate } from "react-router"

export function LoginForm({ className, ...props }) {
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const { register, handleSubmit} = useForm();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;
    const result = await login(email, password);
    if(result.success) navigate("/feed");
  });
  
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>

          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>

                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email")}
                />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>

                <PasswordInput {...register("password")}/>
              </Field>

              <Field>
                <Button disabled={loading} type="submit">Login</Button>
                
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/register">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
