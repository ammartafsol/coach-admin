"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, Bell } from "lucide-react"
import classes from "./Header.module.css"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Coaches");
  const router = useRouter();

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Image src="/images/app-images/logo.png" alt="The Coach Huddle Logo" width={100} height={40} />
      </div>

      <nav className={classes.nav}>
        <button
          className={`${classes.navItem} ${activeTab === "Dashboard" ? classes.active : ""}`}
          onClick={() => {setActiveTab("Dashboard");router.push('/')}}
        >
          Dashboard
        </button>
        <button
          className={`${classes.navItem} ${activeTab === "Users" ? classes.active : ""} ${classes.activeButton}`}
          onClick={() => {setActiveTab("Users");router.push('/user')}}
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
          className={`${classes.navItem} ${activeTab === "Coaches" ? classes.active : ""}`}
          onClick={() => {setActiveTab("Coaches");router.push('/coach')}}
        >
          Coaches
        </button>
        <button
          className={`${classes.navItem} ${activeTab === "Feeds" ? classes.active : ""}`}
          onClick={() => {setActiveTab("Feeds");router.push('/feeds')}}
        >
          Feeds
        </button>
        <button
          className={`${classes.navItem} ${activeTab === "Transaction" ? classes.active : ""}`}
          onClick={() => {setActiveTab("Transaction");router.push('transaction')}}
        >
          Transaction
        </button>
      </nav>

      <div className={classes.userSection}>
        <button className={classes.notificationButton}>
          <Bell size={20} />
        </button>
        <div className={classes.userProfile}>
          <div className={classes.avatar}>JS</div>
          <span>Jenny Wilson</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  )
}
