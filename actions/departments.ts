"use server"

import { Department, DepartmentBrief, DepartmentCreateProps } from "@/countries";
import { api } from "./schools";
import axios from "axios";
import { revalidatePath } from "next/cache";

// DEPARTMENT ACTIONS
export async function createDepartment(data: DepartmentCreateProps){
 try {
  const response = await api.post("/departments", data);
  revalidatePath("/dashboard/academics/departments")
  return response.data;
 } catch (error) {
  if (axios.isAxiosError(error)){
   const message = error.response?.data?.message || "Failed to create Department";
   throw new Error(message)
  }
  throw error;  
 }
}

export async function deleteDepartment(id:string){
 console.log("deleted",id);
 return {
  ok:true
 }
}

export async function getAllDepartments(){
 try {
  const response = await api.get("/departments");
  const departments = response.data
  return departments as Department[]
 } catch (error) {
  
 }
}

export async function getBriefDepartments(){
 try {
  const response = await api.get("/departments/brief");
  const departments = response.data
  return departments as DepartmentBrief[]
 } catch (error) {
  
 }
}

