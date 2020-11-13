import React from 'react';
import { Button } from '@material-ui/core';
import {Link, useParams} from 'react-router-dom';
export default function Completed(props) {
  const buttonStyle = {
    backgroundColor: '#54BEF5',
    color: 'white',
    width: '30vw',
    textTransform: 'lowercase',
    fontSize: '1.1em',
    padding: '5px',
  };

  let {id}=useParams();
  return (

    <div style={{display:"flex",flexDirection:'column',alignItems:'center',justifyContent:'center',height:'80vh',width:'80vw',margin:'auto'}}>
      <h1>Yes! You Did It!</h1>
      <div style={{width:'85%',textAlign: 'left'}}>See who also did this:</div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '85%',
          margin: '10px',
          
        }}
      >
       <Link to='/ToDoList' style={{ textDecoration: 'none', color: 'black' }}> <Button style={buttonStyle} >
          Later
        </Button></Link>
        <Link to={`/ActivityCard/${id}`} style={{ textDecoration: 'none', color: 'black' }}> <Button style={buttonStyle}>
          Go
        </Button></Link>
      </div>
    </div>

  );
}
