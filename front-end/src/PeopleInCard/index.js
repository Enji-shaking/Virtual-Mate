import React, { useState, useEffect } from 'react';
import FixedContainer from '../FixedContainer.js';
import { Link, useParams } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import axios from 'axios';

export default function CardView(props) {
  let { id } = useParams();

  const [avatars, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://localhost:8080/api/card/${id}/users`);
      setUsers(result.data);
    };
    fetchData();
  }, []);
  let user = sessionStorage.getItem('id');
  let pass = sessionStorage.getItem('pass');

  let done = false;
  for (let i = 0; i < avatars.length; i++) {
    if (avatars[i].userId === user) {
      done = true;
      break;
    }
  }

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
                  to={
                    avatar.userId != user
                      ? `/User/${
                          avatar.userId ? avatar.userId : avatar.toString()
                        }`
                      : '/Profile'
                  }
                  key={avatar.userId ? avatar.userId : avatar.toString()}
                >
                  <Avatar
                    alt={avatar.avatar.toString()}
                    src={
                      avatar.avatar
                        ? avatar.avatar
                        : 'https://material-ui.com/static/images/avatar/1.jpg'
                    }
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
