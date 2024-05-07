"use client";

import { FC, useEffect } from "react";
export const ScreenWidhChecker: FC = () => {
  const changeWidth = () => {
    const isMobile = window.innerWidth < 500;
    console.log(window.innerWidth);
    if (isMobile) {
      document.cookie = "isMobile=true";
    } else {
      document.cookie = "isMobile=false";
    }
  };

  useEffect(() => {
    changeWidth();
    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);
  return <></>;
};

export default ScreenWidhChecker;
