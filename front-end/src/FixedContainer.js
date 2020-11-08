import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TabBar from './TabBar'
import TopLayer from './TopLayer';
import { Divider } from '@material-ui/core';

class FixedContainer extends React.Component {
    render(){
    return(
    <React.Fragment >
        <TopLayer displayType={this.props.displayType}/>
      <CssBaseline/>
      <Container fixed style={{padding: '0',color:'#4F4F4F'}}>
        <div style={{width: '100%', marginBottom: '10vh', padding: '5vw',color:'#4F4F4F'}}>
          {this.props.children}
        </div>
        <TabBar/>
      </Container>
    </React.Fragment>);
    };
}
export default FixedContainer;