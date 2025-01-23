"use client";

import { cn } from "@/lib/utils";
import { CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormHeader from "../FormHeader";
import TextInput from "@/components/FormInputs/TextInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import toast from "react-hot-toast";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import FormSelectInput from "@/components/FormInputs/FormMultiSelectInput";
import { Class, countries } from "@/countries";
import DismissibleBanner from "@/components/info-banner";
import { createParent } from "@/actions/parents";

export type SelectOptionProps = {
  label: string;
  value: string;
};
type SingleStudentFormProps = {
  editingId?: string | undefined;
  initialData?: any | undefined | null;
  classes: Class[];
};
export type ParentProps = {
  title: string;
  firstName: string;
  lastName: string;
  relationship: string;
  email: string;
  NIN: string;
  gender: string;
  dob: string;
  phone: string;
  nationality: string;
  whatsapNo: string;
  password: string;
  contactMethod: string;
  imageUrl: string;
  occupation: string;
  address: string;
};

export default function ParentForm({
  editingId,
  initialData,
}: SingleStudentFormProps) {
  const [showBanner, setShowBanner] = useState(true);
  // Parents
  const relationship = [
    { label: "Father", value: "father" },
    { label: "Mother", value: "mother" },
    { label: "Guardian", value: "guardian" },
    { label: "Other", value: "other" },
  ];
  const [selectedRelationship, setSelectedRelationship] = useState<any>(relationship[1]);

  // Titles
  const titles = [
    {
      label: "Mrs.", value: "mrs"
    },
    {
      label: "Miss", value: "miss"
    },
    {
      label: "Mr.", value: "mr"
    },
  ];
  const [selectedTitle, setSelectedTitle] = useState<any>(titles[0]);

  // Contact Methods
  const contactMethods = [
    {
      label: 'Phone',
      value: "phone"
    },
    {
      label: 'Email',
      value: "email"
    },
  ];
  const [selectedMethod, setSelectedMethod] = useState<any>(null);

  // Gender/Sex
  const genders = [
    {
      label: 'MALE',
      value: "1245"
    },
    {
      label: 'FEMALE',
      value: "1235"
    },
  ];
  const [selectedGender, setSelectedGender] = useState<any>(null);

  // Nationality
  const initialCountryCode = "UG";
  const initialCountry = countries.find(
    (item) => item.countryCode === initialCountryCode
  );
  const [selectedNationality, setSelectedNationality] = useState<any>(initialCountry);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ParentProps>({
    defaultValues: {
      firstName: "",
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "/images/parents.png");

  async function saveParent(data: ParentProps) {
    try {
      setLoading(true);
      data.imageUrl = imageUrl;
      data.title = selectedTitle.value;
      data.relationship = selectedRelationship.label;
      data.gender = selectedGender.label;
      data.nationality = selectedNationality.label;
      data.contactMethod = selectedMethod.value;
      console.log(data);
      if (editingId) {

      } else {
        const res = await createParent(data);
        setLoading(false);
        toast.success("Parent Created Successfully!");
        reset();
        router.push("/dashboard/users/parents");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <form className="" onSubmit={handleSubmit(saveParent)}>
      <div className="py-4 items-center justify-center">
        {showBanner && (
          <DismissibleBanner message="Please fill in real info correctly, because it will help this student." type="warning" />
        )}
      </div>
      <FormHeader
        href="/parents"
        parent="users"
        title="Parent"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-3">
          <CardContent className="bg-light dark:bg-dark p-4 rounded-xl">
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <FormSelectInput
                  label="Title"
                  options={titles}
                  option={selectedTitle}
                  setOption={setSelectedTitle}
                  isSearchable={false}
                />

                <TextInput
                  register={register}
                  errors={errors}
                  label="Student First Name"
                  name="firstName"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Student Last Name"
                  name="lastName"
                />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <FormSelectInput
                  label="Relationship to Student"
                  options={relationship}
                  option={selectedRelationship}
                  setOption={setSelectedRelationship}
                  isSearchable={false}
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="National ID / Passport Number"
                  name="NIN"
                />
                <FormSelectInput
                  label="Gender"
                  options={genders}
                  option={selectedGender}
                  setOption={setSelectedGender}
                  isSearchable={false}
                />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Date of Birth"
                  name="dob"
                  type="date"
                />

                <TextInput
                  register={register}
                  errors={errors}
                  label="Phone"
                  name="phone"
                  type="tel"
                />

                <FormSelectInput
                  label="Nationality"
                  options={countries}
                  option={selectedNationality}
                  setOption={setSelectedNationality}
                />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Email"
                  name="email"
                  type="email"
                />
                <PasswordInput
                  register={register}
                  errors={errors}
                  toolTipText="For the student's account"
                  label="Password"
                  name="password"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Address"
                  name="address"
                  type="text"
                />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <TextInput
                  register={register}
                  errors={errors}
                  label="WhatsapNo"
                  name="whatsapNo"
                  type="tel"
                />
                <TextInput
                  register={register}
                  errors={errors}
                  label="Occupation"
                  name="occupation"
                  type="text"
                />
                <FormSelectInput
                  label="Contact Method"
                  options={contactMethods}
                  option={selectedMethod}
                  setOption={setSelectedMethod}
                  isSearchable={false}
                />
              </div>
              <div className="grid">
                <ImageInput
                  title="Parent Profile Image"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  endpoint="parentProfileImage"
                  className="object-contain"
                />
              </div>
            </div>
          </CardContent>
        </div>
      </div>
      <FormHeader
        href="/parents"
        parent="users"
        title="Parent"
        editingId={editingId}
        loading={loading}
      />
    </form>
  );
}
