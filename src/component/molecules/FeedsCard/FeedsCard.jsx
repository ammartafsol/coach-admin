"use client"

import { Eye } from "lucide-react"
import Image from "next/image"
import classes from "./FeedsCard.module.css"
import { MdOutlineMessage } from "react-icons/md"

// Define the Feed type for better type safety



export default function FeedsCard({ feed, onOpenVideo }) {
  return (
    <div className={classes.feedCard}>
      <div className={classes.feedHeader}>
        <div className={classes.authorInfo}>
          <div className={classes.authorAvatar}>
            <Image
              src={`/images/cms-images/profile.png`}
              alt={feed.author}
              width={50}
              height={50}
              className={classes.avatarImage}
            />
          </div>
          <div className={classes.authorDetails}>
            <h3 className={classes.authorName}>{feed.author}</h3>
            <span className={classes.category}>{feed.category}</span>
          </div>
        </div>
        <div className={classes.feedDate}>{feed.date}</div>
      </div>
      <div className={classes.feedContent}>
        <p className={classes.feedText}>{feed.content}</p>
        <div className={classes.feedMedia}>
          <div className={classes.videoThumbnail}>
            <Image
              src={feed.image || "/placeholder.svg"}
              alt="Basketball hoop"
              width={800}
              height={400}
              className={classes.thumbnailImage}
            />
            <button className={classes.playButton} onClick={() => onOpenVideo(feed.id)}>
              <svg width="90" height="90" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="rgba(0, 0, 0, 0.5)" />
                <path d="M16 12L10 16V8L16 12Z" fill="white" />
              </svg>
            </button>
          </div>
        </div>
        <div className={classes.feedStats}>
          <div className={classes.likesCount}>
           <MdOutlineMessage size={20} color="#B0CD6E" />
            <span>{feed.likes}</span>
          </div>
          <div className={classes.viewsCount}>
            <Eye size={16} color="#71717a" />
            <span>{feed.views} Views</span>
          </div>
        </div>
      </div>
    </div>
  )
}
