"use client";
import { createPortal } from "react-dom";
import { useState, useLayoutEffect } from "react";

function createWrapperAndAppendToBody(wrapperId: string, style?: string) {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  style ? (wrapperElement.style.cssText = style) : null;
  // const tooltipContent = document.getElementById("tooltipContent");
  // const rect = tooltipContent?.getBoundingClientRect();
  // if (rect) {
  //   console.log("rect", rect);

  //   wrapperElement.style.top = `${rect.height + rect.top}px`;
  // }

  document.body.appendChild(wrapperElement);
  return wrapperElement;
}
function ReactPortal({
  children,
  wrapperId = "react-portal-wrapper",
  style = null,
}: any) {
  const [wrapperElement, setWrapperElement] = useState<any>(null);

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId, style);
    }
    setWrapperElement(element);

    return () => {
      // delete the programatically created element
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  // wrapperElement state will be null on the very first render.
  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
}
export default ReactPortal;
