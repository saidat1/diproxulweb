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
import {  DepartmentCreateProps } from "@/countries";
import { createDepartment } from "@/actions/departments";

export type DepartmentProps = {
  name: string;
}

export default function DepartmentForm({
  userId,
  initialContent,
  editingId,
}: {
  userId?: string;
  initialContent?: string;
  editingId?: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DepartmentCreateProps>({
    defaultValues: {
      name: initialContent || "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility

  // Define the function to handle opening the dialog
  const handleAddSection = () => {
    setIsDialogOpen(true); // Open the dialog when the button is clicked
  };

  // Define the function to close the dialog
  const closeDialog = () => {
    setIsDialogOpen(false); // Close the dialog
  };

  async function saveDepartment(data: DepartmentCreateProps) {
    try {
      setLoading(true);
      if (editingId) {
        // await updateFolderById(editingId, data);
        // setLoading(false);
        // toast.success("Updated Successfully!");
      } else {
        const res = await createDepartment(data);
        setLoading(false);
        toast.success("Department Successfully Created!");
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
                onClick={handleAddSection} // Directly open the dialog on button click
                variant="outline"
                className="p-2"
              >
                <PlusCircle className="w-5 h-5" />
                <span className="sr-only">Add Department</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Department</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Dialog Popup */}
        <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Department" : "Add New Department"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(saveDepartment)}>
              <div>
                <div className="space-y-3">
                  <div className="grid gap-3">
                    <TextInput
                      register={register}
                      errors={errors}
                      label=""
                      name="name"
                      icon={Check}
                    />
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
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
