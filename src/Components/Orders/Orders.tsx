"use client";
import { apiCall } from "@/api/sevice";
import { useSuspenseQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import "./Orders.scss";
import Link from "next/link";
import Modal from "../Modal/Modal";
import Review from "../Review/Review";

function Orders({ orderIds, email, name }: any) {
  const [openReviewPage, setOpenReviewPage] = useState(false);
  const [reviewPayload, setReviewPayload] = useState({});
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
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
    return formattedDate;
  };
  const getDeliveryAddress = (address: any) => {
    if (!address) return "";
    let addressSring = "";
    const addressArray: string[] = [
      "name",
      "phone",
      "houseName",
      "landmark",
      "city",
      "state",
      "pincode",
    ];
    for (const val of addressArray) {
      addressSring += address[val] + "\n";
    }

    return addressSring;
  };
  const { data: orders } = useSuspenseQuery({
    queryFn: () => getOrderByIds(orderIds),
    queryKey: ["orders"],
    staleTime: 30000,
  });

  const openReviewPageFn = (orderId: string, productId: string) => {
    setReviewPayload({ orderId, productId, userEmail: email, userName: name });
    setOpenReviewPage(true);
  };

  return (
    <div className="orders-container">
      {orders?.length === 0 ? (
        <div className="no-orders">
          <p className="no-orders-text">No Orders Yet</p>
          <Link className="no-orders-link" href={"/products"}>
            Grab some products from store!
          </Link>
        </div>
      ) : (
        orders?.map((order: any) => (
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
                      {item.status === "delivered" &&
                        (item.review?.rating === undefined ||
                          !item.review?.review) && (
                          <div
                            className="order-review-text"
                            onClick={() =>
                              openReviewPageFn(order._id, item.productId)
                            }
                          >
                            Rate & Review
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="order-item-bottom-section">
              <div className="order-item-delivery-address-section">
                <div className="order-item-delivery-address-title">
                  Delivery Address
                </div>
                <pre className="order-item-delivery-address">
                  {getDeliveryAddress(order.deliveryAddress)}
                </pre>
              </div>
              <div className="order-item-total">
                Total: ₹ {order.totalPrice}
              </div>
            </div>
            {openReviewPage && (
              <Modal
                isOpen={openReviewPage}
                size={"m"}
                handleClose={() => setOpenReviewPage(false)}
                title={"Rate & Review"}
              >
                <Review reviewPayload={reviewPayload} />
              </Modal>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
