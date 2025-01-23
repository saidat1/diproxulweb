import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Check, Pencil, PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import TextInput from "@/components/FormInputs/TextInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { SubjectCreateProps } from "@/countries";
import { createDepartment } from "@/actions/departments";
import FormSelectInput from "@/components/FormInputs/FormMultiSelectInput";
import { DepartmentOption } from "../../subject-listing";
import { createSubject } from "@/actions/subjects";

export type SubjectProps = {
  name: string;
}
export default function SubjectForm({
  userId,
  initialContent,
  editingId,
  departments,
}: {
  userId?: string;
  initialContent?: string;
  editingId?: string;
  departments: DepartmentOption[];
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubjectCreateProps>({
    defaultValues: {
      name: initialContent || "",
    },
  });

  // categories
  const categories = [
    {
      label: "CORE", value: "CORE" 
    },
    {
      label: "ELECTIVE", value: "ELECTIVE"
    },
    {
      label: "ADDITIONAL", value: "ADDITONAL"
    },
    {
      label: "LANGUAGE", value: "LANGUAGE"
    },
    {
      label: "EXTRA_CURRICULAR", value: "EXTRA_CURRICULAR"
    },
  ]
  const [selectedCategory, setSelectedCategory] = useState<any>(categories[0]);

  // types
  const types = [
    {
      label: "THEORY", value: "THEORY" 
    },
    {
      label: "PRACTICAL", value: "PRACTICAL"
    },
    {
      label: "BOTH", value: "BOTH"
    },
  ]
  const [selectedType, setSelectedType] = useState(types[0]);
  const [selectedDepartment, setSelectedDepartment] = useState(departments[0]);

  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility

  // Define the function to handle opening the dialog
  const handleAddSubject = () => {
    setIsDialogOpen(true); // Open the dialog when the button is clicked
  };

  // Define the function to close the dialog
  const closeDialog = () => {
    setIsDialogOpen(false); // Close the dialog
  };

  async function saveSubject(data: SubjectCreateProps) {
    data.departmentId = selectedDepartment.value;
    data.departmentName = selectedDepartment.label;
    data.category = selectedCategory.value;
    data.type = selectedType.value;
    try {
      setLoading(true);
      if (editingId) {
        // await updateFolderById(editingId, data);
        // setLoading(false);
        // toast.success("Updated Successfully!");
      } else {
        const res = await createSubject(data);
        setLoading(false);
        toast.success("Subject Successfully Created!");
        reset()
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <div>
      <div className="py-1">
        {/* Tooltip to show when hovering over the button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleAddSubject} // Directly open the dialog on button click
                variant="outline"
                className="p-2"
              >
                <PlusCircle className="w-5 h-5" />
                <span className="sr-only">Add Subject</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Subject</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Dialog Popup */}
        <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Subject" : "Add New Subject"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(saveSubject)}>
              
                <div className="space-y-3">
                  <div className="grid gap-3">
                    <TextInput
                      register={register}
                      errors={errors}
                      label=""
                      name="name"
                      icon={Check}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <TextInput
                      register={register}
                      errors={errors}
                      label="Subject Code"
                      placeholder="e.g. MTH101"
                      name="code"
                    />
                    <TextInput
                      register={register}
                      errors={errors}
                      label="Short Name"
                      placeholder="e.g. Math"
                      name="shortName"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <FormSelectInput
                      label="Category"
                      options={categories}
                      option={selectedCategory}
                      setOption={setSelectedCategory}
                      isSearchable={false}
                    />
                    <FormSelectInput
                      label="Type"
                      options={types}
                      option={selectedType}
                      setOption={setSelectedType}
                      isSearchable={false}
                    />
                  
                  </div>
                  <div className="grid gap-3">
                    <FormSelectInput
                      label="Department"
                      options={departments}
                      option={selectedDepartment}
                      setOption={setSelectedDepartment}
                      toolTipText="Add Department"
                      href="/dashboard/academics/departments"
                    />
                  </div>
                {/* Close and Add buttons on the same line */}
                    <div className="flex justify-between py-3">
                      <Button onClick={closeDialog} variant="outline">
                        Close
                      </Button>
                      <SubmitButton
                        title={editingId ? "Update" : "Add"}
                        loading={loading}
                        className="ml-3" // Adds space between buttons
                      />
                    </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
