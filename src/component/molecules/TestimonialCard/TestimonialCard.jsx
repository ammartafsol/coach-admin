import Image from "next/image";
import classes from "./TestimonialCard.module.css";
import { mergeClass } from "@/resources/utils/helper";

export default function TestimonialCard({ testimonial }) {
  const { rating, text, name, avatar } = testimonial;

  return (
    <div className={classes.card}>
      <div className={classes.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={star <= rating ? classes.starFilled : classes.starEmpty}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={star <= rating ? "currentColor" : "none"}
            stroke="currentColor"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
      <p className={mergeClass("maxLine4", classes.text)}>{text}</p>
      <div className={classes.reviewerInfo}>
        <Image
          src={avatar || "/placeholder.svg"}
          alt={name}
          width={46}
          height={46}
          className={classes.avatar}
        />
        <span className={classes.name}>{name}</span>
      </div>
    </div>
  );
}
