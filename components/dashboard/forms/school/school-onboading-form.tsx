"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import TextInput from "@/components/FormInputs/TextInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { Send } from "lucide-react";
import Logo from "@/components/logo";
import { createSchool } from "@/actions/schools";
import toast from "react-hot-toast";

export type SchoolProps = {
  name: string;
  logo: string;
  // schoolLogo: File | null;
  // slogan: string;
  // schoolType: string;
  // educationSystem: string;
  // institutionCategory: string;
  // schoolDescription: string;
  // phoneNumber: string;
  // emailAddress: string;
  // websiteURL: string;
  // principalName: string;
  // principalEmail: string;
  // termsAccepted: boolean;
};

export default function SchoolOnboardForm() {
  // const [termsAccepted, setTermsAccepted] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const initialImage = "/images/school-logo.png";
  const [imageUrl, setImageUrl] = useState(initialImage);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SchoolProps>({
    defaultValues: {
      name: "",
      // schoolLogo: null,
      // slogan: "",
      // schoolType: "",
      // educationSystem: "",
      // institutionCategory: "",
      // schoolDescription: "",
      // phoneNumber: "",
      // emailAddress: "",
      // websiteURL: "",
      // principalName: "",
      // principalEmail: "",
      // logo: "",
      // termsAccepted: false,
    },
  });

  async function saveSchool(data: SchoolProps) {
    try {
      setLoading(true);
      data.logo = imageUrl;
      console.log(data)
      const res = await createSchool(data)
      console.log(res)
      setLoading(false)
      toast.success("Successfully Created!")
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(saveSchool)}
      className="min-h-screen py-4 px-4 bg-white dark:bg-gray-800 rounded-lg flex flex-col justify-center mx-auto max-w-screen-lg"
    >
      <div className="text-center mb-4">
        <div className="flex justify-center items-center flex-col mb-4">
          <Logo size="lg" />
        </div>
        <p className="leading-7 text-sm sm:text-base text-black dark:text-white [&:not(:first-child)]:mt-2">
          Fill in the necessary information below to get started on your journey with us.<br/> We’re excited to have you on board!
        </p>
      </div>

      {/* Form Content */}
      <div className="flex flex-col space-y-4 mb-4">
        <Card className="flex-1 bg-white dark:bg-gray-700 shadow-lg dark:shadow-gray-800">
          <CardContent>
            {/* First Section: School Information */}
            <div className="grid sm:grid-cols-1 gap-4 mb-4">
              <TextInput
                register={register}
                errors={errors}
                label="School Name"
                name="name"
              />
            </div>

            {/* Image Input Section */}
            <div className="mb-4">
              <ImageInput
                title="Upload Your School Logo"
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                endpoint="schoolLogo"
                className="object-contain"
                size="lg"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submit Button */}
      <SubmitButton
        buttonIcon={Send}
        title="Register School"
        loading={loading}
        loadingTitle="Onboarding...."
        className="bg-green-600 text-white hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-600"
      />
    </form>
  );
}
