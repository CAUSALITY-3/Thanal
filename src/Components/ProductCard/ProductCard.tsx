import React, { FC } from "react";
import "./ProductCard.scss";
import { Ratings } from "../Ratings/Ratings";
import Tooltip from "../Tooltip/Tooltip";
import FavoriteIconOverlay from "../FavoriteIconOverlay/FavoriteIconOverlay";

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
  size?: "s" | "m";
}

export const ProductCard: FC<Props> = ({ props, type, size = "m" }) => {
  const img = `${process.env.NEXT_PUBLIC_IMAGE_URL}products/${type}/${props.name}/1.jpg`;
  return (
    <div className={`productCardBox productCardBox-${size}`}>
      <div
        className={`product-card-imageContainer product-card-imageContainer-${size}`}
      >
        <FavoriteIconOverlay id={props.productId} />
        <img loading="lazy" src={img} alt="Picture of the author" />
      </div>

      <div className={`productDetails productDetails-${size}`}>
        <div className={`productNameContainer productNameContainer-${size}`}>
          <div className={`productName productName-${size}`}>{props.name}</div>
        </div>
        <Tooltip content={props.description}>
          <div className={`productDescription productDescription-${size}`}>
            {props.description}
          </div>
        </Tooltip>
        <div className={`productPrice productPrice-${size}`}>
          ₹ {props.price}
        </div>
        <Ratings ratings={props.ratings} size="s" type="star" />
      </div>
    </div>
  );
};
