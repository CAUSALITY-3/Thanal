"use client";
import { ReactElement, useEffect, useRef, useState } from "react";
import "./Tooltip.scss";
import ReactPortal from "@/app/ReactPortal";
import Template from "@/app/template";

function Tooltip({
  children,
  content,
  delay = 500,
}: {
  children: ReactElement;
  content: ReactElement | string;
  delay?: number;
}) {
  const childDivRef = useRef<any>(null);
  const [mouseOn, setMouseOn] = useState(false);
  // const [arrowStyle, setArrowStyle] = useState<{
  //   top?: number;
  //   bottom?: number;
  //   left?: number | string;
  //   right?: number | string;
  //   transform?: string;
  // }>({
  //   top: 0,
  //   left: 0,
  // });
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [positionStyle, setPositionStyle] = useState("");

  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      setCoords({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  useEffect(() => {
    if (window.innerWidth < 768) return setShowTooltip(false);
    if (childDivRef.current) {
      const rect = childDivRef.current.getBoundingClientRect();
      const { top, left, width, height, right, bottom } = rect;

      if (window.innerWidth - right > 200) {
        setPositionStyle(
          `top: ${window.scrollY + coords.y}px; left: ${coords.x + 15}px;  `
        );
      } else {
        setPositionStyle(
          `top: ${window.scrollY + coords.y}px; left: ${
            coords.x
          }px; transform: translateX(-100%); `
        );
      }

      // if (top <= 200) {
      //   if (left > 200 && window.innerWidth - right > 200) {
      //     console.log("a");
      //     setPositionStyle(
      //       `top: ${bottom + window.scrollY + 10}px; left: ${
      //         left + width / 2
      //       }px; transform: translateX(-50%); `
      //     );
      //     setArrowStyle({
      //       top: -10,
      //       left: "50%",
      //       right: "50%",
      //       transform: "rotate(180deg)",
      //     });
      //   } else if (left <= 100) {
      //     console.log("b");
      //     setPositionStyle(
      //       `top: ${bottom + window.scrollY + 10}px; left: ${
      //         left < 0 ? right - 14 : left
      //       }px; `
      //     );
      //     setArrowStyle({top: -10,left: 3, transform: "rotate(180deg)"});
      //   } else {
      //     console.log("c");
      //     setPositionStyle(
      //       `top: ${bottom + window.scrollY + 10}px; right: ${
      //         window.innerWidth - right < 0
      //           ? window.innerWidth - left - 14
      //           : window.innerWidth - right
      //       }px; `
      //     );
      //     setArrowStyle({ top: -10, right: 3, transform: "rotate(180deg)" });
      //   }
      // } else {
      //   console.log("d");
      //   if (left > 200 && window.innerWidth - right > 200) {
      //     console.log("e");
      //     setPositionStyle(
      //       `bottom: ${
      //         window.innerHeight - top - window.scrollY + 10
      //       }px; left: ${left + width / 2}px; transform: translateX(-50%);`
      //     );
      //     setArrowStyle({ bottom: -6, left: "50%", right: "50%" });
      //   } else if (left <= 100) {
      //     console.log("f");
      //     setPositionStyle(
      //       `bottom: ${
      //         window.innerHeight - top - window.scrollY + 10
      //       }px; left: ${left < 0 ? right - 14 : left}px; `
      //     );
      //     setArrowStyle({ bottom: -6, left: 3 });
      //   } else {
      //     console.log("g");
      //     setPositionStyle(
      //       `bottom: ${
      //         window.innerHeight - top - window.scrollY + 10
      //       }px;  right: ${
      //         window.innerWidth - right < 0
      //           ? window.innerWidth - left - 14
      //           : window.innerWidth - right
      //       }px; `
      //     );
      //     setArrowStyle({ bottom: -6, right: 3 });
      //   }
      // }

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
      });
    }
    if (mouseOn) {
      // setTimeout(() => {
      setShowTooltip(true);
      // }, delay);
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

  const handleMouseOver = () => {
    // setTimeout(() => {
    setMouseOn(true);
    // }, delay);
  };

  const handleMouseOut = () => {
    // setTimeout(() => {
    setMouseOn(false);
    // },delay)
  };

  return (
    <div
      className="tooltip"
      ref={childDivRef}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {showTooltip && (
        <ReactPortal wrapperId="tooltip-wrapper" style={positionStyle}>
          <Template>
            <div id="tooltipContent">{content}</div>
            {/* <div className="mini-modal-arrow" style={arrowStyle} /> */}
          </Template>
        </ReactPortal>
      )}
      <div>{children}</div>
    </div>
  );
}

export default Tooltip;
