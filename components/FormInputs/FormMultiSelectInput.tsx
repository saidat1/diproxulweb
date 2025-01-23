"use client";
import AddNewButton from "@/components/FormInputs/AddNewButton";
import React, { useState } from "react";
import Select from "react-tailwindcss-select";
import { Option, Options } from "react-tailwindcss-select/dist/components/type";
type FormSelectInputProps = {
  options: Options;
  label: string;
  option: Option;
  setOption: any;
  href?: string;
  labelShown?: boolean;
  toolTipText?: string;
  isSearchable?: boolean;
  isMultiple?: boolean;
};
export default function FormMultipleSelectInput({
  options,
  label,
  option,
  setOption,
  href,
  toolTipText,
  labelShown = true,
  isSearchable = true,
  isMultiple = false,
}: FormSelectInputProps) {
  const [result, setResult] = useState([]);
  function handleChange(item:any){
    setOption(item);
    console.log(item);
  }
  return (
    <div className="">
      {labelShown && (
        <h2 className="pb-2 text-sm font-medium leading-6 text-gray-900 dark:text-white">
          Select {label}
        </h2>
      )}
      <div className="flex items-center space-x-2">
        <Select
          isSearchable={isSearchable}
          primaryColor="green"
          value={option}
          onChange={handleChange}
          options={options}
          placeholder={label}
          isMultiple
        />
        {href && toolTipText && (
          <AddNewButton toolTipText={toolTipText} href={href} />
        )}
      </div>
    </div>
  );
}
