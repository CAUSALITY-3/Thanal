import React, { FC } from "react";
import * as stylex from "@stylexjs/stylex";
import { Carousel } from "@/Components/Carousel/Carousel";
import { ProductCard } from "@/Components/ProductCard/ProductCard";
import { ProductServices } from "@api/services/products";
import { text } from "./globalTokens.stylex";
import { getservice } from "./util";
import { InjectedType } from "@api/types/types";
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
const stt = {
  WebkitUserDrag: "none",
  borderTopRightRadius: "5px",
  borderTopLeftRadius: "5px",
};

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
  //   const mainData = [
  //     {
  //         "_id": "65b9ec8de742cdfe8c6e6bc8",
  //         "type": "Fish",
  //         "__v": 0,
  //         "createdAt": "2024-01-31T06:45:30.585Z",
  //         "data": {
  //             "guppy": {
  //                 "productId": "65b9ec8a7d29502a58237838",
  //                 "category": "Fish",
  //                 "name": "Guppy",
  //                 "description": "Product Description",
  //                 "price": 99.9,
  //                 "image": "https://assets.hvmag.com/2019/04/VVq7Qp8Z-Zinnias-Summer-1024x684.jpg",
  //                 "stock": 5,
  //                 "ratings": {
  //                     "average": 4.5,
  //                     "count": 100
  //                 }
  //             }
  //         },
  //         "updatedAt": "2024-01-31T06:45:30.564Z"
  //     },
  //     {
  //         "_id": "65f92431a5315ecdc3850421",
  //         "type": "plants",
  //         "__v": 0,
  //         "createdAt": "2024-03-19T05:35:47.530Z",
  //         "data": {
  //             "adenia": {
  //                 "productId": "65f92433a6b7763a1456a98d",
  //                 "category": "plants",
  //                 "name": "adenia",
  //                 "description": "Product Description",
  //                 "price": 99.9,
  //                 "image": "https://shop.organicmandya.com/cdn/shop/products/1DGxnvg206vOEx3BLPuxJQJBKyZWPYJDR_9d12e40f-d94c-4566-bc42-85f57dd16a64_1051x700.jpg?v=1608550655",
  //                 "stock": 5,
  //                 "ratings": {
  //                     "average": 4.5,
  //                     "count": 100
  //                 }
  //             },
  //             "chemparuthy": {
  //                 "productId": "65f92458a6b7763a1456a992",
  //                 "category": "plants",
  //                 "name": "chemparuthy",
  //                 "description": "Product Description",
  //                 "price": 99.9,
  //                 "image": "https://shop.organicmandya.com/cdn/shop/products/1DGxnvg206vOEx3BLPuxJQJBKyZWPYJDR_9d12e40f-d94c-4566-bc42-85f57dd16a64_1051x700.jpg?v=1608550655",
  //                 "stock": 5,
  //                 "ratings": {
  //                     "average": 4.5,
  //                     "count": 100
  //                 }
  //             },
  //             "rose": {
  //                 "productId": "65f92484a6b7763a1456a997",
  //                 "category": "plants",
  //                 "name": "rose",
  //                 "description": "Product Description",
  //                 "price": 99.9,
  //                 "image": "https://shop.organicmandya.com/cdn/shop/products/1DGxnvg206vOEx3BLPuxJQJBKyZWPYJDR_9d12e40f-d94c-4566-bc42-85f57dd16a64_1051x700.jpg?v=1608550655",
  //                 "stock": 5,
  //                 "ratings": {
  //                     "average": 4.5,
  //                     "count": 100
  //                 }
  //             },
  //             "lilly": {
  //                 "productId": "65f92491a6b7763a1456a99c",
  //                 "category": "plants",
  //                 "name": "lilly",
  //                 "description": "Product Description",
  //                 "price": 99.9,
  //                 "image": "https://shop.organicmandya.com/cdn/shop/products/1DGxnvg206vOEx3BLPuxJQJBKyZWPYJDR_9d12e40f-d94c-4566-bc42-85f57dd16a64_1051x700.jpg?v=1608550655",
  //                 "stock": 5,
  //                 "ratings": {
  //                     "average": 4.5,
  //                     "count": 100
  //                 }
  //             },
  //             "bogainvilla": {
  //                 "productId": "65f924a8a6b7763a1456a9a1",
  //                 "category": "plants",
  //                 "name": "bogainvilla",
  //                 "description": "Product Description",
  //                 "price": 99.9,
  //                 "image": "https://shop.organicmandya.com/cdn/shop/products/1DGxnvg206vOEx3BLPuxJQJBKyZWPYJDR_9d12e40f-d94c-4566-bc42-85f57dd16a64_1051x700.jpg?v=1608550655",
  //                 "stock": 5,
  //                 "ratings": {
  //                     "average": 4.5,
  //                     "count": 100
  //                 }
  //             },
  //             "poppy": {
  //                 "productId": "65f924b2a6b7763a1456a9a6",
  //                 "category": "plants",
  //                 "name": "poppy",
  //                 "description": "Product Description",
  //                 "price": 99.9,
  //                 "image": "https://shop.organicmandya.com/cdn/shop/products/1DGxnvg206vOEx3BLPuxJQJBKyZWPYJDR_9d12e40f-d94c-4566-bc42-85f57dd16a64_1051x700.jpg?v=1608550655",
  //                 "stock": 5,
  //                 "ratings": {
  //                     "average": 4.5,
  //                     "count": 100
  //                 }
  //             },
  //             "chetty": {
  //                 "productId": "65f92526a6b7763a1456a9ab",
  //                 "category": "plants",
  //                 "name": "chetty",
  //                 "description": "Product Description",
  //                 "price": 99.9,
  //                 "image": "https://shop.organicmandya.com/cdn/shop/products/1DGxnvg206vOEx3BLPuxJQJBKyZWPYJDR_9d12e40f-d94c-4566-bc42-85f57dd16a64_1051x700.jpg?v=1608550655",
  //                 "stock": 5,
  //                 "ratings": {
  //                     "average": 4.5,
  //                     "count": 100
  //                 }
  //             },
  //             "sunFlower": {
  //                 "productId": "65f92548a6b7763a1456a9b0",
  //                 "category": "plants",
  //                 "name": "sun flower",
  //                 "description": "Product Description",
  //                 "price": 99.9,
  //                 "image": "https://shop.organicmandya.com/cdn/shop/products/1DGxnvg206vOEx3BLPuxJQJBKyZWPYJDR_9d12e40f-d94c-4566-bc42-85f57dd16a64_1051x700.jpg?v=1608550655",
  //                 "stock": 5,
  //                 "ratings": {
  //                     "average": 4.5,
  //                     "count": 100
  //                 }
  //             }
  //         },
  //         "updatedAt": "2024-03-19T05:40:24.094Z"
  //     }
  // ];
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
                    <ProductCard props={card} />
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
