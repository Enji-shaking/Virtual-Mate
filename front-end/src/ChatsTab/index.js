import React from 'react';
import FixedContainer from '../FixedContainer.js';
import Picture from '../Picture.js';
import axios from 'axios';
import getAllUsers from '../api/user';
export default function ChatsTab(props){

  return(
    <FixedContainer>
      Chats
      <Picture/>
      {getAllUsers.getAllUsers()};
    </FixedContainer>
  );
}

