import UserDetailTemplate from '@/component/templates/AdminPages/UserTemplate/UserDetailTemplate';
import React from 'react'

const page = ({params}) => {
    const {slug} = params;
  return (
    <div>
        <UserDetailTemplate slug={slug} />
    </div>
  )
}

export default page