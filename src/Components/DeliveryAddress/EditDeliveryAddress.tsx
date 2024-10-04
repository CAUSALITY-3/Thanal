"use client";
import React, { useEffect, useState } from "react";
import "./EditDeliveryAddress.scss";
import DeliveryAddress from "./DeliveryAddress";
import Tooltip from "../Tooltip/Tooltip";
import { Button } from "../Buttons/Button";
import EditableContainer from "@/app/profile/EditableContainer";
import ToggleButton from "../ToggleButton/ToggleButton";

function EditDeliveryAddress({ index = 0, deliveryAddress }: any) {
  const [deliveryAddressState, setDeliveryAddressState] = useState<any>([]);
  const [defaultIndex, setDefaultIndex] = useState(0);
  const [selected, setSelected] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [selectedToggle, setselectedToggle] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(false);

  useEffect(() => {
    const deliveryAddressCopy = [...deliveryAddress];
    deliveryAddressCopy.splice(index, 1);
    setDeliveryAddressState([deliveryAddress[index], ...deliveryAddressCopy]);
    setSelected(0);

    if (index === 0) {
      setDefaultIndex(0);
      setselectedToggle(true);
    } else {
      setDefaultIndex(1);
      setselectedToggle(false);
    }
  }, []);

  useEffect(() => {
    setFormData({
      name: {
        label: "Name",
        key: "name",
        value: deliveryAddressState?.[selected]?.name,
        invalid: false,
        editable: true,
        validationArray: [{ method: "length", value: 10 }],
        validation: [(value: string) => value?.length > 2],
        message: "Please provide atleast 3 characters.",
      },
      phone: {
        label: "Phone (+91)",
        key: "phone",
        value: deliveryAddressState?.[selected]?.phone,
        invalid: false,
        editable: true,
        validationArray: [{ method: "length", value: 10 }],
        validation: [(value: string) => value.length === 10],
        message: "Please provide valid 10 digit phone number.",
      },
      houseName: {
        label: "House | Building | Company",
        key: "house",
        value: deliveryAddressState?.[selected]?.houseName || "",
        invalid: false,
        editable: true,
        validationArray: [{ method: "length", value: [2, 30] }],
        validation: [(value: string) => value.length > 2 && value.length < 30],
        message: "Invalid Entry",
      },
      landmark: {
        label: "Landmark",
        key: "landmark",
        value: deliveryAddressState?.[selected]?.landmark || "",
        invalid: false,
        editable: true,
        validationArray: [{ method: "length", value: [2, 30] }],
        validation: [(value: string) => value.length > 2 && value.length < 30],
        message: "Invalid Entry",
      },
      city: {
        label: "City",
        key: "city",
        value: deliveryAddressState?.[selected]?.city || "",
        invalid: false,
        editable: true,
        validationArray: [{ method: "dropDown" }],
        validation: [(value: string) => value.length > 2 && value.length < 30],
        message: "Invalid Entry",
      },
      state: {
        label: "State",
        key: "state",
        value: "Kerala",
        invalid: false,
        editable: false,
        validationArray: [{ method: "length", value: [2, 20] }],
        validation: [(value: string) => value.length > 2 && value.length < 20],
        message: "Invalid Entry",
      },
      pincode: {
        label: "Pincode",
        key: "pincode",
        value: String(deliveryAddressState?.[selected]?.pincode) || "",
        invalid: false,
        editable: true,
        validationArray: [{ method: "length", value: 6 }],
        validation: [(value: string) => value.length === 6],
        message: "Please provide valid 6 digit pincode.",
      },
    });
    setselectedToggle(selected === defaultIndex);
  }, [deliveryAddressState, selected, defaultIndex]);

  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      const addressValid = Object.values(formData).find(
        (addressData: any) =>
          addressData.editable &&
          addressData?.validation.find((fn: Function) => !fn(addressData.value))
      );
      const phoneValid = formData?.phone?.value?.length !== 10;
      const valid = !addressValid && !phoneValid;
      setValid(valid);
    }
  }, [formData]);

  const handleDefaultAddress = (isDefault: boolean) => {
    if (isDefault) {
      setDefaultIndex(selected);
    } else {
      if (defaultIndex !== 0 || deliveryAddressState.length < 2) {
        setDefaultIndex(0);
      } else {
        setDefaultIndex(1);
      }
    }
  };

  return (
    <div className="editDeliveryAddressContainer">
      <div
        className="addNewAddressBtnDiv"
        onClick={() => {
          console.log("Add new address");
        }}
      >
        <Tooltip content={"Add new address"}>
          <Button color={"#89CFF0"}>
            <div className="addNewAddress">
              <div className="addNewAddressButtonText">Add ➕</div>
            </div>
          </Button>
        </Tooltip>
      </div>
      <DeliveryAddress
        deliveryAddress={deliveryAddressState}
        defaultIndex={defaultIndex}
        selected={selected}
        setSelected={setSelected}
      />
      <div
        className="editDeliveryAddressSection"
        onClick={() =>
          console.log(defaultIndex === selected, defaultIndex, selected)
        }
      >
        <div className="toggleDefault">
          <ToggleButton
            initialToggle={selectedToggle}
            handler={handleDefaultAddress}
          />
        </div>
        {formData &&
          Object.values(formData).map((form: any, key) => (
            <EditableContainer
              setFormData={setFormData}
              formData={form}
              readOnly={false}
              key={key}
            />
          ))}
      </div>
      <div
        className="editIcon"
        onClick={() => {
          console.log("Add new address");
        }}
      >
        <Tooltip content={"Add new address"}>
          <Button color={"#89CFF0"}>
            <div className="addNewAddress">
              <div className="addNewAddressButtonText">Add ➕</div>
            </div>
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}

export default EditDeliveryAddress;
