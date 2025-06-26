import SubscriberDetailTemplate from '@/component/templates/AdminPages/SubscriberDetailTemplate';
import React from 'react'

const page = ({params}) => {
  return (
    <div>
      <SubscriberDetailTemplate slug={params.slug} />
    </div>
  )
}

export default page