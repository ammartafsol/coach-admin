"use client";

import { ClickAwayListener } from "@mui/material";
import { useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import Style from "./ActionMenu.module.css";
import clsx from "clsx";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Button from "@/component/atoms/Button";
import RejectionReasonModal from "@/component/molecules/Modal/RejectionReasonModal";

export default function ActionMenu({
  popover = [],
  onClick = () => {},
  children = null,
  showButtons = false,
  itemData = null, // Data of the item being acted upon
  onAccept = () => {}, // Callback for accept action
  onReject = () => {}, // Callback for reject action
  acceptLoading = false,
  rejectLoading = false,
}) {
  const [show, setShow] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);

  const handleAccept = async () => {
      await onAccept(itemData);
      setShow(false);
  };

  const handleReject = () => {
    setShowRejectionModal(true);
    setShow(false);
  };

  const handleRejectionSubmit = async (rejectionReason) => {
      await onReject(rejectionReason.rejectReason);
      setShowRejectionModal(false);
    
  };

  const overlayPopover = (
    <Popover
      id="popover-basic"
      className={Style?.overlayPopover}
      popover="false"
    >
      <ClickAwayListener onClickAway={() => setShow(false)}>
        <Popover.Body className="p-0 m-0">
          <ul className={clsx(Style.overlay, "m-0 p-0")}>
            {Array.isArray(popover) && popover.length > 0 ? (
              popover?.map((item, index) => (
                <li
                  key={index}
                  className={clsx(Style.overlayLink, "")}
                  onClick={() => {
                    onClick(item?.label);
                    setShow(false);
                  }}
                >
                  {item?.icon && (
                    <div className={clsx(Style.iconDiv)} >{item?.icon}</div>
                  )}
                  <span className={clsx("text-black body05", Style.label)}>
                    {item.label}
                  </span>
                 
                </li>
              
              ))
            ) : (
              <div className={Style.noOption}>
                <li>No options available</li>
              </div>
            )}
             {showButtons && (
                    <div className={Style.btnDiv}>
                      <Button
                        label={acceptLoading ? "Accepting..." : "Accept"}
                        onClick={handleAccept}
                        className={Style.btn}
                        variant="green-outlined"
                        leftIcon={<IoMdCheckmark />}
                        disabled={acceptLoading || rejectLoading}
                      />
                      <Button
                        label={rejectLoading ? "Rejecting..." : "Reject"}
                        onClick={handleReject}
                        className={Style.btn}
                        variant="danger"
                        leftIcon={<RxCross2 />}
                        disabled={acceptLoading || rejectLoading}
                      />
                    </div>
                  )}
          </ul>
        </Popover.Body>
      </ClickAwayListener>
    </Popover>
  );

  return (
    <>
      <div>
        <OverlayTrigger
          trigger="click"
          placement="bottom-start"
          overlay={overlayPopover}
          show={show}
          onToggle={() => setShow(!show)}
        >
          <div onClick={() => setShow(true)}>
            {children ? (
              children
            ) : (
              <HiOutlineDotsHorizontal
                className={Style.icon}
                fontSize={22}
                color="#6D6D6D"
                size={22}
              />
            )}
          </div>
        </OverlayTrigger>
      </div>

      {/* Rejection Reason Modal */}
      <RejectionReasonModal
        show={showRejectionModal}
        setShow={setShowRejectionModal}
        onConfirm={handleRejectionSubmit}
      />
    </>
  );
}
