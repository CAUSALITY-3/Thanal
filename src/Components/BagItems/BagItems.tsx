import React, { useEffect, useState } from "react";
import "./BagItems.scss";
import BagItem from "./BagItem";
import Tooltip from "../Tooltip/Tooltip";
import { Button } from "../Buttons/Button";

function BagItems({ products, checkoutFn }: any) {
  const [productQty, setProductQty] = useState<any>({});
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    products.forEach((product: any) => {
      setProductQty((prev: any) => {
        let total = 0;
        products.forEach((product: any) => {
          total += product.price * 1;
        });
        setTotalAmount(total);
        return { ...prev, [product._id]: 1 };
      });
    });
    getTotalAmount();
  }, [products]);

  const getTotalAmount = () => {};

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
                {parseFloat(
                  (product.price * productQty[product._id]).toFixed(2)
                )}
              </div>
            </div>
          ))}

          <div className="total-amount-item-total">
            <div className="total-amount-item-name">Total</div>
            <div className="total-amount-item-price">
              {parseFloat(totalAmount.toFixed(2))}
            </div>
          </div>
        </div>
        <Tooltip content={"Checkout items"}>
          <div
            className="bag-item-checkout-btn"
            onClick={() => {
              checkoutFn();
            }}
          >
            <Button
              color={"#0ce9007d"}
              width="fit-content"
              height="fit-content"
            >
              <div className="checkout-btn-text">CHECK OUT</div>
            </Button>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}

export default BagItems;
