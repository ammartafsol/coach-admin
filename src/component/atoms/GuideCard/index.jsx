import Image from "next/image";
import React from "react";
import classes from "./GuideCard.module.css";

const GuideCard = ({ data,removeBorder }) => {
  return (
    <div className={`${classes.guidCardMain} ${removeBorder && classes?.removeBorder}`}>
      <div className={classes.cardImg}>
        <Image
          src={data?.image}
          fill
          className={classes.tap2Image}
          alt="app img"
        />
      </div>
      <div className={classes.cardContent}>
        <h2>{data?.title}</h2>
        <p>{data?.description}</p>
      </div>
    </div>
  );
};

export default GuideCard;
