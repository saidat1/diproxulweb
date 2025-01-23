"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit, Trash2, Search, Users, GraduationCap, ChevronLeft, Pencil, User } from "lucide-react";
import ClassForm from "./forms/academics/class-form";
import { Class, Stream } from "@/countries";  // Assuming this is the type you want to use
import StreamForm from "./forms/academics/section-form";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function ClassListing({ classes }: { classes: Class[] }) {
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const streams = classes.find((c) => c.id === selectedClass)?.streams || [];

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set mounted to true after the first render
  }, []);

  if (!isMounted) return null; // Prevent rendering tooltip and dynamic content on SSR

  return (
    <div className="grid lg:grid-cols-[320px_1fr] h-screen dark:bg-gray-900 gap-2">
      {/* Left Column - Fixed */}
      <div className="w-80 bg-white dark:bg-gray-800 sticky top-0 h-full">
        <div className="flex items-center justify-between gap-2 px-4 pt-2 py-2">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            <h2 className="text-xl font-semibold">Classes</h2>
          </div>
          <ClassForm />
        </div>
        <div className="px-4 py-2">
          <Input placeholder="Search classes..." className="h-9" type="search" />
        </div>
        <ScrollArea className="flex-1">
          <div className="px-2 space-y-3">
            {classes.map((classItem) => (
              <div
                key={classItem.id}
                className={cn(
                  'p-3 mb-2 rounded-lg flex items-center justify-between cursor-pointer',
                  selectedClass === classItem.id
                    ? "bg-gray-100 dark:bg-gray-700 text-accent-foreground"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-muted-foreground"
                )}
              >
                <button
                  onClick={() => setSelectedClass(classItem.id)}
                  className="flex flex-col items-start gap-1 text-left"
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    <span className="font-medium">{classItem.title}</span>
                    <span className="text-xs">{classItem.streams.length} sections</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    {classItem._count.students} students
                  </div>
                </button>
                <div className="flex items-center gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Pencil className="h-3 w-3" />
                          <span className="sr-only">Edit Class</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit Class</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Trash2 className="h-3 w-3 text-red-600" />
                          <span className="sr-only">Delete Class</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete Class</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right Column - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {selectedClass ? (
          <div className="gap-2 rounded-lg">
            <div className="flex items-center justify-between gap-2 px-4 py-2 border-b">
              <div className="flex items-center gap-2 space-y-6">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Go Back</span>
                </Button>
                <div>
                  <h2 className="text-3xl font-bold">
                    {classes.find((c) => c.id === selectedClass)?.title}
                  </h2>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <span>Sections</span>
                    <span>In</span>
                    <span>
                      {classes.find((c) => c.id === selectedClass)?.title}
                    </span>
                  </div>
                </div>
              </div>
              <StreamForm classId={selectedClass} />
            </div>
            {streams.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {streams.map((section) => (
                  <Card key={section.title} className="transition-all hover:shadow-lg hover:-translate-y-1">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                        <div className="flex items-center gap-1">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-7 w-7">
                                  <Pencil className="h-3 w-3" />
                                  <span className="sr-only">Edit Section</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Edit Section</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-red-600">
                                  <Trash2 className="h-3 w-3" />
                                  <span className="sr-only">Delete Section</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Delete Section</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                      <CardDescription>
                        Class Teacher Ghostic
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        {section._count.students} students
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex items-center min-h-96 justify-center">
                <div className="flex flex-col items-center justify-center py-3">
                  <Image src={'/images/man.png'} alt="empty" width={512} height={512} className="w-36" />
                  <p>No Stream Created Yet</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center min-h-96 justify-center">
            <p>Select the Class to see its Sections</p>
          </div>
        )}
      </div>
    </div>
  );
}
