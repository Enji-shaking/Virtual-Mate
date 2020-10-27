import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {Home, Check, Chat, AccountBox} from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: 400,
  },
});

export default function TabBar() {
  const classes = useStyles();

 const path=window.location.pathname;
 let position=0;
  if(path==='/Chats')  position=2;
  if(path==='/ToDoList') position=1;
  if(path==='/Gallery') position=0;
  if(path==='/Profile') position=3;
const [value, setValue] = React.useState(position);

  return (
    <BottomNavigation
      value={value}
      showLabels
      root={value}
      style={{position: 'fixed', bottom: '0', width: '100%', height:'10vh'}}
    >
      <BottomNavigationAction label="Gallery" icon={<Home />} component={Link} to='/' />
      <BottomNavigationAction label="My ToDo" icon={<Check />} component={Link} to='/ToDoList' />
      <BottomNavigationAction label="Chats" icon={<Chat />}component={Link} to='/Chats' />
      <BottomNavigationAction label="Profile" icon={<AccountBox />} component={Link} to='/Profile' />
    </BottomNavigation>
  );
}