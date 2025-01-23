"use server"

import { Class, ClassBrief, ClassCreateProps, Stream, StreamCreateProps } from "@/countries";
import { api } from "./schools";
import axios from "axios";
import { revalidatePath } from "next/cache";

// CLASS ACTIONS
export async function createClass(data: ClassCreateProps){
 try {
  const response = await api.post("/classes", data);
  revalidatePath("/dashboard/academics/classes")
  return response.data;
 } catch (error) {
  if (axios.isAxiosError(error)){
   const message = error.response?.data?.message || "Failed to create Class";
   throw new Error(message)
  }
  throw error;  
 }
}

export async function deleteClass(id:string){
 console.log("deleted",id);
 return {
  ok:true
 }
}

export async function getAllClasses(){
 try {
  const response = await api.get("/classes");
  const classes = response.data
  return classes as Class[]
 } catch (error) {
  
 }
}

export async function getBriefClasses(){
 try {
  const response = await api.get("/classes/brief");
  const classes = response.data
  return classes as ClassBrief[]
 } catch (error) {
  console.log(error);
 }
}

// STREAM ACTIONS
export async function createStream(data: StreamCreateProps){
 try {
  const response = await api.post("/streams", data);
  revalidatePath("/dashboard/academics/classes")
  return response.data;
 } catch (error) {
  if (axios.isAxiosError(error)){
   const message = error.response?.data?.message || "Failed to create Steam";
   throw new Error(message)
  }
  throw error;  
 }
}
export async function deleteStream(id:string){
 console.log("deleted",id);
 return {
  ok:true
 }
}
export async function getAllStreams(){
 try {
  const response = await api.get("/streams");
  const streams = response.data
  return streams as Stream[]
 } catch (error) {
  
 }
}