"use client";
import React, { useEffect, useState } from "react";
import "./EditDeliveryAddress.scss";
import DeliveryAddress from "./DeliveryAddress";
import Tooltip from "../Tooltip/Tooltip";
import { Button } from "../Buttons/Button";
import EditableContainer from "@/app/profile/EditableContainer";
import ToggleButton from "../ToggleButton/ToggleButton";
import Toast from "../Toast/Toast";
import { getCookieAndUpdateLocalStorage } from "@/app/util";
import { useQueryClient } from "@tanstack/react-query";
import { apiCall } from "@/api/sevice";

function EditDeliveryAddress({ index = 0, deliveryAddress, handleClose }: any) {
  const [deliveryAddressState, setDeliveryAddressState] = useState<any>([]);
  const [defaultIndex, setDefaultIndex] = useState(0);
  const [selected, setSelected] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [selectedToggle, setselectedToggle] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(false);
  const [addingNew, setAddingNew] = useState(false);
  const queryClient = useQueryClient();

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
    return () => {
      setDeliveryAddressState([...deliveryAddress]);
      setDefaultIndex(0);
      setselectedToggle(true);
      setSelected(0);
    };
  }, []);

  useEffect(() => {
    if (!addingNew) {
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
          key: "houseName",
          value: deliveryAddressState?.[selected]?.houseName || "",
          invalid: false,
          editable: true,
          validationArray: [{ method: "length", value: [2, 30] }],
          validation: [
            (value: string) => value.length > 2 && value.length < 30,
          ],
          message: "Invalid Entry",
        },
        landmark: {
          label: "Landmark",
          key: "landmark",
          value: deliveryAddressState?.[selected]?.landmark || "",
          invalid: false,
          editable: true,
          validationArray: [{ method: "length", value: [2, 30] }],
          validation: [
            (value: string) => value.length > 2 && value.length < 30,
          ],
          message: "Invalid Entry",
        },
        city: {
          label: "City",
          key: "city",
          value: deliveryAddressState?.[selected]?.city || "",
          invalid: false,
          editable: true,
          validationArray: [{ method: "dropDown" }],
          validation: [
            (value: string) => value.length > 2 && value.length < 30,
          ],
          message: "Invalid Entry",
        },
        state: {
          label: "State",
          key: "state",
          value: "Kerala",
          invalid: false,
          editable: false,
          validationArray: [{ method: "length", value: [2, 20] }],
          validation: [
            (value: string) => value.length > 2 && value.length < 20,
          ],
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
    } else {
      if (selected !== 0) {
        Toast("info", "Please save your new address");
        setSelected(0);
      }
    }
  }, [deliveryAddressState, selected, defaultIndex]);

  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      const addressNotValid = Object.values(formData).find(
        (addressData: any) =>
          addressData.editable &&
          addressData?.validation.find((fn: Function) => !fn(addressData.value))
      );
      setValid(!addressNotValid);
    }
  }, [formData]);

  useEffect(() => {
    if (addingNew) {
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
          key: "houseName",
          value: deliveryAddressState?.[selected]?.houseName || "",
          invalid: false,
          editable: true,
          validationArray: [{ method: "length", value: [2, 30] }],
          validation: [
            (value: string) => value.length > 2 && value.length < 30,
          ],
          message: "Invalid Entry",
        },
        landmark: {
          label: "Landmark",
          key: "landmark",
          value: deliveryAddressState?.[selected]?.landmark || "",
          invalid: false,
          editable: true,
          validationArray: [{ method: "length", value: [2, 30] }],
          validation: [
            (value: string) => value.length > 2 && value.length < 30,
          ],
          message: "Invalid Entry",
        },
        city: {
          label: "City",
          key: "city",
          value: deliveryAddressState?.[selected]?.city || "",
          invalid: false,
          editable: true,
          validationArray: [{ method: "dropDown" }],
          validation: [
            (value: string) => value.length > 2 && value.length < 30,
          ],
          message: "Invalid Entry",
        },
        state: {
          label: "State",
          key: "state",
          value: "Kerala",
          invalid: false,
          editable: false,
          validationArray: [{ method: "length", value: [2, 20] }],
          validation: [
            (value: string) => value.length > 2 && value.length < 20,
          ],
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
    }
  }, [addingNew]);

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

  const handleAddNewAddress = () => {
    if (deliveryAddressState.length >= 5) {
      return Toast("failure", "Maximum 5 addresses can be added");
    }
    setDeliveryAddressState([
      {
        name: "",
        phone: "",
        houseName: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
      },
      ...deliveryAddressState,
    ]);
    setDefaultIndex((prev: number) => prev + 1);

    setSelected(0);
    setAddingNew(true);
  };

  const handleRemoveAddress = () => {
    if (deliveryAddressState.length <= 1) {
      return Toast("failure", "Minimum 1 need to be added");
    }

    const deliveryAddressCopy = [...deliveryAddressState];
    deliveryAddressCopy.splice(selected, 1);
    setDeliveryAddressState(deliveryAddressCopy);
    if (defaultIndex === selected) {
      setDefaultIndex(0);
    } else {
      setDefaultIndex((prev: number) => (prev === 0 ? 0 : prev - 1));
    }
    setSelected(0);
  };

  const handleSaveAddress = async () => {
    const arr = [...deliveryAddressState];
    arr[selected] = {
      name: formData.name.value,
      phone: formData.phone.value,
      houseName: formData.houseName.value,
      landmark: formData.landmark.value,
      city: formData.city.value,
      state: formData.state.value,
      pincode: formData.pincode.value,
    };
    const defaultAddress = arr[defaultIndex];
    arr.splice(defaultIndex, 1);
    const deliveryAddressPayload = [defaultAddress, ...arr];
    const userData: any = queryClient.getQueryData(["user"]);
    const user = JSON.parse(userData);
    const response: any = await apiCall(
      "PUT",
      "UPDATE_USER_BY_QUERY",
      {},
      `?email=${user?.email}`,
      JSON.stringify({ deliveryAddress: deliveryAddressPayload }),
      {
        "Content-Type": "application/json",
      },
      {
        success: "Successfully updated Delivery Address.",
        failure: "Failed to update Delivery Address.",
      }
    );
    if (response && response.email) {
      getCookieAndUpdateLocalStorage("user");
      queryClient.setQueryData(["user"], JSON.stringify(response));
      setDeliveryAddressState(response?.deliveryAddress);
      console.log("val, defaultIndex", selected, defaultIndex);
      setSelected((val) => {
        if (val === defaultIndex) {
          return 0;
        }
        return val;
      });
      setDefaultIndex(0);
      setAddingNew(false);
      const element = document.getElementById(
        "editDeliveryAddressContainer"
      ) as any;
      if (element) {
        element.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div
      className="editDeliveryAddressContainer"
      id="editDeliveryAddressContainer"
    >
      <div className="add-remove-address">
        <div
          className="addNewAddressBtnDiv"
          onClick={
            deliveryAddressState.length >= 1
              ? () => handleRemoveAddress()
              : () => {}
          }
        >
          <Tooltip
            content={
              deliveryAddressState.length <= 1
                ? "Minimum 1 address need to be added"
                : "Rmove selected address"
            }
          >
            <Button
              color={"#f08080"}
              disabled={deliveryAddressState.length <= 1}
            >
              <div className="addNewAddress">
                <div className="addNewAddressButtonText">Remove ➖</div>
              </div>
            </Button>
          </Tooltip>
        </div>
        <div
          className="addNewAddressBtnDiv"
          onClick={
            deliveryAddressState.length <= 5
              ? () => handleAddNewAddress()
              : () => {}
          }
        >
          <Tooltip
            content={
              deliveryAddressState.length >= 5
                ? "Maximum 5 addresses can be added"
                : "Add new address"
            }
          >
            <Button
              color={"#89CFF0"}
              disabled={deliveryAddressState.length >= 5}
            >
              <div className="addNewAddress">
                <div className="addNewAddressButtonText">Add ➕</div>
              </div>
            </Button>
          </Tooltip>
        </div>
      </div>
      <DeliveryAddress
        deliveryAddress={deliveryAddressState}
        defaultIndex={defaultIndex}
        selected={selected}
        setSelected={setSelected}
      />
      <div className="editDeliveryAddressSection">
        <div className="toggleDefault">
          <div className="toggleDefaultText">Set as Default Address</div>
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
              notProfileEdit={true}
            />
          ))}
      </div>
      <div className="Delivery-save-cancel-buttons">
        <div onClick={handleClose}>
          <Button content="Cancel" color="#f08080" />
        </div>
        <div onClick={valid ? () => handleSaveAddress() : () => {}}>
          <Button content="Save" disabled={!valid} />
        </div>
      </div>
    </div>
  );
}

export default EditDeliveryAddress;
