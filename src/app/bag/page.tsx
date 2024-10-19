"use client";
import React, { use, useEffect, useState } from "react";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { apiCall } from "@/api/sevice";
import { useRouter } from "next/navigation";
import { getUserAuth } from "../util";
import "./bag.scss";
import BagItems from "@/Components/BagItems/BagItems";

function Bag({ product }: any) {
  // const [products, setProducts] = useState<any>([]);
  const router = useRouter();

  const { data } = useSuspenseQuery({
    queryFn: getUserAuth,
    queryKey: ["user"], //Array according to Documentation
  });

  const user = data ? JSON.parse(data) : null;
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

  const getProducts = user?.bag?.length > 0 && !product;
  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryFn: getProductByIds,
    queryKey: user?.bag,
    enabled: getProducts,
  });

  if (!user?.email) {
    router.push("/login");
  }

  return (
    <div className="bag-page-outer-container">
      <div className="bag-page-container">
        {!productsLoading && (!!product || productsData?.length > 0) ? (
          <BagItems
            products={getProducts ? productsData : product ? [product] : []}
          />
        ) : (
          <div className="no-products">Bag is empty</div>
        )}
      </div>
    </div>
  );
}

export default Bag;
