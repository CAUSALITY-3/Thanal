"use client";
import { FC } from "react";
import { Button } from "../Buttons/Button";
import { useRouter } from "next/navigation";
import { count } from "@/app/signal";
import "./BuyOrAdd.scss";
import { apiCall } from "@/api/sevice";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  email: string;
  productId: string;
}

export const BuyOrAdd: FC<Props> = ({ email, productId }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const metadata = [
    {
      icon: `https://ik.imagekit.io/0vf688mrkg/thanal/svg/cart.svg`,
      text: "Add To Cart",
      width: "100%",
      height: "95%",
      color: "yellow",
      action: "cart",
    },
    {
      icon: `https://ik.imagekit.io/0vf688mrkg/thanal/svg/buy.svg`,
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
        // const body: any = JSON.stringify({ productId, email });
        // console.log("payload", body, "email", email);
        // await fetch("/api/addToBag", {
        //   method: "POST",
        //   body,
        // });

        console.log("ADD_TO_BAG", { productId }, email);
        const data = await apiCall(
          "POST",
          "ADD_TO_BAG",
          {},
          `?email=${email}`,
          JSON.stringify({ productId }),
          {
            "Content-Type": "application/json",
          }
        );
        const user = data.email ? data : null;

        if (user) {
          localStorage.setItem("user", JSON.stringify(data));
          queryClient.setQueryData(["user"], JSON.stringify(data));
          // const ct = count.value;
          console.log("sasi", count.value);
        }
        router.push("/");
      } else {
        router.push("/login");
      }
    } else {
      router.push("/contact");
    }
  };
  return (
    <div className="container">
      {metadata.map((type, index) => (
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
