"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, Bell } from "lucide-react";
import classes from "./Header.module.css";
import { useRouter } from "next/navigation";
import { Overlay } from "react-bootstrap";
import NotificationsPopup from "../NotificationsPopup/NotificationsPopup";
import { usePathname } from "next/navigation";
import { NAV_DATA } from "@/developmentContent/appData";
import { useSelector } from "react-redux";

export default function Navbar() {
  const bellRef = useRef(null);
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  
  const userData =useSelector(state=>state.authReducer.user);
  const pathname = usePathname();


  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Image
          src="/images/app-images/logo.png"
          alt="The Coach Huddle Logo"
          width={100}
          height={40}
        />
      </div>

      <nav className={classes.nav}>
        {NAV_DATA.map((item) => {
          const isActive = pathname === item.path;
          return (
            <button
              key={item.label}
              className={`${classes.navItem} ${isActive ? classes.active : ""}`}
              onClick={() => router.push(item.path)}
            >
              {item.icon && isActive && <span className={classes.icon}>{item.icon}</span>}
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className={classes.userSection}>
        <button
          className={classes.notificationButton}
          ref={bellRef}
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell size={20} />
        </button>
        <Overlay
          target={bellRef.current}
          show={showNotifications}
          placement="bottom"
          rootClose
          onHide={() => setShowNotifications(false)}
        >
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                zIndex: 9999,
                transform: `${props.style?.transform ?? ""} translateX(-150px)`,
              }}
            >
              <NotificationsPopup setShowNotifications={setShowNotifications} />
            </div>
          )}
        </Overlay>

        <div
          className={classes.userProfile}
          onClick={() => router.push("/profile")}
        >
          <div className={classes.avatar}>{userData?.fullName?.charAt(0)}</div>
          <span>{userData?.fullName}</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}
