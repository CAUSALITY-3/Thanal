"use client";
import { useEffect } from "react";
import "./Modal.scss";
import ReactPortal from "@/app/ReactPortal";
import Template from "@/app/template";
import Tooltip from "../Tooltip/Tooltip";

function Modal({ children, isOpen, handleClose, size = "m" }: any) {
  useEffect(() => {
    const closeOnEscapeKey = (e: any) =>
      e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  useEffect(() => {
    // if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ReactPortal style={"position: absolute; z-index: 9999;"}>
      <Template>
        <div className="modal">
          <div className={`modal-content modal-${size}`}>
            <div onClick={handleClose} className="close-btn">
              <Tooltip content={"Close"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  id="close"
                >
                  <path
                    fill="#000000"
                    d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"
                  ></path>
                </svg>
              </Tooltip>
            </div>
            {children}
          </div>
        </div>
      </Template>
    </ReactPortal>
  );
}

export default Modal;
