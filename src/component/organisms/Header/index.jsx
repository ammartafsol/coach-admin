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

export default function Navbar() {
  const bellRef = useRef(null);
  const [activeTab, setActiveTab] = useState("");
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);

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
        <button
          className={`${classes.navItem} ${
            activeTab === "Dashboard" ? classes.active : ""
          }`}
          onClick={() => {
            setActiveTab("Dashboard");
            router.push("/");
          }}
        >
          Dashboard
        </button>
        <button
          className={`${classes.navItem} ${
            activeTab === "Users" ? classes.active : ""
          } ${classes.activeButton}`}
          onClick={() => {
            setActiveTab("Users");
            router.push("/user");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          Users
        </button>
        <button
          className={`${classes.navItem} ${
            activeTab === "Coaches" ? classes.active : ""
          }`}
          onClick={() => {
            setActiveTab("Coaches");
            router.push("/coach");
          }}
        >
          Coaches
        </button>
        <button
          className={`${classes.navItem} ${
            activeTab === "Feed" ? classes.active : ""
          }`}
          onClick={() => {
            setActiveTab("Feed");
            router.push("/feed");
          }}
        >
          Feeds
        </button>
        <button
          className={`${classes.navItem} ${
            activeTab === "FAQ" ? classes.active : ""
          }`}
          onClick={() => {
            setActiveTab("FAQ");
            router.push("/faq");
          }}
        >
          FAQ
        </button>
        <button
          className={`${classes.navItem} ${
            activeTab === "Transaction" ? classes.active : ""
          }`}
          onClick={() => {
            setActiveTab("Transaction");
            router.push("transaction");
          }}
        >
          Transaction
        </button>
        <button
          className={`${classes.navItem} ${
            activeTab === "Categories" ? classes.active : ""
          }`}
          onClick={() => {
            setActiveTab("Categories");
            router.push("category");
          }}
        >
          Categories
        </button>
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
          <div className={classes.avatar}>JS</div>
          <span>Jenny Wilson</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}
