"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DateColumn from "@/components/DataTableColumns/DateColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import { Parent } from "@/countries";
import { ParentPopupCard } from "@/components/DataTableColumns/ParentCard";

export const columns: ColumnDef<Parent>[] = [
  {
    accessorKey: "user",
    header: "Names",
    cell: ({ row }) => {
      const parent = row.original;
      return (
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <Avatar className="h-10 w-10 border-4 border-white shadow-lg">
            <AvatarImage src={parent.imageUrl} alt={parent.firstName + " " + parent.lastName} />
            <AvatarFallback>{parent.firstName.split(' ')[0][0]}{parent.lastName.split(' ')[0][0]}</AvatarFallback>
          </Avatar>
          
          {/* Name and Relationship */}
          <div>
            <h2 className="font-medium capitalize">
              {parent.firstName.toLowerCase()} {parent.lastName.toLowerCase()}
            </h2>
            <p className="text-xs text-muted-foreground">{parent.relationship}</p>
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
    accessorKey: "occupation",
    header: ({ column }) => <SortableColumn column={column} title="Occupation" />,
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    accessorKey: "View",
    header: "View",
    cell: ({ row }) => <ParentPopupCard parent={row.original} />,
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
