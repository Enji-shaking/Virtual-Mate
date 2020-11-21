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
  let tagIds=props.tags?props.tags:[];
  // let url = axios.get(`http://bmomark.com:8080/api/image/${props.url}`);
  // let url=props.url?props.url:'/logo192.png';
  let user='f3e2a8b4-e95e-45f2-a94e-f88833f07383';
  let pass = '123456';
 
  const [tags,setTag]=useState([]);
  const [image, setImage] = useState(
    {
      imageUrl: 'https://images.pexels.com/photos/5075068/pexels-photo-5075068.jpeg?cs=srgb&dl=pexels-max-avans-5075068.jpg&fm=jpg',
      imageId: 'imageId'
    }
  );

  let request =[]
  tagIds.forEach(element => {
    request.push(axios.get(`http://bmomark.com:8080/api/card/tag/${element}`));
  });
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `http://localhost:8080/api/image/${props.url}`
      );
      setImage(result.data);
    };
    fetchData();
  }, [props.url]);

  useEffect(() => {
    const fetchData = async function() {
        const response = await axios.all(request);     
        setTag(response);
  
    };  
      fetchData();
  }, [props.tags]);



  return (
    <Link
      to={`/ActivityCard/${id}`}
      style={{ textDecoration: 'none', color: 'black' }}
    >
      <div style={cardStyle}>
        <div className="title" style={{ fontSize: '4.3vw' }}>
          {cardName}
        </div>
        <img src={image.imageUrl} style={imgStyle}></img>
        <div
          className="tags"
          style={{
            width: '90%',
            height: '18%',
            wordWrap: 'break-word',
            margin: '0.5vw 0vw 1.8vw 0vw ',
            fontSize: '3vw',
            textAlign: 'center',
          }}
        >
          {tags.map((tag)=>tag.data.tagName+' ')}
        </div>
        <Button
          className={classes.root}
          style={{ maxWidth: '90%' }}
          onClick={(e) => {
            e.preventDefault();
            if(props.canAdd){
              axios.post('http://bmomark.com:8080/api/user/todo/add', {
                "cardId":id,
                "userCred":{"userId":user,
                "password": pass}
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
