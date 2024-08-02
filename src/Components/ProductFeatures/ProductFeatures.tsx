import { FC } from "react";
// import * as stylex from "@stylexjs/stylex";
import "./ProductFeatures.scss";

interface Feature {
  type: string;
  value: string;
}
interface Props {
  features: Feature[];
}

// const styles = stylex.create({
//   featureContainer: {
//     width: "100%",
//     margin: "10px 0",
//   },
//   feature: {
//     margin: "7px 0",
//   },
//   colorContainer: {
//     display: "flex",
//   },
//   colorValue: {
//     margin: "0 20px 0 0",
//   },
//   colorBorderCircle: {
//     width: "18px",
//     height: "18px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: "9px",
//     border: "1px solid",
//   },
//   color: {
//     width: "16px",
//     height: "16px",
//     borderRadius: "8px",
//   },
// });

export const ProductFeatures: FC<Props> = ({ features }) => {
  return (
    <div className="featureContainer">
      {features.map((feature) => (
        <>
          {feature.type === "color" ? (
            <div className="colorContainer">
              <div className="feature colorValue">
                {feature.type}: {feature.value}
              </div>
              <div className="colorBorderCircle">
                <div className="color" style={{ background: "red" }}></div>
              </div>
            </div>
          ) : (
            <div className="feature">
              {feature.type}: {feature.value}
            </div>
          )}
        </>
      ))}
    </div>
  );
};
