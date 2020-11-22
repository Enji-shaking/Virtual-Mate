import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FixedContainer from '../FixedContainer.js';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';

export default function RequestList(props){

    
    useEffect(()=>{
        const userId = sessionStorage.getItem("id");
        const userPass = sessionStorage.getItem("pass");
        if(!userId || !userPass){
            history.push("/");
        }
        const fetchData = async () => {
            const result = await axios.get(
              `http://localhost:8080/api/chat/request?userId=${userId}&password=${userPass}`
            );
            if(result.data!==""){
                console.log(result);
            }
        };
        fetchData();
          
    },[])
    const history = useHistory();
    const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    

    const renderUserList = () => {
        if (userList.length > 0) {
          let viewListUser = [];
          userList.forEach((item, index) => {
            viewListUser.push(
              <div
                style={{ display: 'flex', alignItems: 'center' }}
                key={index}
                // onClick={() => {
                //   setState({
                //     chattingOther: item.userId,
                //     chattingId: chatList[index],
                //     otherAvatar: item.avatar,
                //     chatName: item.userName,
                //   });
                // }}
              >
                <Avatar
                  alt={item.avatar.toString()}
                  src={
                    item.avatar
                      ? item.avatar
                      : 'https://material-ui.com/static/images/avatar/1.jpg'
                  }
                  style={{
                    width: '15vw',
                    height: '15vw',
                    margin: '5vw',
                    marginRight: '5vw',
                  }}
                ></Avatar>
                {item.userName}
                <button>Yes</button>
                <button>No</button>
              </div>
            );
          });
          return viewListUser;
        }
      }


    return (
        <FixedContainer>
            <h1>All Your Request</h1>
            {/* {userId}
            {userPass} */}
        </FixedContainer>
    )
}