"use client";
import { apiCall } from "@/api/sevice";
import { getUserAuth } from "@/app/util";
import EditDeliveryAddress from "@/Components/DeliveryAddress/EditDeliveryAddress";
import Modal from "@/Components/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import "./buy.scss";

function Buy({ params }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const steps = ["Address", "Order Summary", "Payment"];
  const [currentStep, setCurrentStep] = useState(0);
  const getProductById = async () => {
    const data = await apiCall(
      "get",
      "GET_PRODUCT_BY_ID",
      {},
      `?id=${params.buySlug}`
    );
    console.log("GET_PRODUCT_BY_ID", data);

    return data;
  };
  const productApi = useQuery({
    queryFn: getProductById,
    queryKey: [params.buySlug],
  });

  const userData: any = useQuery({
    queryFn: getUserAuth,
    queryKey: ["user"],
  });

  const parsedUser = userData.data ? JSON.parse(userData.data || "") : null;

  const deliveryAddress = parsedUser?.deliveryAddress;

  if (!deliveryAddress?.length && parsedUser?.phone) {
    deliveryAddress.push({
      name: parsedUser?.name,
      phone: parsedUser?.phone,
      email: parsedUser?.email,
      houseName: parsedUser?.address?.houseName,
      landmark: parsedUser?.address?.landmark,
      city: parsedUser?.address?.city,
      state: parsedUser?.address?.state,
      pincode: parsedUser?.address?.pincode,
    });
  }

  const step1 = (
    <div className="buyPageProductSection">
      {JSON.stringify(productApi.data)}
    </div>
  );

  return (
    <div className="buyPageMainContainer">
      <div className="step-progress-bar">
        <div className="progress-container">
          <div
            className="progress"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
        {steps.map((step: string, index: number) => (
          <div
            key={index}
            className={`step ${index <= currentStep ? "active" : ""}`}
          >
            {step}
          </div>
        ))}
        {/* <style jsx>{`
        
      `}</style> */}
      </div>
      <div className="buyPageAddressSection" onClick={() => setIsOpen(true)}>
        {JSON.stringify(parsedUser?.deliveryAddress)}
      </div>

      <div className="buyPageProductSection">
        <p onClick={() => setCurrentStep(currentStep + 1)}>Hi team</p>
      </div>
      {isOpen && (
        <Modal isOpen={isOpen} size={"l"} handleClose={() => setIsOpen(false)}>
          <EditDeliveryAddress
            deliveryAddress={parsedUser.deliveryAddress}
            handleClose={() => setIsOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default Buy;
