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
import { ClassCreateProps } from "@/countries";
import { createClass } from "@/actions/classes";

export default function ClassForm({
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
  } = useForm<ClassCreateProps>({
    defaultValues: {
      title: initialContent || "",
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

  async function saveClass(data: ClassCreateProps) {
    try {
      setLoading(true);
      if (editingId) {
        // await updateFolderById(editingId, data);
        // setLoading(false);
        // toast.success("Updated Successfully!");
      } else {
        const res = await createClass(data);
        setLoading(false);
        toast.success("Class Successfully Created!");
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
                <span className="sr-only">Add Class</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Class</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Dialog Popup */}
        <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Class" : "Add New Class"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(saveClass)}>
              <div>
                <div className="space-y-3">
                  <div className="grid gap-3">
                    <TextInput
                      register={register}
                      errors={errors}
                      label=""
                      name="title"
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
