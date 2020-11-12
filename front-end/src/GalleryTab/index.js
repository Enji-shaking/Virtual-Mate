import React,{useState,useEffect, useReducer}  from 'react';
import FixedContainer from '../FixedContainer.js';
import SearchIcon from '@material-ui/icons/Search';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import GalleryCard from './GalleryCard';

export default function GalleryTab(props) {

    const [data, setData] = useState([{cardId:'tester',cardName:'test',
    cardImage:'/logo.png',
    cardTags:['#test1','#test2']
    }]);
    
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios(
          'http://localhost:8080/api/card/all',
        );
        setData(result.data);
      };
      fetchData();
    }, []);

    
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
   
    
    let todo=new Set();
    for(let i=0;i<currentTodo.length;i++){
      todo.add(currentTodo[i].cardId);
    }
  
    function add(id){
      if (todo.has(id)){
        return false;
      }
      return true;
    }

  const displayStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    position: 'relative',
    bottom:'1.2vw'
  };
  const searchBar = {
    border: '1px solid #54BEF5',
    boxSizing: 'border-box',
    borderRadius: '5px',
    width:'50vw',
    height: '24px'
  };

  const [searchContent,changeSearch]=useState('');

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  function Search(){
   
    const [search,changeR]=useState([{cardId:'tester',cardName:'testCard',
    cardImage:'/logo.png',
    cardTags:['#test1','#test2']
    },{cardId:'tester2',cardName:'testCard2',
    cardImage:'/logo.png',
    cardTags:['#test1','#test2']
    }]);

    useEffect(() => {
      const fetchData = async () => {
        const result = await axios(
          'http://localhost:8080/api/cards/list',{params:{tag:searchContent}}
        );
        changeR(result.data);
      };
      fetchData();
    }, []);

    console.log(search);
    return search;
  }

  
  
  return (
    <FixedContainer displayType='logo'>

      <div style={{display: "flex",alignItems: "center", justifyContent:"space-between", width:"90vw",fontSize:'1.4em'}}>
        <strong>Gallery</strong>
        <div style={{display: "flex",alignItems: "center"}}>
        <input type="search" placeholder="Search.." style={searchBar} onChange={(event)=>changeSearch(event.target.value)}/>
        <SearchIcon style={{ color: '#54BEF5' }} onClick={Search}/>
        </div>
      </div>

      <div style={{display:'flex',justifyContent:'flex-end',marginTop:'0.7vw'}}>
      <IconButton style={{padding:'0'}} href='/AddActivity'> <AddBoxIcon style={{color:'#54BEF5'}} ></AddBoxIcon></IconButton>
      </div>
      <div className="cardDisplay" style={displayStyle} >
        <GalleryCard canAdd={true} />
        <GalleryCard canAdd={true} />
        <GalleryCard canAdd={false} />
        <GalleryCard canAdd={true} />
        <GalleryCard canAdd={true} />
        <GalleryCard canAdd={false} />
        <GalleryCard canAdd={true} />
        {
          data.map((card)=><GalleryCard canAdd={add(card.cardId)} key={card.cardId} id={card.cardId} url={card.cardImage} tags={card.cardTags} cardName={card.cardName}/> )
        }
      </div>
    </FixedContainer>
  );
}
