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

const RegistrationPage = () => {
  const router = useRouter();
  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const registerData = Object.fromEntries(formData.entries());

    console.log(registerData);

    const { data, error } = await authClient.signUp.email({
      email: registerData.email,
      password: registerData.password,
      name: registerData.name,
      image: registerData.photoUrl,
    });

    if (error) {
      if (error.message === "User already exists. Use another email.") {
        toast.warning("User Already exists.");
      } else {
        toast.danger(error.message);
      }
    }
    if (data) {
      router.push("/");
      toast.success("Account created successfully.");
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
        <h5 className="font-bold text-2xl text-center ">Register</h5>
        <p className="text-muted text-center">Create your DocTime Account</p>
      </div>
      <Form
        className="flex w-xs sm:w-md flex-col gap-4"
        onSubmit={handleRegister}
      >
        <TextField isRequired name="name" type="text">
          <Label>Name</Label>
          <Input className={"bg-default"} placeholder="Enter your full name" />
          <FieldError />
        </TextField>
        <TextField name="photoUrl" type="url">
          <Label>Photo URL (optional)</Label>
          <Input className={"bg-default"} placeholder="https://example.com" />
          <FieldError />
        </TextField>
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

        <div className="flex w-full gap-2">
          <Button type="reset" variant="secondary" className={"flex-1"}>
            Reset
          </Button>
          <Button type="submit" className={"flex-1"}>
            Register
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
        Already have an account?{" "}
        <Link href={"/login"} className="text-accent">
          Login
        </Link>
      </span>
    </Card>
  );
};

export default RegistrationPage;
