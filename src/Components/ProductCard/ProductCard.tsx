import React, { FC } from "react";
import "./ProductCard.scss";
import * as stylex from "@stylexjs/stylex";
import Image from "next/image";
import pdt1 from "../../../../images/products/plants/bogainvilla/1.jpg";
import { text } from "../../app/globalTokens.stylex";
import { Ratings } from "../Ratings/Ratings";
import Link from "next/link";
import { types } from "sass";
import { getImages } from "@/api/utils";

interface Props {
  props: {
    name: string;
    description: string;
    image: string;
    price: number;
    productId: string;
    ratings: { average: number; count: number };
  };
  type: string;
}
const styles = stylex.create({
  productBox: {
    width: "200px",
    height: "300px",
    background: "linear-gradient(0deg, #cdffbe, #e8ffe4)",
    transition: "transform 0.3s ease-out",
    "border-radius": "5px",
    display: "flex",
    "flex-direction": "column",
    ":hover": {
      cursor: "pointer",
      "box-shadow": "5px 5px 10px 2px rgb(41, 41, 41, .3)",
      transform: "translate(2px, -5px)",
    },
  },
  imageContainer: {
    height: "200px",
    width: "200px",
    position: "relative",
    borderTopRightRadius: "5px",
    borderTopLeftRadius: "5px",
  },
  productDetails: {
    padding: "10px 5px",
    display: "flex",
    "flex-direction": "column",
    "justify-content": "space-around",
    "flex-grow": 1,
  },
  productName: {
    margin: 0,
    fontWeight: 600,
    fontSize: text.sm,
    "::first-letter": {
      "text-transform": "uppercase",
    },
  },
  productPrice: {
    fontSize: text.sm,
  },
});
const stt = {
  WebkitUserDrag: "none",
  borderTopRightRadius: "5px",
  borderTopLeftRadius: "5px",
  "object-fit": "cover"
};

const linkStyle = {
  textDecoration: "none",
  WebkitUserDrag: "none",
  color: "black",
};

export const ProductCard: FC<Props> = ({ props, type }) => {
  const href = `/Product/${props.productId}`;
  const img = `http://localhost:5000/images/getImage?path=products/${type}/${props.name}/1.jpg`;
  return (
    // <Link href={href} style={linkStyle}>
    <div {...stylex.props(styles.productBox)}>
      <div {...stylex.props(styles.imageContainer)}>
        <Image
          src={img}
          alt="Picture of the author"
          placeholder="blur"
          fill
          style={stt}
        />
      </div>

      <div {...stylex.props(styles.productDetails)}>
        <p {...stylex.props(styles.productName)}>{props.name}</p>
        <p {...stylex.props(styles.productPrice)}>₹{props.price}</p>
        <Ratings ratings={props.ratings} size="s" type="star" />
      </div>
    </div>
    // </Link>
  );
};
