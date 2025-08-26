"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, Bell, Settings, LogOut, User } from "lucide-react";
import classes from "./Header.module.css";
import { useRouter } from "next/navigation";
import { Overlay } from "react-bootstrap";
import NotificationsPopup from "../NotificationsPopup/NotificationsPopup";
import { usePathname } from "next/navigation";
import { NAV_DATA } from "@/developmentContent/appData";
import { useSelector, useDispatch } from "react-redux";
import { signOutRequest } from "@/store/auth/authSlice";
import Cookies from "js-cookie";
import { incrementUnseenNotificationCount, setUnseenNotifications } from "@/store/common/commonSlice";
import useAxios from "@/interceptor/axiosInterceptor";
import { RiLogoutBoxLine } from "react-icons/ri";

export default function Navbar() {
  const { Get } = useAxios();
  const bellRef = useRef(null);
  const profileRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const userData = useSelector((state) => state.authReducer.user);
  const pathname = usePathname();
  
  const notificationCount = useSelector(
    (state) => state.commonReducer.notificationCount
  );
  console.log("notificationCount", notificationCount);
  const data = useSelector((state) => state.authReducer.user);
  console.log("data", data);

  const handleLogout = () => {
    // Clear all auth-related cookies
    Cookies.remove("_xpdx");
    Cookies.remove("_xpdx_rf");
    Cookies.remove("_xpdx_ur");

    // Clear Redux state
    dispatch(signOutRequest());

    // Redirect to sign-in page
    router.push("/sign-in");
    setShowProfileDropdown(false);
  };

  const handleProfileSettings = () => {
    router.push("/profile");
    setShowProfileDropdown(false);
  };

  const getUnseenNotifications = async () => {
    const { response } = await Get({ route: "notifications?seen=false" });
    if (response) {
      dispatch(setUnseenNotifications(response?.totalRecords));
    }
  };

  useEffect(() => {
    if(userData){
      getUnseenNotifications();
    }
  }, [pathname]);
  

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
          const isActive =
            item.path === "/"
              ? pathname === "/"
              : pathname === item.path || pathname.startsWith(`${item.path}/`);
          return (
            <button
              key={item.label}
              className={`${classes.navItem} ${isActive ? classes.active : ""}`}
              onClick={() => router.push(item.path)}
            >
              {item.icon && isActive && (
                <span className={classes.icon}>{item.icon}</span>
              )}
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
          {Number(notificationCount) > 0 && (
            <span className={classes.notificationBadge}>
              {notificationCount > 99 ? "99+" : notificationCount}
            </span>
          )}
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
          ref={profileRef}
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
        >
          <div className={classes.avatar}>{userData?.fullName?.charAt(0)}</div>
          <span>{userData?.fullName}</span>
          <ChevronDown size={16} />
        </div>
        <Overlay
          target={profileRef.current}
          show={showProfileDropdown}
          placement="bottom"
          rootClose
          onHide={() => setShowProfileDropdown(false)}
        >
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                zIndex: 9999,
                transform: `${props.style?.transform ?? ""} translateX(-50px)`,
              }}
            >
              <div className={classes.profileDropdown}>
                <button
                  className={classes.dropdownItem}
                  onClick={handleProfileSettings}
                >
                  <User size={16} />
                  <span>Profile Settings</span>
                </button>
                <button className={classes.dropdownItem} onClick={handleLogout}>
                  <RiLogoutBoxLine size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </Overlay>
      </div>
    </header>
  );
}
