import Image from "next/image"
import classes from "./StatsCards.module.css"

export default function StatsCards({ statsData }) {
  const stats = statsData
    ? [
        {
          value: statsData.totalCoachRegistered,
          label: "Total Coaches Registered",
        },
        {
          value: statsData.totalPendingCoaches,
          label: "Pending Coach Approvals",
        },
        { value: statsData.totalUserRegistered, label: "Total Users" },
        {
          value: statsData.totalUsersSubscribed,
          label: "Total Subscribers",
        },
        { value: `$${statsData.totalEarnings}`, label: "Total Earnings" },
      ]
    : [
        { value: "...", label: "Total Coaches Registered" },
        { value: "...", label: "Pending Coach Approvals" },
        { value: "...", label: "Total Users" },
        { value: "...", label: "Total Subscribers" },
        { value: "$...", label: "Total Earnings" },
      ];

  return (
    <div className={classes.statsRow}>
      {stats.map((stat, index) => (
        <div key={index} className={classes.statCard}>
          <div className={classes.statIcon}>
            <Image src="/images/app-images/statesIcon.png" alt="Stats icon" width={50} height={50} />
          </div>
          <div className={classes.statValue}>{stat.value}</div>
          <div className={classes.statLabel}>{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
