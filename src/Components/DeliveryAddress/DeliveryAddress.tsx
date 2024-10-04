import React from "react";
import "./DeliveryAddress.scss";
import { Carousel } from "../Carousel/Carousel";
import Tooltip from "../Tooltip/Tooltip";
function DeliveryAddress({
  deliveryAddress,
  defaultIndex = 0,
  selected = null,
  setSelected = null,
}: any) {
  return (
    <div className="deliveryAddressOuterContainer">
      <Carousel>
        {deliveryAddress.map((data: any, index: any) => (
          <div
            key={index}
            className={`deliveryAddressContainer ${
              index === defaultIndex ? "defaultAddress" : ""
            } ${index === selected ? "selectedAddress" : ""}`}
            onClick={() => {
              selected !== index && selected !== null && setSelected(index);
              console.log({ index });
            }}
          >
            {index === defaultIndex && (
              <div className="deliverydefaultTick">
                <Tooltip content={"Default Address"}>
                  <div>✅</div>
                </Tooltip>
              </div>
            )}
            <div className="deliveryName">{data.name}</div>
            <div className="deliveryPhone">{data.phone}</div>
            <div className="deliveryAddressSection">
              <div className="deliveryhouse">{data.houseName}</div>
              <div className="deliverylandmark">{data.landmark}</div>
              <div className="deliverycity">{data.city}</div>
              <div className="deliverystate">{data.state}</div>
              <div className="deliveryPincode">{data.pincode}</div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default DeliveryAddress;
