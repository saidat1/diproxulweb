import React from 'react'
import { getAllDepartments } from "@/actions/departments"
import DepartmentsListing from '@/components/dashboard/department-listing'

export default async function page() {
  const departments = await getAllDepartments() || []
  return (
    <div>
      <DepartmentsListing departments={departments}/>
    </div>
  )
}
