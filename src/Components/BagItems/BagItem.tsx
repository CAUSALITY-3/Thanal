import Link from "next/link";
import React from "react";
import "./BagItem.scss";

function BagItem({ product, key }: any) {
  return (
    <div className="bag-item">
      <div className="bag-item-container">
        <Link
          href={`/products/${product._id}`}
          prefetch={false}
          className="bag-item-image"
        >
          <img
            loading="lazy"
            src={product.images[0]}
            alt="Picture of the author"
          />
        </Link>

        <div className="bag-item-details">
          <Link
            href={`/products/${product._id}`}
            prefetch={false}
            className="bag-item-name"
          >
            {product.name}
          </Link>
          <div className="bag-item-features">
            {...product.features.map((feature: any) => feature.value)}
          </div>
          <div className="bag-item-price">₹ {product.price}</div>
        </div>
      </div>
    </div>
  );
}

export default BagItem;
