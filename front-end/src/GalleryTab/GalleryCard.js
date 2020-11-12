import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import axios from 'axios';

export default function GalleryCard(props) {
  const useStyles = makeStyles({
    root: {
      background: '#54BEF5',
      width: '28vw',
      fontSize: '0.75em',
      color: 'white',
      padding: '3px',
    },
  });

  const history = useHistory();
  const classes = useStyles();
  const cardStyle = {
    border: '0.5vw dashed #54BEF5',
    borderRadius: '12%',
    width: '35vw',
    height: '50vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1.3vw',
    margin: '3.6vw 4.8vw',
  };


  const imgStyle = {
    width: '21vw',
    height: '21vw',
    position: 'center',
  };

  let cardName=props.cardName?props.cardName:'Title';
  let id=props.id?props.id:'2';
  let tags=props.tags?props.tags:['#tag1 #tag2 #tag3 #tag4 #tag5 #tag6'];
  let url=props.url?props.url:'/logo192.png';
  
  let user=null;
  let pass = null;

  return (
    <Link
      to={`/ActivityCard/${id}`}
      style={{ textDecoration: 'none', color: 'black' }}
    >
      <div style={cardStyle}>
        <div className="title" style={{ fontSize: '4.3vw' }}>
          {cardName}
        </div>
        <img src={url} style={imgStyle}></img>
        <div
          className="tags"
          style={{
            width: '90%',
            height: '18%',
            wordWrap: 'break-word',
            margin: '0.5vw 0vw 1.8vw 0vw ',
            fontSize: '3vw',
          }}
        >
          {tags.map((tag)=>tag+' ')}
        </div>
        <Button
          className={classes.root}
          style={{ maxWidth: '90%' }}
          onClick={(e) => {
            e.preventDefault();
            if(props.canAdd){
              axios.post('http://localhost:8080/api/user/todo/add', {
                cardId:id,
                userId:user,
                userHashedPass: pass
              })
              .then(function (response) {
                history.push('/ToDoList');
              })
              .catch(function(error){
                alert('something is wrong');
                history.go(0);
            });}
            else{
                history.push('/ToDoList');
            }
          }}
        >
          <span style={{ fontSize: '3vw'}}>
            {props.canAdd ? 'Add To My List' : 'View In My List'}
          </span>
        </Button>
      </div>
    </Link>
  );
}
