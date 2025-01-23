'use client'

import { useState } from 'react'
import { Pencil, Trash2, Users, Book, Calendar, DollarSign, UserCog, Clock, GraduationCap, Plus, CircuitBoard } from 'lucide-react'
import { format } from 'date-fns'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Input } from '../ui/input'
import DepartmentForm from './forms/academics/department-form'
import { Department } from '@/countries'


export default function DepartmentsListing({departments}:{departments:Department[]}) {
  const [selectedDept, setSelectedDept] = useState(departments[0])
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <div className="flex lg:grid-cols-[320px_1fr] h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-80 bg-white dark:bg-gray-800 border-r">
        <div className="p-3">
            <div className="flex items-center justify-between gap-2 px-4 pt-2 py-2">
              <div className="flex items-center gap-2">
                <CircuitBoard className="h-6 w-6"/>
                  <h2 className="text-xl font-semibold">Departments</h2>
              </div>
              <DepartmentForm/>
            </div>
            <div className="px-4 py-2">
              <Input
                placeholder="Search department..."
                className="h-9"
                type="search"
              />
            </div>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            {departments.map((dept) => (
              <div
                key={dept.id}
                className={`p-4 mb-2 rounded-lg flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
                  selectedDept?.id === dept.id ? 'bg-gray-100 dark:bg-gray-700' : ''
                }`}
                onClick={() => setSelectedDept(dept)}
              >
                <span className="font-medium">{dept.name}</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        {selectedDept && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{selectedDept.name}</h1>
              <p className="text-muted-foreground">Department Details</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="transition-all hover:shadow-lg hover:-translate-y-1">
                <Card className="h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                    <CardTitle className="text-base font-medium">Budget Information</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">
                      ${selectedDept.budget?.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Budget Year: {selectedDept.budgetYear}
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="transition-all hover:shadow-lg hover:-translate-y-1">
                <Card className="h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                    <CardTitle className="text-base font-medium">HOD Details</CardTitle>
                    <UserCog className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-lg font-medium">{selectedDept.hodName || 'Not assigned'}</div>
                    <p className="text-xs text-muted-foreground">
                      ID: {selectedDept.hodId}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Start Date: {selectedDept.hodStartDate ? format(selectedDept.hodStartDate, 'PP') : 'N/A'}
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="transition-all hover:shadow-lg hover:-translate-y-1">
                <Card className="h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                    <CardTitle className="text-base font-medium">Department Info</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-2">
                      <p className="text-xs">
                        Created: {format(selectedDept.createdAt, 'PP')}
                      </p>
                      <p className="text-xs">
                        Updated: {format(selectedDept.updatedAt, 'PP')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="transition-all hover:shadow-lg hover:-translate-y-1">
                <Card className="h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                    <CardTitle className="text-base font-medium">Total Teachers</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">{selectedDept.teachers.length}</div>
                    <p className="text-xs text-muted-foreground">Active teaching staff</p>
                  </CardContent>
                </Card>
              </div>
              <div className="transition-all hover:shadow-lg hover:-translate-y-1">
                <Card className="h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                    <CardTitle className="text-base font-medium">Total Subjects</CardTitle>
                    <Book className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">{selectedDept.subjects.length}</div>
                    <p className="text-xs text-muted-foreground">Current subjects</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
              <div className="transition-all hover:shadow-lg hover:-translate-y-1">
                <Card className="h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                    <CardTitle className="text-lg font-medium">Teachers</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <ScrollArea className="h-[150px]">
                      {[
                        { id: 1, name: 'John Doe', subject: 'Mathematics' },
                        { id: 2, name: 'Jane Doe', subject: 'Physics' },
                        { id: 3, name: 'John Smith', subject: 'Chemistry' },
                      ].map((teacher) => (
                        <div key={teacher.id} className="mb-4 last:mb-0">
                          <div className="font-medium">{teacher.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {teacher.subject}
                          </div>
                          <Separator className="mt-2" />
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
              <div className="transition-all hover:shadow-lg hover:-translate-y-1">
                <Card className="h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
                    <CardTitle className="text-lg font-medium">Subjects</CardTitle>
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <ScrollArea className="h-[150px]">
                      {[
                        { id: 1, name: 'Mathematics', code: 'MATH101', teacher: 'John Doe',},
                        { id: 2, name: 'Physics', code: 'PHY101', teacher: 'Jane Doe', },
                        { id: 3, name: 'Chemistry', code: 'CHEM101',teacher: 'John Smith',}
                      ].map((subject) => (
                        <div key={subject.id} className="mb-4 last:mb-0">
                          <div className="font-medium">{subject.name}</div>
                          <Separator className="mt-2" />
                        </div>
                      ))}
                    </ScrollArea>
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

