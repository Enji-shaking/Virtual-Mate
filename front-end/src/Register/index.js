import React, { useState } from 'react';
import FixedContainer from '../FixedContainer';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

export default function Register(props) {
  const middle = {
    margin: 'auto',
  };
  
  const inputSize = {
    display: 'block',
 
    backgroundColor: '#54BEF5',
    color: 'white',
    width: '60vw',
    height: '5.5vh',
    margin:'auto',
    marginTop: '50px',
    textAlign: 'center',
    border: 'none',
  };

  const [email, setEmail] = useState('Email');
  const [user, setUser] = useState('Username');
  const [pass, setPass] = useState('Password');
  const [error, setError] = useState(false);
  const history=useHistory();
  
  return (
    <FixedContainer displayType="return">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '65vh',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center', fontSize: '1.5em' }}>Register</div>
        <form
          style={{ color: 'white', padding: '0px 5px', textAlign: 'center' }}
        >
          <input
            type="text"
            value={user}
            style={inputSize}
            onClick={() => {
              if (user === 'Username') {
                setUser('');
              }
            }}
            onChange={(e) => setUser(e.target.value)}
          />

          <input
            type="text"
            value={email}
   
            style={inputSize}
          
            onClick={() => {
              if (email === 'Email') {
                setEmail('');
              }
            }}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            value={pass}
            name="password"
            style={inputSize}
            id="password"
            onClick={() => {
              if (pass === 'Password') {
                setPass('');
              }
            }}
            onChange={(e) => setPass(e.target.value)}
          />

          <div
            style={
              error
                ? { color: 'red', textAlign: 'center' }
                : { visibility: 'hidden' }
            }
          >
            Invalid inputs, You might have already registered
          </div>

          <input
            type="submit"
            value="Register"
            style={{
              marginTop: '30px',
              backgroundColor: '#54BEF5',
              padding: '5px',
              border: 'none',
              color: 'white',
              width: '28vw',
              height: '4vh',
            }}
            onClick={(e) => {
              e.preventDefault();
              if (
                email !== 'Email' &&
                pass !== 'Password' &&
                user != 'Username'
              ) {
                axios
                  .post('http://localhost:8080/api/user/register', {"userName": user,
                  "password":pass,
                  "email": email,})
                  .then(function (response) {
                    if (response.data) {
                      history.push('/logIn');
                    } else {
                      setError(true);
                    }
                  });
              } else {
                setError(true);
              }
            }}
          />
        </form>
      </div>
    </FixedContainer>
  );
}
