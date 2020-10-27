import React from 'react';
import ReactDOM from 'react-dom';
import SettingsIcon from '@material-ui/icons/Settings';

class Setting extends React.Component{
    
    handlePageChange(){
        window.location.href = "#"
    }
    render(){
        return <SettingsIcon onClick={this.handlePageChange} style={{position: 'absolute', top: '4%', right: '4%'}}/>
    }
}

export default Setting