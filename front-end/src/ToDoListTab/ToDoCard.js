import React from "react";
import { Button, IconButton,ButtonBase } from "@material-ui/core";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import { Link } from "react-router-dom";
import Popover from '@material-ui/core/Popover';

export default function ToDoCard(props) {
  const cardStyle = {
    border: "0.5vw dashed #54BEF5",
    borderRadius: "12%",
    width: "35vw",
    height: "56vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1.2vw",
    margin: "3.6vw 4.8vw",
  };

  const imgStyle = {
    width: "21vw",
    height: "21vw",
    position: "center",
    margin: "1.2vw",
  };

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
  const Completeopen= Boolean(Complete);
  const completeId=Completeopen ? 'complete' : undefined;
  
  return (
    <Link to="/PlInCard?status=1" style={{textDecoration:'none',color:'black'}}>
      <div style={cardStyle}>
        <div className="title" style={{fontSize: '4.3vw'}}>Title</div>
        <img src="../logo192.png" style={imgStyle}></img>
        <div
          className="tags"
          style={{
            width: "90%",
            height: "29%",
            wordWrap: "break-word",
            margin: "1.2vw",
            fontSize: "3vw",
          }}
        >
          #tag1#tag1#tag1#tag1
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "90%",
            margin: "auto",
          }}
        >
          {/* rerender the whole page once deleted */}
          <IconButton style={{ padding: "0" }} onClick={
                (e) => { 
                  e.preventDefault();
                  setDelete(e.currentTarget);
              }
              }>
            <DeleteSweepIcon
              style={{ color: "#DB5353", fontSize: "1.4em" }}
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
        onClick={
          (e) => { 
            e.preventDefault();
        }
        }
      >
        <div style={{padding:'5px',backgroundColor: '#54BEF5',color:'white',textAlign:'center'}} onClick={(e)=>{e.preventDefault()}}>
          Delete This Card?
          <div>
            <Button style={{color:'white'}} onClick={(e)=>{console.log('yes');}}>Yes</Button>
            <Button style={{color:'white'}} onClick={()=>setDelete(null)}>No</Button>
          </div>
        </div>
      </Popover>

          <IconButton style={{ padding: "0" }} onClick={
                (e) => { 
                  e.preventDefault();
                  setComplete(e.currentTarget);
              }
              }>
            <AssignmentTurnedInOutlinedIcon
              style={{ color: "54BEF5", fontSize: "1.4em" }}
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
        
        onClick={
          (e) => { 
            e.preventDefault();
        }
        }
      >
        <div style={{padding:'5px',backgroundColor: '#54BEF5',color:'white',textAlign:'center',display:'flex',flexDirection:'column',alignItems: 'center'}} onClick={(e)=>{e.preventDefault()}}>
           Completed?
          <div style={{display: 'flex',justifyContent:'center'}}>
            <ButtonBase component={Link} to='/PlInCard' style={{color:'white',margin: '5px 15px'}} >YES</ButtonBase>
            <ButtonBase style={{color:'white', margin: '5px 15px'}} onClick={()=>setComplete(null)}>NO</ButtonBase>
          </div>
        </div>
      </Popover>

        </div>
      </div>
    </Link>
  );
}
