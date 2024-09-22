"use client";
import React, { useState } from "react";
import "./EditableContainer.scss";
function EditableContainer({ formData, setFormData, readOnly }: any) {
  const [blur, setBlur] = useState<boolean>(false);
  // console.log("sebastian", formData);
  const handleChange = (fieldName: string, inputValue: string) => {
    console.log(fieldName, inputValue);
    if ("phone pincode".includes(fieldName)) {
      inputValue = inputValue.replace(/[^\d]/, "");
    }
    if ("phone name".includes(fieldName)) {
      setFormData((prevState: any) => {
        prevState[fieldName].value = inputValue;
        return {
          ...prevState,
        };
      });
    } else {
      // formData.value = inputValue;
      // console.log("sebastian", formData, inputValue);
      setFormData((prevState: any) => {
        prevState.address[fieldName].value = inputValue;
        return {
          ...prevState,
        };
      });
    }
    console.log("blur", blur);
    blur ? handleBlur(fieldName, inputValue) : null;
  };

  const handleBlur = (fieldName: string, inputValue: string) => {
    // handleValidation(fieldName, inputValue);
    // setBlured(true);
    const isInValid = !!formData.validation.find(
      (fn: any) => fn(inputValue) === false
    );
    // if (isInValid) {
    if ("phone name".includes(fieldName)) {
      setFormData((prevState: any) => ({
        ...prevState,
        [fieldName]: {
          ...prevState[fieldName],
          invalid: isInValid,
        },
      }));
    } else {
      // formData.value = inputValue;
      setFormData((prevState: any) => ({
        ...prevState,
        ["address"]: {
          ...prevState["address"],
          [fieldName]: {
            ...formData,
            invalid: isInValid,
          },
        },
      }));
    }
    // }
    setBlur(true);
  };

  return (
    <div className="detailsContainer">
      <div className="containerLabel">{formData.label} : </div>
      <div>
        <input
          className="formInput"
          style={{
            cursor: "auto",
            border: `${
              !readOnly && formData.editable
                ? blur
                  ? formData.invalid
                    ? "2px solid red"
                    : "2px solid green"
                  : "2px solid green"
                : "none"
            }`,
          }}
          type="text"
          readOnly={readOnly || !formData.editable}
          value={formData.value}
          onBlur={(e) => handleBlur(formData.key, e.target.value)}
          onChange={(e) => handleChange(formData.key, e.target.value)}
        />
      </div>
    </div>
  );
}

export default EditableContainer;
