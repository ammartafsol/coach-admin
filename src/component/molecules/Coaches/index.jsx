import React, { useState } from 'react';
import classes from "./Coaches.module.css"
import Image from 'next/image';
import { CiMail } from "react-icons/ci";
import { IoMdCall } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { mediaUrl } from "@/resources/utils/helper";
import Button from '@/component/atoms/Button';
import AreYouSureModal from '@/component/molecules/Modal/AreYouSureModal';

const Coaches = ({item, handleStatusChange}) => {
  const [showAreYouSureModal, setShowAreYouSureModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const defaultAvatar = "/images/app-images/user-avatar.png";
  if (!item?.fullName && ! item?.photo) return null;

  const resolvedImage = item?.photo ? mediaUrl(item?.photo) : defaultAvatar;
  
  const isBlocked = item?.isBlockedByAdmin;
  const buttonText = isBlocked ? "Activate" : "Deactivate";
  const buttonClassName = isBlocked ? classes.activateButton : classes.deactivateButton;
  
  const handleStatusToggle = () => {
    setSelectedItem(item);
    setShowAreYouSureModal(true);
  };

  const handleConfirmStatusChange = () => {
    if (selectedItem) {
      const newBlockedStatus = !selectedItem.isBlockedByAdmin;
      handleStatusChange(selectedItem, { value: newBlockedStatus });
    }
    setShowAreYouSureModal(false);
    setSelectedItem(null);
  };

  console.log("item", item);
  return (
    <>
      <div className={classes.card}>
      <div className={classes.profileSection}>
        <div className={classes.profileInfo}>
          <div className={classes.avatar}>
            <Image
              src={resolvedImage}
              alt={item?.fullName}
              fill
              className={classes.avatarImage}
            />
          </div>
          <div className={classes.userInfo}>
            <h2 className={classes.userName}>{item?.fullName}</h2>
            <div className={classes.contactInfo}>
              <div className={classes.contactItem}>
                <span className={classes.contactIcon}><CiMail color='#333333' /></span>
                <span>{item?.email}</span>
              </div>
              <div className={classes.contactItem}>
                <span className={classes.contactIcon}><IoMdCall color='#333333' /></span>
                <span>{item?.phoneNumber}</span>
              </div>
              <div className={classes.contactItem}>
                <span className={classes.contactIcon}><IoLocationOutline color='#333333' /></span>
                <span>{item?.country}</span>
              </div>
            </div>
          </div>
        </div>
        <Button 
          label={buttonText} 
          className={buttonClassName} 
          onClick={handleStatusToggle} 
          variant="danger"
        />
      </div>
    </div>

    {showAreYouSureModal && (
      <AreYouSureModal
        show={showAreYouSureModal}
        setShow={() => {
          setShowAreYouSureModal(false);
          setSelectedItem(null);
        }}
        heading={selectedItem?.isBlockedByAdmin ? "⚠️ Activate User" : "⚠️ Deactivate User"}
        subheading={
          selectedItem?.isBlockedByAdmin 
            ? "Are you sure you want to activate this user? This will restore their access to the platform."
            : "Are you sure you want to deactivate this user? This action will affect their access to the platform."
        }
        confirmButtonLabel={selectedItem?.isBlockedByAdmin ? "Activate" : "Deactivate"}
        cancelButtonLabel="Cancel"
        confirmButtonVariant="danger"
        cancelButtonVariant="green-outlined"
        onConfirm={handleConfirmStatusChange}
      />
    )}
    </>
  )
}

export default Coaches