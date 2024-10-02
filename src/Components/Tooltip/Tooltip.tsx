"use client";
import { ReactElement, useEffect, useRef, useState } from "react";
import "./Tooltip.scss";
import ReactPortal from "@/app/ReactPortal";
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
    if (window.innerWidth < 768) return setShowTooltip(false);
    if (childDivRef.current) {
      const rect = childDivRef.current.getBoundingClientRect();
      const { top, left, width, height, right, bottom } = rect;
      if (top <= 200) {
        if (left > 200 && window.innerWidth - right > 200) {
          console.log("a");
          setPositionStyle(
            `top: ${bottom + window.scrollY + 10}px; left: ${
              left + width / 2
            }px; transform: translateX(-50%); `
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
            `top: ${bottom + window.scrollY + 10}px; left: ${
              left < 0 ? right - 14 : left
            }px; `
          );
          setArrowStyle({
            top: -10,
            left: 3,
            transform: "rotate(180deg)",
          });
        } else {
          console.log("c");
          setPositionStyle(
            `top: ${bottom + window.scrollY + 10}px; right: ${
              window.innerWidth - right < 0
                ? window.innerWidth - left - 14
                : window.innerWidth - right
            }px; `
          );
          setArrowStyle({ top: -10, right: 3, transform: "rotate(180deg)" });
        }
      } else {
        console.log("d");
        if (left > 200 && window.innerWidth - right > 200) {
          console.log("e");
          setPositionStyle(
            `bottom: ${
              window.innerHeight - top - window.scrollY + 10
            }px; left: ${left + width / 2}px; transform: translateX(-50%);`
          );
          setArrowStyle({ bottom: -6, left: "50%", right: "50%" });
        } else if (left <= 100) {
          console.log("f");
          setPositionStyle(
            `bottom: ${
              window.innerHeight - top - window.scrollY + 10
            }px; left: ${left < 0 ? right - 14 : left}px; `
          );
          setArrowStyle({ bottom: -6, left: 3 });
        } else {
          console.log("g");
          setPositionStyle(
            `bottom: ${
              window.innerHeight - top - window.scrollY + 10
            }px;  right: ${
              window.innerWidth - right < 0
                ? window.innerWidth - left - 14
                : window.innerWidth - right
            }px; `
          );
          setArrowStyle({ bottom: -6, right: 3 });
        }
      }

      console.log("Item detail", {
        scrollY: window.scrollY,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        top,
        left,
        width,
        height,
        right,
        bottom,
        positionStyle,
        arrowStyle,
      });
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
