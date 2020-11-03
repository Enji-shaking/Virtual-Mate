import React from "react";
import FixedContainer from "../FixedContainer";
import Input from "./Input.js";

export default function Login(props) {
  const middle = {
    margin: "auto",
  };
  return (
    <FixedContainer style={middle}>
      <div> Log in </div>
      <form>
        <Input
          placeHolder="username"
          width="400px"
          height="50px"
          name="username"
        ></Input>

        <Input
          placeHolder="password"
          width="400px"
          height="50px"
          name="password"
        ></Input>
      </form>
    </FixedContainer>
  );
}
