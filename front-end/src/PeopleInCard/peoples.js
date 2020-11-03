import React from "react";
import { Box, Setting } from "@material-ui/core";
import Picture from "../Picture";
import queryString from "query-string";

class Album extends React.Component {
  render() {
    const ImgBox = {
      display: "flex",
      flexWrap: "wrap",
      width: "80%",
      margin: "auto",
    };
    const ImgItem = {
      width: "30%",
      margin: "5px",
    };
    const middle = {
      margin: "auto",
      width: "200px",
      marginTop: "50px",
      marginBottom: "50px",
    };
    let blur = "";
    let url = window.location.search;
    let params = queryString.parse(url);
    if (params.status == "1") {
      blur = "blur";
    }
    return (
      <Box>
        <div style={middle}>Completed by # people {blur}</div>
        <Box style={ImgBox}>
          <Box style={ImgItem}>
            <Picture />
          </Box>
          <Box style={ImgItem}>
            <Picture />
          </Box>
          <Box style={ImgItem}>
            <Picture />
          </Box>
          <Box style={ImgItem}>
            <Picture />
          </Box>
          <Box style={ImgItem}>
            <Picture />
          </Box>
          <Box style={ImgItem}>
            <Picture />
          </Box>
          <Box style={ImgItem}>
            <Picture />
          </Box>
          <Box style={ImgItem}>
            <Picture />
          </Box>
          <Box style={ImgItem}>
            <Picture />
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Album;
