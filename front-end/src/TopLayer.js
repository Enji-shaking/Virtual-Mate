import React from 'react';
import {Cloud, CheckCircleOutline} from '@material-ui/icons';
import Box from '@material-ui/core/Box';

export default function TopLayer() { 
    const colorStyle = {
        // backgroundImage: 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
        color: '#a18cd1',
        display: 'flex'
    };
    return (
        <Box style={colorStyle}>
            <Cloud/>
            {/* <CheckCircleOutline style={{position: 'relative', right: '5%'}} /> */}
            <span>Virtual Mates</span>
        </Box>
        
    )
 }