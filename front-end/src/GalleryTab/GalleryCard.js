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
    padding: "1.3vw",
    margin: "3.6vw 4.8vw",
    color:'#4F4F4F'
  };

  const imgStyle = {
    width: "21vw",
    height: "21vw",
    position: "center",
   
  };

  let id='2';

  return (
  
    <Link to={`/ActivityCard/${id}`} style={{textDecoration:'none',color:'black'}}>
      <div style={cardStyle}>
        <div className="title" style={{fontSize: '4.3vw'}}>Title</div>
        <img src="../logo192.png" style={imgStyle}></img>
        <div
          className="tags"
          style={{
            width: "90%",
            height: "18%",
            wordWrap: "break-word",
            margin: "0.5vw 0vw 1.8vw 0vw ",
            fontSize: "3vw",
          }}
        >
          #tag1#tag1#tag1#tag1
        </div>
        <Button className={classes.root} href="/ToDoList" style={{maxWidth:'90%'}}>
          <span style={{fontSize:'3vw'}}>{props.canAdd ? "Add To My List" : "View In My List"}</span>
        </Button>
      </div>
    </Link>
  );
}
