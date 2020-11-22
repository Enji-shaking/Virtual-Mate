import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FixedContainer from '../FixedContainer.js';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import ReactLoading from 'react-loading';

export default function RequestList(props){

    // userId = sessionStorage.getItem("id");
    //     userPass = sessionStorage.getItem("pass")
    useEffect(()=>{
        setIsLoading(true);
        setUserId(sessionStorage.getItem("id"));
        console.log(sessionStorage.getItem("id"));
        setUserPass(sessionStorage.getItem("pass"));
        console.log(sessionStorage.getItem("pass"));
        console.log(userId);
        console.log(userPass);
        // if(userId==="" || userPass===""){
        //     history.push("/");
        // }
        const fetchData = async () => {
            const result = await axios.get(
              `http://localhost:8080/api/chat/request?userId=${sessionStorage.getItem("id")}&password=${sessionStorage.getItem("pass")}`
            );
            if(result.data!==""){
                console.log(result.data);
                setUserList(result.data);
                setIsLoading(false);
            }
        };
        fetchData();
          
    },[])
    const history = useHistory();
    const [userId, setUserId] = useState("");
    const [userPass, setUserPass] = useState("");
    const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // public boolean acceptRequest(@RequestBody withOtherWrapper wrapper, @RequestParam("accepted") boolean accepted, @RequestParam("userId_other") String userId_other){
    
    
    const acceptRequest = async (accept, userId_other,index)=>{
        setIsLoading(true);
        await axios.post(`http://localhost:8080/api/chat/acceptance?accepted=${accept}&userId_other=${userId_other}`, 
            {
                userId: userId,
                password: userPass
            })
        let newArray = [...userList];
        newArray.splice(index,1);
        setUserList(newArray);
        setIsLoading(false);
    }

    const renderUserList = () => {
        if (userList.length > 0) {
          let viewListUser = [];
          userList.forEach((item, index) => {
            viewListUser.push(
              <div
                style={{ display: 'flex', alignItems: 'center' }}
                key={index}
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
                <button onClick={e=>{
                    acceptRequest(1,item.userId,index)
                }}>Yes</button>
                <button onClick={e=>{
                    acceptRequest(0,item.userId,index)
                }}>No</button>
              </div>
            );
          });
          return viewListUser;
        }
      }


    return (
        <div>

            <FixedContainer>
                <h1>All Your Request</h1>
                {renderUserList()}
            </FixedContainer>
             {/* Loading */}
            {isLoading ? (
            <div className="viewLoading">
                <ReactLoading
                type={'spin'}
                color={'#203152'}
                height={'10%'}
                width={'10%'}
                />
            </div>
            ) : null}
        </div>
        
    )
}