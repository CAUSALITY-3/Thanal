import React, { FC } from "react";
import "./ProductCard.scss";
import { Ratings } from "../Ratings/Ratings";
import Tooltip from "../Tooltip/Tooltip";

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
  const img = `${process.env.NEXT_PUBLIC_IMAGE_URL}products/${type}/${props.name}/1.jpg`;
  return (
    <div className="productCardBox">
      <div className="product-card-imageContainer">
        <img loading="lazy" src={img} alt="Picture of the author" />
      </div>

      <div className="productDetails">
        <div className="productNameContainer">
          <div className="productName">{props.name}</div>
        </div>
        <Tooltip content={props.description}>
          <div className="productDescription">{props.description}</div>
        </Tooltip>
        {/* <div className="productCardLowerdiv"> */}
        <div className="productPrice">₹ {props.price}</div>
        <Ratings ratings={props.ratings} size="s" type="star" />
        {/* </div> */}
      </div>
    </div>
  );
};
