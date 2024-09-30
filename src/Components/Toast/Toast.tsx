export default function Toast() {
  //   const wrapperElement = document.createElement("div");
  //   wrapperElement.setAttribute("id", "toast-wrapper");
  //   document.body.appendChild(wrapperElement);
  const id = `toast-${new Date().getTime()}`;

  //   useEffect(() => {
  //     const container = document.getElementById("toast-wrapper");
  //     const childElement: any = document.getElementById(id);
  //     setTimeout(() => {
  //       container?.removeChild(childElement);
  //     }, 2000);
  //   }, []);

  //   const [show, setShow] = useState(false);

  //   const root = createRoot(container);
  //   return <ToastLogic id={id} />;

  //   const content = (
  //     <ReactPortal
  //       wrapperId="toast-wrapper"
  // style={{
  //   position: "absolute",
  //   top: 100,
  //   left: 100,
  //   width: "200px",
  //   height: "200px",
  //   backgroundColor: "red",
  // }}
  //     >
  //       <div className="toast">This is the content!!!</div>
  //     </ReactPortal>
  //   );

  //   return <ReactPortal id="toast-wrapper"></ReactPortal>;

  let container = document.getElementById("toast-wrapper");
  if (!container) {
    const wrapperElement = document.createElement("div");
    document.body.appendChild(wrapperElement);
    wrapperElement.setAttribute("id", "toast-wrapper");

    wrapperElement.style.cssText =
      "position: absolute;  top: 10px; left: 50%; right: 50%; height: auto; width: auto; z-index: 9999; display: flex justify-content: center align-items: center flex-direction: column";
    document.body.appendChild(wrapperElement);

    container = document.getElementById("toast-wrapper");
  }
  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        console.log("Child nodes have been added or removed.");
        const childElement: any = document.getElementById(id);
        if (childElement) {
          setTimeout(() => {
            container?.removeChild(childElement);
          }, 5000);
        }
      } else if (mutation.type === "attributes") {
        console.log("Attributes have been changed.");
      }
    }
  });

  const targetNode: any = document.getElementById("toast-wrapper");
  const config = { attributes: true, childList: true, subtree: true };

  observer.observe(targetNode, config);
  const childElement = document.createElement("div");
  childElement.className = "toast";
  childElement.innerHTML = "This is the content!!!";
  childElement.style.cssText =
    "width: 200px; height: 200px; top: 100px; left: 100px; background-color: red;";
  childElement.setAttribute("id", id);
  container?.appendChild(childElement);
  return container;
}
