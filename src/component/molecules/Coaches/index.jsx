import React from 'react';
import classes from "./Coaches.module.css"
import Image from 'next/image';
import { CiMail } from "react-icons/ci";
import { IoMdCall } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";




const Coaches = ({item}) => {
  return (
    <div className={classes.card}>
    <div className={classes.profileSection}>
      <div className={classes.profileInfo}>
        <div className={classes.avatar}>
          <Image
            src={item?.image}
            alt={item?.name}
            fill
            className={classes.avatarImage}
          />
        </div>
        <div className={classes.userInfo}>
          <h2 className={classes.userName}>{item?.name}</h2>
          <div className={classes.contactInfo}>
            <div className={classes.contactItem}>
              <span className={classes.contactIcon}><CiMail color='#333333' /></span>
              <span>{item?.email}</span>
            </div>
            <div className={classes.contactItem}>
              <span className={classes.contactIcon}><IoMdCall color='#333333' /></span>
              <span>{item?.phone}</span>
            </div>
            <div className={classes.contactItem}>
              <span className={classes.contactIcon}><IoLocationOutline color='#333333' /></span>
              <span>{item?.location}</span>
            </div>
          </div>
        </div>
      </div>
      <button className={classes.deactivateButton}>Deactivate</button>
    </div>

    {/* Using the Coaches component with CSS Modules */}
  </div>
  )
}

export default Coaches