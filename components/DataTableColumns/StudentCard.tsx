"use client";

import { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Globe, UserCircle, Calendar, Users, MapPinned, HeartPulse, Smile, Heart, Folder, FolderTree } from 'lucide-react'; // Added BloodDrop for blood group
import { Badge } from '../ui/badge';
import { Student } from '@/countries';  // Import the Student type
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface StudentPopupCardProps {
  student: Student | undefined;  // Changed to Student type
}

export function StudentPopupCard({ student }: StudentPopupCardProps) {
  const [open, setOpen] = useState(false);

  // Memoize the student info for optimization
  const studentInfo = useMemo(() => {
    if (!student) return [];
    return [
      { icon: <Heart className="h-5 w-5 text-blue-500" />, label: "Health Status", value: student.healthStatus },
      { icon: <MapPinned className="h-5 w-5 text-red-500" />, label: "Address", value: student.address },
      { icon: <Smile className="h-5 w-5 text-green-500" />, label: "Parent", value: student?.parentName || student?.parentId },
      { icon: <UserCircle className="h-5 w-5 text-orange-500" />, label: "Gender", value: student.gender },
      { icon: <Globe className="h-5 w-5 text-indigo-500" />, label: "Nationality", value: student.nationality },
      { icon: <Folder className="h-5 w-5 text-purple-500" />, label: "Class", value: student?.classTitle||student?.classId },
      { icon: <FolderTree className="h-5 w-5 text-yellow-500" />, label: "Stream", value: student?.streamTitle || student?.streamId},
      { icon: <Calendar className="h-5 w-5 text-pink-500" />, label: "Date of Birth", value: new Date(student.dob).toLocaleDateString() },
      { icon: <Calendar className="h-5 w-5 text-teal-500" />, label: "Admission Date", value: new Date(student.admissionDate).toLocaleDateString() },
      { icon: <HeartPulse className="h-5 w-5 text-red-700" />, label: "Blood Group", value: student.bloodGroup },
      { icon: <Calendar className="h-5 w-5 text-black" />, label: "Created", value: new Date(student.createdAt).toLocaleDateString() },
      { icon: <Calendar className="h-5 w-5 text-gray-500" />, label: "Updated", value: new Date(student.updatedAt).toLocaleDateString() },
    ];
  }, [student]);

  if (!student) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Tooltip to show "View more info" when hovered */}
      <Tooltip>
        <TooltipTrigger>
          <DialogTrigger asChild>
            <div className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300">
              <span className="text-gray-900 dark:text-white">👁️</span>
            </div>
          </DialogTrigger>
          <TooltipContent>
            <p className="text-xs text-gray-900 dark:text-white p-2 rounded">View more info</p>
          </TooltipContent>
        </TooltipTrigger>
      </Tooltip>

      {/* Dialog content displaying the student's detailed info */}
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px] bg-gray-50 dark:bg-gray-800 shadow-lg rounded-xl p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center text-gray-800 gap-4">
            <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
              <AvatarImage src={student.imageUrl} alt={student.firstName + " " + student.lastName} />
              <AvatarFallback>{student.firstName.split(' ')[0][0]}{student.lastName.split(' ')[0][0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="mt-4 text-2xl font-bold text-gray-800">{student.firstName} {student.lastName}</h2>
              <Badge variant="secondary" className="mt-1">
                {student.email}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentInfo.map((info, index) => (
            <Card key={index} className="transition-transform transform hover:scale-105 hover:shadow-xl rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-600">
            <CardContent className="flex flex-col items-center p-2">
              <div className="mb-3">{info.icon}</div>
              <div className="text-md font-medium text-gray-900 dark:text-gray-300">{info.label}</div>
              <div className="text-sm text-gray-900 dark:text-gray-400">{info.value}</div>
            </CardContent>
          </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
