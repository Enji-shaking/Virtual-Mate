import React from 'react';
import { Box, Setting } from '@material-ui/core';
import Picture from '../Picture'

class Album extends React.Component{
    
    render(){
        const ImgBox = {
            display: 'flex',
            flexWrap: 'wrap',
            width: '80%',
            margin: 'auto'
        };
        const ImgItem = {
            flex: '1 0 21%',
            margin: '5px',
        };
        return(
            <Box>
                <p>Your Album</p>
                <Box style={ImgBox}>
                    <Box style={ImgItem}><Picture/></Box>
                    <Box style={ImgItem}><Picture/></Box>
                    <Box style={ImgItem}><Picture/></Box>
                    <Box style={ImgItem}><Picture/></Box>
                    <Box style={ImgItem}><Picture/></Box>
                    <Box style={ImgItem}><Picture/></Box>
                    <Box style={ImgItem}><Picture/></Box>
                    <Box style={ImgItem}><Picture/></Box>

                    
                </Box>
            </Box>
        )
    }
}

export default Album