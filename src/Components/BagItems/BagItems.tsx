import React, { useEffect, useState } from "react";
import "./BagItems.scss";
import BagItem from "./BagItem";

function BagItems({ products }: any) {
  const [productQty, setProductQty] = useState<any>({});
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    products.forEach((product: any) => {
      setProductQty((prev: any) => ({ ...prev, [product._id]: 1 }));
      setTotalAmount((prev: any) => prev + product.price);
    });
  }, [products]);

  useEffect(() => {
    console.log({ productQty });
  }, [productQty]);

  const handleQtyChange = (id: any, qty: any, price: number) => {
    console.log({ id, qty });
    setProductQty((prev: any) => ({ ...prev, [id]: prev[id] + qty }));
    setTotalAmount((prev: any) => prev + price);
  };

  return (
    <div className="bag-items-outer-container">
      <div className="bag-items-container">
        {products.map((product: any) => (
          <BagItem
            key={product._id}
            product={product}
            handleQtyChange={handleQtyChange}
          />
        ))}
      </div>

      <div className="total-amount-container">
        <div className="total-amount-items">
          {products.map((product: any) => (
            <div key={product._id} className="total-amount-item">
              <div className="total-amount-item-name-container">
                <div className="total-amount-item-qty">
                  {`${productQty[product._id]}x`}
                </div>
                <div className="total-amount-item-name"> {product.name}</div>
              </div>

              <div className="total-amount-item-price">
                {product.price * productQty[product._id]}
              </div>
            </div>
          ))}

          <div className="total-amount-item-total">
            <div className="total-amount-item-name">Total</div>
            <div className="total-amount-item-price">{totalAmount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BagItems;
