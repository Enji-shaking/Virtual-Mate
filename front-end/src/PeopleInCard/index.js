import React, { useState, useEffect } from 'react';
import FixedContainer from '../FixedContainer.js';
import { Link, useParams } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import axios from 'axios';

export default function CardView(props) {
  let avatars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let { id } = useParams();

  const [users, setUsers] = useState([
    { Username: 'tester', Userid: 'testUser', Avatar: '/logo.png' },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://localhost:8080/api/card/${id}/users`);
      setUsers(result.data);
    };
    fetchData();
  }, []);

  let userId='testUser';
  let done = false;
  for(let i=0;i<users.length;i++) {
    console.log(users[i]);
    if (users[i].Userid === userId) {
      done = true;
      break;
    }
  };

  return (
    <FixedContainer>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ textAlign: 'center', fontSize: '1.3em' }}>Card Name</div>
        <img
          style={{ maxWidth: '78.5vw', height: 'auto', margin: '15px 0px' }}
          src="/logo192.png"
        ></img>
        <div style={{ textAlign: 'center', fontSize: '1em' }}>
          Completed By {avatars.length} People
        </div>
        {done ? (
          <div
            className="avatars"
            style={{ display: 'flex', flexWrap: 'wrap' }}
          >
            {avatars.map((avatar) => {
              return (
                <Link
                  to={`/User/${
                    avatar.Userid ? avatar.Userid : avatar.toString()
                  }`}
                  key={avatar.Userid ? avatar.Userid : avatar.toString()}
                >
                  <Avatar
                    alt={avatar.toString()}
                    src={avatar.Avatar?avatar.Avatar:"https://material-ui.com/static/images/avatar/1.jpg"}
                    style={{ width: '20vw', height: '20vw', margin: '5vw' }}
                  ></Avatar>
                </Link>
              );
            })}
            {users.map((avatar) => {
              return (
                <Link
                  to={`/User/${
                    avatar.Userid ? avatar.Userid : avatar.toString()
                  }`}
                  key={avatar.Userid ? avatar.Userid : avatar.toString()}
                >
                  <Avatar
                    alt={avatar.toString()}
                    src={avatar.Avatar?avatar.Avatar:"https://material-ui.com/static/images/avatar/1.jpg"}
                    style={{ width: '20vw', height: '20vw', margin: '5vw' }}
                  ></Avatar>
                </Link>
              );
            })}
          </div>
        ) : (
          <div>
            <div
              style={{
                zIndex: '2',
                margin: 'auto',
                maxWidth: '60vw',
                position: 'relative',
                top: '15vh',
                marginTop: '1.5vh',
              }}
            >
              <LockOpenRoundedIcon /> Complete This Activty To View
            </div>
            <div
              style={{
                width: '90vw',
                height: '30vh',
                filter: 'blur(50px)',
                backgroundColor: '#54BEF5',
                opacity: '0.6',
                zIndex: '1',
              }}
            ></div>
          </div>
        )}
      </div>
    </FixedContainer>
  );
}
