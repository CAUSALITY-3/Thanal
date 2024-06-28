"use client";
import { FC } from "react";
import * as stylex from "@stylexjs/stylex";
import { Button } from "../Buttons/Button";
import buyIcon from "@/assets/buy_icon.svg";
import cartIcon from "@/assets/cart_icon.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  email: string;
  productId: string;
}

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
export const BuyOrAdd: FC<Props> = ({ email, productId }) => {
  const router = useRouter();
  const data = [
    {
      icon: cartIcon,
      text: "Add To Cart",
      width: "100%",
      height: "95%",
      color: "yellow",
      action: "cart",
    },
    {
      icon: buyIcon,
      text: "Buy Now",
      width: "100%",
      height: "95%",
      color: "orange",
      action: "buy",
    },
  ];

  const iconStyle = {
    width: "1.2em",
    height: "1.2em",
    marginRight: "3px",
  };

  const handleClick = async (action: string) => {
    if (action === "cart") {
      if (email) {
        const body: any = JSON.stringify({ productId, email });
        console.log("payload", body, "email", email);
        await fetch("/api/addToBag", {
          method: "POST",
          body,
        });
      } else {
        router.push("/login");
      }
    } else {

      router.push("/contact");
    }
  };
  return (
    <div {...stylex.props(styles.container)}>
      {data.map((type, index) => (
        <div
          {...stylex.props(styles.buttonBox)}
          key={index}
          onClick={() => handleClick(type.action)}
        >
          <Button
            content={
              <>
                <div {...stylex.props(styles.buttonIcon)}>
                  <Image src={type.icon} alt="" style={iconStyle} />
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
