"use client";
import { Button } from "@/components/ui/button";
import {
  CardContent,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormHeader from "../FormHeader";
import FormFooter from "../FormFooter";
import TextInput from "@/components/FormInputs/TextInput";
import TextArea from "@/components/FormInputs/TextAreaInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import toast from "react-hot-toast";
import PasswordInput from "@/components/FormInputs/PasswordInput";
import FormSelectInput from "@/components/FormInputs/FormMultiSelectInput";
import { Class, countries, Parent } from "@/countries";
import { Stream } from "stream";
import DismissibleBanner from "@/components/info-banner";
import { createStudent } from "@/actions/students";
import RadioInput from "@/components/FormInputs/RadioInput";
import { generateRigistrationNumber } from "@/lib/generateRegNo";


export type SelectOptionProps = {
  label: string;
  value: string;
};
type SingleStudentFormProps = {
  editingId?: string | undefined;
  initialData?: any | undefined | null;
  classes:Class[]
  parents:Parent[]
  nextSeq:number
};
export type StudentProps = {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  parentId: string;
  studentType: string;
  parentName?: string;
  classTitle?: string;
  classId: string;
  streamId: string;
  streamTitle?: string;
  password: string;
  healthStatus: string;
  BCN: string;
  imageUrl: string;
  phone: string;
  nationality:string;
  religion: string;
  gender: string;
  dob: string;
  regNo: string;
  address: string;
  admissionDate: string;
  extraInfo: string;
  bloodGroup: string;

};
export default function SingleStudentForm({
  editingId,
  initialData,
  classes,
  parents,
  nextSeq
}: SingleStudentFormProps) {
  const [showBanner, setShowBanner] = useState(true); // Set to true to show the banner when the form is loaded

  //parents
  const parentOptions = parents.map((parent) => {
    return{
      label: `${parent.firstName} ${parent.lastName}`,
      value:parent.id
    }
  })
  
  const [selectedParent, setSelectedParent] =
   useState<any>(null);

   //Class
  const classOptions = classes.map((item)=> {
    return {
      label:item.title,
      value:item.id
    }
  })
  const [selectedClass, setSelectedClass] = useState<any>(classOptions[0]);
  const classId = selectedClass.value??""
  const streams = classes.find((item)=>item.id===classId)?.streams||[]
  const streamsOptions = streams.map((item)=> {
    return {
      label:item.title,
      value:item.id
    }
  })

   //Section/Streams
  
  const [selectedStream, setSelectedStream] =
   useState<any>(null);

   //Gender/Sex
  const genders = [
    {
      label: 'MALE',
      value: "male"
    },
    {
      label: 'FEMALE',
      value: "female"
    },
  ]
  const [selectedGender, setSelectedGender] =
   useState<any>(genders[0]);

   //Blood group
  const bloodGroups = [
    {
      label: 'O+',
      value: "O positive"
    },
    {
      label: 'O-',
      value: "O- negative"
    },
    {
      label: 'A+',
      value: "A positive" 
    },
    {
      label: 'A-',
      value: "A negative" 
    },
    {
      label: 'B+',
      value: "B positive" 
    },
    {
      label: 'B-',
      value: "B negative" 
    },
    {
      label: 'AB-',
      value: "AB negative" 
    },
    {
      label: 'AB+',
      value: "AB positive" 
    },
  ]
  const [selectedBloodgroup, setSelectedBloodgroup] =
   useState<any>(bloodGroups[0]);

   //health Status
  const healthStatuses = [
    {
      label: 'Food Allergies',
      value: "1245"
    },
    {
      label: 'Asthma',
      value: "1235" 
    },
    {
      label: 'Mobility Challenges',
      value: "1235" 
    },
    {
      label: 'Anxiety disorders',
      value: "1235" 
    },
    {
      label: 'Medication needs',
      value: "1235" 
    },
    {
      label: 'Infectious Diseases or Contagions',
      value: "1235" 
    },
    {
      label: 'Vision or Hearing Concerns',
      value: "1235" 
    },
  ]
  const [selectedHealthstatus, setSelectedHealthstatus] =
   useState<any>(healthStatuses[0]);
   //Faith
  const religions = [
    {
      label: 'Islam',
      value: "1"
    },
    {
      label: 'Catholic',
      value: "12"
    },
    {
      label: 'Anglican',
      value: "123"
    },
    {
      label: 'Adventist',
      value: "1234"
    },
    {
      label: 'Protestant',
      value: "12345"
    },
    {
      label: 'Orthodox',
      value: "123456"
    },
    {
      label: 'Other',
      value: "1234567"
    },
  ]
  const [selectedReligion, setSelectedReligion] =
   useState<any>(religions[0]);

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
  } = useForm<StudentProps>({
    defaultValues: {
      name:"",
    },
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const initialImage = initialData?.imageUrl || "/images/student.png";
  const [imageUrl, setImageUrl] = useState(initialImage);
  const studentTypes = [
    {
      label: 'Private',
      id: "PS"
    },
    {
      label: 'Sponsored',
      id: "SS"
    },
  ]


async function saveStudent(data: StudentProps) {
   // Initialize the router
  
  try {
    setLoading(true);
    // Preparing the data to be sent
    data.imageUrl = imageUrl;
    data.name = `${data.firstName} ${data.lastName}`;
    data.parentId = selectedParent.value;
    data.parentName = selectedParent.label;
    data.gender = selectedGender.label;
    data.classId = selectedClass.value;
    data.classTitle = selectedClass.label;
    data.streamId = selectedStream.value;
    data.streamTitle = selectedStream.label;
    data.bloodGroup = selectedBloodgroup.label;
    data.nationality = selectedNationality.label;
    data.religion = selectedReligion.label;
    data.healthStatus = selectedHealthstatus.label;

    console.log("Data to be saved:", data);  // Log the data to verify it's correct

    if (editingId) {
      // Logic for editing student (if applicable)
    } else {
      // Save new student
      const studentType = data.studentType as "PS" | "SS";
      const regNo = generateRigistrationNumber("SC", studentType, nextSeq)
      data.regNo = regNo
      console.log(data )
      // setLoading(false);
      const res = await createStudent(data);
      console.log("Server response:", res);  // Log the response for debugging

      if (res.status === 'success') {
        toast.success("Student Successfully Created!");  // Display success toast
        reset();  // Reset the form
        setImageUrl("/placeholder.svg");  // Optionally reset the image

        // Redirect to the /dashboard/students page after successful creation
        router.push("/dashboard/students");
      } else {
        toast.error(res.message || "Failed to create student");  // Show error message from server
      }
    }
  } catch (error) {
    setLoading(false);
    console.error("Error creating student:", error);
    toast.error("An error occurred while creating the student.");  // Toast on client-side error
  } finally {
    setLoading(false);
  }
}

  return (
    <form className="" onSubmit={handleSubmit(saveStudent)}>
      <div className="py-4 items-center justify-center">
          {showBanner && (
        <DismissibleBanner message="Please Make sure you have already created the Parent, Class and Stream for this student." type="warning" />
        )}
        </div>
      <FormHeader
        href="/students"
        parent=""
        title="Student"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-3">
          <CardContent>
              <div className="grid gap-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
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
                  <FormSelectInput
                    label="Parent"
                    options={parentOptions}
                    option={selectedParent}
                    setOption={setSelectedParent}
                    toolTipText="Add New Parent"
                    href="/dashboard/users/parents/new"
                  />
                  
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">

                  <FormSelectInput
                    label="Health Status"
                    options={healthStatuses}
                    option={selectedHealthstatus}
                    setOption={setSelectedHealthstatus}
                  />

                  <FormSelectInput
                    label="Class"
                    options={classOptions}
                    option={selectedClass}
                    setOption={setSelectedClass}
                    toolTipText="Add New Class"
                    href="/dashboard/academics/classes"
                  />

                  <FormSelectInput
                    label="Stream/Section"
                    options={streamsOptions}
                    option={selectedStream}
                    setOption={setSelectedStream}
                    toolTipText="Add New Stream"
                    href="/dashboard/academics/classes"
                  />

                  

                  
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
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

                  <PasswordInput
                    register={register}
                    errors={errors}
                    toolTipText="For the student's account"
                    label="Password"
                    name="password"
                    type="password"
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
                  <FormSelectInput
                    label="Religions"
                    options={religions}
                    option={selectedReligion}
                    setOption={setSelectedReligion}
                  />

                  <FormSelectInput
                    label="Blood Group"
                    options={bloodGroups}
                    option={selectedBloodgroup}
                    setOption={setSelectedBloodgroup}
                  />
                  
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">

                  <TextInput
                    register={register}
                    errors={errors}
                    label="Birth Certificate No"
                    name="BCN"
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Address"
                    name="address"
                  />
                  <RadioInput
                    register={register}
                    errors={errors}
                    label="Sponsorship Type"
                    radioOptions={studentTypes}
                    name="studentType"
                    defaultValue ="PS"
                  />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  <FormSelectInput
                    label="Gender"
                    options={genders}
                    option={selectedGender}
                    setOption={setSelectedGender}
                    isSearchable ={false}
                  />

                  <TextInput
                    register={register}
                    errors={errors}
                    label="Student DOB"
                    name="dob"
                    type="date"
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Admission Date"
                    type="date"
                    name="admissionDate"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                <div className="grid gap-3">
                  <TextArea
                    register={register}
                    errors={errors}
                    label="Extra Info"
                    name="extraInfo"
                  />
                </div>
                <div className="grid">
                  <ImageInput
                    title="Student Profile Image"
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                    endpoint="studentProfileImage"
                    className="object-contain"
                  />
                </div>
                </div>
              </div>
            </CardContent>
        </div>
        {/* <div className="lg:col-span-4 col-span-full ">
          <div className="grid auto-rows-max items-start gap-4 ">
            
          </div>
        </div> */}
      </div>
      <FormFooter
        href="/students"
        editingId={editingId}
        loading={loading}
        title="Student"
        parent=""
      />
    </form>
  );
}
