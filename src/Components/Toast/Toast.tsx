export default function Toast() {
  const id = `toast-${new Date().getTime()}`;
  let container = document.getElementById("toast-wrapper");
  if (!container) {
    const wrapperElement = document.createElement("div");
    document.body.appendChild(wrapperElement);
    wrapperElement.setAttribute("id", "toast-wrapper");
    document.body.appendChild(wrapperElement);

    container = document.getElementById("toast-wrapper");
  }
  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        const childElement: any = document.getElementById(id);
        console.log("Child nodes have been added or removed.", childElement);

        if (childElement) {
          setTimeout(() => {
            container?.removeChild(childElement);
          }, 1000);

          observer.disconnect();
        }
      }
    }
  });

  const targetNode: any = document.getElementById("toast-wrapper");
  const config = { childList: true };

  observer.observe(targetNode, config);
  const childElement = document.createElement("div");
  childElement.className = "toast";
  childElement.innerHTML = "This is the content!!!";
  // childElement.style.cssText =
  //   "width: 200px; height: 200px; top: 100px; left: 100px; background-color: red;";
  childElement.setAttribute("id", id);
  container?.appendChild(childElement);
  return container;
}
