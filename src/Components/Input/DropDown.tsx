"use client";
import { FC, useRef, useState } from "react";
// import * as stylex from "@stylexjs/stylex";
import "./DropDown.scss";

interface Props {
  keyName: string;
  value: string;
  disabled: boolean;
  handleBlur: Function;
  handleChange: Function;
  dropDownValues: string[];
}

export const DropDown: FC<Props> = ({
  value,
  handleChange,
  keyName,
  dropDownValues,
  disabled,
  handleBlur,
}) => {
  let num: number = 0;
  const [mouseOverDpropDown, setMouseOverDpropDown] = useState(false);
  const [blur, setBlur] = useState(true);
  const [filteredValues, setFilteredValues] = useState(dropDownValues);
  const [searchText, setSearchText] = useState("");
  const parentRef = useRef<any>(null);

  const filterDrop = (searchTerm: string) => {
    setSearchText(searchTerm);
    setTimeout(() => {
      if (searchTerm.length) {
        const filtered = dropDownValues.filter((option) =>
          option.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredValues(filtered);
      } else {
        setFilteredValues(dropDownValues);
      }
    });
  };

  const closeDrop = () => {
    console.log("focus out", blur, num);
    if (num) {
      if (!mouseOverDpropDown) {
        setBlur(true);
        setMouseOverDpropDown(false);
      } else {
        // setTimeout(() => {
        setMouseOverDpropDown(false);
        // });
      }
      setSearchText("");
      // console.log("qwerty", blur, mouseOverDpropDown )
      // setTimeout(() => {
      handleBlur(keyName, value);
      // });
    }
    num++;
  };

  // const fadeIn = stylex.keyframes({
  //   "0%": { opacity: 0 },
  //   "100%": { opacity: 1 },
  // });

  const clickOrTouchDrop = (key: string, drop: string) => {
    console.log("qwerty", key, drop);
    handleChange(key, drop);
    setBlur(true);
    setSearchText("");
  };

  const formInputStyle = {
    cursor: disabled ? "not-allowed" : "auto",
    color: value ? "black" : "grey",
  };

  const dropDownStyle = {
    animation: "fadeIn 1s ease-in-out",
    maxHeight: dropDownValues.length > 10 ? "200px" : "auto",
    width: parentRef.current
      ? `${parentRef.current.offsetWidth - 10}px`
      : "350px",
  };

  const drop = () => {
    return (
      <div
        className="dropDown"
        style={dropDownStyle}
        onMouseOver={() => setMouseOverDpropDown(true)}
        onMouseLeave={() => setMouseOverDpropDown(false)}
      >
        {filteredValues.map((drop, index) => (
          // eslint-disable-next-line react/jsx-key
          <div
            key={index}
            className="drop"
            onClick={() => {
              clickOrTouchDrop(keyName, drop);
              console.log("click");
            }}
            onTouchStart={() => {
              clickOrTouchDrop(keyName, drop);
            }}
          >
            {drop}
          </div>
        ))}
      </div>
    );
  };

  return dropDownValues.length < 10 ? (
    <div>
      <div
        ref={parentRef}
        className="formInput"
        style={formInputStyle}
        tabIndex={0}
        onFocus={() => setBlur(false)}
        onBlur={closeDrop}
      >
        {value || "Select one from list ..."}
      </div>
      {!blur ? drop() : <></>}
    </div>
  ) : (
    <div style={{ width: "100%" }}>
      <input
        ref={parentRef}
        className="formInputDropDown"
        type="text"
        value={searchText || (blur ? value || "Select one from list ..." : "")}
        onFocus={() => {
          setBlur(false);
          setFilteredValues(dropDownValues);
        }}
        onChange={(e) => filterDrop(e.target.value)}
        onBlur={closeDrop}
        placeholder="Search..."
      />
      {!blur ? (
        filteredValues.length ? (
          drop()
        ) : (
          <div className="noResult drop">0 results...</div>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default DropDown;
