import React, { useState, useEffect }from 'react';
import { Box, Setting } from '@material-ui/core';
import Picture from '../Picture' 
import axios from 'axios';
export default function Album(props){
    
    let album = props.profile.album;

    const ImgBox = {
        display: 'flex',
        flexWrap: 'wrap',
        width: '95%',
        paddingTop:'2vh',
        margin:'auto',
    };
    const ImgItem = {
        flex: '1 0 30%',
        margin: '5px',
    };
    return(
        <Box style={ImgBox}>
            {album.map((each) => 
                <Box key={each} style={ImgItem}><Picture url={each}/></Box>
            )}
        </Box>

    )  
}

