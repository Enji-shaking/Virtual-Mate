import React from 'react';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import ReplyIcon from '@material-ui/icons/Reply';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';

export default function TopLayer(props) { 
    const colorStyle = {
        // backgroundImage: 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
        color: '#54BEF5',
        display: 'flex',
    };
    console.log(props.displayType);
    return (
        <Box style={colorStyle}>
            {props.displayType==='logo'?<CloudDoneIcon/>:<IconButton onClick= {() => { this.props.history.goBack(); }}><ReplyIcon/></IconButton>}
            {props.displayType==='logo'?<span>Virtual Mates</span>:<span></span>}
        </Box>
        
    )
 }