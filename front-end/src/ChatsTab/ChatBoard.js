import React, { useState, useEffect } from 'react';
import FixedContainer from '../FixedContainer.js';
import axios from 'axios';
import moment from 'moment';
import ReactLoading from 'react-loading';
import { useParams } from 'react-router-dom';
import { myFirestore, myStorage } from '../Config/MyFirebase';
import './Chat.css';
import Avatar from '@material-ui/core/Avatar';
import PanoramaIcon from '@material-ui/icons/Panorama';
import SendIcon from '@material-ui/icons/Send';
export default function ChatBoard(props) {
  useEffect(() => {
    // console.log('useEffect');
    setIsLoading(true);
    getListHistory();
    scrollToBottom();
  }, []);

  const [inputValue, setInputValue] = useState('');
  const [listMessage, setlistMessage] = useState([]);
  const [uploadPhoto, setUploadPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [messagesEnd, setMessagesEnd] = useState(null);
  let listener = null;

  //scroll to bottom, which uses ref

  const getListHistory = () => {
    setIsLoading(true);
    // console.log('getListHistory');
    // console.log(listMessage);
    if (listener) {
      listener();
    }
    // setlistMessage([]);
    listMessage.length = 0;
    setIsLoading(true);
    listener = myFirestore
      .collection('myChats')
      .doc(props.chatId)
      .collection(props.chatId)
      .onSnapshot(
        (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
              listMessage.push(change.doc.data());
              // console.log('change');
            }
          });
          setIsLoading(true);
          setIsLoading(false);
          // console.log(listMessage, 'on snapshot');
        },
        (err) => {
          console.log(err);
        }
      );
  };

  const onKeyboardPress = (event) => {
    //if it's enter, send input over
    if (event.key === 'Enter') {
      onSendMessage(inputValue, 0);
    }
  };

  const onSendMessage = (content, type) => {
    //type === 0 means message
    //type === 1 means image
    // console.log(content);
    if (content.trim() === '') {
      return;
    }
    const timestamp = moment().valueOf().toString();
    const itemMessage = {
      idFrom: props.user,
      idTo: props.userOtherId,
      timestamp: timestamp,
      content: content.trim(),
      type: type,
    };
    myFirestore
      .collection('myChats')
      .doc(props.chatId)
      .collection(props.chatId)
      .doc(timestamp)
      .set(itemMessage)
      .then(() => {
        setInputValue('');
        if (type == 1) {
          setUploadPhoto(null);
        }
        // console.log('Success sent a message');
      })
      .then(
        // console.log(new Date().toLocaleDateString())
        myFirestore
          .collection('myChats')
          .doc(props.chatId)
          .update({
            lastActiveTimeStamp: new Date().toLocaleDateString(),
            lastMessage: content.trim()
          })
      )
      .catch((err) => {
        console.log(err);
      });
    
    


  };
  const renderListMessage = () => {
    // console.log("rendering messages");
    // console.log(listMessage);
    if (listMessage.length == 0) {
      // console.log('renderListMessage no message available');
      return (
        <div style={{marginTop:'5vh',textAlign:'center'}}>
          <div >Say hi to new friend</div>
        </div>
      );
    } else {
      // console.log('renderListMessage YES message available');
      let viewListMessage = [];
      listMessage.forEach((item, index) => {
        if (item.idFrom === props.user) {
          if (item.type === 0) {
            viewListMessage.push(
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  alt={props.myAvatar}
                  src={
                    props.myAvatar !=='f9396883-8b6b-449f-97db-4ce4929b97fe'
                    ? props.myAvatar
                    : null
                  }
                  style={{ width: '10vw', height: '10vw', marginRight: '5vw' }}
                ></Avatar>
                <div className="messageItemRight" key={item.timestamp}>
                  <span className="textContentInMessage">{item.content}</span>
                </div>
              </div>
            );
          } else if (item.type === 1) {
            //image
            viewListMessage.push(
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  alt={props.myAvatar}
                  src={
                    props.myAvatar !=='f9396883-8b6b-449f-97db-4ce4929b97fe'
                    ? props.myAvatar
                    : null
                  }
                  style={{ width: '10vw', height: '10vw', marginRight: '5vw' }}
                ></Avatar>
                <div className="messageItemRightWithImage" key={item.timestamp}>
                  <img
                    className="imageContentInMessageRight"
                    src={item.content}
                    alt="user's photo"
                  ></img>
                </div>
              </div>
            );
          }
        } else {
          if (item.type === 0) {
            viewListMessage.push(
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  alt={props.otherAvatar}
                  src={
                    props.otherAvatar
                      ? props.otherAvatar!=='f9396883-8b6b-449f-97db-4ce4929b97fe'
                      : null
                  }
                  style={{ width: '10vw', height: '10vw', margin: '5vw' }}
                ></Avatar>
                <div className="messageItemLeft" key={item.timestamp}>
                  <span className="textContentInMessage">{item.content}</span>
                </div>
              </div>
            );
          } else if (item.type === 1) {
            //image
            viewListMessage.push(
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  alt={props.otherAvatar}
                  src={
                    props.otherAvatar !=='f9396883-8b6b-449f-97db-4ce4929b97fe'
                      ? props.otherAvatar
                      : null
                  }
                  style={{ width: '10vw', height: '10vw', margin: '0 5vw' }}
                ></Avatar>
                <div className="messageItemLeftWithImage" key={item.timestamp}>
                  <img
                    className="imageContentInMessageLeft"
                    src={item.content}
                    alt="user's photo"
                  ></img>
                </div>
              </div>
            );
          }
        }
      });

      return viewListMessage;
    }
  };

  const onChoosePhoto = (eve) => {
    if (eve.target.files && eve.target.files[0]) {
      // console.log(eve.target.files[0]);
      setUploadPhoto(eve.target.files[0]);
    } else {
      console.log("Didn't select an image");
    }
  };

  const onUploadingPhoto = () => {
    setIsLoading(true);
    // console.log(uploadPhoto);
    document.getElementById('onMessageSendImage').value = '';
    if (uploadPhoto) {
      const timestamp = moment().valueOf().toString();
      const uploadFileRef = myStorage.ref().child(timestamp).put(uploadPhoto);

      uploadFileRef.on(
        'state_changed',
        null,
        (err) => {
          setIsLoading(false);
          console.log('Upload failed: ', err);
        },
        () => {
          uploadFileRef.snapshot.ref.getDownloadURL().then((url) => {
            setIsLoading(false);
            // console.log(url);
            onSendMessage(url, 1);
          });
        }
      );
    } else {
      onSendMessage(inputValue, 0);
    }
  };
  
  const scrollToBottom = () => {
    if (messagesEnd) {
        messagesEnd.scrollIntoView({})
    }
  }
  return (
    <div className="viewChatBoard">
      <div className="viewListMessage">
        {renderListMessage()}
        <div
            style={{float: 'left', clear: 'both'}}
            ref={el => {
                setMessagesEnd(el)
            }}
        />
      </div>
      <div
        style={{
          position: 'fixed',
          bottom: '0',
          width: '100%',
          height: '10vh',
          backgroundColor: '#54BEF5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <input
          className="viewInput"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          style={{ border: 'none', height: '3.9vh', width: '50vw' }}
          onKeyPress={onKeyboardPress}
        />
        <div className="image-upload">
          <label
            htmlFor="onMessageSendImage"
            style={{ position: 'relative', top: '2px' }}
          >
            <PanoramaIcon style={{ color: 'white' }}></PanoramaIcon>
          </label>
          <input
            type="file"
            id="onMessageSendImage"
            name="onMessageSendImage"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={onChoosePhoto}
          />
        </div>
        <SendIcon
          onClick={onUploadingPhoto}
          style={{ color: 'white', height: '3.6vh' }}
        ></SendIcon>

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
    </div>
  );
}
