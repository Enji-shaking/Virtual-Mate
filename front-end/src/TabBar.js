import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

import { Link } from 'react-router-dom';

export default function TabBar() {

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
      style={{position: 'fixed', bottom: '0', width: '100%', height:'10vh',backgroundColor: '#54BEF5'}}
    >
      <BottomNavigationAction label="Gallery" icon={<HomeOutlinedIcon style={{width:'6vw',height:'6vw', marginBottom:'2px'}}/>} component={Link} to='/' style={{color:'white'}} />
      <BottomNavigationAction label="My ToDo" icon={<DoneOutlineIcon style={{width:'6vw',height:'6vw', marginBottom:'2px'}}/>} component={Link} to='/ToDoList' style={{color:'white'}} />
      <BottomNavigationAction label="Chats" icon={<SmsOutlinedIcon style={{width:'6vw',height:'6vw', marginBottom:'2px'}} />} component={Link} to='/Chats' style={{color:'white'}}/>
      <BottomNavigationAction label="Profile" icon={<PersonOutlinedIcon style={{width:'6vw',height:'6vw', marginBottom:'2px'}}/>} component={Link} to='/Profile' style={{color:'white'}}/>
    </BottomNavigation>
  );
}