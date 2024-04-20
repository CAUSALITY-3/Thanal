import { FC } from "react";
import * as stylex from "@stylexjs/stylex";
import { Button } from "../Buttons/Button";
import buyIcon from "@/assets/buy_icon.svg";
import cartIcon from "@/assets/cart_icon.svg";
import Image from "next/image";

interface Props {}

const styles = stylex.create({
  container: {
    width: "100%",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonBox: {
    width: "48%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonIcon: {
    marginRight: "3px",
  },
  buttonName: {},
});
export const BuyOrAdd: FC<Props> = ({}) => {
  const data = [
    {
      icon: cartIcon,
      text: "Add To Cart",
      width: "100%",
      height: "95%",
      color: "yellow",
    },
    {
      icon: buyIcon,
      text: "Buy Now",
      width: "100%",
      height: "95%",
      color: "orange",
    },
  ];

  const iconStyle = {
    width: "1.2em",
    height: "1.2em",
    marginRight: "3px",
  }

  return (
    <div {...stylex.props(styles.container)}>
      {data.map((type, index) => (
        <div {...stylex.props(styles.buttonBox)} key={index}>
          <Button
            content={
              <>
                <div {...stylex.props(styles.buttonIcon)}>
                  <Image src={type.icon} alt="" style={iconStyle}/>
                </div>
                <div {...stylex.props(styles.buttonName)}>{type.text}</div>
              </>
            }
            width={type.width}
            height={type.height}
            color={type.color}
          />
        </div>
      ))}
    </div>
  );
};
