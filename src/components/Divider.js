import React from "react";
import "./Divider.css";

const Divider = ({
  onDividerLeave,
  onDesignerHover,
  onDeveloperHover,
  isDesignerHovered,
  isDeveloperHovered,
}) => {
  return (
    <div
      className="divider-container"
      onMouseLeave={onDividerLeave}
    >
      <div
        className={`divider-designer ${isDesignerHovered ? "hovered" : ""}`}
        onMouseEnter={onDesignerHover}
        style={{
          transform: `skew(-45deg) translateX(${isDesignerHovered ? "-10vw" : "0"})`
        }}
      >
        <h2>Designer</h2>
      </div>
      <div
        className={`divider-developer ${isDeveloperHovered ? "hovered" : ""}`}
        onMouseEnter={onDeveloperHover}
        style={{
          transform: `skew(-45deg) translateX(${isDeveloperHovered ? "10vw" : "0"})`
        }}
      >
        <h2>Developer</h2>
      </div>
    </div>
  );
};

export default Divider;





// import React from "react";
// import "./Divider.css";

// const Divider = ({
//   onDividerLeave,
//   onDesignerHover,
//   onDeveloperHover,
//   isDesignerHovered,
//   isDeveloperHovered,
// }) => {
//   return (
//     <div
//       className="divider-container"
//       onMouseLeave={onDividerLeave}
//     >
//       <div
//         className={`divider-designer ${isDesignerHovered ? "hovered" : ""}`}
//         onMouseEnter={onDesignerHover}
//       >
//         <h2>Designer</h2>
//       </div>
//       <div
//         className={`divider-developer ${isDeveloperHovered ? "hovered" : ""}`}
//         onMouseEnter={onDeveloperHover}
//       >
//         <h2>Developer</h2>
//       </div>
//     </div>
//   );
// };

// export default Divider;