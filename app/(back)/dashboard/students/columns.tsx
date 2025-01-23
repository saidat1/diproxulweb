"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DateColumn from "@/components/DataTableColumns/DateColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import { Student } from "@/countries"; 
import { StudentPopupCard } from "@/components/DataTableColumns/StudentCard";

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "Details",
    header: "Names",
    cell: ({ row }) => {
      const student = row.original;
      return (
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <Avatar className="h-10 w-10 border-4 border-white shadow-lg">
            <AvatarImage src={student.imageUrl} alt={student.firstName + " " + student.lastName} />
            <AvatarFallback>{student.firstName.split(' ')[0][0]}{student.lastName.split(' ')[0][0]}</AvatarFallback>
          </Avatar>
          
          {/* Name and Relationship */}
          <div>
            <h2 className="font-medium capitalize">
              {student.firstName.toLowerCase()} {student.lastName.toLowerCase()}
            </h2>
            <p className="text-xs text-muted-foreground">{student.streamTitle}</p>
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
    accessorKey: "regNo",
    header: ({ column }) => <SortableColumn column={column} title="Registration No" />,
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    accessorKey: "View",
    header: "View",
    cell: ({ row }) => <StudentPopupCard student={row.original} />,
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
