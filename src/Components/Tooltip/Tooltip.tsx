"use client";
import { ReactElement, useEffect, useRef, useState } from "react";
import "./Tooltip.scss";
import ReactPortal from "@/app/ReactPortal";
import { m } from "framer-motion";
import Template from "@/app/template";

function Tooltip({
  children,
  content,
}: {
  children: ReactElement;
  content: ReactElement | string;
}) {
  const childDivRef = useRef<any>(null);
  const [mouseOn, setMouseOn] = useState(false);
  const [arrowStyle, setArrowStyle] = useState<{
    top?: number;
    bottom?: number;
    left?: number | string;
    right?: number | string;
    transform?: string;
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
        if (left > 200 && window.innerWidth - right > 200) {
          console.log("a");
          setPositionStyle(
            `position: absolute; top: ${
              bottom + window.scrollY + 10
            }px; left: ${left + width / 2}px; transform: translateX(-50%); `
          );
          setArrowStyle({
            top: -10,
            left: "50%",
            right: "50%",
            transform: "rotate(180deg)",
          });
        } else if (left <= 100) {
          console.log("b");
          setPositionStyle(
            `position: absolute; top: ${
              bottom + window.scrollY + 10
            }px; left: ${left}px; `
          );
          setArrowStyle({ top: -10, left: 3, transform: "rotate(180deg)" });
        } else {
          console.log("c");
          setPositionStyle(
            `position: absolute; top: ${
              bottom + window.scrollY + 10
            }px; right: ${window.innerWidth - right}px; `
          );
          setArrowStyle({ top: -10, right: 3, transform: "rotate(180deg)" });
        }
      } else {
        console.log("d");
        if (left > 200 && window.innerWidth - right > 200) {
          console.log("e");
          setPositionStyle(
            `position: absolute; bottom: ${
              window.innerHeight - top + 10
            }px; left: ${left + width / 2}px; transform: translateX(-50%);`
          );
          setArrowStyle({ bottom: -6, left: "50%", right: "50%" });
        } else if (left <= 100) {
          console.log("f");
          setPositionStyle(
            `position: absolute; bottom: ${
              window.innerHeight - top + 10
            }px; left: ${left}px; `
          );
          setArrowStyle({ bottom: -6, left: 3 });
        } else {
          console.log("g");
          setPositionStyle(
            `position: absolute; bottom: ${
              window.innerHeight - top + 10
            }px;  right: ${window.innerWidth - right}px; `
          );
          setArrowStyle({ bottom: -6, right: 3 });
        }
      }

      console.log(
        "Item detail",
        window.scrollY,
        window.innerWidth,
        window.innerHeight,
        { top, left, width, height, right, bottom }
      );
    }
    if (mouseOn) {
      setShowTooltip(true);
    } else {
      setShowTooltip(false);
    }
    if (mouseOn) {
      window.addEventListener("scroll", () => setShowTooltip(false));
    }
    return () => {
      window.removeEventListener("scroll", () => setShowTooltip(false));
    };
  }, [childDivRef, mouseOn]);

  return (
    <div className="tooltip">
      {showTooltip && (
        <ReactPortal wrapperId="tooltip-wrapper" style={positionStyle}>
          <Template>
            <div id="tooltipContent">{content}</div>
            <div className="mini-modal-arrow" style={arrowStyle} />
          </Template>
        </ReactPortal>
      )}
      <div
        ref={childDivRef}
        onMouseOver={() => {
          setMouseOn(true);
          console.log("Hi");
        }}
        onMouseOut={() => {
          setMouseOn(false);
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Tooltip;
