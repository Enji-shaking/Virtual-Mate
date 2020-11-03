import React from 'react';
import FixedContainer from '../FixedContainer';
import {Box,Button, Icon} from '@material-ui/core';

export default function AddCard(props) {
  const cardStyle = {
    border: '0.5vw dashed #54BEF5',
    borderRadius: '12%',
    width: '61.5vw',
    height: '80vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '20px',
    margin: '30px',
    textAlign: 'left',
    
  };
  const buttonStyle={backgroundColor:'#54BEF5',color:'white',width:'30vw', textTransform:'lowercase',fontSize: '1.1em',padding: '5px'};

  const inputStyle = {
    border: '0',
    borderBottom: '1px solid',
    outline: '0',
    width: '90%',
    marginTop: '15px',
  };

  return (
    <FixedContainer displayType="return">
      <div style={{display: 'flex',flexDirection:'column',alignItems:'center',marginTop: '2vh'}}>
      <div style={{ textAlign: 'center', fontSize: '1.5em' }}>Add A Card</div>
      <div style={cardStyle}>
        <div style={{ textAlign: 'left', width: '85%' }}>Card Name:</div>
        <input type="text" style={inputStyle} />
        <div style={{backgroundColor: 'lightgrey',width:'70%',height:'30%',margin:'30px'}}><img src='https://static.thenounproject.com/png/187803-200.png' style={{width:'20%',height:'auto'}}></img></div>
        <div style={{ textAlign: 'left', width: '85%' }}>Tag:</div>
        <input type="text" style={inputStyle} />
      </div>
      <div style={{display: "flex",justifyContent:'space-between',width:'85%',margin:'10px'}}>
      <Button style={buttonStyle}>Empty</Button>
      <Button href='/' style={buttonStyle}>Add</Button>
      </div>
      </div>
    </FixedContainer>
  );
}
