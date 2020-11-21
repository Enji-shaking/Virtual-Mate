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

    fecthUserBasedOnChat = async () =>{
      for(let ele of this.chatList){
        const Chat = await axios(
          'http://localhost:8080/api/chat/'+ele,
        );
        console.log(Chat);
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
        <div>
            {
              this.state.chattingId
              ?
              // <h1>{this.state.chattingId}</h1>
              <div>
                <button key={0} className={"BackButton"} onClick={()=>{
                  this.setState({chattingId: null})
                }}>Back</button>
                <ChatBoard chatId={this.state.chattingId} userOtherId={this.state.chattingOther} user={this.currentUserId}/>
              </div>
              :
              <FixedContainer>
                Chats
                <Picture/>
                {this.renderUserList()}
              </FixedContainer>
            }
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
      )
    }
}

