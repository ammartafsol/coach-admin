import CoachDetailTemplate from '@/component/templates/AdminPages/CoachDetailTemplate'
import React from 'react'

const page = ({ params }) => {
  return (
    <div>
        <CoachDetailTemplate slug={params.slug}/>
    </div>
  )
}

export default page