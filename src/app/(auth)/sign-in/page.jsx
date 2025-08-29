import LoginTemplate from '@/component/templates/AuthPages/LoginTemplate'
import RedirectToast from '@/component/atoms/RedirectToast'
import React from 'react'

const page = () => {
  return (
    <div>
        <RedirectToast />
        <LoginTemplate />
    </div>
  )
}

export default page;

