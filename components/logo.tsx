import { cn } from '@/lib/utils'
import { GraduationCap } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Logo({
  variant='light',
  size='md'
}:{
  variant?:'dark'|"light",
  size?:'sm' | "md" | "lg"
}) {
  if(variant==='light'){
   return (
   <Link href={"/"} className="flex items-center space-x-2">
   <div className="bg-green-600 rounded-full p-1">
     <span 
     className="font-bold text-5xl text-white ">
      <GraduationCap className={cn("w-5 h-5", size==="lg" && "w-10 h-10")}/>
     </span>
   </div>
   <span className={cn(" font-bold text-xl", size==="lg"&&"text-4xl")}>Dipro<span className='text-green-600'>xuls</span></span>
   </Link>
  ) 
  }
  else {
    return (
      <Link href={"/"} className="flex items-center space-x-2">
      <div className="bg-white rounded-full p-1">
        <span className="text-green-600 font-bold text-xl">
         <GraduationCap/>
        </span>
      </div>
      <span className="font-bold text-xl">Dipro<span className='text-green-600'>xuls</span></span>
      </Link>
     ) 
  }
}
