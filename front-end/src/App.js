import React, { useEffect } from 'react';
import ProfileTab from './Profiles/PersonalProfile';
import ToDoListTab from './ToDoListTab';
import ChatsTab from './ChatsTab';
import ChatBoard from './ChatsTab/ChatBoard';
import GalleryTab from './GalleryTab';
import { Switch, Route } from 'react-router-dom';
import AddCard from './AddCard';
import CardView from './PeopleInCard';
import Login from './Login';
import Register from './Register';
import OtherUserPage from './Profiles/OtherUserPage';
import Completed from './ToDoListTab/Completed';
import Request from './Profiles/RequestChat';
import Setting from './Profiles/Setting';
import RequestList from './ChatsTab/RequestList';

import axios from 'axios';
export default function App(props) {
  useEffect(() => {
    window.onbeforeunload = () => {
      axios
        .post('http://bmomark.com:8080/api/user/logout', {
          userId: sessionStorage.getItem('id'),
          password: sessionStorage.getItem('pass'),
        })
        .then(function (response) {
          sessionStorage.clear();
          alert('goodbye');
        });
    };
  });
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={GalleryTab}/>
        <Route path="/AddActivity" exact component={AddCard}/>
        <Route path="/Profile" exact component={ProfileTab}/>
        <Route path="/ToDoList" exact component={ToDoListTab}/>
        <Route path="/Chats" exact component={ChatsTab}/>
        <Route path="/Chats/Request" component={RequestList} />
        <Route path="/Chats/:ChatId" component={ChatBoard} />
        <Route path="/ActivityCard/:id" component={CardView} />
        <Route path="/User/:id" component={OtherUserPage} />
        <Route path="/Login" exact component={Login} />
        <Route path="/Register" exact component={Register} />
        <Route path="/Completed/:id" component={Completed} />
        <Route path="/Request/:id" component={Request} />
      </Switch>
    </div>
  );
}
