import React from "react";
import "./loading.scss";

export default async function loading() {
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
}
