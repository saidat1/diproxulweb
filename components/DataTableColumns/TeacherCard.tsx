"use client";

import { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  MapPinned,
  Phone,
  UserCircle,
  Globe,
  Users,
  MessageCircle,
  Calendar,
  BookOpen,
  Layers,
  BookHeart,
  BookCopy,
  Backpack,
  Fingerprint,
  UserRoundPen,
  Battery,
  IdCard,
} from "lucide-react";
import { Badge } from '../ui/badge';
import { Teacher } from '@/countries';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface TeacherPopupCardProps {
  teacher: Teacher | undefined;
}

export function TeacherPopupCard({ teacher }: TeacherPopupCardProps) {
  const [open, setOpen] = useState(false);

  // Memoize the parent info for optimization
  const teacherInfo = useMemo(() => {
    if (!teacher) return [];
    return [
      { icon: <Mail className="h-5 w-5 text-blue-500" />, label: "Email", value: teacher.email },
      { icon: <MapPinned className="h-5 w-5 text-red-500" />, label: "Address", value: teacher.address },
      { icon: <Phone className="h-5 w-5 text-green-500" />, label: "WhatsApp", value: teacher.whatsappNo },
      { icon: <UserCircle className="h-5 w-5 text-orange-500" />, label: "Gender", value: teacher.gender },
      { icon: <Globe className="h-5 w-5 text-indigo-500" />, label: "Nationality", value: teacher.nationality },
      { icon: <IdCard className="h-5 w-5 text-indigo-900" />, label: "National ID / Passport", value: teacher.NIN },
      { icon: <UserRoundPen className="h-5 w-5 text-purple-500" />, label: "Date of Joining", value: teacher.dateOfJoining },
      { icon: <MessageCircle className="h-5 w-5 text-yellow-500" />, label: "Contact Method", value: teacher.contactMethod },
      { icon: <Calendar className="h-5 w-5 text-pink-500" />, label: "Date of Birth", value: new Date(teacher.dateOfBirth).toLocaleDateString() },
      { icon: <BookCopy className="h-5 w-5 text-lime-500" />, label: "Subjects", value: teacher.subjects.join(", ") },
      { icon: <Backpack className="h-5 w-5 text-lime-500" />, label: "Classes", value: teacher.classes.join(", ") },
      { icon: <Battery className="h-5 w-5 text-violet-500" />, label: "Experience", value: teacher.experience + " years" },
    ];
  }, [teacher]);

  if (!teacher) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
  {/* Tooltip to show "View more info" when hovered */}
  <Tooltip>
    <TooltipTrigger>
      <DialogTrigger asChild>
        <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300">
          <span className="text-gray-900 dark:text-white">👁️</span>
        </div>
      </DialogTrigger>
      <TooltipContent>
        <p className="text-xs text-gray-900 dark:text-white rounded">View more info</p>
      </TooltipContent>
    </TooltipTrigger>
  </Tooltip>

  {/* Dialog content displaying the teacher's detailed info */}
  <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px] bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 transition duration-300">
    <DialogHeader>
      <DialogTitle className="flex items-center text-gray-800 dark:text-white gap-4">
        <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
          <AvatarImage src={teacher.imageUrl} alt={teacher.firstName + " " + teacher.lastName} />
          <AvatarFallback>{teacher.firstName.split(' ')[0][0]}{teacher.lastName.split(' ')[0][0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">{teacher.firstName} {teacher.lastName}</h2>
          <Badge variant="secondary" className="mt-1">
            {teacher.qualification}
          </Badge>
        </div>
      </DialogTitle>
    </DialogHeader>
    <div className="grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {teacherInfo.map((info, index) => (
        <Card key={index} className="transition-transform transform hover:scale-105 hover:shadow-xl rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-600">
          <CardContent className="flex flex-col items-center p-2">
            <div className="mb-3">{info.icon}</div>
            <div className="text-md font-medium text-gray-700 dark:text-gray-300">{info.label}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{info.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  </DialogContent>
    </Dialog>
  );
}
