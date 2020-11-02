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
              <GalleryTab />
            </Route>
            <Route path='/Profile' exact>
              <ProfileTab />
            </Route>
            <Route path='/ToDoList' exact>
              <ToDoListTab />
            </Route>
            <Route path='/Chats' exact>
              <ChatsTab />
            </Route>
          </Switch>
    </div>
  );
};
