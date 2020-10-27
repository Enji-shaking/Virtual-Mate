import React from 'react';
import Box from '@material-ui/core/Box';
import Picture from '../Picture'

class FootPrint extends React.Component{
    constructor(props){
        super(props);
    }
    static defaultProps={
        activities: []
    }
    render(){
        const FlexBox = {
            display: 'flex',
            flexWrap: 'wrap',
            width: '80%',
            alignContent: 'spaceBetween',
            margin: 'auto'
        };
        const FlexItem1 = {
            flex: '1 0 30%',
            // margin: '5px',
        };
        const FlexItem2 = {
            flex: '1 0 40%',
            // margin: '5px',
        };
        const FlexItem3 = {
            flex: '1 0 20%',
            // margin: '5px',
        };
        const activities =  this.props.activities;
        const list = activities.map((activity)=>(
            <li> 
                <Box style={FlexBox}>
                    <Box style={FlexItem1}><Picture src={activity.pic} radius={'50%'}/></Box>
                    <span style={FlexItem3}></span>
                    <span style={FlexItem2}>{activity.date}</span>
                </Box> 
            </li>
        ));
        return(
            <div>
                <p>Your Footprint</p>
                <ul>
                    {list}
                </ul>
            </div>
        )
    }
}
export default FootPrint;