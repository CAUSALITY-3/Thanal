"use client";
import { useState } from "react";
import Script from "next/script";
import { apiCall } from "@/api/sevice";

function Payment() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("0");
  const [currency, setCurrency] = useState("INR");
  const [loading, setLoading] = useState(false);
  const createOrderId = async () => {
    try {
      const response = await apiCall(
        "POST",
        "GET_ORDER_ID",
        {},
        "",
        JSON.stringify({ amount: parseFloat(amount) * 100 }),
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
  const processPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const orderId: string = await createOrderId();
      const options = {
        key: process.env.key_id,
        amount: parseFloat(amount) * 100,
        currency: currency,
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

          const result = await apiCall(
            "POST",
            "VERIFY_ORDER",
            {},
            "",
            JSON.stringify(data),
            {
              "Content-Type": "application/json",
            },
            {
              success: "Verification successful.",
              failure: "Verification failed.",
            }
          );
          if (result.success) alert("payment succeed");
          else {
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
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <section className="min-h-[94vh] flex flex-col gap-6 h-14 mx-5 sm:mx-10 2xl:mx-auto 2xl:w-[1400px] items-center pt-36 ">
        <form
          className="flex flex-col gap-6 w-full sm:w-80"
          onSubmit={processPayment}
        >
          <div className="space-y-1">
            <label>Full name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label>Email</label>
            <input
              type="email"
              placeholder="user@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label>Amount</label>
            <div className="flex gap-2">
              <input
                type="number"
                step="1"
                min={5}
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <button type="submit">Pay</button>
        </form>
      </section>
    </>
  );
}

export default Payment;
