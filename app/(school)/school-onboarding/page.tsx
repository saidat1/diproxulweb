import { getServerUser } from '@/actions/auth'
import SchoolOnboardForm from '@/components/dashboard/forms/school/school-onboading-form'
import { Card, CardContent } from '@/components/ui/card'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page() {
  const user = await getServerUser()
  const role = user?.role

  if(!user || role!=="SUPER_ADMIN"){
    redirect('/login')
  }

  return (
    <div className='bg-green-50 dark:bg-gray-900'>
      <div className="max-w-4xl mx-auto p-16">
        <Card className='border-t-4 border-green-600 shadow dark:border-green-400'>
          <CardContent className='p-4'>
            <SchoolOnboardForm/>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
