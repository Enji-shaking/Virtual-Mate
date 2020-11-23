import React,{useState,useEffect} from 'react';
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
  let tagIds = props.tags ? props.tags : [];
  let user=sessionStorage.getItem('id');
  let pass = sessionStorage.getItem('pass');

  const [tags,setTag]=useState([]);

  let request =[]
  tagIds.forEach(element => {
    request.push(axios.get(`http://bmomark.com:8080/api/card/tag/${element}`));
  });
  
  useEffect(() => {
    const fetchData = async function() {
        const response = await axios.all(request);     
        setTag(response);
    };  
    
      fetchData();
  }, [tagIds]);

  const [image, setImage] = useState(
    {
      imageUrl: 'https://images.pexels.com/photos/5075068/pexels-photo-5075068.jpeg?cs=srgb&dl=pexels-max-avans-5075068.jpg&fm=jpg',
      imageId: 'imageId'
    }
  );
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `http://bmomark.com:8080/api/image/${props.url}`
      );
      if(result.data!=="")
        setImage(result.data.imageUrl);
    };
    fetchData();
  }, [props.url]);

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
      .post('http://bmomark.com:8080/api/user/todo/remove', {
        cardId:id,
        userCred:{"userId":user,
          "password": pass}})
      .then((response) => {
        if (!response) {
          alert('something is wrong');
        }
        window.location.reload();
      }).catch((error)=>console.log(error));
  }
  function complete(){
    axios.post('http://bmomark.com:8080/api/user/todo/mark',{
      cardId:id,
      userCred:{"userId":user,
        "password": pass}
      })
      .then((response)=>{
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
        <img src={image} style={imgStyle}></img>
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
          {tags.map((tag)=>'#'+tag.data.tagName+' ')}
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
