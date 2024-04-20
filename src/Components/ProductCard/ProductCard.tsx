import React, { FC } from "react";
import "./ProductCard.scss";
import * as stylex from "@stylexjs/stylex";
import Image from 'next/image'
import pdt1 from "@public/pdt1.jpg"
import { text } from "../../app/globalTokens.stylex";
import { Ratings } from "../Ratings/Ratings";
import Link from "next/link";

interface Props {
  props: {
    name: string;
    description: string;
    image: string;
    price: number;
    productId: string;
    ratings: { average: number; count: number };
  };
}
const styles = stylex.create({
  productBox: {
    width: "200px",
  height: "300px",
  background: {
    default: "linear-gradient(0deg, #cdffbe, #e8ffe4)",
    '@media (max-width: 500px)': "linear-gradient(0deg, white, yellow)"
  },
  transition: "transform 0.3s ease-out",
  "border-radius": "5px",
  display: "flex",
  "flex-direction": "column",
  ":hover": {
    cursor: "pointer",
    "box-shadow": "5px 5px 10px 2px rgb(41, 41, 41, .3)",
    transform: "translate(2px, -5px)"
  }
  },
  productDetails:{
    padding: "10px 5px",
    display: "flex",
    "flex-direction": "column",
    "justify-content": "space-around",
    "flex-grow": 1
  },
  productName: {
    margin:0,
    fontWeight:600,
    fontSize: text.sm,
    "::first-letter": {
      "text-transform": "uppercase"
  }
  },
  productPrice: {
    fontSize: text.sm,
  }
})
const stt = {
  WebkitUserDrag: "none",
  borderTopRightRadius: "5px",
  borderTopLeftRadius: "5px"
}

const linkStyle = {"textDecoration": "none", WebkitUserDrag: "none",color: "black"}



export const ProductCard: FC<Props> = ({ props }) => {
  const href = `/Product/${props.productId}`
  return (
    // <Link href={href} style={linkStyle}>
    <div
     
    {...stylex.props(styles.productBox)}
    >
      <Image
      src={pdt1}
      width={200}
      height={200}
      alt="Picture of the author"
      style={stt}
    />

      <div {...stylex.props(styles.productDetails)}>
        <p {...stylex.props(styles.productName)}>{props.name}</p>
        <p {...stylex.props(styles.productPrice)}>₹{props.price}</p>
        <Ratings ratings={props.ratings} size="s" type="star" />
      </div>
    </div>
    // </Link>
  );
};
