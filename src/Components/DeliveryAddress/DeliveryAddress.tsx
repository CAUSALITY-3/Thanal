import React from "react";
import "./DeliveryAddress.scss";
import { Carousel } from "../Carousel/Carousel";
import Tooltip from "../Tooltip/Tooltip";
function DeliveryAddress({ deliveryAddress }: any) {
  return (
    <div className="deliveryAddressOuterContainer">
      <Carousel>
        {deliveryAddress.map((data: any, index: any) => (
          <div
            key={index}
            className={`deliveryAddressContainer ${
              index === 0 ? "defaultAddress" : ""
            }`}
            onClick={() => {
              console.log({ index });
            }}
          >
            {index === 0 && (
              <div className="deliverydefaultTick">
                <Tooltip content={"Default Address"}>
                  <div>✅</div>
                </Tooltip>
              </div>
            )}
            <div className="deliveryName">{data.name}</div>
            <div className="deliveryPhone">{data.phone}</div>
            <div className="deliveryAddressSection">
              <div className="deliveryhouse">{data.address.houseName}</div>
              <div className="deliverylandmark">{data.address.landmark}</div>
              <div className="deliverycity">{data.address.city}</div>
              <div className="deliverystate">{data.address.state}</div>
              <div className="deliveryPincode">{data.address.pincode}</div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default DeliveryAddress;
