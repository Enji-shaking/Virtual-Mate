import React from "react";
import FixedContainer from "../FixedContainer";
import Input from "../Login/Input";

export default function Register(props) {
  const middle = {
    margin: "auto",
  };
  return (
    <FixedContainer>
      <div style={middle}> Register </div>
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
        <Input
          placeHolder="email"
          width="400px"
          height="50px"
          name="email"
        ></Input>
      </form>
    </FixedContainer>
  );
}
