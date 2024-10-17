"use client";
import React, { use, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiCall } from "@/api/sevice";
import { useRouter } from "next/navigation";
import { getUserAuth } from "../util";
import "./bag.scss";
import BagItems from "@/Components/BagItems/BagItems";

function Bag({ product }: any) {
  const [products, setProducts] = useState<any>([]);
  const router = useRouter();

  let user: any = null;
  useEffect(() => {
    getUserAuth().then((data: any) => {
      user = data ? JSON.parse(data || "") : null;
      if (!user.email) {
        router.push("/login");
      }
      if (product) {
        setProducts([product]);
      } else if (!user) {
        router.push("/login");
      } else {
        if (user?.bag?.length) {
          const getProductByIds = async () => {
            const data = await apiCall(
              "post",
              "GET_PRODUCT_BY_IDS",
              {},
              "",
              {
                ids: user?.bag,
              },
              {
                "Content-Type": "application/json",
              }
            );
            console.log("GET_PRODUCT_BY_ID", data);

            return data;
          };

          getProductByIds()
            .then((data) => {
              setProducts(data);
            })
            .catch((err) => {
              console.log(err);
              setProducts([]);
            });
        }
      }
    });
  }, []);

  return (
    <div className="bag-page-outer-container">
      <div className="bag-page-container">
        <BagItems products={products} />
      </div>
    </div>
  );
}

export default Bag;
