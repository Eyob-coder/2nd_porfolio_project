import React from "react";
import "./Divider.css"

const Divider = ({ onDividerLeave, onDesignerHover, onDeveloperHover, isDesignerHovered, isDeveloperHovered }) => {
  return (
    <div className="divider" onMouseLeave={onDividerLeave}>
      <div
        className={`divider-text ${isDesignerHovered ? "designer-hovered" : ""}`}
        id="hero-text"
        onMouseEnter={onDesignerHover}
      >
        <h1>Designer</h1>
      </div>
      <div
        className={`divider-text ${isDeveloperHovered ? "developer-hovered" : ""}`}
        id="hero-text"
        onMouseEnter={onDeveloperHover}
      >
        <h1>Developer</h1>
      </div>
    </div>
  );
};

export default Divider;
