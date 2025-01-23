import ContactUs from '@/components/frontend/contact-us'
import Logo from '@/components/logo'

import React from 'react'

export default function page() {
  return (
    <div>
      <div className="flex bg-gray-100 items-center justify-center py-10">
        <Logo size='lg'/>
      </div>
      <ContactUs/>
    </div>
  )
}
