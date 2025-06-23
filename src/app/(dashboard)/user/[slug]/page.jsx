import UserDetailTemplate from '@/component/templates/AdminPages/UserDetailTemplate';
import React from 'react'

const page = ({params}) => {
  return (
    <div>
      <UserDetailTemplate slug={params.slug} />
    </div>
  )
}

export default page