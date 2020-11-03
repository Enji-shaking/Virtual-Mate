import React from 'react';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import ReplyIcon from '@material-ui/icons/Reply';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";

export default function TopLayer(props) { 
    const colorStyle = {
        // backgroundImage: 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
        color: '#54BEF5',
        display: 'flex',
    };
    let history = useHistory();
    return (
        <Box style={colorStyle}>
            {props.displayType!=='return'?<CloudDoneIcon/>:<IconButton onClick= {() => {history.goBack(); }}><ReplyIcon style={{ color: '#54BEF5' }} /></IconButton>}
            {props.displayType!=='return'?<span>Virtual Mates</span>:<span></span>}
        </Box>
        
    )
 }