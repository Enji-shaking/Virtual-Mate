import React from 'react';
import { Button, IconButton, ButtonBase } from '@material-ui/core';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import { Link, useHistory } from 'react-router-dom';
import Popover from '@material-ui/core/Popover';
import axios from 'axios';
export default function ToDoCard(props) {
  const history = useHistory();
  const cardStyle = {
    border: '0.5vw dashed #54BEF5',
    borderRadius: '12%',
    width: '35vw',
    height: '50vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1.3vw',
    margin: '3.6vw 4.8vw',
  };

  const imgStyle = {
    width: '21vw',
    height: '21vw',
    position: 'center',
  };

  let cardName = props.cardName ? props.cardName : 'Title';
  let id = props.id ? props.id : '1';
  let tags = props.tags ? props.tags : ['#tag1 #tag2 #tag3 #tag4 #tag5 #tag6'];
  let url = props.url ? props.url : '/logo192.png';
  let userId = null;
  let pass = null;

  const [Delete, setDelete] = React.useState(null);
  const [Complete, setComplete] = React.useState(null);

  const handleDeleteClose = () => {
    setDelete(null);
  };

  const handleCompleteClose = () => {
    setComplete(null);
  };

  const Deleteopen = Boolean(Delete);
  const Deleteid = Deleteopen ? 'delete' : undefined;
  const Completeopen = Boolean(Complete);
  const completeId = Completeopen ? 'complete' : undefined;

  function deleteTodo() {
    axios
      .post('http://localhost:8080/api/user/todo/remove', {
        cardId: id,
        userId: userId,
        userHashedPass: pass
      })
      .then((response) => {
        if (!response) {
          alert('something is wrong');
        }
        history.push('/ToDoList');
      });
  }
  function complete(){
    axios.post('http://localhost:8080/api/user/todo/mark',{
      cardId:id,
      userId: userId,
      userHashedPass: pass
    }).then((response)=>{
      if(!response){
        alert('something is wrong');
      }
    });
    history.push(`/Completed/${id}`);
  }
  return (
    <Link
      to={`/ActivityCard/${id}`}
      style={{ textDecoration: 'none', color: 'black' }}
    >
      <div style={cardStyle}>
        <div className="title" style={{ fontSize: '4.3vw' }}>
          {cardName}
        </div>
        <img src={url} style={imgStyle}></img>
        <div
          className="tags"
          style={{
            width: '90%',
            height: '18%',
            wordWrap: 'break-word',
            margin: '0.5vw 0vw 1.8vw 0vw ',
            fontSize: '3vw',
            textAlign: 'center',
          }}
        >
          {tags.map((tag) => tag+' ')}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '90%',
            margin: 'auto',
          }}
        >
          {/* rerender the whole page once deleted */}
          <IconButton
            style={{ padding: '0' }}
            onClick={(e) => {
              e.preventDefault();
              setDelete(e.currentTarget);
            }}
          >
            <DeleteSweepIcon
              style={{ color: '#DB5353', fontSize: '1.4em' }}
            ></DeleteSweepIcon>
          </IconButton>

          <Popover
            id={Deleteid}
            open={Deleteopen}
            anchorEl={Delete}
            onClose={handleCompleteClose}
            anchorOrigin={{
              vertical: 'left',
              horizontal: 'left',
            }}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <div
              style={{
                padding: '5px',
                backgroundColor: '#54BEF5',
                color: 'white',
                textAlign: 'center',
              }}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Delete This Card?
              <div>
                <Button style={{ color: 'white' }} onClick={deleteTodo}>
                  Yes
                </Button>
                <Button
                  style={{ color: 'white' }}
                  onClick={() => setDelete(null)}
                >
                  No
                </Button>
              </div>
            </div>
          </Popover>

          <IconButton
            style={{ padding: '0' }}
            onClick={(e) => {
              e.preventDefault();
              setComplete(e.currentTarget);
            }}
          >
            <AssignmentTurnedInOutlinedIcon
              style={{ color: '54BEF5', fontSize: '1.4em' }}
            />
          </IconButton>

          <Popover
            id={completeId}
            open={Completeopen}
            anchorEl={Complete}
            onClose={handleDeleteClose}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <div
              style={{
                padding: '5px',
                backgroundColor: '#54BEF5',
                color: 'white',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Completed?
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ButtonBase
                 onClick={complete}
                  style={{ color: 'white', margin: '5px 15px' }}
                >
                  YES
                </ButtonBase>
                <ButtonBase
                  style={{ color: 'white', margin: '5px 15px' }}
                  onClick={() => setComplete(null)}
                >
                  NO
                </ButtonBase>
              </div>
            </div>
          </Popover>
        </div>
      </div>
    </Link>
  );
}
