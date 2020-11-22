import React , {useEffect,useState}from 'react';
import { Button } from '@material-ui/core';
import {Link, useHistory, useParams} from 'react-router-dom';
import axios from 'axios';

export default function Request(props) {

  
  const buttonStyle = {
    backgroundColor: '#54BEF5',
    color: 'white',
    width: '30vw',
    textTransform: 'lowercase',
    fontSize: '1.1em',
    padding: '5px',
  };

  const history=useHistory();
  
  let user=sessionStorage.getItem('id');
  let pass = sessionStorage.getItem('pass');
  let id = props.match.params.id;
  function send(){
     axios.post(
      `http://localhost:8080/api/chat/request`,{params:{userId: user,
      userHashedPass: pass,
      userId_other: id
      }}
    ).then(history.goBack());
  }
  
  return (

    <div style={{display:"flex",flexDirection:'column',alignItems:'center',justifyContent:'center',height:'80vh',width:'80vw',margin:'auto'}}>
      <div style={{fontSize:'7vw'}}>Request Chat</div>
      <input type='text' placeholder='Send her/him a short introduction' style={{textAlign: 'center',
        width:'70%',height:'10vh',margin:'2vh 0'
      }}>
      </input>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '85%',
          margin: '10px',
          
        }}
      >
      <Button style={buttonStyle} onClick={()=>history.goBack()} >
          Cancel
        </Button>
        <Button style={buttonStyle} onClick={send}>
          Send
        </Button>
      </div>
    </div>

  );
}
