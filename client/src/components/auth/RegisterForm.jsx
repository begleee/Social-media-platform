import { cn } from "cn"

import { Button } from "#components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "#components/ui/field"
import { Input } from "#components/ui/input"

import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/authStore"
import PasswordInput from "../PasswordInput"
import { useNavigate } from "react-router"

export function RegisterForm({ className, ...props }) {
  const user = useAuthStore((state) => state.user);
  const registerRoute = useAuthStore((state) => state.register);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const { name, email, password } = data;
    console.log(data);
    const result = await registerRoute(name, email, password);
    if(result.success) navigate("/login");
    console.log("Submit button clicked");
  });
  
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
            <CardHeader>
                <CardTitle>Sign up</CardTitle>
                <CardDescription>
                Enter your name and email below to sign up your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">Name</FieldLabel>

                            <Input
                                id="name"
                                type="text"
                                placeholder="enter your name"
                                required
                                {...register("name")}
                            />
                        </Field>

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
                            </div>

                            <PasswordInput {...register("password")}/>
                        </Field>

                        <Field>
                            <Button type="submit">Sign up</Button>

                            <FieldDescription className="text-center">
                                Have an account already? <a href="/login">Log in</a>
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    </div>
  )
}
