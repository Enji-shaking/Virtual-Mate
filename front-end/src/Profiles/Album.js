import React from 'react';
import { Box, Setting } from '@material-ui/core';
import Picture from '../Picture'

class Album extends React.Component{
    
    render(){
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
                    <Box style={ImgItem}><Picture/></Box>
                    <Box style={ImgItem}><Picture/></Box>
                    <Box style={ImgItem}><Picture/></Box>
                    <Box style={ImgItem}><Picture/></Box>
                    <Box style={ImgItem}><Picture/></Box>
                    <Box style={ImgItem}><Picture/></Box>
                </Box>
       
        )
    }
}

export default Album