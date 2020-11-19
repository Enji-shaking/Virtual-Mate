import React,{useState,useEffect, Component} from 'react';
import FixedContainer from '../FixedContainer.js';
import Picture from '../Picture.js';
import {withRouter} from 'react-router-dom'
import axios from 'axios';
import ChatBoard from './ChatBoard'
 
class ChatsTab extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      chattingOther: null,
      chattingId: null,
    }
    //would be passed in through props later
    // let currentUserId = props.currentUserId; 
    this.currentUserId = "f3e2a8b4-e95e-45f2-a94e-f88833f07383";
    this.userList = [];
    this.chatList = [];
  }
    componentDidMount(){
      this.fetchData();
    }

    fetchData = async () => {
      const result = await axios(
        'http://localhost:8080/api/user/'+this.currentUserId,
        );
        console.log(result.data.chats);
        // this.setState({chatData: result.data.chats});
        this.chatList = result.data.chats;
        this.fecthUserBasedOnChat();
    };

    fecthUserBasedOnChat = async () =>{
      for(let ele of this.chatList){
        const Chat = await axios(
          'http://localhost:8080/api/chat/'+ele,
        );
        // console.log(Chat.data.users);
        let userOther = null;
        if(Chat.data.users[0] != this.currentUserId){
          userOther = await axios(
            'http://localhost:8080/api/user/'+Chat.data.users[0]
          )
        }else{
            userOther = await axios(
              'http://localhost:8080/api/user/'+Chat.data.users[1]
            )
        }
        this.userList.push(userOther.data);
        // console.log("x");  
      }
      this.setState({isLoading: false});
    }

    renderUserList(){
      if(this.userList.length > 0){
        let viewListUser = [];
        this.userList.forEach((item, index) =>{
          viewListUser.push(
            <button key={index}
                    className = {"myclass"}
                    onClick={()=>{
                      // this.props.history.push(`/Chats/${this.chatList[index]}`)
                      this.setState({chattingOther: item.userId, chattingId: this.chatList[index]})
                    }}
            >
              {item.userName}
            </button>
          )
        })
        return viewListUser
      }
    }

    render(){
      return(
        <FixedContainer>
          Chats
          <Picture/>
          {this.chatList?console.log(this.chatList):console.log('nothing')}
          {this.userList?console.log(this.userList):console.log('nothing')}
          {
            this.state.chattingId
            ?
            // <h1>{this.state.chattingId}</h1>
            <ChatBoard chatId={this.state.chattingId} userOtherId={this.state.chattingOther} user={this.currentUserId}/>
            :
            this.renderUserList()
          }
        </FixedContainer>
      )
    }
}



export default withRouter(ChatsTab)
