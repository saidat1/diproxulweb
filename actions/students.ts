"use server"

import { Student } from "@/countries";
import { api } from "./schools";
import axios from "axios";
import { StudentProps } from "@/components/dashboard/forms/students/student-form";
import { revalidatePath } from "next/cache";

// CLASS ACTIONS
export async function createStudent(data: StudentProps) {
 try {
   // Send POST request to create a new student
   const response = await api.post("/students", data);
   revalidatePath("/dashboard/students")
   // Handle the server response
   if (response.data.status === 'success') {
     // Return the student data on success
     return response.data;
   } else {
     // Throw error if status is 'error'
     throw new Error(response.data.message || "Failed to create Student");
   }
 } catch (error) {
   // Handle any errors, either from the Axios request or the response
   if (axios.isAxiosError(error)) {
     const message = error.response?.data?.message || "Failed to create Student";
     throw new Error(message);
   }
   throw error;  // Re-throw non-Axios errors
 }
}

export async function deleteStudent(id: string) {
 try {
   // Send DELETE request to delete a student by ID
   const response = await api.delete(`/students/${id}`);
   
   // If the deletion was successful, the response should include a success status
   if (response.data.status === 'success') {
     console.log("Student deleted successfully:", id);
     return { ok: true };
   } else {
     throw new Error(response.data.message || "Failed to delete student");
   }
 } catch (error) {
   console.error("Error deleting student:", error);
   throw error;  // Propagate the error
 }
}

export async function getAllStudents(){
 try {
  const response = await api.get("/students");
  const students = response.data
  return students as Student[]
 } catch (error) {
  console.log(error);
 }
}

export async function getStudentNextSequence(){
  try {
   const response = await api.get("/students/seq");
   const nextSeq = response.data
   return nextSeq as number;
  } catch (error) {
   console.log(error);
  }
 }
