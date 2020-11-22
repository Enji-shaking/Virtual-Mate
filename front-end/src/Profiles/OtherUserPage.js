import React, { useState, useEffect } from 'react';
import FixedContainer from '../FixedContainer.js';
import Avatar from '@material-ui/core/Avatar';
import Album from './Album';
import FootPrint from './FootPrint';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    background: '#54BEF5',
    fontSize: '0.75em',
    color: 'white',
    padding: '3px 5px',
    textTransform: 'none',
  },
});

export default function OtherUserPage(props) {
  const history = useHistory();
  let id = props.match.params.id;
  let user = sessionStorage.getItem('id');
  let pass = sessionStorage.getItem('pass');
  const [profile, setOther] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://localhost:8080/api/user/${id}`, {
        params: { userId: user },
      });
      setOther(result.data);
    };
    fetchData();
  }, []);

  const [result, setResult] = useState(2);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:8080/api/chat/canchat`, {
        params: { userId: user, password: pass, userId_other: id },
      });
      setResult(result.data);
    };
    if (id != user) fetchData();
  }, []);

  function requestButton() {
    if (result === 0) {
      return (
        <Button
          className={classes.root}
          style={{
            maxWidth: '90%',
            position: 'fixed',
            top: '2.5vh',
            right: '3vh',
          }}
          onClick={() => history.push(`/Request/${id}`)}
        >
          Request Chat
        </Button>
      );
    }
    if (result === 1) {
      return (
        <Button
          className={classes.root}
          style={{
            maxWidth: '90%',
            position: 'fixed',
            top: '2.5vh',
            right: '3vh',
          }}
          onClick={() => history.push(`/Chats`)}
        >
          Go Chat
        </Button>
      );
    }
    if (result === 2) {
      return (
        <Button
          className={classes.root}
          style={{
            maxWidth: '90%',
            position: 'fixed',
            top: '2.5vh',
            right: '3vh',
          }}
          disabled
        >
          Requested
        </Button>
      );
    }
  }

  const [activities, setactivity] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:8080/api/user/cards', {
        params: { userId: user, userId_other: id },
      });
      console.log(result);
      setactivity(result.data);
    };
    if (id != user) fetchData();
  }, []);

  let img =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSeKZbcVtvtJKKvj5jnN11zgX82gll4TsnmFg&usqp=CAU';

  const classes = useStyles();
  return sessionStorage.getItem('id') !== null ? (
    <FixedContainer displayType="return">
      {requestButton()}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          src={img}
          style={{ width: '17vw', height: '17vw', margin: '1.5vh' }}
        ></Avatar>
        {profile && profile.userName ? profile.userName + "'s page" : ''}
        <div style={{ width: '85vw', marginTop: '5vh' }}>
          {profile && profile.userName ? profile.userName : '' + "'s Album"}
          <Album />
        </div>
        <div>
          <div style={{ margin: '2.5vh 0' }}>Your Common Grounds</div>
          <FootPrint activities={activities} />
        </div>
      </div>
    </FixedContainer>
  ) : (
    <FixedContainer>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '90vw',
          fontSize: '1.4em',
        }}
      >
        <strong>Your Fellow's Profile</strong>
      </div>
      <button
        onClick={() => (window.location = '/Login')}
        style={{
          backgroundColor: '#54BEF5',
          fontSize: '1em',
          color: 'white',
          padding: '3vw',
          border: 'none',
          marginTop: '30vh',
          width: '100%',
        }}
      >
        You Haven't Logged In, Please Click Me To Log In
      </button>
    </FixedContainer>
  );
}
