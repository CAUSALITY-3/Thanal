"use client";
import React from "react";
import { Carousel } from "@/Components/Carousel/Carousel";
import { ProductCard } from "@/Components/ProductCard/ProductCard";
import { ProductCardWrapper } from "@/Components/ProductCard/ProductCardWrapper";
import "./Sections.scss";
import { apiCall } from "@/api/sevice";
import { useQuery } from "@tanstack/react-query";
import ShimmerLoading from "@/Components/ShimmerLoading/ShimmerLoading";

interface ProductMainList {
  type: string;
  data: {
    [key: string]: {
      category: string;
      name: string;
      description: string;
      image: string;
      price: number;
      productId: string;
      ratings: { average: number; count: number };
    };
  };
}

export async function Sections() {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => apiCall("get", "PRODUCT_MAINLIST"),
    queryKey: ["mainList"], //Array according to Documentation
    staleTime: 3600000,
  });
  const mainData: ProductMainList[] = data || [];
  return (
    <div className="sections">
      {isLoading && <ShimmerLoading />}
      {mainData.map((item: ProductMainList, key: any) => (
        <div className="section" key={key}>
          <p className="title">{item.type}</p>
          <Carousel key={key}>
            <div className="wrapper">
              {Object.values(item.data).map((card, key) => (
                <div className="marginProvider" key={key}>
                  <ProductCardWrapper id={card.productId}>
                    <ProductCard props={card} type={item.type} />
                  </ProductCardWrapper>
                </div>
              ))}
            </div>
          </Carousel>
        </div>
      ))}
    </div>
  );
}
