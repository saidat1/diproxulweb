"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DateColumn from "@/components/DataTableColumns/DateColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import { Contact } from "@/countries";
import { ContactPopupCard } from "@/components/DataTableColumns/ContactCard";

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: "media",
    header: "Photo",
    cell: ({ row }) => (
      <Avatar className="h-8 w-8">
        <AvatarImage src={row.original.media || ""} alt={row.original.fullName} />
        <AvatarFallback>{row.original.fullName?.[0]}</AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => <SortableColumn column={column} title="Full Name" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortableColumn column={column} title="Email" />,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => <SortableColumn column={column} title="Phone" />,
  },
  {
    accessorKey: "school",
    header: ({ column }) => <SortableColumn column={column} title="School" />,
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    accessorKey: "View",
    header: "View",
    cell: ({ row }) => <ContactPopupCard contact={row.original}/>,
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

