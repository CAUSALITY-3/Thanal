"use client";
import { useEffect, useRef, useState } from "react";
import "./Tooltip.scss";
import ReactPortal from "@/app/ReactPortal";

function Tooltip({ children }: any) {
  const childDivRef = useRef<any>(null);
  const [mouseOn, setMouseOn] = useState(false);
  // const [topVal, setTopVal] = useState<number>(0);
  // const [leftVal, setLeftVal] = useState<number>(0);
  const [arrowStyle, setArrowStyle] = useState<{
    top?: number;
    bottom?: number;
    left?: number | string;
    right?: number | string;
  }>({
    top: 0,
    left: 0,
  });
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [positionStyle, setPositionStyle] = useState("");
  useEffect(() => {
    if (childDivRef.current) {
      const rect = childDivRef.current.getBoundingClientRect();
      const { top, left, width, height, right, bottom } = rect;
      if (top <= 200) {
        if (left > 100 && right > 100) {
          console.log("a");
          setPositionStyle(
            `position: absolute; top: ${
              bottom + window.scrollY + 8
            }px; left: ${left}px; `
          );
          setArrowStyle({ top: -6, left: "50%", right: "50%" });
        } else if (left <= 100) {
          console.log("b");
          setPositionStyle(
            `position: absolute; top: ${
              bottom + window.scrollY + 8
            }px; left: ${left}px; `
          );
          setArrowStyle({ top: -6, left: width / 2 });
        } else {
          console.log("c");
          setPositionStyle(
            `position: absolute; top: ${
              bottom + window.scrollY + 8
            }px; right: ${right}px; `
          );
          setArrowStyle({ top: -6, right: width / 2 });
        }

        // console.log("top", top);
        // setTopVal(top + height + window.scrollY);
        // setLeftVal(left + Math.abs(left - right) / 2 - 60);
        // console.log("topVal", topVal);
      } else {
        console.log("d");
        // setTopVal(window.innerHeight - top);
        // setPositionStyle(
        //   `position: absolute; bottom: ${window.innerHeight - top}px; left: ${
        //     left + Math.abs(left - right) / 2 - 60
        //   }px; `
        // );
        if (left > 100 && right > 100) {
          console.log("e");
          setPositionStyle(
            `position: absolute; bottom: ${
              window.innerHeight - top + 8
            }px; left: ${left}px;`
          );
          setArrowStyle({ bottom: -6, left: "50%", right: "50%" });
        } else if (left <= 100) {
          console.log("f");
          setPositionStyle(
            `position: absolute; bottom: ${
              window.innerHeight - top + 8
            }px; left: ${left}px; `
          );
          setArrowStyle({ bottom: -6, left: width / 2 });
        } else {
          console.log("g");
          setPositionStyle(
            `position: absolute; bottom: ${
              window.innerHeight - top + 8
            }px; right: ${right}px; `
          );
          setArrowStyle({ bottom: -6, right: width / 2 });
        }
        // setLeftVal(left);
      }

      console.log(
        "Item detail",
        positionStyle,
        window.scrollY,
        window.innerHeight,
        top,
        left,
        width,
        height,
        right,
        bottom
      );
    }
    if (mouseOn) {
      setShowTooltip(true);
    } else {
      setShowTooltip(false);
    }
  }, [childDivRef, mouseOn]);

  return (
    <div className="tooltip" style={{ backgroundColor: "red" }}>
      {showTooltip && (
        <ReactPortal wrapperId="tooltip-wrapper" style={positionStyle}>
          <div id="tooltipContent">Hello This is Tooltip content.</div>
          <div className="mini-modal-arrow" style={arrowStyle} />
        </ReactPortal>
      )}
      <div
        ref={childDivRef}
        onMouseEnter={() => {
          setMouseOn(true);
          console.log("Hi");
        }}
        onMouseOut={() => {
          setMouseOn(false);
          console.log("hello");
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Tooltip;
