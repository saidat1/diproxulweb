"use server"

import { Parent, Teacher, TeacherCreateProps } from "@/countries";
import { api } from "./schools";
import axios from "axios";
import { revalidatePath } from "next/cache";

// TEACHER ACTIONS

export async function createTeacher(data: TeacherCreateProps){
 try {
  const response = await api.post("/teachers", data);
  revalidatePath("/dashboard/users/teachers")
  return response.data;
 } catch (error) {
  if (axios.isAxiosError(error)){
   const message = error.response?.data?.message || "Failed to create teacher";
   throw new Error(message)
  }
  throw error;  
 }
}

export async function deleteTeacher(id:string){
 console.log("deleted",id);
 return {
  ok:true
 }
}

export async function getAllTeachers(){
 try {
  const response = await api.get("/teachers");
  const teachers = response.data
  return teachers as Teacher[]
 } catch (error) {
  console.log(error);
 }
}