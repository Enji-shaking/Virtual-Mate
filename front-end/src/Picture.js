import React from 'react';
import ReactDOM from 'react-dom';
import Box from '@material-ui/core/Box';

class Picture extends React.Component{
    constructor(props){
        super(props);
    }
    static defaultProps = {
        width: "21%",
        height: "50px"
    }
    render(){
        const myStyle={
            margin: 'auto',
            display: 'inlineBlock',
            height: this.props.height,
            backgroundColor: 'white',
            borderRadius: this.props.radius
        };
        return(
            <Box style={{textAlign: 'center'}}>
                <img src="logo192.png" style={myStyle}></img>
                {this.props.children}
            </Box>
        )
    }
}
export default Picture;