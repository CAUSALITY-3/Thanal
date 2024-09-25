"use client";
import { useEffect, useRef } from "react";
import "./Tooltip.scss";
import ReactPortal from "@/app/ReactPortal";

function Tooltip({ children }: any) {
  const childDivRef = useRef<any>(null);

  useEffect(() => {
    if (childDivRef.current) {
      const rect = childDivRef.current.getBoundingClientRect();
      console.log(rect);
    }
  }, []);

  //   useEffect(() => {
  //     const closeOnEscapeKey = (e: any) =>
  //       e.key === "Escape" ? handleClose() : null;
  //     document.body.addEventListener("keydown", closeOnEscapeKey);
  //     return () => {
  //       document.body.removeEventListener("keydown", closeOnEscapeKey);
  //     };
  //   }, [handleClose]);

  //   useEffect(() => {
  //     document.body.style.overflow = "hidden";
  //     return () => {
  //       document.body.style.overflow = "unset";
  //     };
  //   }, []);

  //   useEffect(() => {
  //     // if (!isOpen) return;
  //     document.body.style.overflow = "hidden";
  //     return () => {
  //       document.body.style.overflow = "unset";
  //     };
  //   }, [isOpen]);

  //   if (!isOpen) return null;

  return (
    <div className="tooltip">
      <ReactPortal>
        <div className="tooltipContent">Hello This is Tiiltip content.</div>
      </ReactPortal>
      <div ref={childDivRef}>{children}</div>
    </div>
    // <ReactPortal>
    //   <Template>
    //     <div className="modal" >
    //       <button onClick={handleClose} className="close-btn">
    //         Close
    //       </button>

    //     </div>
    //   </Template>
    // </ReactPortal>
  );
}

export default Tooltip;
