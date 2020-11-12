import React, { useEffect } from "react";
import ProfileTab from "./Profiles/PersonalProfile";
import ToDoListTab from "./ToDoListTab";
import ChatsTab from "./ChatsTab";
import GalleryTab from "./GalleryTab";
import { Switch, Route } from "react-router-dom";
import AddCard from "./AddCard";
import CardView from "./PeopleInCard";
import Login from "./Login";
import Register from "./Register";
import OtherUserPage from './Profiles/OtherUserPage';
import Completed from './ToDoListTab/Completed';

export default function App(props) {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <GalleryTab />
        </Route>
        <Route path="/AddActivity" exact>
          <AddCard />
        </Route>
        <Route path="/Profile" exact>
          <ProfileTab />
        </Route>
        <Route path="/ToDoList" exact>
          <ToDoListTab />
        </Route>
        <Route path="/Chats" exact>
          <ChatsTab />
        </Route>
        <Route path='/ActivityCard/:id' component={CardView} />
        <Route path = '/User/:id' component={OtherUserPage} />
        <Route path="/Login" exact>
          <Login />
        </Route>
        <Route path="/Register" exact>
          <Register />
        </Route>
        <Route path="/Completed/:id" component={Completed}>
        </Route>
      </Switch>
    </div>
  );
}
