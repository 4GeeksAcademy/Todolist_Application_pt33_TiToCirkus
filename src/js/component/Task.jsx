import React, { useState } from "react";

const Task = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="d-flex justify-content-between border align-content center bg-light  fs-2 "
      style={{
        padding: "0px 100px 0px 150px",
      }}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <p>{props.task.label}</p>
      {isHovered && (
        <button
          style={{ border: "none", background: "none" }}
          className="x"
          onClick={() => {
            props.onRemove();
          }}
        >
          X
        </button>
      )}
    </div>
  );
};

export default Task;
