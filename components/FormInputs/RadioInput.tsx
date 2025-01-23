import React from "react";

type RadioOption = {
  label: string;
  id: string;
};

type RadioInputProps = {
  radioOptions: RadioOption[];
  register: any;
  label: string;
  name: string;
  errors: any;
  defaultValue?: string; // New optional prop for default selected option
};

export default function RadioInput({
  radioOptions,
  register,
  label,
  name,
  errors,
  defaultValue,
}: RadioInputProps) {
  // Set the default option to the first item if not provided
  const defaultSelected = defaultValue || (radioOptions[0]?.id ?? "");

  return (
    <div className="grid gap-1">
      <h3 className=" font-semibold text-gray-900 dark:text-white">{label}</h3>
      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {radioOptions.map((item, i) => {
          return (
            <li
              key={i}
              className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
            >
              <div className="flex items-center ps-3">
                <input
                  {...register(name, { required: true })}
                  name={name}
                  id={item.id}
                  type="radio"
                  value={item.id}
                  defaultChecked={item.id === defaultSelected} // Set default checked value
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor={item.id}
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {item.label}
                </label>
              </div>
            </li>
          );
        })}
      </ul>
      {errors[name] && (
        <span className="text-red-600 text-sm">{label} is required</span>
      )}
    </div>
  );
}
