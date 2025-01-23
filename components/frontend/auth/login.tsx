"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TextInput from "@/components/FormInputs/TextInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import CustomCarousel from "../custom-carousel";
import Logo from "@/components/logo";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import { Lock, LockIcon, Mail } from "lucide-react";
import { loginUser } from "@/actions/auth";
import { useUserSession } from "@/store/auth";
import { User } from "@/countries";
export type LoginInputProps = {
  email: string;
  password: string;
};
export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputProps>();
  const router = useRouter();
  const {setUser} = useUserSession()
  async function onSubmit(data: LoginInputProps) {
    try {
      setIsLoading(true)
      const sessionData = await loginUser(data)
      // Save the data in zustand
      setUser(sessionData?.user as User)
      const role = sessionData?.user.role
      // Route the User according to the role
      setIsLoading(false)
      if (role === "SUPER_ADMIN") {
        router.push('/school-onboarding');
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }
  return (
    <div className="w-full lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 relative ">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6 mt-10 md:mt-0">
          <div className="absolute left-1/3 top-10 md:top-5 md:left-5"><Logo/></div>
          <div className="grid gap-2 text-center mt-60 md:mt-0">
            <h1 className="text-3xl font-bold">Hit Your Account</h1>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            
            <TextInput
              label="Email Address"
              register={register}
              name="email"
              type="email"
              errors={errors}
              placeholder="Eg. johndoe@gmail.com"
              icon={Mail}
            />

            <TextInput
              label="Password"
              register={register}
              name="password"
              type="password"
              errors={errors}
              placeholder="*********"
              icon={LockIcon}
            />

            {/* <PasswordInput
              icon={Lock}
              label="Password"
              register={register}
              name="password"
              type="password"
              errors={errors}
              placeholder="******"
              forgotPasswordLink="/forgot-password"
            /> */}

            <SubmitButton
              title="Signin"
              loading={isLoading}
              loadingTitle="Signing in, please wait..."
            />
          </form>
          <div className="mt-4 text-center text-sm">
            don't have an account?{" "}
            <Link href="/register" className="underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden h-screen bg-muted lg:block relative">
        <CustomCarousel />
      </div>
    </div>
  );
}
