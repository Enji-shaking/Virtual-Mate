import React from "react";
import "../index.css";
import FixedContainer from "../FixedContainer.js";
import Box from "@material-ui/core/Box";

import Picture from "../Picture";
import Album from "./Album";
import FootPrint from "./FootPrint";

export default function ProfilePage(props) {
  const activities = [
    { pic: "logo192.png", date: "2000-08-10" },
    { pic: "logo192.png", date: "2000-08-10" },
    { pic: "logo192.png", date: "2000-08-10" },
  ];

  return (
    <Box>
      <FixedContainer>
        {/* <TopLayer displayType='logo'/> */}
        <Picture radius={"0%"} height={"80px"}>
          <p>My name</p>
        </Picture>
        <Album />
      </FixedContainer>
    </Box>
  );
}
