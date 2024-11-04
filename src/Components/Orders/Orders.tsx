import { apiCall } from "@/api/sevice";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import "./Orders.scss";
import { Button } from "../Buttons/Button";

function Orders({ orderIds }: any) {
  async function getOrderByIds(ids: string[]) {
    return await apiCall(
      "POST",
      "GET_ORDER_BY_IDS",
      {},
      "",
      { ids: orderIds },
      {
        "Content-Type": "application/json",
      }
    );
  }

  const getDate = (dateString: string) => {
    const date = new Date("2024-10-02");
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
    return formattedDate;
  };
  const { data: orders } = useSuspenseQuery({
    queryFn: () => getOrderByIds(orderIds),
    queryKey: ["orders"],
    staleTime: 30000,
  });

  return (
    <div className="orders-container">
      {orders?.map((order: any) => (
        <div key={order._id} className="order-item">
          <div className="order-item-top-section">
            <div className="order-date">{getDate(order.orderDate)}</div>
            <div className="order-status">{order.status}</div>
          </div>
          <div className="order-item-middle-section">
            {order.orderItems.map((item: any) => (
              <div key={item.productId} className="product-order-item">
                <div className="product-order-item-image">
                  <img
                    loading="lazy"
                    src={item.productImage}
                    alt="Picture of the author"
                  />
                </div>
                <div className="product-order-item-details">
                  <div className="product-order-item-name-price">
                    <div className="product-order-item-name">
                      {item.productName}
                    </div>

                    <div className="product-order-item-price">
                      <div className="product-order-item-quantity">
                        {`(${item.quantity}x)`}
                      </div>
                      ₹ {item.price}
                    </div>
                  </div>
                  <div className="product-order-item-status-modify">
                    <div
                      className={`product-order-item-status product-order-${item.status}`}
                    >
                      {item.status}
                    </div>
                    {!["cancelled", "delivered"].includes(item.status) && (
                      <div className="order-cancel-text">Cancel</div>
                    )}
                    {item.status === "delivered" && (
                      <div className="order-review-text">Rate & Review</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;
