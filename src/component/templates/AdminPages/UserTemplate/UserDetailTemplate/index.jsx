import React from 'react';
import classes from "./UserDetailTemplate.module.css"
import TopHeader from '@/component/atoms/TopHeader';

const UserDetailTemplate = ({slug}) => {
  return (
    <div>
      <TopHeader title={"Users"} />
    </div>
  )
}

export default UserDetailTemplate