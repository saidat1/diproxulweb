"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DateColumn from "@/components/DataTableColumns/DateColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import {Teacher } from "@/countries";
import { TeacherPopupCard } from "@/components/DataTableColumns/TeacherCard";

export const columns: ColumnDef<Teacher>[] = [
  {
    accessorKey: "user",
    header: "Names",
    cell: ({ row }) => {
      const teacher = row.original;
      return (
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <Avatar className="h-10 w-10 border-4 border-white shadow-lg">
            <AvatarImage src={teacher.imageUrl} alt={teacher.firstName + " " + teacher.lastName} />
            <AvatarFallback>{teacher.firstName.split(' ')[0][0]}{teacher.lastName.split(' ')[0][0]}</AvatarFallback>
          </Avatar>
          
          {/* Name and Relationship */}
          <div>
            <h2 className="font-medium capitalize">
              {teacher.firstName.toLowerCase()} {teacher.lastName.toLowerCase()}
            </h2>
            <p className="text-xs text-muted-foreground">{teacher.mainSubject}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => <SortableColumn column={column} title="Phone" />,
  },
  {
    accessorKey: "nationality",
    header: ({ column }) => <SortableColumn column={column} title="Nationality" />,
  },
  {
    accessorKey: "qualification",
    header: ({ column }) => <SortableColumn column={column} title="Qualification" />,
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    accessorKey: "View",
    header: "View",
    cell: ({ row }) => <TeacherPopupCard teacher={row.original} />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const contact = row.original;
      return (
        <ActionColumn
          row={row}
          model="contact"
          editEndpoint={`#`}
          id={contact.id}
        />
      );
    },
  },
];
