import { FC } from "react";
import "./ProductFeatures.scss";

interface Feature {
  type: string;
  value: string;
}
interface Props {
  features: Feature[];
}

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
