import React, { useState, useEffect } from 'react';
import FixedContainer from '../FixedContainer.js';
import axios from 'axios';
import moment from 'moment';
import ReactLoading from 'react-loading'
import { useParams } from 'react-router-dom';
import {myFirestore, myStorage} from '../Config/MyFirebase';
import './Chat.css'

export default function ChatBoard(props){

    
    useEffect(()=>{
        console.log("useEffect");
        setIsLoading(true)
        getListHistory()
    },[]);
        
    const [inputValue, setInputValue] = useState("");
    const [listMessage, setlistMessage] = useState([]);
    const [uploadPhoto, setUploadPhoto] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    let listener = null;
    
    //scroll to bottom, which uses ref

    const getListHistory = ()=>{
        setIsLoading(true);
        console.log("getListHistory");
        console.log(listMessage);
        if(listener){
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
                snapshot =>{
                    snapshot.docChanges().forEach(change=>{
                        if(change.type === "added"){
                            listMessage.push(change.doc.data());
                            console.log("change");
                        }
                    })  
                    setIsLoading(false);    
                    console.log(listMessage, "on snapshot");
                },
                err=>{
                    console.log(err);
                }
            )      
    }

    const onKeyboardPress = event =>{
        //if it's enter, send input over    
        if(event.key === 'Enter'){
            onSendMessage(inputValue, 0);
        }

    }

    const onSendMessage = (content, type)=>{
        //type === 0 means message
        //type === 1 means image
        console.log(content);
        if (content.trim() === '') {
            return
        }
        const timestamp = moment()
            .valueOf()
            .toString()
        const itemMessage = {
            idFrom: props.user,
            idTo: props.userOtherId,
            timestamp: timestamp,
            content: content.trim(),
            type: type
        }
        myFirestore
            .collection('myChats')
            .doc(props.chatId)
            .collection(props.chatId)
            .doc(timestamp)
            .set(itemMessage)
            .then(()=>{
                // setInputValue("1");
                setInputValue("");
                if(type==1){
                    setUploadPhoto(null);
                }
                console.log("Success sent a message");
            })
            .catch(err=>{
                console.log(err);
            })

    }
    const renderListMessage = ()=>{
        // console.log("rendering messages");
        // console.log(listMessage);
        if(listMessage.length == 0){
            console.log("renderListMessage no message available");
            return (
                <div className="viewWrapSayHi">
                    <span className="textSayHi">Say hi to new friend</span>
                    {/* <img
                        className="imgWaveHand"
                        src={}
                        alt="wave hand"
                    /> */}
                </div>
            )
        }
        else{
            console.log("renderListMessage YES message available");
            let viewListMessage = []
            listMessage.forEach((item, index) => {
                if(item.idFrom === props.user){
                    if(item.type === 0){
                        viewListMessage.push(
                            <div className="messageItemRight" key={item.timestamp}>
                                <span className="textContentInMessage">{item.content}</span>
                            </div>
                        )
                    }else if(item.type === 1){
                        //image
                        viewListMessage.push(
                            <div className="messageItemRightWithImage" key={item.timestamp}>
                                <img className="imageContentInMessageRight" src={item.content} alt="user's photo"></img>
                            </div>
                        )
                    }
                }else{
                    if(item.type === 0){
                        viewListMessage.push(
                            <div className="messageItemLeft" key={item.timestamp}>
                                <span className="textContentInMessage">{item.content}</span>
                            </div>
                        )
                    }else if(item.type === 1){
                        //image
                        viewListMessage.push(
                            <div className="messageItemLeftWithImage" key={item.timestamp}>
                                <img className="imageContentInMessageLeft" src={item.content} alt="user's photo"></img>
                            </div>
                        )
                    }
                }
            })
            
            return viewListMessage;
        }
    }
    // content: "Message 4"
    // idFrom: "0f1f08d3-8d63-4148-81e4-1d6e1c267f90"
    // idTo: "f3e2a8b4-e95e-45f2-a94e-f88833f07383"
    // timestamp: "1605779374781"
    // type: 0  
    const onChoosePhoto = eve =>{
        if(eve.target.files && eve.target.files[0]){
            // console.log(eve.target.files[0]);
            setUploadPhoto(eve.target.files[0]);
        }else{
            console.log("Didn't select an image");
        }
    }

    const onUploadingPhoto = ()=>{
        setIsLoading(true);
        // console.log(uploadPhoto);
        document.getElementById("onMessageSendImage").value = "";
        if(uploadPhoto){
            const timestamp = moment().valueOf().toString();
            const uploadFileRef = myStorage
                                    .ref()
                                    .child(timestamp)
                                    .put(uploadPhoto);

            uploadFileRef.on("state_changed",
                null,
                err =>{
                    setIsLoading(false);
                    console.log("Upload failed: ", err);
                }, 
                ()=>{
                    uploadFileRef.snapshot.ref.getDownloadURL().then(url=>{
                        setIsLoading(false);
                        // console.log(url);
                        onSendMessage(url, 1);
                    })
                }
            )
        }else{
            console.log("no image available");
        }

    }

    return(
        <div className="viewChatBoard">
            {/* {props.chatId}
            <br></br>
            {props.userOtherId} */}
            <div className="viewListMessage">
                {renderListMessage()}
            </div>

            <input
                className="viewInput"
                placeholder="Type your message..."
                value={inputValue}
                onChange={event => {
                    setInputValue(event.target.value)
                }}
                onKeyPress={onKeyboardPress}
            />
            <div className="viewBottom">
                <input type="file" id="onMessageSendImage" name="onMessageSendImage"
                    accept="image/*" onChange={onChoosePhoto}/>
                <button onClick = {onUploadingPhoto}>Send file</button>
            </div>
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