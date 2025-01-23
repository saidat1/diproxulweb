"use server"

import { Department, DepartmentBrief, Subject, SubjectBrief, SubjectCreateProps } from "@/countries";
import { api } from "./schools";
import axios from "axios";
import { revalidatePath } from "next/cache";

// SUBJECT ACTIONS
export async function createSubject(data: SubjectCreateProps){
 try {
  const response = await api.post("/subjects", data);
  revalidatePath("/dashboard/academics/subjects")
  return response.data;
 } catch (error) {
  if (axios.isAxiosError(error)){
   const message = error.response?.data?.message || "Failed to create Subject";
   throw new Error(message)
  }
  throw error;  
 }
}

export async function deleteSubject(id:string){
 console.log("deleted",id);
 return {
  ok:true
 }
}

export async function getAllSubjects(){
 try {
  const response = await api.get("/subjects");
  const subjects = response.data
  return subjects as Subject[]
 } catch (error) {
  
 }
}

export async function getBriefSubjects(){
 try {
  const response = await api.get("/subjects/brief");
  const subjects = response.data
  return subjects as SubjectBrief[]
 } catch (error) {
  
 }
}

