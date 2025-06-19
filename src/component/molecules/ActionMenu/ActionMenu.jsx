
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

export default function ActionMenu({
  popover = [],
  onClick = () => {},
  children = null,
  acceptOnClick,
  rejectButtonOnClick,
  showButtons,
}) {
  const [show, setShow] = useState(false);

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
                        label={"Accept"}
                        onClick={acceptOnClick}
                        className={Style.btn} variant="approve" leftIcon={<IoMdCheckmark />}
                      />
                      <Button
                        label={"Reject"}
                        onClick={rejectButtonOnClick}
                        className={Style.btn} variant="reject" leftIcon={<RxCross2 />}
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
    </>
  );
}
