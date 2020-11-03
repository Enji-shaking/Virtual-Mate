import React from 'react';
import FixedContainer from '../FixedContainer.js';
import ToDoCard from './ToDoCard';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
export default function ToDoListTab(props){
  return(
    <FixedContainer>
      <div style={{display: "flex",alignItems: "center", justifyContent:"space-between", width:"90vw",fontSize:'1.4em'}}>
        <strong>My List</strong>
      </div>

      <div style={{display:'hidden',marginTop:'6px'}}>
      <IconButton style={{padding:'0'}} href='/AddActivity' ></IconButton>
      </div>
     
      <ToDoCard/>
    </FixedContainer>
     
    
  );
}

