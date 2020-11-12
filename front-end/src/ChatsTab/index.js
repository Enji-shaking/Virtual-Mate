import React,{useState,useEffect} from 'react';
import FixedContainer from '../FixedContainer.js';
import Picture from '../Picture.js';
import axios from 'axios';
 
export default function ChatsTab(props){

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:8080/test/getUserList',
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  return(
    <FixedContainer>
      Chats
      <Picture/>
      {/* {list?console.log(list.data):console.log('nothing')} */}
    </FixedContainer>
  );
}

