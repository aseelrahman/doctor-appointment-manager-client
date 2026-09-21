"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  toast,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const loginData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email(
      {
        email: loginData.email,
        password: loginData.password,
        rememberMe: false,
      },
      {
        //callbacks
      },
    );

    if (data) {
      router.push("/");
      toast.success("Login Successfull.");
    }
    if (error) {
      toast.danger(error.message);
    }
  };
  return (
    <Card>
      <div className="flex flex-col space-y-1 justify-center items-center">
        <Link
          href={"/"}
          className="hover:scale-110 transition-transform duration-300"
        >
          <Image
            src={"/doctime_logo.png"}
            height={60}
            width={180}
            alt="DocTime icon"
          />
        </Link>
        <h5 className="font-bold text-2xl text-center ">Login</h5>
        <p className="text-muted text-center">Welcome Back to DocTime</p>
      </div>
      <Form className="flex w-xs sm:w-md flex-col gap-4" onSubmit={handleLogin}>
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input className={"bg-default"} placeholder="john@example.com" />
          <FieldError />
        </TextField>
        <TextField
          isRequired
          minLength={6}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 6) {
              return "Password must be at least 6 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[a-z]/.test(value)) {
              return "Password must contain at least one lowercase letter";
            }
            return null;
          }}
        >
          <Label>Password</Label>
          <Input className={"bg-default"} placeholder="Enter your password" />
          <Description>
            Must be at least 6 characters with 1 uppercase and 1 lowercase
            letter
          </Description>
          <FieldError />
        </TextField>
        <span className="text-muted text-end">
          <Link href={"#"}>
            <small>Forgot Password?</small>
          </Link>
        </span>
        <div className="flex w-full gap-2">
          <Button type="reset" variant="secondary" className={"flex-1"}>
            Reset
          </Button>
          <Button type="submit" className={"flex-1"}>
            Login
          </Button>
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className="border-t flex-1"></div>
          <small className="text-muted">OR</small>
          <div className="border-t flex-1"></div>
        </div>
        <Button className={"w-full"} variant="secondary">
          <FcGoogle /> Continue with Google
        </Button>
      </Form>
      <span className="text-muted text-sm text-center">
        Don&apos;t have an account?{" "}
        <Link href={"/register"} className="text-accent">
          Register
        </Link>
      </span>
    </Card>
  );
};

export default LoginPage;
