"use client";
import { apiCall } from "@/api/sevice";
import { getUserAuth } from "@/app/util";
import EditDeliveryAddress from "@/Components/DeliveryAddress/EditDeliveryAddress";
import Modal from "@/Components/Modal/Modal";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import React, { use, useEffect, useState } from "react";
import "./buy.scss";
import DeliveryAddress from "@/Components/DeliveryAddress/DeliveryAddress";
import Tooltip from "@/Components/Tooltip/Tooltip";
import { Button } from "@/Components/Buttons/Button";
import BagItems from "@/Components/BagItems/BagItems";
import { useRouter } from "next/navigation";

function Buy({ params }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const steps = ["Address", "Order Summary", "Payment"];
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
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
  const productApi = useSuspenseQuery({
    queryFn: getProductById,
    queryKey: [params.buySlug],
  });

  const userData: any = useSuspenseQuery({
    queryFn: getUserAuth,
    queryKey: ["user"],
  });

  const parsedUser = userData.data ? JSON.parse(userData.data || "") : null;

  const deliveryAddress = parsedUser?.deliveryAddress;

  const checkoutFn = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleEditDeliveryAddress = () => {
    parsedUser?.deliveryAddress?.length ? setIsOpen(false) : router.back();
  };

  const step1 = () => (
    <Modal
      isOpen={isOpen}
      size={"l"}
      handleClose={handleEditDeliveryAddress}
      title={"Add Delivery Address"}
    >
      <EditDeliveryAddress
        deliveryAddress={parsedUser?.deliveryAddress || []}
        handleClose={handleEditDeliveryAddress}
        index={selected}
      />
    </Modal>
  );

  const step2 = () => (
    <div className="selectAddressSection">
      <div className="edit-or-change"></div>
      <div className="deliveryAddressEdit">
        <div className="selection-text">Please Select Address</div>
        <Tooltip content={"Edit Details"}>
          <Button color={"#89CFF0"}>
            <div
              className="editButton"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <div className="editButtonText">Edit</div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 24 24"
              >
                <path
                  d="M 19.171875 2 C 18.448125 2 17.724375 2.275625 17.171875 2.828125 L 16 4 L 20 8 L 21.171875 6.828125 C 22.275875 5.724125 22.275875 3.933125 21.171875 2.828125 C 20.619375 2.275625 19.895625 2 19.171875 2 z M 14.5 5.5 L 3 17 L 3 21 L 7 21 L 18.5 9.5 L 14.5 5.5 z"
                  // fill={readOnly ? "grey" : "black"}
                ></path>
              </svg>
            </div>
          </Button>
        </Tooltip>
      </div>
      <div className="address-and-bagItems">
        <DeliveryAddress
          deliveryAddress={parsedUser?.deliveryAddress}
          defaultIndex={0}
          selected={selected}
          setSelected={setSelected}
        />
        {isOpen && step1()}
        {!productApi.isLoading && (
          <div className="buy-page-checkout-items">
            <div className="checkout-items-title">Checkout Item</div>
            <BagItems products={[productApi.data]} checkoutFn={checkoutFn} />
          </div>
        )}
      </div>
    </div>
  );

  const step3 = () => <div>Payment</div>;

  useEffect(() => {
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
      setCurrentStep(1);
    } else if (!deliveryAddress?.length && !parsedUser?.phone) {
      setIsOpen(true);
      setCurrentStep(0);
    } else if (currentStep !== 2) {
      setCurrentStep(1);
    }
  }, [currentStep]);

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
        {/* {JSON.stringify(parsedUser?.deliveryAddress)} */}
      </div>

      <div className="buyPageAddressSection">
        {currentStep === 0 ? step1() : currentStep === 1 ? step2() : step3()}
      </div>
      <div className="buyPageProductSection"></div>
    </div>
  );
}

export default Buy;
