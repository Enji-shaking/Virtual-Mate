import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { green } from '@material-ui/core/colors';
import FixedContainer from '../FixedContainer';

export default function Request(props) {
  const buttonStyle = {
    backgroundColor: '#54BEF5',
    color: 'white',
    width: '30vw',
    textTransform: 'lowercase',
    fontSize: '1.1em',
    padding: '5px',
  };

  const history = useHistory();
  let user = sessionStorage.getItem('id');
  let pass = sessionStorage.getItem('pass');
  let id = props.match.params.id;
  const [error, setError] = useState(false);
  function send() {
    axios
      .post(`http://localhost:8080/api/chat/request`, {
        userCred: {
          userId: user,
          password: pass,
        },
        userId_other: id,
      })
      .then(() => {
        setError(true);
      });
  }

  return (
    <FixedContainer displayType="return">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '65vh',
          width: '80vw',
          margin: 'auto',
        }}
      >
        <div style={{ fontSize: '7vw' }}>Request Chat</div>
        <div style={{ fontSize: '3.6vw', textAlign: 'center', margin: '20px' }}>
          You'll see this user in your chat list once he/she accepts your
          request.
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '85%',
            margin: '10px',
          }}
        >
          <Button style={buttonStyle} onClick={() => history.goBack()}>
            Cancel
          </Button>
          <Button style={buttonStyle} onClick={send}>
            Send
          </Button>
        </div>
        <div style={error ? { color: 'green',textAlign:'center' } : { display: 'none' }}>
          Request Sent, Now You Can Return To The Previous Page
        </div>
      </div>
    </FixedContainer>
  );
}
