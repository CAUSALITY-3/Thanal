import { apiCall } from "@/api/sevice";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

function Wishlists({ wishlistIds }: any) {
  async function getOrderByIds(ids: string[]) {
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
    queryFn: () => getOrderByIds(wishlistIds),
    queryKey: ["wishlists"],
    staleTime: 30000,
  });

  return (
    <div>
      {products?.map((product: any) => (
        <div key={product._id}>
          <div>{product.name}</div>
          <div>{product.price}</div>
        </div>
      ))}
    </div>
  );
}

export default Wishlists;
