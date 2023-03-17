import React from "react";
import "./Overlay.css";

const Overlay = ({
  onDividerLeave,
  onDesignerHover,
  onDeveloperHover,
  isDesignerHovered,
  isDeveloperHovered,
}) => {
  return (
    <div className="overlay-container">
      <div
        className={`divider-designer ${isDesignerHovered ? "hovered" : ""}`}
        onMouseEnter={onDesignerHover}
      >
        <h2>Designer</h2>
      </div>
      <div
        className={`divider-developer ${isDeveloperHovered ? "hovered" : ""}`}
        onMouseEnter={onDeveloperHover}
      >
        <h2>Developer</h2>
      </div>
    </div>
  );
};

export default Overlay;
