import React from 'react';
import {  
 Book, 
 MessageSquare, 
 DollarSign, 
 Truck, 
 Archive, 
 BarChart, 
 Settings, 
 LayoutDashboard,
 GraduationCap,
 UserCog,
 User,
 Shield} from 'lucide-react';
import {
 Sidebar,
 SidebarContent,
 SidebarFooter,
 SidebarGroup,
 SidebarGroupLabel,
 SidebarHeader,
 SidebarMenu,
 SidebarMenuButton,
 SidebarMenuItem,
 SidebarMenuSub,
 SidebarMenuSubButton,
 SidebarMenuSubItem,
 SidebarRail,
} from "@/components/ui/sidebar";
import {
 ChevronRight,
} from "lucide-react";


import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Logo from '@/components/logo';
import UserMenu from './user-menu';

export default function AppSidebar() {
const sidebarLinks = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    isActive: true,
    items: [
      {
        title: "Overview",
        url: "/dashboard/overview",
      },
    ],
  },
  {
    title: "Student Management",
    url: "/students",
    icon: GraduationCap,
    items: [
      {
        title: "Student Directory",
        url: "/dashboard/students",
      },
      {
        title: "Fees",
        url: "/dashboard/students/fees",
      },
      {
        title: "Student Ids",
        url: "/dashboard/students/ids",
      },
      // {
      //   title: "Enrollment",
      //   url: "/students/enrollment",
      // },
      {
        title: "Attendance",
        url: "/dashboard/students/attendance",
      },
      // {
      //   title: "Performance",
      //   url: "/students/performance",
      // },
    ],
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: User,
    items: [
      {
        title: "Parents",
        url: "/dashboard/users/parents",
      },
      {
        title: "Secretary",
        url: "/dashboard/users/secretary",
      },
      {
        title: "Teachers",
        url: "/dashboard/users/teachers",
      },
    ],
  },
  {
    title: "Academics",
    url: "/dashboard/academics",
    icon: Book,
    items: [
      {
        title: "Classes",
        url: "/dashboard/academics/classes",
      },
      {
        title: "Subjects",
        url: "/dashboard/academics/subjects",
      },
      {
        title: "Departments",
        url: "/dashboard/academics/departments",
      },
      {
        title: "Timetable",
        url: "/dashboard/academics/timetable",
      },
      {
        title: "Examinations",
        url: "/dashboard/academics/examinations",
      },
      {
        title: "Assignments",
        url: "/dashboard/academics/assignments",
      },
      {
        title: "Report Cards",
        url: "/dashboard/academics/report",
      },
    ],
  },
  {
    title: "Staff Management",
    url: "/staff",
    icon: UserCog,
    items: [
      {
        title: "Staff Directory",
        url: "/staff/directory",
      },
      {
        title: "Attendance",
        url: "/staff/attendance",
      },
      {
        title: "Leave Management",
        url: "/staff/leave",
      },
      {
        title: "Performance",
        url: "/staff/performance",
      },
    ],
  },
  {
    title: "Communication",
    url: "/communication",
    icon: MessageSquare,
    items: [
      {
        title: "Messages",
        url: "/communication/messages",
      },
      {
        title: "Announcements",
        url: "/communication/announcements",
      },
      {
        title: "Notice Board",
        url: "/communication/notices",
      },
      {
        title: "Emergency Alerts",
        url: "/communication/alerts",
      },
    ],
  },
  {
    title: "Finance",
    url: "/finance",
    icon: DollarSign,
    items: [
      {
        title: "Fee Management",
        url: "/finance/fees",
      },
      {
        title: "Payments",
        url: "/finance/payments",
      },
      {
        title: "Scholarships",
        url: "/finance/scholarships",
      },
      {
        title: "Reports",
        url: "/finance/reports",
      },
    ],
  },
  {
    title: "Transport",
    url: "/transport",
    icon: Truck,
    items: [
      {
        title: "Routes",
        url: "/transport/routes",
      },
      {
        title: "Tracking",
        url: "/transport/tracking",
      },
      {
        title: "Drivers",
        url: "/transport/drivers",
      },
      {
        title: "Maintenance",
        url: "/transport/maintenance",
      },
    ],
  },
  {
    title: "Resources",
    url: "/resources",
    icon: Archive,
    items: [
      {
        title: "Library",
        url: "/resources/library",
      },
      {
        title: "Inventory",
        url: "/resources/inventory",
      },
      {
        title: "Facilities",
        url: "/resources/facilities",
      },
      {
        title: "Assets",
        url: "/resources/assets",
      },
    ],
  },
  {
    title: "Reports & Analytics",
    url: "/reports",
    icon: BarChart,
    items: [
      {
        title: "Academic Reports",
        url: "/reports/academic",
      },
      {
        title: "Financial Reports",
        url: "/reports/financial",
      },
      {
        title: "Custom Reports",
        url: "/reports/custom",
      },
      {
        title: "Analytics Dashboard",
        url: "/reports/analytics",
      },
    ],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    items: [
      {
        title: "School Profile",
        url: "/settings/profile",
      },
      {
        title: "User Management",
        url: "/settings/users",
      },
      {
        title: "System Settings",
        url: "/settings/system",
      },
      {
        title: "Backup & Security",
        url: "/settings/security",
      },
    ],
  },
  {
    title: "Head Admin",
    url: "/dashboard/admin",
    icon: Shield,
    items: [
      {
        title: "Contacts",
        url: "/dashboard/admin/contacts",
      },
    ],
  },
];

  return (
   <Sidebar collapsible="icon">
   <SidebarHeader>
     <SidebarMenu>
       <SidebarMenuItem>
         <Logo/>
       </SidebarMenuItem>
     </SidebarMenu>
   </SidebarHeader>
   <SidebarContent>
     <SidebarGroup>
       <SidebarGroupLabel>Explore Now</SidebarGroupLabel>
       <SidebarMenu>
         {sidebarLinks.map((item) => (
           <Collapsible
             key={item.title}
             asChild
             defaultOpen={item.isActive}
             className="group/collapsible"
           >
             <SidebarMenuItem>
               <CollapsibleTrigger asChild>
                 <SidebarMenuButton tooltip={item.title}>
                   {item.icon && <item.icon />}
                   <span>{item.title}</span>
                   <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                 </SidebarMenuButton>
               </CollapsibleTrigger>
               <CollapsibleContent>
                 <SidebarMenuSub>
                   {item.items?.map((subItem) => (
                     <SidebarMenuSubItem key={subItem.title}>
                       <SidebarMenuSubButton asChild>
                         <a href={subItem.url}>
                           <span>{subItem.title}</span>
                         </a>
                       </SidebarMenuSubButton>
                     </SidebarMenuSubItem>
                   ))}
                 </SidebarMenuSub>
               </CollapsibleContent>
             </SidebarMenuItem>
           </Collapsible>
         ))}
       </SidebarMenu>
     </SidebarGroup>
     
   </SidebarContent>
   <SidebarFooter>
     <SidebarMenu>
       <SidebarMenuItem>
         <UserMenu/>
       </SidebarMenuItem>
     </SidebarMenu>
   </SidebarFooter>
   <SidebarRail />
 </Sidebar>
  )
}
