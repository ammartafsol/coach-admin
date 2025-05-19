import React from 'react';
import classes from "./DashboardLayout.module.css"

const DashboardLayout = ({children}) => {
  return (
    <div className={classes?.mainLayout}>{children}</div>
  )
}

export default DashboardLayout