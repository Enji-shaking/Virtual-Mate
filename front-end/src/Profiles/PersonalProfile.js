import React from "react";
import "../index.css";
import FixedContainer from "../FixedContainer.js";
import Box from "@material-ui/core/Box";
import Avatar from '@material-ui/core/Avatar';
import Album from "./Album";
import FootPrint from "./FootPrint";

export default function ProfilePage(props) {
  const activities = [
    { pic: "logo192.png", date: "2000-08-10", id:'1'},
    { pic: "logo192.png", date: "2000-08-10", id:'2'},
    { pic: "logo192.png", date: "2000-08-10",id:'3' },
  ];

  let img='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSeKZbcVtvtJKKvj5jnN11zgX82gll4TsnmFg&usqp=CAU';
  return (

      <FixedContainer>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
       <Avatar src={img} style={{width:'17vw',height:'17vw',margin:'1.5vh'}}></Avatar>
          Your page
        <div style={{width:'85vw',marginTop:'5vh'}}>
        Your Album
        <Album />
        </div>
        <FootPrint activities={activities} />
        </div>
      </FixedContainer>
  );
}
