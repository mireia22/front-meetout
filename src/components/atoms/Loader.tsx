import React from "react";

interface LoaderProps {
  position?: "button" | "page";
}

const Loader: React.FC<LoaderProps> = ({ position }) => {
  return (
    <div className={`loader-container ${position === "page" ? "page" : ""}`}>
      <p>Loading...🍃</p>
    </div>
  );
};

export default Loader;
