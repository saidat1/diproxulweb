import { Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { UserPlus, Users } from "lucide-react"
import SingleStudentForm from "@/components/dashboard/forms/students/student-form"
import BulkStudentForm from "@/components/dashboard/forms/students/bulk-student-form"

import { getAllClasses } from "@/actions/classes"
import { getAllParents } from "@/actions/parents"
import { getStudentNextSequence } from "@/actions/students"

export default async function AdmissionTabs(){
 const classes = await getAllClasses() || []
 const parents = await getAllParents() || []
 const nextSequence = await getStudentNextSequence() || 0
 return (
  <div className="w-full max-w-5xl mx-auto p-6">
   <Tabs defaultValue="single" className="w-full">
    <TabsList className="grid w-full grid-cols-2 mb-8">
     <TabsTrigger 
     value="single" 
     className="flex items-center justify-center space-x-2 py-3 data-[state=active]bg-green-600 data-[state=active]:bg-green-600 data-[state=active]:text-white transition-all duration-300 ease-in-out"
     >
      <UserPlus className="w-5 h-5"/>
      <span className="font-semibold">Single Student Admission</span>
     </TabsTrigger>
     <TabsTrigger value="bulk" className="flex items-center justify-center space-x-2 py-3 data-[state=active]:bg-green-600 data[state=active]:text-white transition-all duration-300 ease-in-out"
     >
      <Users className="w-5 h-5"/>
      <span className="font-semibold">Bulk Students Admission</span>
     </TabsTrigger>
    </TabsList>
    <Card className="border-t-4 border-green-600 shadow">
     <CardContent className="p-6">
      <TabsContent value="single" className="mt-0">
       <SingleStudentForm nextSeq ={nextSequence} parents = {parents} classes = {classes}/>
      </TabsContent>
      <TabsContent value="bulk" className="mt-0">
       <BulkStudentForm/>
      </TabsContent>
     </CardContent>
    </Card>
   </Tabs>
  </div>
 )
}