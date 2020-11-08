import React from 'react';
import FixedContainer from '../FixedContainer.js';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';

export default function CardView(props) {
  console.log(props);
  let avatars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  let done = false;

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
          src="./logo192.png"
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
                <Link to="/userProfile" key={avatar.toString()}>
                  <Avatar
                    alt={avatar.toString()}
                    src="https://material-ui.com/static/images/avatar/1.jpg"
                    style={{ width: '20vw', height: '20vw', margin: '5vw' }}
                  ></Avatar>
                </Link>
              );
            })}
          </div>
        ) : (
          <div>
              <div style={{zIndex:'2', margin:'auto',width:'70vw',position:'relative',top:'15vh',marginTop:'1.5vh'}}>
              <LockOpenRoundedIcon /> Complete This Activty To View
            </div>
          <div
            style={{
              width: '90vw',
              height: '30vh',
              filter: 'blur(50px)',
              backgroundColor: '#54BEF5',
              opacity:'0.6',
              zIndex:'1',
            }}
          >
          </div>
        
          </div>
        )}
      </div>
    </FixedContainer>
  );
}
