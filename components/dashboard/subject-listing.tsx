'use client'

import { useState } from 'react'
import { Pencil, Trash2, Book, CircuitBoard, FileText, GraduationCap, Beaker, User } from 'lucide-react'
import { format } from 'date-fns'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import SubjectForm from './forms/academics/subject-form'
import { Subject } from '@/countries'

// Mock data for demonstration
// const subjects = [
//   {
//     id: "1",
//     name: "Mathematics",
//     slug: "mathematics",
//     code: "MATH101",
//     shortName: "Math",
//     passingMarks: 40,
//     totalMarks: 100,
//     departmentName: "Science Department",
//     departmentId: "sci-dept",
//     createdAt: new Date("2023-01-01"),
//     updatedAt: new Date("2023-06-01"),
//     isActive: true,
//     isOptional: false,
//     hasPractical: false,
//     hasTheory: true,
//     labRequired: false,
//   },
//   {
//     id: "2",
//     name: "Physics",
//     slug: "physics",
//     code: "PHYS101",
//     shortName: "Phys",
//     passingMarks: 40,
//     totalMarks: 100,
//     departmentName: "Science Department",
//     departmentId: "sci-dept",
//     createdAt: new Date("2023-01-01"),
//     updatedAt: new Date("2023-06-01"),
//     isActive: true,
//     isOptional: false,
//     hasPractical: true,
//     hasTheory: true,
//     labRequired: true,
//   },
// ]

export type DepartmentOption = {
  label: string;
  value: string;
}

export default function SubjectListing({
 departments, 
 subjects
}: {
 departments: DepartmentOption[];
 subjects: Subject[];
}) {
  const [selectedSubject, setSelectedSubject] = useState(subjects [0])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex lg:grid-cols-[320px_1fr] h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-80 bg-white dark:bg-gray-800 border-r">
        <div className="p-3">
          <div className="flex items-center justify-between gap-2 px-4 pt-2 py-2">
            <div className="flex items-center gap-2">
              <Book className="h-6 w-6"/>
              <h2 className="text-xl font-semibold">Subjects</h2>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SubjectForm departments={departments} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add a subject</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="px-4 py-2">
            <Input
              placeholder="Search subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9"
              type="search"
            />
          </div>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            {filteredSubjects.map((subject) => (
              <div
                key={subject.id}
                className={`p-4 mb-2 rounded-lg flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
                  selectedSubject?.id === subject.id ? 'bg-gray-100 dark:bg-gray-700' : ''
                }`}
                onClick={() => setSelectedSubject(subject)}
              >
                <span className="font-medium">{subject.name}</span>
                <div className="flex gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit Subject</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete Subject</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        {selectedSubject && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{selectedSubject.name}</h1>
              <p className="text-muted-foreground">Subject Details</p>
            </div>

            {/* Cards Layout (Subject Code, Category & Type, Marks remain in single-column) */}
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {/* Subject Code Card */}
              <div className="transition-all hover:shadow-lg hover:-translate-y-1">
                <Card className="h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                    <CardTitle className="text-base font-medium">Subject Code</CardTitle>
                    <CircuitBoard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">{selectedSubject.code}</div>
                    <p className="text-xs text-muted-foreground">
                      Short Name: {selectedSubject.shortName || 'N/A'}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Category & Type Card */}
              <div className="transition-all hover:shadow-lg hover:-translate-y-1">
                <Card className="h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                    <CardTitle className="text-base font-medium">Category & Type</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <Badge className="mb-2">{selectedSubject.category}</Badge>
                    <Badge variant="outline">{selectedSubject.type}</Badge>
                  </CardContent>
                </Card>
              </div>

              {/* Marks Card */}
              <div className="transition-all hover:shadow-lg hover:-translate-y-1">
                <Card className="h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                    <CardTitle className="text-base font-medium">Marks</CardTitle>
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Passing Marks</p>
                        <p className="text-xl font-bold">{selectedSubject.passingMarks || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total Marks</p>
                        <p className="text-xl font-bold">{selectedSubject.totalMarks || 'N/A'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Department Info and Subject Properties Cards (2 columns at lg, 2 at md, 1 at sm) */}
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
              {/* Subject Properties Card */}
              <div className="transition-all hover:shadow-lg hover:-translate-y-1">
                <Card className="h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                    <CardTitle className="text-lg font-medium">Subject Properties</CardTitle>
                    <Beaker className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="grid grid-cols-2 gap-4">
                      {/* Properties */}
                      {[
                        { name: 'Active', value: selectedSubject.isActive },
                        { name: 'Optional', value: selectedSubject.isOptional },
                        { name: 'Has Theory', value: selectedSubject.hasTheory },
                        { name: 'Has Practical', value: selectedSubject.hasPractical },
                        { name: 'Lab Required', value: selectedSubject.labRequired },
                      ].map((prop) => (
                        <div key={prop.name} className="flex justify-between p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                          <p className="text-xs font-medium text-left">{prop.name}</p>
                          <Badge variant={prop.value ? "default" : "secondary"}>{prop.value ? "Yes" : "No"}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Department Info Card */}
              <div className="transition-all hover:shadow-lg hover:-translate-y-1">
                <Card className="h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                    <CardTitle className="text-base font-medium">Department Info</CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="grid grid-cols-2 gap-4">
                      {/* Department Name and ID */}
                      <div>
                        <p className="text-xs text-muted-foreground">Department</p>
                        <p className="text-lg font-medium">{selectedSubject.departmentName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">ID</p>
                        <p className="text-lg font-medium">{selectedSubject.departmentId || 'N/A'}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-2">
                      <p className="text-xs">Created: {format(selectedSubject.createdAt, 'PP')}</p>
                      <p className="text-xs">Updated: {format(selectedSubject.updatedAt, 'PP')}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
