"use client";

import {
  CardContent,
} from "@/components/ui/card";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormHeader from "../FormHeader";
import TextInput from "@/components/FormInputs/TextInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import toast from "react-hot-toast";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import FormSelectInput from "@/components/FormInputs/FormMultiSelectInput";
import { Class, countries, TeacherCreateProps } from "@/countries";
import DismissibleBanner from "@/components/info-banner";
import { createParent } from "@/actions/parents";
import { createTeacher } from "@/actions/teachers";
import FormMultipleSelectInput from "@/components/FormInputs/FormMultiSelectInput";

type TeacherFormProps = {
  editingId?: string | undefined;
  initialData?: any | undefined | null;
  classes:DataOption[]
  departments :DataOption[]
  subjects :DataOption[]
};

export type DataOption ={
  label: string;
  value: string;
}
export default function TeacherForm({
  editingId,
  initialData,
  classes,
  departments,
  subjects,
}: TeacherFormProps) { 
  const [showBanner, setShowBanner] = useState(true);
  //parents
  const relationship = [
    { label: "Father", value: "father" },
    { label: "Mother", value: "mother" },
    { label: "Guardian", value: "guardian" },
    { label: "Other", value: "other" },
  ]
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
  ]
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
  ]
  const [selectedMethod, setSelectedMethod] = useState<any>(contactMethods[0]);

  
  const [selectedDepartment, setSelectedDepartment] = useState<any>(departments[0]);

  const [selectedSubjects, setSelectedSubjects] = useState<any>([subjects[0]]);
  const [mainSubject, setMainSubject] = useState<any>(subjects[0]);

  const qualifications = [
    {
      label: 'Masters',
      value: "M.Ed"
    },
    {
      label: 'Bachelors',
      value: "B.Ed"
    },
    {
      label: 'Diploma',
      value: "D.Ed"
    },
    {
      label: 'Certificate',
      value: "C.Ed"
    },
  ]
  const [qualification, setQualification] = useState<any>(qualifications[0]);

  
  const [selectedClasses, setSelectedClasses] = useState<any>([classes[0]]);
   //Gender/Sex
  const genders = [
    {
      label: 'MALE',
      value: "1245"
    },
    {
      label: 'FEMALE',
      value: "1235"
    },
  ]
  const [selectedGender, setSelectedGender] =
   useState<any>(genders[0]);

   //nationality
  const initialCountryCode = "UG";
  const initialCountry = countries.find(
    (item) => item.countryCode === initialCountryCode
  );
  const [selectedNationality, setSelectedNationality] =
   useState<any>(initialCountry); 
   
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeacherCreateProps>({
    defaultValues: {
      firstName:"",
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "/images/teacher.png");
  

  async function saveTeacher (data: TeacherCreateProps) {
    try {
      setLoading(true);
      data.imageUrl = imageUrl;
      data.title = selectedTitle.value
      data.gender= selectedGender.label
      data.nationality=selectedNationality.label
      data.contactMethod=selectedMethod.value
      data.departmentId = selectedDepartment.value
      data.departmentName = selectedDepartment.label
      data.qualification = qualification.label
      data.mainSubject = mainSubject.label
      data.mainSubjectId = mainSubject.value
      data.subjects = selectedSubjects.map((item:DataOption) => item.label)
      data.classIds = selectedClasses.map((item:DataOption) => item.value)
      data.classes = selectedClasses.map((item:DataOption) => item.label)
      data.experience = Number(data.experience)
      if (editingId) {
      } else {
        // console.log(data);
        const res = await createTeacher(data);
        setLoading(false);
        toast.success("Parent Created Successfully!")
        reset();
        // setImageUrl("/images/teacher.png")
        router.push("/dashboard/users/teachers")
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <form className="" onSubmit={handleSubmit(saveTeacher)}>
      <div className="py-4 items-center justify-center ">
          {showBanner && (
        <DismissibleBanner message="Please fill in real info correctly, because it will help this teacher." type="warning" />
        )}
        </div>
        <FormHeader
          href="/teachers"
          parent="users"
          title="Teacher"
          editingId={editingId}
          loading={loading}
        />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-3">
          <CardContent>
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
                    label="Teacher First Name"
                    name="firstName"
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Teacher Last Name"
                    name="lastName"
                  />
                  
                  
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <FormMultipleSelectInput
                    label="Classes"
                    options={classes}
                    option={selectedClasses}
                    setOption={setSelectedClasses}
                    isSearchable={false}
                    href="/dashboard/academics/classes"
                    toolTipText="Add Class"
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
                    name="dateOfBirth"
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
                    toolTipText="For the teacher's account"
                    label="Password"
                    name="password"
                    type="password"
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
                    label="Whatsap No"
                    name="whatsappNo"
                    type="tel"
                  />
                  <FormSelectInput
                    label="Main Subject"
                    options={subjects}
                    option={mainSubject}
                    setOption={setMainSubject}
                    href="/dashboard/academic/subjects/new"
                    toolTipText="Add Subject"
                  />
                  <FormSelectInput
                    label="Contact Method"
                    options={contactMethods}
                    option={selectedMethod}
                    setOption={setSelectedMethod}
                    isSearchable={false}
                  />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Date of Joining"
                    name="dateOfJoining"
                    type="date"
                  />

                  <TextInput
                    register={register}
                    errors={errors}
                    label="Designation"
                    name="designation"
                    placeholder="Head of Department"
                  />

                  <FormSelectInput
                    label="Department"
                    options={departments}
                    option={selectedDepartment}
                    setOption={setSelectedDepartment}
                    href="/dashboard/academic/departments/new"
                    toolTipText="Add Department"
                  />

                  
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Years Of Experience"
                    name="experience"
                    placeholder="e.g 5"
                    type="number"
                  />

                  <FormSelectInput
                    label="Qualification"
                    options={qualifications}
                    option={qualification}
                    setOption={setQualification}
                  />

                  {/* multi Select */}
                  <FormMultipleSelectInput
                    label="Subjects"
                    options={subjects}
                    option={selectedSubjects}
                    setOption={setSelectedSubjects}
                    href="/dashboard/academic/departments/new"
                    toolTipText="Add Department"
                  />

                  
                </div>
                <div className="grid">
                    <ImageInput
                      title="Teacher Profile Image"
                      imageUrl={imageUrl}
                      setImageUrl={setImageUrl}
                      endpoint="teacherProfileImage"
                      className="object-contain"
                    />
                </div>
              </div>
            </CardContent>
        </div>
      </div>
      <FormHeader
          href="/teachers"
          parent="users"
          title="Teacher"
          editingId={editingId}
          loading={loading}
        />
    </form>
  );
}
