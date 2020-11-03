import React from "react";
import FixedContainer from "../FixedContainer.js";
import Box from "@material-ui/core/Box";

import Picture from "../Picture";
import Album from "./peoples";

export default function ProfilePage(props) {
  const middle = {
    margin: "auto",
    width: "100px",
    marginTop: "50px",
    marginBottom: "50px",
  };
  return (
    <Box>
      <FixedContainer>
        <p style={middle}>Card Name</p>
        <Picture radius={"50%"} height={"80px"}></Picture>
        <Album />
      </FixedContainer>
    </Box>
  );
}
