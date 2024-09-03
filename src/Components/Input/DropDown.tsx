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

// const styles = stylex.create({
//   mainDiv: {
//     position: "relative",
//     width: "95%",
//   },
//   formInput: {
//     display: "flex",
//     position: "relative",
//     alignItems: "center",
//     fontSize: "12px",
//     padding: "0 10px",
//     width: "95%",
//     height: "35px",
//     marginTop: "8px",
//     background: "rgba(0, 0, 0, .03)",
//     "border-radius": "5px",
//     border: "none",
//     "-webkit-transition-property": "background, box-shadow",
//     "-webkit-transition-duration": "400ms, 400ms ",
//     ":focus": {
//       "box-shadow": "0px 0px 1px 1px grey",
//       background: "rgba(0, 0, 0, 0.1)",
//       outline: "none",
//     },
//   },
//   dropDown: {
//     position: "absolute",
//     marginTop: "5px",
//     "background-color": "#f9f9f9",
//     "box-shadow": "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
//     "z-index": 1,
//     "overflow-y": "auto",
//     animationDuration: ".4s",
//     "::-webkit-scrollbar": {
//       width: "5px",
//     },
//     "::-webkit-scrollbar-thumb": {
//       background: "#888",
//     },
//     "::-webkit-scrollbar-track": {
//       background: "#f1f1f1",
//     },
//     padding: "5px",
//     width: 340,
//   },
//   drop: {
//     "-webkit-transition-property": "background, box-shadow",
//     "-webkit-transition-duration": "400ms, 400ms ",
//     ":hover": {
//       "box-shadow": "0px 0px 1px 1px grey",
//       background: "rgba(0, 0, 0, 0.1)",
//       outline: "none",
//     },
//     cursor: "pointer",
//     padding: "3px",
//     fontSize: "13px",
//   },
//   noResult: {
//     color: "grey",
//   },
// });
export const DropDown: FC<Props> = ({
  value,
  handleChange,
  keyName,
  dropDownValues,
  disabled,
  handleBlur,
}) => {
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
  };

  // const fadeIn = stylex.keyframes({
  //   "0%": { opacity: 0 },
  //   "100%": { opacity: 1 },
  // });

  const clickOrTouchDrop = (key: string, drop: string) => {
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
        {filteredValues.map((drop) => (
          // eslint-disable-next-line react/jsx-key
          <div
            className="drop"
            onClick={() => {
              clickOrTouchDrop(keyName, drop);
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
