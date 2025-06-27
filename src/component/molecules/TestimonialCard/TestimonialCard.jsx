import Image from "next/image";
import classes from "./TestimonialCard.module.css";
import { mediaUrl, mergeClass, timeAgo } from "@/resources/utils/helper";
import { MdOutlineStar } from "react-icons/md";

export default function TestimonialCard({ review }) {
  const { rating, description, createdBy, createdAt } = review;

  const defaultAvatar = "/images/app-images/user-avatars.png";
  const resolvedImage = createdBy?.photo
    && mediaUrl(createdBy?.photo)

  return (
    <div className={classes.card}>
      <div className={classes.cardHeader}>
        <div className={classes.userInfo}>
          <Image
            src={resolvedImage || defaultAvatar}
            alt={createdBy?.fullName || "Reviewer"}
            width={50}
            height={50}
            className={classes.avatar}
          />
          <div className={classes.userDetails}>
            <h4 className={classes.userName}>{createdBy?.fullName || "Anonymous"}</h4>
            {createdAt && (
              <span className={classes.reviewDate}>{timeAgo(createdAt)}</span>
            )}
          </div>
        </div>
        
        <div className={classes.rating}>
          <div className={classes.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <MdOutlineStar
                key={star}
                className={star <= rating ? classes.starFilled : classes.starEmpty}
                size={16}
              />
            ))}
          </div>
          <span className={classes.ratingText}>{rating}/5</span>
        </div>
      </div>

      <div className={classes.cardBody}>
        <p className={mergeClass("maxLine4", classes.reviewText)}>
          {description || "No review text provided"}
        </p>
      </div>
    </div>
  );
}
