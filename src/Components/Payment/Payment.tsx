import React from "react";
import "./Payment.scss";
import { apiCall } from "@/api/sevice";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
function Payment({ name, email, orderDetails, deliveryAddress }: any) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const createOrderId = async () => {
    try {
      const response = await apiCall(
        "POST",
        "GET_ORDER_ID",
        {},
        "",
        { amount: parseFloat(orderDetails.totalAmount) },
        {
          "Content-Type": "application/json",
        },
        {
          success: "Order ID generated successfully.",
          failure: "Failed to generate order ID.",
        }
      );
      return response.id;
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };
  const processPayment = async () => {
    try {
      const orderId: string = await createOrderId();
      const options = {
        key: process.env.key_id,
        amount: parseFloat(orderDetails.totalAmount),
        currency: "INR",
        name: "name",
        description: "description",
        order_id: orderId,
        handler: async function (response: any) {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await apiCall("POST", "VERIFY_ORDER", {}, "", data, {
            "Content-Type": "application/json",
          });
          if (result.success) {
            console.log("payment succeed", orderDetails);
            await apiCall(
              "POST",
              "SAVE_ORDER",
              {},
              "",
              { ...orderDetails, email, deliveryAddress },
              {
                "Content-Type": "application/json",
              },
              {
                success: "Order successfully placed!",
                failure: "Order verification failed.",
              }
            );
            queryClient.invalidateQueries({
              queryKey: ["bag", "product", "user", "orders"],
            });
            router.push("/profile?tab=activity");
          } else {
            alert("payment failed");
          }
        },
        prefill: {
          name: name,
          email: email,
        },
        theme: {
          color: "#3399cc",
        },
      };
      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.on("payment.failed", function (response: any) {
        alert(response.error.description);
      });
      paymentObject.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="PaymentOuterContainer">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="select-payment-gateway">
        <div className="payment-gateway-text">
          Please Select Payment Gateway
        </div>

        <div className="payment-gateways" onClick={processPayment}>
          <div className="payment-gateway-logo">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBLlFEtwg5TN0kHmJ299cqrBfK4hbNd3Dhkw&s"
              alt="razorpay"
            />
          </div>
          <div className="payment-gateway-name">Razorpay</div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
