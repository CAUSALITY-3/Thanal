import { FC } from "react";
// import * as stylex from "@stylexjs/stylex";
import buyIcon from "@/assets/buy_icon.svg";
import cartIcon from "@/assets/cart_icon.svg";
import "./BuyCartButton.scss";

interface Props {
  type: "buy" | "cart";
  width?: string;
  height?: string;
}

// const styles = stylex.create({
//   buttonContainer: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: "3px",
//     ":hover": {
//       cursor: "pointer",
//       "box-shadow": "3px 3px 6px 1px rgb(41, 41, 41, .2)",
//       transform: "translate(.5px, -.5px)",
//     },
//   },
//   buttonIcon: {
//     width: "1.2em",
//     height: "1.2em",
//     marginRight: "3px",
//   },
//   buttonName: {},
// });

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
          <img src={buyIcon} alt="" />
        ) : (
          <img src={cartIcon} alt="" />
        )}
      </div>
      <div className="buttonName">
        {type === "buy" ? "Buy Now" : "Add To Cart"}
      </div>
    </div>
  );
};
