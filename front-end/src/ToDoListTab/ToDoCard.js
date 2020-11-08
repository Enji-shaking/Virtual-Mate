import React from "react";
import { IconButton } from "@material-ui/core";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import { Link } from "react-router-dom";

export default function ToDoCard(props) {
  const cardStyle = {
    border: "0.5vw dashed #54BEF5",
    borderRadius: "12%",
    width: "35vw",
    height: "50vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1.2vw",
    margin: "3.6vw 4.8vw",
  };

  const imgStyle = {
    width: "15vw",
    height: "15vw",
    position: "center",
    margin: "1.2vw",
  };
  return (
    <Link to="/PlInCard?status=1" style={{textDecoration:'none',color:'black'}}>
      <div style={cardStyle}>
        <div className="title" style={{fontSize: '4.3vw'}}>Title</div>
        <img src="../logo192.png" style={imgStyle}></img>
        <div
          className="tags"
          style={{
            width: "90%",
            height: "29%",
            wordWrap: "break-word",
            margin: "1.2vw",
            fontSize: "3vw",
          }}
        >
          #tag1#tag1#tag1#tag1
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "90%",
            margin: "auto",
          }}
        >
          <IconButton style={{ padding: "0" }}>
            <DeleteSweepIcon
              style={{ color: "#DB5353", fontSize: "1.4em" }}
            ></DeleteSweepIcon>
          </IconButton>
          <IconButton style={{ padding: "0" }}>
            <AssignmentTurnedInOutlinedIcon
              style={{ color: "54BEF5", fontSize: "1.4em" }}
            />
          </IconButton>
        </div>
      </div>
    </Link>
  );
}
