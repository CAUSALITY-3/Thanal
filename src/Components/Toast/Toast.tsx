export default function Toast(
  type?: "success" | "failure" | "info",
  message?: string
) {
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
            childElement.classList.add("fade-out");
          }, 3000);
          setTimeout(() => {
            childElement.classList.add("fade-out");
            container?.removeChild(childElement);
          }, 4000);

          observer.disconnect();
        }
      }
    }
  });

  const targetNode: any = document.getElementById("toast-wrapper");
  targetNode.style.cssText = "z-index: 99999; ";
  const config = { childList: true };

  observer.observe(targetNode, config);
  const childElement = document.createElement("div");
  childElement.className = "toast";
  childElement.innerHTML =
    type === "success"
      ? "✅  " + (message || "Success")
      : type === "failure"
      ? "❌  " + (message || "Oops Something went wrong...")
      : "ⓘ  " + message || "Thanal is working on it!";

  childElement.setAttribute("id", id);
  container?.appendChild(childElement);
  return container;
}
