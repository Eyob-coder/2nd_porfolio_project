import { Component } from "react";
import React, { useState } from "react";
import "./Overlay.css"

const Overlay = () => {
	const [isDesignerHovered, setIsDesignerHovered] = useState(false);
  const [isDeveloperHovered, setIsDeveloperHovered] = useState(false);

  const onDesignerHover = () => {
    setIsDesignerHovered(true);
    setIsDeveloperHovered(false);
  };

  const onDeveloperHover = () => {
    setIsDesignerHovered(false);
    setIsDeveloperHovered(true);
  };

  const onDividerLeave = () => {
    setIsDesignerHovered(false);
    setIsDeveloperHovered(false);
  };

return ( <div className="on-top">
      <Divider
        onDividerLeave={onDividerLeave}
        onDesignerHover={onDesignerHover}
        onDeveloperHover={onDeveloperHover}
        isDesignerHovered={isDesignerHovered}
        isDeveloperHovered={isDeveloperHovered}
      />
	  </div>
)
};

export default Overlay;