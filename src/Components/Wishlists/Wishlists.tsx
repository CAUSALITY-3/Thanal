"use client";
import { apiCall } from "@/api/sevice";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import "./Wishlists.scss";

function Wishlists({ wishlistIds }: any) {
  async function getProductByIds(ids: string[]) {
    return await apiCall(
      "POST",
      "GET_PRODUCT_BY_IDS",
      {},
      "",
      { ids: wishlistIds },
      {
        "Content-Type": "application/json",
      }
    );
  }

  const { data: products } = useSuspenseQuery({
    queryFn: () => getProductByIds(wishlistIds),
    queryKey: ["wishlists"],
    staleTime: 30000,
  });

  const formattedProducts = products?.map((product: any) => {
    return {
      name: product.name,
      description: product.description,
      image: product.images?.[0],
      price: product.price,
      productId: product._id,
      ratings: product.ratings,
      category: product.category,
    };
  });

  return (
    <div className="wishlistsContainer">
      {formattedProducts?.map((product: any, key: any) => (
        <ProductCard
          key={key}
          props={product}
          type={product.category}
          size="s"
        />
      ))}
    </div>
  );
}

export default Wishlists;
