"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronRight, ChevronDown } from "lucide-react"
import classes from "./TransactionCard.module.css"

const TransactionCard = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className={classes.transactionCard}>
      <div className={classes.header} onClick={toggleExpand}>
        <div className={classes.profileSection}>
          <div className={classes.profileImage}>
            <Image
              src={item.profileImage}
              alt={item.name}
            fill
              className={classes.avatar}
            />
          </div>
          <div className={classes.profileInfo}>
            <div className={classes.name}>
                <span className={classes.nameSpan}>
              {item.name}
                </span>
              <div className={classes.statusBadge}>
                <span className={classes.statusDot}></span>
                <span className={classes.statusText}>{item.status}</span>
              </div>
            </div>
            <div className={classes.emailContainer}>
              <span className={classes.email}>{item.email}</span>
            </div>
          </div>
        </div>
        <button className={classes.expandButton}>
          {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {isExpanded && (
        <div className={classes.content}>
          {item.transactions.map((transaction, index) => (
            <div key={transaction.id}>
              <div className={classes.transactionItem}>
                <div className={classes.transactionDetails}>
                  <div className={classes.detailRow}>
                    <span className={classes.detailLabel}>Coach Name</span>
                    <span className={classes.detailValue}>{transaction.coachName}</span>
                  </div>
                  <div className={classes.detailRow}>
                    <span className={classes.detailLabel}>Month</span>
                    <span className={classes.detailValue}>{transaction.month}</span>
                  </div>
                  <div className={classes.detailRow}>
                    <span className={classes.detailLabel}>No Of Day</span>
                    <span className={classes.detailValue}>{transaction.noOfDay}</span>
                  </div>
                  <div className={classes.detailRow}>
                    <span className={classes.detailLabel}>Monthly</span>
                    <span className={classes.detailValue}>${transaction.monthly}</span>
                  </div>
                  <div className={classes.detailRow}>
                    <span className={classes.detailLabel}>Total Amount</span>
                    <span className={classes.detailValue}>${transaction.totalAmount}</span>
                  </div>
                </div>
              </div>
              {index < item.transactions.length - 1 && <div className={classes.divider}></div>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TransactionCard
