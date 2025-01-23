import React from 'react'
import SubjectListing from '@/components/dashboard/subject-listing'
import { getBriefDepartments } from '@/actions/departments'
import { getAllSubjects } from '@/actions/subjects'

export default async function page() {
  const departments = await getBriefDepartments() || []
  const subjects = await getAllSubjects() || []
  return (
    <div>
     <SubjectListing 
     subjects={subjects}
     departments = {departments.map((item) =>{
      return {
        label: item.name,
        value: item.id
      }
     })}/>
    </div>
  )
}
