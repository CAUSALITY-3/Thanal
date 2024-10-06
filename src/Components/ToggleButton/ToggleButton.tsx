import React, { useEffect, useState } from "react";
import "./ToggleButton.scss"; // Assuming you have the SCSS in a separate file

const ToggleButton = ({ initialToggle, handler }: any) => {
  const [isToggled, setIsToggled] = useState(initialToggle);

  useEffect(() => {
    console.log("setIsToggled", { initialToggle });
    setIsToggled(initialToggle);
  }, [initialToggle]);
  const handleToggle = () => {
    handler(!isToggled);
    setIsToggled(!isToggled);
  };

  return (
    <div className="toggle-container">
      <label className="toggle-switch">
        <input type="checkbox" checked={isToggled} onChange={handleToggle} />
        <span className="toggle-slider"></span>
      </label>
    </div>
  );
};

export default ToggleButton;
