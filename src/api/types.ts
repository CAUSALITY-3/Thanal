export const apiPaths: { [key: string]: string } = {
  PRODUCT_MAINLIST: "products/productMainList",
  GET_PRODUCT_BY_ID: "products/product",
  UPSERT_USER: "users/upsertUser",
  GET_USER_BY_EMAIL: "users/getUserByEmail",
  GET_IMAGES: "images/getImageNames",
  PRODUCT_FAMILY: "products/getAllUnderFamily",
  GET_ORDER_ID: "payments/createOrder"
};

export interface ProductMainList {
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
