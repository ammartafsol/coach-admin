import React from "react";
import { Col, Row } from "react-bootstrap";
import Image from "next/image";
import classes from "./TextImage.module.css";
import Button from "../Button";
import { FaCheck } from "react-icons/fa6";

const TextImage = ({rowReverse,data,classTop}) => {
  return (
    <Row className={`${classes.row} ${classTop} ${rowReverse && classes?.rowReverse} `}>
      <div className={classes.imageCol}>
        <div className={classes.imageWrapper}>
          <Image
            src={data?.image}
            alt="about image"
            layout="fill"
            objectFit="cover"
            priority
            className={classes?.mainImage}
          />
        </div>
      </div>
      <div className={classes?.text}>
        <h5>{data?.title}</h5>
        <p>
          {data?.description}
        </p>
        <ul className={classes?.listStyle}>
            {
                data?.listText?.map((item,index)=>{
                    return(
                        <li key={index}>
                        <FaCheck />
                        <p>{item}</p>
                      </li>
                    )
                })
            }
        </ul>
        <Button label={"Get Started"} className={classes?.btn} />
      </div>
    </Row>
  );
};

export default TextImage;
