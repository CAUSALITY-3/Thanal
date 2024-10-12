"use client";
import { FC } from "react";
import { Button } from "../Buttons/Button";
import { useRouter } from "next/navigation";
import { count } from "@/app/signal";
import "./BuyOrAdd.scss";
import { apiCall } from "@/api/sevice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserAuth } from "@/app/util";
import Toast from "../Toast/Toast";

interface Props {
  productId: string;
}

export const BuyOrAdd: FC<Props> = ({ productId }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryFn: getUserAuth,
    queryKey: ["user"], //Array according to Documentation
    staleTime: 3600000,
  });
  const user: any = data ? JSON.parse(data) : null;
  const email = user ? user.email : null;
  const metadata = [
    {
      icon: `${process.env.NEXT_PUBLIC_IMAGE_URL}svg/cart.svg`,
      text: "Add To Cart",
      width: "100%",
      height: "95%",
      color: "yellow",
      action: "cart",
    },
    {
      icon: `${process.env.NEXT_PUBLIC_IMAGE_URL}svg/buy.svg`,
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
        const bag = user.bag;
        console.log("ADD_TO_BAG", { productId }, bag);
        if (bag.includes(productId)) {
          Toast("info", "Already added in bag.");
        } else {
          console.log("ADD_TO_BAG", { productId }, email);

          const data = await apiCall(
            "POST",
            "ADD_TO_BAG",
            {},
            `?email=${email}`,
            JSON.stringify({ productId }),
            {
              "Content-Type": "application/json",
            },
            {
              success: "Successfully added item to bag.",
              failure: "Failed to add item to bag.",
            }
          );
          const userResp = data.email ? data : null;

          if (userResp) {
            localStorage.setItem("user", JSON.stringify(data));
            queryClient.setQueryData(["user"], JSON.stringify(data));
            // const ct = count.value;
            console.log("sasi", count.value);
          }
        }
      } else {
        router.push("/login");
      }
    } else {
      router.push("/buy/" + productId);
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
                    loading="lazy"
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
