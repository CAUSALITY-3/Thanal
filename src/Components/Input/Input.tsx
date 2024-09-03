"use client";
import { FC, useState } from "react";
// import * as stylex from "@stylexjs/stylex";
import DropDown from "./DropDown";
import "./input.scss";

interface Props {
  formData: FormData;
  setFormData: Function;
  lastOne: boolean;
}

interface FormData {
  label: string;
  key: string;
  value: string;
  validation: Function[];
  required: boolean;
  invalid: boolean;
  message: string;
  type: string;
  dropDownValues?: string[];
  disabled?: boolean;
}

export const Input: FC<Props> = ({ formData, setFormData, lastOne }) => {
  const {
    label,
    key,
    value,
    message,
    required,
    invalid,
    validation,
    disabled,
    type,
    dropDownValues,
  } = formData;

  const [blured, setBlured] = useState(false);
  const handleChange = (fieldName: string, inputValue: string) => {
    if ("phone pincode".includes(fieldName)) {
      inputValue = inputValue.replace(/[^\d]/, "");
    }
    setFormData((prevState: any) => ({
      ...prevState,
      [fieldName]: {
        ...prevState[fieldName],
        value: inputValue,
      },
    }));
    invalid || lastOne ? handleValidation(fieldName, inputValue) : null;
  };

  const handleBlur = (fieldName: string, inputValue: string) => {
    handleValidation(fieldName, inputValue);
    setBlured(true);
  };

  const handleValidation = (fieldName: string, inputValue: string) => {
    if (required && !disabled) {
      const isInValid = !!validation.find(
        (fn: any) => fn(inputValue) === false
      );
      if (isInValid) {
        setFormData((prevState: any) => ({
          ...prevState,
          [fieldName]: {
            ...prevState[fieldName],
            invalid: true,
          },
        }));
      } else {
        setFormData((prevState: any) => ({
          ...prevState,
          [fieldName]: {
            ...prevState[fieldName],
            invalid: false,
          },
        }));
      }
    }
  };

  return (
    <div className="formControl">
      <label
        className="formlabel"
        onClick={() => console.log(formData, disabled)}
      >
        {label}
        {required && <span style={{ color: "#F08080" }}>*</span>}
      </label>
      {invalid && blured && <p className="formInvalidMessage">{message}</p>}
      {type === "input" ? (
        <input
          className="formInput"
          style={{ cursor: disabled ? "not-allowed" : "auto" }}
          type="text"
          readOnly={disabled}
          value={value}
          onBlur={(e) => handleBlur(key, e.target.value)}
          onChange={(e) => handleChange(key, e.target.value)}
        />
      ) : (
        <DropDown
          keyName={key}
          value={value}
          handleChange={handleChange}
          handleBlur={handleBlur}
          disabled={!!disabled}
          dropDownValues={dropDownValues || []}
        />
      )}
    </div>
  );
};
