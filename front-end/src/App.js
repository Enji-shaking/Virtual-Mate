import React, { useEffect } from 'react';
import ProfileTab from './ProfileTab/ProfilePage';
import ToDoListTab from './ToDoListTab';
import ChatsTab from './ChatsTab';
import GalleryTab from './GalleryTab'
import { Switch, Route } from 'react-router-dom';
import TabBar from './TabBar';

export default function App (props){
  return (
    <div className='App'>
          <Switch>
            <Route path='/' exact>
              Gallery
              <TabBar/>
              {/* <GalleryTab/> */}
            </Route>
            <Route path='/Profile' exact>
              Profile
              {/* <ProfileTab /> */}
              <TabBar/>
            </Route>
            <Route path='/ToDoList' exact>
              To Do
              {/* <ToDoListTab /> */}
            </Route>
            <Route path='/Chats' exact>
              Chat
              {/* <ChatsTab /> */}
            </Route>
          </Switch>
    </div>
  );
};
