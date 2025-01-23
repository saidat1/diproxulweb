'use client'
import { Brush, PartyPopper, Trophy, Calendar1 } from 'lucide-react';
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';


const features = [
 {
   icon: Calendar1,
   tab: "Visiting Day",
   description:
     "An exciting event where students share their love and happiness to their parents.",
   href: "/features/science-fair",
   title: "World of Happines",
   tabDescription:
     "Join us for an engaging day where our students present their innovative projects reports to their relatives.",
   subFeatures: [
     "Opening Ceremony",
     "Student Presentations",
     "Interactive Science Booths",
     "Closing Ceremony",
   ],
   image: "/images/visitings.jpg", // Replace with actual image URL
 },
 { 
   icon: Trophy,
   tab: "Sports Day",
   description:
     "An annual event where students compete in various athletic activities and sports.",
   href: "/features/sports-day",
   title: "Competition spirits",
   tabDescription:
     "Watch our talented athletes compete in a series of exciting sports events.",
   subFeatures: [
     "Opening Ceremony",
     "Track Events",
     "Field Events",
     "Prize Distribution",
   ],
   image: "/images/sports.jpg", // Replace with actual image URL
 },
 {
   icon: PartyPopper,
   tab: "Patries",
   description:
     "A celebration of student talent through a musical performance featuring choirs, bands, and solo acts.",
   href: "/features/music-concert",
   title: "Celebrate Music and Talent",
   tabDescription:
     "Enjoy an evening of beautiful music performed by our talented students.",
   subFeatures: [
     "Choir Performances",
     "Solo Acts",
     "Band Performances",
     "Guest Artist Performance",
   ],
   image: "/images/parties.jpg", // Replace with actual image URL
 },
 {
   icon: Brush ,
   tab: "Art Exhibition",
   description:
     "A display of students' artistic works, ranging from paintings to sculptures and photography.",
   href: "/features/art-exhibition",
   title: "Beauty of Student Art",
   tabDescription:
     "Join us as we celebrate creativity and innovation in our students' artwork.",
   subFeatures: [
     "Opening Reception",
     "Live Art Demonstrations",
     "Student Art Display",
     "Closing Reception",
   ],
   image: "/images/arts.png", // Replace with actual image URL
 },
];
export default function BlogTabs() {

 return (
  <div className="container mx-auto px-4 py-16">
   <div className="text-center mb-12">
     <h1 className="text-4xl font-extrabold text-gray-900">School Stories</h1>
      <p className="text-lg text-gray-600 mt-4">
          Stay updated on our school's exciting events and activities. Discover what's happening next!
     </p>
    </div>
   <Tabs defaultValue={features[0].tab.toLowerCase()} className="space-y-8">
    <TabsList className="inline-flex h-auto w-full just-start gap-4 rounded-none border-b bg-transparent p-0 ">
     {features.map((feature) => {
      const Icon = feature.icon;
      return (
       <TabsTrigger
       key={feature.tab}
       value={feature.tab.toLowerCase()}
       className='inline-flex hover:text-green-800 items-center gap-2 border-b px-4 pb-4 pt-2 data[state=active]:border-primary'
       >
        <Icon className='h-6 w-6'/>
        {feature.tab}
       </TabsTrigger>
      );
     })}
    </TabsList>
    {features.map((feature) => (
     <TabsContent
     key={feature.tab}
     value={feature.tab.toLowerCase()}
      className="space-y-8"
     >
      <div className="grid gap-8 lg:grid-cols-2">
       <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">
         {feature.title}
        </h2>
        <p className="text-lg text-muted-foreground">
         {feature.description}
        </p>
        <Card>
         <CardContent className='grid gap-4 p-6'>
          {feature.subFeatures.map((subFeature,index) => (
           <div key={index} className="flex items-center gap">
            <div className="flex shadow-sm h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-gray-800">
             {index + 1}
            </div>
            <span>{subFeature}</span>
           </div>
          ))}
         </CardContent>
        </Card>
        <Button asChild>
         <Link href={feature.href}>
         Explore More {feature.title}
         </Link>
        </Button>
       </div>
       <div className="relative aspect-video overflow-hidden rounded-xl bg-muted lg:aspect-space">
        <Image
        src={feature.image}
        alt={`${feature.title} illustration`}
        className='object-cover'
        fill
        priority
        />
       </div>
      </div>
     </TabsContent>
    ))}
   </Tabs>
  </div>
 )
}