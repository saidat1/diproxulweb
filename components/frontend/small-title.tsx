import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Sparkles } from 'lucide-react'

export default function SmallTitle({title}:{title:string}) {
  return (
   <Badge variant='secondary' className='h-8 items-center gap-2 pl-4 pr-6 text-base'>
   <span className="text-primary">
    <Sparkles className='text-yellow-500'/>
   </span>
   {title}
  </Badge>
  )
}
