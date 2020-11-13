import React,{useState,useEffect} from 'react';
import FixedContainer from '../FixedContainer.js';
import Avatar from '@material-ui/core/Avatar';
import Album from './Album';
import FootPrint from './FootPrint';
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    background: '#54BEF5',
    fontSize: '0.75em',
    color: 'white',
    padding: '3px 5px',
    textTransform: 'none',
  },
});

export default function OtherUserPage(props) {
  const history=useHistory();
  let id = props.match.params.id;
  const [user, setOther] = useState([ { Username: 'tester', Userid: 'testUser', Avatar: '/logo.png',footPrint:[],Album:[] }]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://localhost:8080/api/user/${id}`,
      );
      setOther(result.data);
    };
    fetchData();
  }, []);
  
  const curr=null;
  const pass=null;

  const [result, setResult]=useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `http://localhost:8080/api/chat/canchat`,{params:{userId: curr,
        userHashedPass: pass,
        userId_other: id
        }}
      );
      setResult(result.data);
    };
    fetchData();
  }, []);

  function requestButton(){
    if(result===0){
      return(<Button
        className={classes.root}
        style={{ maxWidth: '90%' ,position:'fixed',top:'2.5vh',right:'3vh'}}
        onClick={()=>history.push(`/Request/${id}`)}
      >
        Request Chat
      </Button>)
    }
    if(result===1){
      return(<Button
        className={classes.root}
        style={{ maxWidth: '90%' ,position:'fixed',top:'2.5vh',right:'3vh'}}
        onClick={()=>history.push(`/Chats`)}
      >
      Go Chat
      </Button>)
    }
    if(result===2){
      return(<Button
        className={classes.root}
        style={{ maxWidth: '90%' ,position:'fixed',top:'2.5vh',right:'3vh'}}
        disabled
      >
      Requested
      </Button>)
    }

  }
 
  const activities = [
    { pic: '/logo192.png', date: '2000-08-10', id: '1' },
    { pic: '/logo192.png', date: '2000-08-10', id: '2' },
    { pic: '/logo192.png', date: '2000-08-10', id: '3' },
    { pic: '/logo192.png', date: '2000-08-10', id: '4' },
    { pic: '/logo192.png', date: '2000-08-10', id: '5' },
    { pic: '/logo192.png', date: '2000-08-10', id: '6' },
  ];

  let img =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSeKZbcVtvtJKKvj5jnN11zgX82gll4TsnmFg&usqp=CAU';

  const classes = useStyles();
  return (
    <FixedContainer displayType="return">
      {requestButton()}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          src={img}
          style={{ width: '17vw', height: '17vw', margin: '1.5vh' }}
        ></Avatar>
        {id.toString() + "'s page"}
        <div style={{ width: '85vw', marginTop: '5vh' }}>
          {id.toString() + "'s Album"}
          <Album />
        </div>
        <div>
          <div style={{ margin: '2.5vh 0' }}>Your Common Grounds</div>
          <FootPrint activities={activities} />
        </div>
      </div>
    </FixedContainer>
  );
}
