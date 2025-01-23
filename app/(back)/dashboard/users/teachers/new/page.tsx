import { Card, CardContent } from "@/components/ui/card"
import TeacherForm from "@/components/dashboard/forms/users/teacher-form"
import { getBriefClasses } from "@/actions/classes";
import { getBriefSubjects } from "@/actions/subjects";
import { getBriefDepartments } from "@/actions/departments";

export default async function AdmissionTabs(){
  // Classes
  const classesData = await getBriefClasses() || [];
  // Subjects
  const subjectsData = await getBriefSubjects() || [];
  // Departments
  const departmentsData = await getBriefDepartments() || [];

  const classes = classesData.map((item) => {
    return {
      label: item.title,
      value: item.id
    }
  })
  const subjects = subjectsData.map((item) => {
    return {
      label: item.name,
      value: item.id
    }
  })
  const departments = departmentsData.map((item) => {
    return {
      label: item.name,
      value: item.id
    }
  })
 return (
  <div className="w-full max-w-5xl mx-auto p-6 ">
   <Card className="border-t-4 border-green-600 shadow ">
     <CardContent className="p-6">
      <TeacherForm classes={classes} departments={departments} subjects={subjects} />
     </CardContent>
    </Card>
  </div>
 )
}