"use client"
import { useRouter } from "next/navigation";
import React, { FC, useState, ReactNode, useEffect } from "react";


interface Props {
  children: ReactNode;
  id: string;
}

export const ProductCardWrapper: FC<Props> = ({ children, id }) => {
  const [isClick, setIsClick] = useState(false);
  const router = useRouter()

  enum PrefetchKind {
    AUTO = "auto",
    FULL = "full",
    TEMPORARY = "temporary"
}

  useEffect(() => {
    router.prefetch(`/products/${id}`, {kind:PrefetchKind.AUTO})
    console.log("sasi", id)
  }, [])
  
  const handleClick = () => {
    // console.log(children)
    isClick ? router.push(`/products/${id}`) : null;
  };
  let checkForDrag: number;
  const mouseDownCoords = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    checkForDrag = e?.clientX;
  };
  const clickOrDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const mouseUp = e.clientX;
    if (mouseUp < checkForDrag + 5 && mouseUp > checkForDrag - 5) {
      setIsClick(true);
    } else {
      setIsClick(false);
    }
  };

  return (
    <div
      onMouseDown={(e) => mouseDownCoords(e)}
      onMouseUp={(e) => clickOrDrag(e)}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};
