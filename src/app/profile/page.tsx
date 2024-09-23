"use client";
import { FC, use, useEffect, useState } from "react";
import React from "react";
import "./profile.scss";
import {
  getCookie,
  getCookieAndUpdateLocalStorage,
  getUserAuth,
} from "../util";
import { redirect } from "next/navigation";
import EditableContainer from "./EditableContainer";
import { Button } from "@/Components/Buttons/Button";
import { apiCall } from "@/api/sevice";

const Profile: FC = () => {
  const [formData, setFormData] = useState<any>({});
  const [user, setUser] = useState<any>(null);
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const [reset, setReset] = useState<boolean>(true);
  const [valid, setValid] = useState<boolean>(false);

  useEffect(() => {
    loadFunction();
  }, [reset]);

  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      const addressValid = Object.values(formData?.address).find(
        (data: any) =>
          data.editable &&
          data?.validation.find((fn: Function) => !fn(data.value))
      );
      const phoneValid = formData?.phone?.value?.length !== 10;
      const valid = !addressValid && !phoneValid;
      setValid(valid);
    }
  }, [formData]);

  const loadFunction = async () => {
    const isBrowser =
      typeof window === "object" && typeof document === "object";
    // if (!user) {
    const data = await getUserAuth();
    const parsedUser = data ? JSON.parse(data || "") : null;
    setUser(parsedUser);
    if (!parsedUser?.name && isBrowser) return redirect("/login");
    const form = {
      phone: {
        label: "Phone (+91)",
        key: "phone",
        value: parsedUser?.phone,
        invalid: false,
        editable: true,
        validationArray: [{ method: "length", value: 10 }],
        validation: [(value: string) => value.length === 10],
        message: "Please provide valid 10 digit phone number.",
      },
      address: {
        house: {
          label: "House | Building | Company",
          key: "house",
          value: parsedUser?.address?.houseName || "",
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
          value: parsedUser?.address?.landmark || "",
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
          value: parsedUser?.address?.city || "",
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
          value: String(parsedUser?.address?.pincode) || "",
          invalid: false,
          editable: true,
          validationArray: [{ method: "length", value: 6 }],
          validation: [(value: string) => value.length === 6],
          message: "Please provide valid 6 digit pincode.",
        },
      },
    };
    setFormData(form);
  };
  const handleEditDetails = async () => {
    const payload = {
      phone: formData?.phone?.value,
      address: {
        houseName: formData?.address?.house?.value,
        landmark: formData?.address?.landmark?.value,
        city: formData?.address?.city?.value,
        state: formData?.address?.state?.value,
        pincode: formData?.address?.pincode?.value,
      },
    };
    const response: any = await apiCall(
      "PUT",
      "UPDATE_USER_BY_QUERY",
      {},
      `?email=${user?.email}`,
      JSON.stringify(payload),
      {
        "Content-Type": "application/json",
      }
    );
    if (response) {
      getCookieAndUpdateLocalStorage("user");
      setReadOnly(true);
      setReset(!reset);
    }
  };

  return (
    <div className="profilePage">
      <div className="profileOuter">
        {Object.keys(formData).length ? (
          <>
            <div className="profileTopContainer">
              <div className="profileImage">
                <img src={user.profilePic} alt="" />
              </div>
              <div className="profileDetails">
                <div className="profileName">{user?.name}</div>
                <div className="profileEmail">{user?.email}</div>
              </div>
            </div>

            <div className="profileBottomContainer">
              {readOnly && (
                <div
                  className="editIcon"
                  onClick={() => {
                    setReadOnly(!readOnly);
                  }}
                >
                  <Button color={"#89CFF0"}>
                    <div className="editButton">
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
                </div>
              )}

              <EditableContainer
                setFormData={setFormData}
                formData={formData.phone}
                readOnly={readOnly}
              />
              <div className="addressDiv">
                <div className="addressTitle">Address</div>
                {Object.values(formData.address).map((form: any, key) => (
                  <EditableContainer
                    setFormData={setFormData}
                    formData={form}
                    readOnly={readOnly}
                    key={key}
                  />
                ))}
              </div>
              {!readOnly && (
                <div className="save-cancel-buttons">
                  <div
                    onClick={() => {
                      setReadOnly(!readOnly);
                      setReset(!reset);
                    }}
                  >
                    <Button content="Cancel" color="#f08080" />
                  </div>
                  <div onClick={handleEditDetails}>
                    <Button content="Save" disabled={!valid} />
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>Loading</>
        )}
      </div>
    </div>
  );
};

export default Profile;
