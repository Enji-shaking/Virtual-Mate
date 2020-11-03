import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    background: "#54BEF5",
    width: "28vw",
    fontSize: "0.75em",
    color: "white",
    padding: "3px",
  },
});

export default function GalleryCard(props) {
  const classes = useStyles();
  const cardStyle = {
    border: "0.5vw dashed #54BEF5",
    borderRadius: "12%",
    width: "35vw",
    height: "50vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "5px",
    margin: "15px 20px",
  };

  const imgStyle = {
    width: "15vw",
    height: "15vw",
    position: "center",
    margin: "5px",
  };
  return (
    <Link to="/PlInCard">
      <div style={cardStyle}>
        <div className="title">Title</div>
        <img src="../logo192.png" style={imgStyle}></img>
        <div
          className="tags"
          style={{
            width: "90%",
            height: "29%",
            wordWrap: "break-word",
            margin: "5px",
            fontSize: "0.8em",
          }}
        >
          #tag1#tag1#tag1#tag1
        </div>
        <Button className={classes.root} href="/ToDoList">
          {props.canAdd ? "Add To My List" : "View In My List"}
        </Button>
      </div>
    </Link>
  );
}
