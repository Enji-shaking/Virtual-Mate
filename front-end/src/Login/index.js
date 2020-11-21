import React, { useState } from 'react';
import FixedContainer from '../FixedContainer';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Login1 from './Login';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Autorenew } from '@material-ui/icons';

export default function Login(props) {
  const middle = {
    margin: 'auto',
  };
  const inputSize = {
    display: 'block',
    marginTop: '50px',
    backgroundColor: '#54BEF5',
    color: 'white',
    width: '60vw',
    height: '5.5vh',
    textAlign: 'center',
    border: 'none',
  };

  const history = useHistory();
  
  const useStyles = makeStyles({
    root: {
      background: '#54BEF5',
      width: '28vw',
      fontSize: '0.75em',
      color: 'white',
      padding: '3px',
      height:'3vh',
      margin:'auto',
    },
  });
  const classes = useStyles();
  return (
    <FixedContainer>
      {sessionStorage.getItem('id') === null ? (
        <Login1 />
      ) : (
        <div style={{margin:'auto',height:'60vh',display:"flex",justifyContent:'center'}}>
          <Button
            className={classes.root}
            onClick={() => {
              axios
                .post('http://localhost:8080/api/user/logout', {
                  userId: sessionStorage.getItem('id'),
                  password: sessionStorage.getItem('pass'),
                })
                .then(function (response) {
                  sessionStorage.clear();
                  history.push('/');
                });
            }}
          >
            Log Out
          </Button>
        </div>
      )}
    </FixedContainer>
  );
}
