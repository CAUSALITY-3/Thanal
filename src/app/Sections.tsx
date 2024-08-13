import React, { FC } from "react";
import { Carousel } from "@/Components/Carousel/Carousel";
import { ProductCard } from "@/Components/ProductCard/ProductCard";
import { ProductCardWrapper } from "@/Components/ProductCard/ProductCardWrapper";
import "./Sections.scss";

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

export async function Sections({ mainData }: any) {
  return (
    <div className="sections">
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
