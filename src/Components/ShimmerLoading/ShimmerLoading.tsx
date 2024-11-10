import React from "react";
import "./ShimmerLoading.scss";

function ShimmerLoading({ shimmerCount = 3 }: { shimmerCount?: number }) {
  return (
    <div className="loading-shimmer-outer">
      {Array.from({ length: shimmerCount }, (_, index) => (
        <div className="shimmer-card" key={index}>
          <div className="loading-shimmer"></div>
        </div>
      ))}
    </div>
  );
}

export default ShimmerLoading;
