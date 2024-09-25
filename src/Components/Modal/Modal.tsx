"use client";
import { useEffect } from "react";
import "./Modal.scss";
import ReactPortal from "@/app/ReactPortal";
import Template from "@/app/template";

function Modal({ children, isOpen, handleClose }: any) {
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
    <ReactPortal>
      <Template>
        <div className="modal">
          <button onClick={handleClose} className="close-btn">
            Close
          </button>
          <div className="modal-content">{children}</div>
        </div>
      </Template>
    </ReactPortal>
  );
}

export default Modal;
