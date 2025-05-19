import Image from "next/image"
import classes from "./StatsCards.module.css"


export default function StatsCards() {
  const stats = [
    { value: "347", label: "Total Coaches Registered" },
    { value: "347", label: "Pending Coach Approvals" },
    { value: "53500", label: "Total Users" },
    { value: "347", label: "Total Subscribers" },
    { value: "$347", label: "Total Earnings" },
  ]

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
