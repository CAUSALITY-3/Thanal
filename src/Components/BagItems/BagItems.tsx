import React from "react";
import "./BagItems.scss";
import BagItem from "./BagItem";

function BagItems({ products }: any) {
  return (
    <div className="bag-items-outer-container">
      <div className="bag-items-container">
        {products.map((product: any) => (
          <BagItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default BagItems;
