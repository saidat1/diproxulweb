"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { Facebook, Twitter, Instagram, Linkedin  ,Send, Mail, FolderPen, GraduationCap, Flag, Rss, Tally5, Contrast, Target, Text } from "lucide-react";
import TextArea from "../FormInputs/TextAreaInput";
import PhoneInput from "../FormInputs/PhoneInput"
import FormSelectInput from "../FormInputs/FormMultiSelectInput";
import { ContactProps, countries, media, roles } from "@/countries";
import toast from "react-hot-toast";
import { createContact } from "@/actions/admin";

const removeLeadingZero = (phoneNumber: string) => {
  const numberStr = phoneNumber.toString();
  if (numberStr.startsWith("0")){
    return numberStr.substring(1);
  }
  return numberStr;
}


const ContactUs: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [phoneCode,setPhoneCode] = useState("")
  const initialCountryCode = "TZ";
  const initialCountry = countries.find(
    (item) => item.countryCode === initialCountryCode
  )
  const [selectedCountry, setSelectedCountry] = useState<any>(initialCountry);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactProps>();
  
  const [selectedRole, setSelectedRole] = useState<any>(roles[0]);
  const [selectedMedia, setSelectedMedia] = useState<any>(media[0]);
  async function onSubmit(data: ContactProps) {
    data.phone = removeLeadingZero(data.phone)
    const phoneNumber = `${phoneCode} ${data.phone}`;
    data.phone = phoneNumber;
    data.country = selectedCountry.label;
    data.role = selectedRole.value;
    data.media = selectedMedia.value;
    data.students = Number(data.students)
    console.log(data)

    try {
      setLoading(true);
      console.log(data)
      const res = await createContact(data)
      console.log(res)
      setLoading(false)
      toast.success("Your Resquest is Successfully Submited!");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <section className="bg-gray-100  px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold mb-2 text-gray-800">All-in-one School Management Platform</h2>
          <p className="text-lg text-gray-600 mt-4">
            Streamline your entire school operatons with our comprehensive suite of intergrated modules designed  specifically for mordern educational institutions!
          </p>
        </div>
        <div className="flex items-center justify-center">
          <div className="col-span-2 bg-white p-6 rounded-2xl shadow">
            <h3 className="text-2xl text-center font-semibold mb-4">Sign up to get your school onboard</h3>
            <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            
            <TextInput
              label="Full Name"
              register={register}
              name="fullName"
              errors={errors}
              placeholder="Eg. Bosman Dwyt"
              icon={FolderPen}
            />

            <div className="grid md:grid-cols-2 gap-4">
             <TextInput
              label="Email Address"
              register={register}
              name="email"
              type="email"
              errors={errors}
              placeholder="Eg. admin@gmail.com"
              icon={Mail}
              
            /> 
            <PhoneInput
              label="Whatsapp Number"
              register={register}
              name="phone"
              errors={errors}
              toolTipText="Enter school Whatsapp number"
              placeholder="Eg. 734 567 890"
              setPhoneCode={setPhoneCode}
            />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
             <TextInput
              label="School Name"
              register={register}
              name="school"
              errors={errors}
              placeholder="Eg. Delight High School"
              icon={GraduationCap}
              
            /> 
            <FormSelectInput
              label="Country"
              options={countries}
              option={selectedCountry}
              setOption={setSelectedCountry}
            />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
             <TextInput
              label="School Website/FB, X, LinkedIn page"
              register={register}
              name="schoolPage"
              errors={errors}
              placeholder="Eg. https://www.example.com"
              icon={Rss}
              
            /> 
            <TextInput
              label="Number of Students"
              register={register}
              name="students"
              errors={errors}
              placeholder="Eg. 123"
              icon={Tally5}
            />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
            <FormSelectInput
              label="Roles"
              options={roles}
              option={selectedRole}
              setOption={setSelectedRole}
            /> 
            <FormSelectInput
              label="How did you hear us?"
              options={media}
              option={selectedMedia}
              setOption={setSelectedMedia}
            /> 
            </div>

            <TextArea
              label="Please share with us the key pain points you want to solve?"
              register={register}
              name="message"
              errors={errors}
            />
            

            <SubmitButton
              buttonIcon={Send}
              title="Submit"
              loading={loading}
              loadingTitle="Sending in progress....."
            />
          </form>
          </div>
        </div>

        <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-600 text-white p-6 rounded-2xl">
              <h3 className="font-semibold text-xl mb-2">
                Speak to Support Team
              </h3>
              <p className="text-sm mb-4 py-4">
                Need help with our system? Contact our support team for assistance with applications, system access, and school placement..
              </p>
              <button className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-600 transition duration-300">
                Book Appointment
              </button>
          </div>
          <div className="bg-gray-800 p-6 text-white rounded-2xl">
            <h3 className="font-semibold mb-2 text-xl">
              Follow Us
            </h3>
            <p className="text-sm mb-4 py-4">
              Have any curiosity regading us? Follow our official channels to stay informed and engaged with the latest news and announcements.
            </p>
            <div className="flex space-x-8">
              <a href="https://www.facebook.com" target="_blank" className="text-white hover:text-blue-600 transition duration-300">
                <Facebook className="text-2xl" />
              </a>
              <a href="https://www.twitter.com" target="_blank" className="text-white hover:text-blue-400 transition duration-300">
                <Twitter className="text-2xl" />
              </a>
              <a href="https://www.instagram.com" target="_blank" className="text-white hover:text-pink-600 transition duration-300">
                <Instagram className="text-2xl" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" className="text-white hover:text-blue-700 transition duration-300">
                <Linkedin className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
