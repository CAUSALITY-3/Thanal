"use client";
import { FC } from "react";
import { Button } from "../Buttons/Button";
import { useRouter } from "next/navigation";
import { count } from "@/app/signal";
import { effect } from "@preact/signals-react";
import "./BuyOrAdd.scss";

interface Props {
  email: string;
  productId: string;
}

export const BuyOrAdd: FC<Props> = ({ email, productId }) => {
  const router = useRouter();
  const data = [
    {
      icon: `${process.env.IMAGE_URL}/images/getImage?path=products/plants/plants.jpg`,
      text: "Add To Cart",
      width: "100%",
      height: "95%",
      color: "yellow",
      action: "cart",
    },
    {
      icon: `${process.env.IMAGE_URL}/images/getImage?path=products/plants/plants.jpg`,
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
        // const ct = count.value;
        console.log("sasi", count.value);
        effect(() => {
          count.value = count.value + 1;
        });
      } else {
        router.push("/login");
      }
    } else {
      router.push("/contact");
    }
  };
  return (
    <div className="container">
      {data.map((type, index) => (
        <div
          className="buttonBox"
          key={index}
          onClick={() => handleClick(type.action)}
        >
          <Button
            content={
              <>
                <div className="buttonIcon">
                  <img
                    className="buttonIcon"
                    src={type.icon}
                    alt=""
                    style={iconStyle}
                  />
                </div>
                <div className="buttonName">{type.text}</div>
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
