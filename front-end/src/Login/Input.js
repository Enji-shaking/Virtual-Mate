import React from "react";
import FixedContainer from "../FixedContainer";

export default function input(props) {
  const inputSize = {
    width: props.width,
    height: props.height,
    display: "block",
    marginTop: "50px",
    backgroundColor: "#54BEF5",
    color: "white",
    border: "none",
  };
  return (
    <input
      type="text"
      placeholder={props.placeHolder}
      name={props.name}
      style={inputSize}
    />
  );
}
