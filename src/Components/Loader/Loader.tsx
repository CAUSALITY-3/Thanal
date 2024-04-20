import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default async function Loader({path}:any) {
    const [samepath, setSamePath] = useState(false)
    const [portal, setPortal] = useState(<></>)
  const pathname = usePathname();
  useEffect(() => {
    if(path === pathname) {
      setPortal(<></>)
    } else  {
      setSamePath(true)
        const portalDiv = document.getElementById('portal')!;
        setPortal(createPortal(
            <div style={{ ...loaderStyle, position: "fixed" }}>
            <div style={{background:"white", height:"200px", width:"300px"}}>Loading</div>
          </div>,
            portalDiv
          ))
        
    }
  }, [pathname]);

  const loaderStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, .5)",
  };

  return portal;
}
