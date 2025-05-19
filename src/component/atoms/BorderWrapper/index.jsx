import React from 'react';
import classes from "./BorderWrapper.module.css"

const BorderWrapper = ({children,className}) => {
  return (
    <div className={`${classes?.BorderWrapper} ${className}`}>{children}</div>
  )
}

export default BorderWrapper;