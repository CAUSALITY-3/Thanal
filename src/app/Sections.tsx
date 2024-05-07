import React, { FC } from "react";
import * as stylex from "@stylexjs/stylex";
import { Carousel } from "@/Components/Carousel/Carousel";
import { ProductCard } from "@/Components/ProductCard/ProductCard";
import { text } from "./globalTokens.stylex";
import { ProductCardWrapper } from "@/Components/ProductCard/ProductCardWrapper";

const styles = stylex.create({
  sections: {
    margin: "10px 0",
    display: "flex",
    width: "98%",
    overflow: "hidden",
    "flex-direction": "column",
    // padding: "10px 0",
  },
  section: {
    borderRadius: "10px",
    paddingTop: "10px",
    marginBottom: "10px",
    "background-color": "#f5f5f5",
    
    ":hover": {
      "background-color": {
        default: "#dcdcdc",
        "@media (max-width: 500px)": "#f5f5f5",
      }
    },
    ":active": {
      "background-color": {
        default: "#f5f5f5",
        "@media (max-width: 500px)": "#dcdcdc",
      }
    },
  },
  title: {
    "padding-left": "10px",
    margin: 0,
    fontSize: text.h4,
    fontWeight: "bold",
    "::first-letter": {
      "text-transform": "uppercase",
    },
  },
  wrapper: {
    display: "flex",
  },
  marginProvider: {
    margin: "10px",
  },
});

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
    <div {...stylex.props(styles.sections)}>
      {mainData.map((item: ProductMainList, key: any) => (
        <div {...stylex.props(styles.section)} key={key}>
          <p {...stylex.props(styles.title)}>{item.type}</p>
          <Carousel key={key}>
            <div {...stylex.props(styles.wrapper)}>
              {Object.values(item.data).map((card, key) => (
                <div {...stylex.props(styles.marginProvider)} key={key}>
                  <ProductCardWrapper id={card.productId}>
                    <ProductCard props={card} type={item.type}  />
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
