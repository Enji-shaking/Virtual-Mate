import React from 'react';
import FixedContainer from '../FixedContainer.js';
import Avatar from '@material-ui/core/Avatar';
import Album from './Album';
import FootPrint from './FootPrint';
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

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
  let name = props.match.params.id;

  const activities = [
    { pic: '/logo192.png', date: '2000-08-10', id: '1' },
    { pic: '/logo192.png', date: '2000-08-10', id: '2' },
    { pic: '/logo192.png', date: '2000-08-10', id: '3' },
    { pic: '/logo192.png', date: '2000-08-10', id: '4' },
    { pic: '/logo192.png', date: '2000-08-10', id: '5' },
    { pic: '/logo192.png', date: '2000-08-10', id: '6' },
  ];

  let img =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSeKZbcVtvtJKKvj5jnN11zgX82gll4TsnmFg&usqp=CAU';

  const classes = useStyles();
  return (
    <FixedContainer displayType="return">
      <Button
        className={classes.root}
        style={{ maxWidth: '90%' ,position:'fixed',top:'2.5vh',right:'3vh'}}
      >
        Request Chat
      </Button>
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
        {name.toString() + "'s page"}
        <div style={{ width: '85vw', marginTop: '5vh' }}>
          {name.toString() + "'s Album"}
          <Album />
        </div>
        <div>
          <div style={{ margin: '2.5vh 0' }}>Your Common Grounds</div>
          <FootPrint activities={activities} />
        </div>
      </div>
    </FixedContainer>
  );
}
