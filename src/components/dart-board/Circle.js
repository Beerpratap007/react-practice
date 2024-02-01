import React from "react";

const Circle = ({ depth, isChild }) => {
  if (depth === 0) {
    return null;
  }
  return (
    <div className={isChild ? "child" : "parent"}>
      <Circle isChild={true} depth={depth - 1} />
    </div>
  );
};

export default Circle;
