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
        <Route path="/PlInCard" exact>
          <CardView />
        </Route>
        <Route path="/Login" exact>
          <Login />
        </Route>
        <Route path="/Register" exact>
          <Register />
        </Route>
      </Switch>
    </div>
  );
}
