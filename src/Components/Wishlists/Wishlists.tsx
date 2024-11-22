"use client";
import { apiCall } from "@/api/sevice";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import "./Wishlists.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Wishlists({ wishlistIds }: any) {
  const router = useRouter();
  async function getProductByIds() {
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
    queryFn: () => getProductByIds(),
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
      {formattedProducts?.length === 0 ? (
        <div className="no-wishlists">
          <p className="no-wishlists-text">Nothing in wishlists</p>
          <Link className="no-wishlists-link" href={"/products"}>
            Add some products to wishlists!
          </Link>
        </div>
      ) : (
        formattedProducts?.map((product: any, key: any) => (
          <div
            key={key}
            onClick={() => router.push("/products/" + product.productId)}
          >
            <ProductCard
              key={key}
              props={product}
              type={product.category}
              size="s"
            />
          </div>
        ))
      )}
    </div>
  );
}

export default Wishlists;
