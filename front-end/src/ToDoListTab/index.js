import React,{useState,useEffect} from 'react';
import FixedContainer from '../FixedContainer.js';
import ToDoCard from './ToDoCard';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';

export default function ToDoListTab(props){

  const [currentTodo, setCurrent] = useState([{cardId:'tester',cardName:'testCard',
    cardImage:'/logo.png',
    cardTags:['#test1','#test2']
    }]);
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios(
          'http://localhost:8080/api/user/todo/list',
        );
        setCurrent(result.data);
      };
      fetchData();
    }, []);

  return(
    <FixedContainer>

      <div style={{display: "flex",alignItems: "center", justifyContent:"space-between", width:"90vw",fontSize:'1.4em'}}>
        <strong>My List</strong>
      </div>

{/*  This is to make the cards at the same level with those in the homepage */}
      <div style={{display:'hidden',marginTop:'0.7vw'}}>
      <IconButton style={{padding:'0'}} href='/AddActivity' ></IconButton>
      </div>
{/*  */}
    
      <div className='display' style={{display:'flex',flexWrap: 'wrap',position: 'relative',bottom:'1.2vw'}}>
      <ToDoCard/>
      <ToDoCard/>
      <ToDoCard/>
      {currentTodo.map((card)=><ToDoCard key={card.cardId} id={card.cardId} url={card.cardImage} tags={card.cardTags} cardName={card.cardName}/>)}
      </div>

    </FixedContainer>
     
    
  );
}

