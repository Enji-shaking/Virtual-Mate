import React, { useState, useEffect, useReducer } from 'react';
import FixedContainer from '../FixedContainer.js';
import SearchIcon from '@material-ui/icons/Search';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import GalleryCard from './GalleryCard';

export default function GalleryTab(props) {
  const [currentTodo, setCurrent] = useState([]);

  let user = sessionStorage.getItem('id');
  let pass = sessionStorage.getItem('pass');

  const [todo, setTodo] = useState(null);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let result = await axios('http://bmomark.com:8080/api/card/all');
      setData(result.data);

      console.log(data);
    };
    fetchData();
  }, []);
  let tmp=new Set();

  useEffect(() => {
    const fetchData = async () => {
      let result = await axios.get(
        'http://bmomark.com:8080/api/user/todo/list',
        {
          params: { userId: user, password: pass },
        }
      );
      result.data.forEach((t)=>tmp.add(t.cardId));
      setTodo(tmp);
    };
    
    fetchData();
    
  }, []);

  const displayStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
    bottom: '1.2vw',
  };
  const searchBar = {
    border: '1px solid #54BEF5',
    boxSizing: 'border-box',
    borderRadius: '5px',
    width: '50vw',
    height: '24px',
  };

  const [searchContent, changeSearch] = useState('');

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  function Search() {
    const [search, changeR] = useState([
      {
        cardId: 'tester',
        cardName: 'testCard',
        cardImage: '/logo.png',
        cardTags: ['#test1', '#test2'],
      },
      {
        cardId: 'tester2',
        cardName: 'testCard2',
        cardImage: '/logo.png',
        cardTags: ['#test1', '#test2'],
      },
    ]);

    useEffect(() => {
      const fetchData = async () => {
        const result = await axios('http://bmomark.com:8080/api/cards/list', {
          params: { tag: searchContent },
        });
        changeR(result.data);
      };
      fetchData();
    }, []);

    return search;
  }

  return todo ? (
    <FixedContainer displayType="logo">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '90vw',
          fontSize: '1.4em',
        }}
      >
        <strong>Gallery</strong>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="search"
            placeholder="Search.."
            style={searchBar}
            onChange={(event) => changeSearch(event.target.value)}
          />
          <SearchIcon style={{ color: '#54BEF5' }} onClick={Search} />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '0.7vw',
        }}
      >
        <IconButton style={{ padding: '0' }} href="/AddActivity">
          <AddBoxIcon style={{ color: '#54BEF5' }}></AddBoxIcon>
        </IconButton>
      </div>
      <div className="cardDisplay" style={displayStyle}>
        {data.map((card) => (
          <GalleryCard
            canAdd={todo.has(card.cardId)}
            key={card.cardId}
            id={card.cardId}
            url={card.activityImageId}
            tags={card.relatedTagsId}
            cardName={card.activityName}
          />
        ))}
      </div>
    </FixedContainer>
  ) : (
    <div></div>
  );
}
