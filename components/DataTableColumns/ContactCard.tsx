"use client"

import { useState, useMemo } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

import { Mail, Phone, School, Globe, Users, UserCircle, Calendar, Ear, Eye } from 'lucide-react'
import { Contact } from '@/countries'
import { Badge } from '../ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

interface ContactPopupCardProps {
  contact: Contact | undefined
}

export function ContactPopupCard({ contact }: ContactPopupCardProps) {
  const [open, setOpen] = useState(false)

  const contactInfo = useMemo(() => {
    if (!contact) return []
    return [
      { icon: <Mail className="h-5 w-5 text-blue-500" />, label: "Email", value: contact.email },
      { icon: <Phone className="h-5 w-5 text-green-500" />, label: "Phone", value: contact.phone },
      { icon: <School className="h-5 w-5 text-yellow-500" />, label: "School", value: contact.school },
      { icon: <Globe className="h-5 w-5 text-indigo-500" />, label: "Country", value: contact.country },
      { icon: <Users className="h-5 w-5 text-purple-500" />, label: "Students", value: contact.students },
      { icon: <UserCircle className="h-5 w-5 text-orange-500" />, label: "Role", value: contact.role },
      { icon: <Ear className="h-5 w-5 text-teal-500" />, label: "Media", value: contact.media },
      { icon: <Calendar className="h-5 w-5 text-pink-500" />, label: "Submited", value: new Date(contact.createdAt).toLocaleDateString() },
    ]
  }, [contact])

  if (!contact) return null

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

      {/* Dialog content displaying the parent's detailed info */}
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px] bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center text-gray-900 dark:text-white gap-4">
            <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
              <AvatarImage src={contact.media} alt={contact.fullName} />
              <AvatarFallback>{contact.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{contact.fullName}</h2>
              <Badge variant="secondary" className="mt-1 text-gray-900 dark:text-gray-300">
                {contact.message}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
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
  )
}
