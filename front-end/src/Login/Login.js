import React, { useState } from 'react';
import FixedContainer from '../FixedContainer';
import { Link,useHistory } from 'react-router-dom';
import axios from 'axios';

export default function Login1(props) {
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
  const [email, setEmail] = useState('Email');
  const [pass, setPass] = useState('Password');
  const [error, setError] = useState(false);
  const history=useHistory();
  return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '65vh',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center', fontSize: '1.5em' }}>Log In</div>
        <form
          style={{ color: 'white', padding: '0px 5px', textAlign: 'center' }}
        >
          <input
            type="text"
            value={email}
            name="email"
            style={inputSize}
            id="email"
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
            Invalid Password or Email
          </div>

          <input
            type="submit"
            value="Log In"
            style={{
              marginTop: '40px',
              backgroundColor: '#54BEF5',
              padding: '5px',
              border: 'none',
              color: 'white',
              width: '28vw',
              height: '4vh',
            }}
            onClick={(e) => {
              e.preventDefault();
              if (email !== 'Email' && pass !== 'Password') {
                axios
                  .post('http://bmomark.com:8080/api/user/login', {
                    "userId": email,
                    "password": pass,
                  })
                  .then(function (response) {
                    if (response.data) {
                      sessionStorage.setItem("id",response.data);
                      sessionStorage.setItem("pass",pass);
                      history.push('/');
                    } else {
                      setError(true);
                    }
                  }).catch(function(error){
                    setError(true);
                  })
              } else {
                setError(true);
              }
            }}
          />
        </form>
        <div
          style={{
            width: '55vw',
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '36px',
          }}
        >
          <Link
            to="/register"
            style={{
              color: 'black',
              textDecoration: 'none',
              fontSize: '3.5vw',
            }}
          >
            No Account? Click Me To Register
          </Link>
        </div>
      </div>
  );
}
