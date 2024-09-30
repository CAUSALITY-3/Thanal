import React from "react";

function ToastLogic({ id }: any): any {
  const container = document.getElementById("toast-wrapper");
  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        console.log("Child nodes have been added or removed.");
      } else if (mutation.type === "attributes") {
        console.log("Attributes have been changed.");
      }
    }
  });

  const targetNode: any = document.getElementById("toast-wrapper");
  const config = { attributes: true, childList: true, subtree: true };

  observer.observe(targetNode, config);
  const childElement = document.createElement("div");
  childElement.style.cssText =
    "position: absolute; width: 200px; height: 200px; top: 100px; left: 100px; background-color: red;";
  childElement.setAttribute("id", id);
  container?.appendChild(childElement);
  return container;
}

export default ToastLogic;
