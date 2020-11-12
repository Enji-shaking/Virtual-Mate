import { useState } from "react";
import React from "react";

export default function Input(props) {
  const inputSize = {
    display: "block",
    marginTop: "50px",
    backgroundColor: "#54BEF5",
    color: "white",
    width:'60vw',
    height:"5.5vh",
    textAlign: 'center',
    border:'none'
  };

  return (
    <input
      type="text"
      defaultValue={props.placeholder}
      name={props.name}
      style={inputSize}
      id={props.name}
      onClick={()=>{if(document.getElementById(props.name).value===props.placeholder){
        document.getElementById(props.name).value='';
      }}}
    />
  );
}
