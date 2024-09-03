import { FC, ReactNode } from "react";
import "./Button.scss";

interface Props {
  content: ReactNode | string;
  width?: string;
  height?: string;
  color?: string;
  type?: string;
  disabled?: boolean;
}

export const Button: FC<Props> = ({
  content,
  color,
  width,
  height,
  disabled,
}) => {
  const style = {
    width: width || "100px",
    height: height || "40px",
    background: color || "#77DD77",
    cursor: disabled ? "not-allowed" : "pointer",
  };

  return (
    <div className="buttonContainer" style={style}>
      {content}
    </div>
  );
};
