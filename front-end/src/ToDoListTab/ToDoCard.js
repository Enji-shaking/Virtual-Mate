import React from 'react';
import {IconButton} from '@material-ui/core';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
export default function ToDoCard(props){
  
  const cardStyle={
    border:'0.5vw dashed #54BEF5',
    borderRadius :'12%',
    width:'35vw',
    height:'50vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding:"5px",
    margin:'15px 20px',
  };
  
 const imgStyle={
   width:"15vw",
   height:"15vw",
   position: "center",
   margin:'5px',

 }
  return(
    <div style={cardStyle}>
        <div className='title'>Title</div>
        <img src='../logo192.png' style={imgStyle}></img>
        <div className='tags' style={{width:'90%',height:'29%',wordWrap:"break-word",margin:'5px',fontSize:'0.8em'}}>#tag1#tag1#tag1#tag1</div>
        <div style={{display: "flex",justifyContent:'space-between',width:'90%',margin:"auto"}}>
        <IconButton style={{padding:'0'}}><DeleteSweepIcon style={{color:'#DB5353',fontSize:'1.4em'}}></DeleteSweepIcon></IconButton>
        <IconButton style={{padding:'0'}}><AssignmentTurnedInOutlinedIcon style={{color:'54BEF5',fontSize:'1.4em'}}/></IconButton>
      </div>
      </div>
  );
}