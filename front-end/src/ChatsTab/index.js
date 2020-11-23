import React, { useState, useEffect, Component } from 'react';
import FixedContainer from '../FixedContainer.js';
import Picture from '../Picture.js';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import ChatBoard from './ChatBoard';
import ReactLoading from 'react-loading';
import './Chat.css';
import ReplyIcon from '@material-ui/icons/Reply';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

class ChatsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      chattingOther: null,
      chattingId: null,
      otherAvatar: null,
      myAvatar: 'I',
      chatName: null,
    };

    this.currentUserId = sessionStorage.getItem('id');
    this.userList = [];
    this.chatList = [];
    this.chatInfoList = [];
    this.requestList = '0';
    // this.history = useHistory();
  }
  componentDidMount() {
    if (this.currentUserId !== null) this.fetchData();
    if (this.currentUserId !== null) this.fatchRequests();
  }

  fatchRequests = async () => {
    const result = await axios.get(
      `http://bmomark.com:8080/api/chat/request?userId=${sessionStorage.getItem(
        'id'
      )}&password=${sessionStorage.getItem('pass')}`
    );
    if (result.data !== '') {
      this.requestList = result.data.length.toString();
      this.setState({ isLoading: false });
    }
  };

  fetchData = async () => {
    const result = await axios(
      'http://bmomark.com:8080/api/user/' + this.currentUserId
    );
    //console.log(result.data.chats);
    // this.setState({chatData: result.data.chats});
    this.chatList = result.data.chats;
    this.myAvatar = result.data.avatar;
    this.fecthUserBasedOnChat();
  };

  fecthUserBasedOnChat = async () => {
    for (let ele of this.chatList) {
      const Chat = await axios('http://bmomark.com:8080/api/chat/' + ele);
      // //console.log(Chat.data.users);
      let userOther = null;
      if (Chat.data.users[0] != this.currentUserId) {
        userOther = await axios(
          'http://bmomark.com:8080/api/user/' + Chat.data.users[0]
        );
      } else {
        userOther = await axios(
          'http://bmomark.com:8080/api/user/' + Chat.data.users[1]
        );
      }
      this.userList.push(userOther.data);
      this.chatInfoList.push({
        lastActiveTimeStamp: Chat.data.lastActiveTimeStamp,
        lastMessage: Chat.data.lastMessage,
      });
    }
    this.setState({ isLoading: false });
  };

  renderUserList() {
    if (this.userList.length > 0) {
      let viewListUser = [];
      this.userList.forEach((item, index) => {
        viewListUser.push(
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin:'5px',
              height:'9vh'
            }}
            key={index}
            onClick={() => {
              this.setState({
                chattingOther: item.userId,
                chattingId: this.chatList[index],
                otherAvatar: item.avatar,
                chatName: item.userName,
              });
            }}
          >
            
              <Avatar
                alt={item.avatar.toString()}
                src={
                  item.avatar!=='f9396883-8b6b-449f-97db-4ce4929b97fe'
                  ? item.avatar
                  : null
                }
                style={{
                  width: '15vw',
                  height: '15vw',
              
                  
                }}
              ></Avatar>
              <strong>{item.userName}</strong>
              <div style={{ marginLeft: '10px',width:'35%',overflow:'hidden'}}>{this.chatInfoList[index]['lastMessage']} </div>

              <span style={{ marginLeft: '30px', fontSize: '0.8em',color:'grey' }}>
                {this.chatInfoList[index]['lastActiveTimeStamp']}
              </span>
            
          </div>
        );
      });
      return viewListUser;
    }
  }

  render() {
    return this.currentUserId !== null ? (
      <div>
        {this.state.chattingId ? (
          <div>
            <div
              style={{
                backgroundColor: '#F8F8F8',
                paddingTop: '5px',
                position: 'fixed',
                zIndex: '10',
                height: '6vh',
                width: '100%',
              }}
            >
              <IconButton
                onClick={() => {
                  this.setState({
                    chattingId: null,
                    otherAvatar:
                      'https://material-ui.com/static/images/avatar/1.jpg',
                    chatName: 'Somebody',
                  });
                }}
              >
                <ReplyIcon style={{ color: '#54BEF5', fontSize: '7vw' }} />
              </IconButton>
              <span style={{ marginLeft: '35vw' }}>{this.state.chatName}</span>
            </div>

            <ChatBoard
              chatId={this.state.chattingId}
              userOtherId={this.state.chattingOther}
              user={this.currentUserId}
              otherAvatar={this.otherAvatar}
              myAvatar={this.myAvatar}
              key={this.state.chattingOther}
            />
          </div>
        ) : (
          <FixedContainer>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '90vw',
                fontSize: '1.4em',
              }}
            >
              <strong>Chat</strong>

              <IconButton
                onClick={() => {
                  this.props.history.push('/Chats/Request');
                }}
              >
                {' '}
                <Avatar
                  style={this.requestList!=='0'?{
                    backgroundColor: 'red',
                    width: '7.6vw',
                    height: '7.6vw',
                  }:{
                  backgroundColor: 'grey',
                  width: '7.6vw',
                  height: '7.6vw',
                }}
                >
                  {this.requestList}
                </Avatar>{' '}
              </IconButton>
            </div>
            <br></br>
            {this.renderUserList()}
          </FixedContainer>
        )}
        {/* Loading */}
        {this.state.isLoading ? (
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
    ) : (
      <FixedContainer>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '90vw',
            fontSize: '1.4em',
          }}
        >
          <strong>Chat</strong>
        </div>
        <button
          onClick={() => (window.location = '/Login')}
          style={{
            backgroundColor: '#54BEF5',
            fontSize: '1em',
            color: 'white',
            padding: '3vw',
            border: 'none',
            marginTop: '30vh',
            width: '100%',
          }}
        >
          You Haven't Logged In, Please Click Me To Log In
        </button>
      </FixedContainer>
    );
  }
}

export default withRouter(ChatsTab);
