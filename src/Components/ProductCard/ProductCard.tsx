import React, { FC } from "react";
import "./ProductCard.scss";
import { Ratings } from "../Ratings/Ratings";

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

export const ProductCard: FC<Props> = ({ props, type }) => {
  const img = `${process.env.IMAGE_URL}${type}/${props.name}/1.jpg`;
  return (
    <div className="productBox">
      <div className="product-card-imageContainer">
        <img loading="lazy" src={img} alt="Picture of the author" />
      </div>

      <div className="productDetails">
        <p className="productName">{props.name}</p>
        <p className="productPrice">₹{props.price}</p>
        <Ratings ratings={props.ratings} size="s" type="star" />
      </div>
    </div>
  );
};
