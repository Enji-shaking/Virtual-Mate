import React from 'react';
import FixedContainer from '../FixedContainer';
import Input from './Input.js';
import { Link } from 'react-router-dom';

export default function Login(props) {
  const middle = {
    margin: 'auto',
  };
  return (
    <FixedContainer>
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
          <Input placeholder="Username/Email" name="username"></Input>

          <Input placeholder="Password" name="password"></Input>

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
            {' '}
            Register
          </Link>
          <Link
            to="#"
            style={{
              color: 'black',
              textDecoration: 'none',
              fontSize: '3.5vw',
            }}
          >
            {' '}
            Forget Password
          </Link>
        </div>
      </div>
    </FixedContainer>
  );
}
