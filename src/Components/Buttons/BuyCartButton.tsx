import { FC } from "react";
import "./BuyCartButton.scss";

interface Props {
  type: "buy" | "cart";
  width?: string;
  height?: string;
}

export const BuyCartButton: FC<Props> = ({ type, width, height }) => {
  const style = {
    width: width ? width : "200px",
    height: height ? height : "60px",
    background: type === "buy" ? "orange" : "yellow",
  };

  return (
    <div className="buttonContainer" style={style}>
      <div className="buttonIcon">
        {type === "buy" ? (
          <img
            loading="lazy"
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}svg/buy.svg`}
            alt=""
          />
        ) : (
          <img
            loading="lazy"
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}svg/cart.svg`}
            alt=""
          />
        )}
      </div>
      <div className="buttonName">
        {type === "buy" ? "Buy Now" : "Add To Cart"}
      </div>
    </div>
  );
};
