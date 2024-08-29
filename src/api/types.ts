export const apiPaths: { [key: string]: string } = {
  PRODUCT_MAINLIST: "products/productMainList",
  GET_PRODUCT_BY_ID: "products/product",
  UPSERT_USER: "users/upsertUser",
  UPDATE_USER_BY_QUERY: "users/update",
  GET_USER_BY_EMAIL: "users/getUserByEmail",
  GET_IMAGES: "images/getImageNames",
  PRODUCT_FAMILY: "products/getAllUnderFamily",
  GET_ORDER_ID: "payments/createOrder",
  ADD_TO_BAG: "users/addToBag",
  GET_USER_DETAILS: "auth/getUserDetails",
  VERIFY_ORDER: "payments/verifyPayment",
};

export interface ProductMainList {
  type: string;
  image: string;
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
