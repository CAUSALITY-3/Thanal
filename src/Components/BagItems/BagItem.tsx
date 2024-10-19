import Link from "next/link";
import React, { useState } from "react";
import "./BagItem.scss";
import Tooltip from "../Tooltip/Tooltip";
import { Button } from "../Buttons/Button";
import Toast from "../Toast/Toast";

function BagItem({ product, key }: any) {
  const [qty, setQty] = useState(1);

  const handleQtyIncrease = () => {
    if (qty < product.stock) {
      setQty(qty + 1);
    } else {
      Toast("failure", "Maximum quantity reached");
    }
  };

  const handleQtyDecrease = () => {
    if (qty > 1) {
      setQty(qty - 1);
    } else {
      Toast("failure", "Minimum quantity reached");
    }
  };

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
        <div className="bag-qty-remove">
          <div className="bag-qty">
            <div className="qty-add-remove-btn" onClick={handleQtyIncrease}>
              +
            </div>
            <div className="qty-value">{qty}</div>
            <div className="qty-add-remove-btn" onClick={handleQtyDecrease}>
              -
            </div>
          </div>
          <Tooltip content={"Remove item from bag"}>
            <Button color={"#b9deff"}>Remove</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default BagItem;
