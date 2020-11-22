import React, { useState, useEffect } from 'react';
import FixedContainer from '../FixedContainer.js';
import ToDoCard from './ToDoCard';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';

export default function ToDoListTab(props) {
  let user = sessionStorage.getItem('id');
  let pass = sessionStorage.getItem('pass');

  const [currentTodo, setCurrent] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        'http://localhost:8080/api/user/todo/list',
        { params: { userId: user, password: pass } }
      );

      setCurrent(result.data);
      console.log(result);
    };
    if (user && pass) fetchData();
  }, []);

  return user !== null ? (
    currentTodo != undefined && currentTodo != null ? (
      <FixedContainer>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '90vw',
            fontSize: '1.4em',
          }}
        >
          <strong>My List</strong>
        </div>

        {/*  This is to make the cards at the same level with those in the homepage */}
        <div style={{ display: 'hidden', marginTop: '0.7vw' }}>
          <IconButton style={{ padding: '0' }} href="/AddActivity"></IconButton>
        </div>

        <div
          className="display"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            position: 'relative',
            bottom: '1.2vw',
          }}
        >
          {currentTodo.map((card) => {
            return (
              <ToDoCard
                key={card.cardId}
                id={card.cardId}
                url={card.activityImageId}
                tags={card.relatedTagsId}
                cardName={card.activityName}
              />
            );
          })}
        </div>
      </FixedContainer>
    ) : (
      <div>Loading</div>
    )
  ) : (
    <FixedContainer>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '90vw',
          fontSize: '1.4em',
        }}
      >
        <strong>My List</strong>
      </div>
      <button
        onClick={() => (window.location = '/Login')}
        style={{
          backgroundColor: '#54BEF5',
          fontSize: '1em',
          color: 'white',
          padding: '3vw',
          border: 'none',
          marginTop: '30vh',
          width: '100%',
        }}
      >
        You Haven't Logged In, Please Click Me To Log In
      </button>
    </FixedContainer>
  );
}
