import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TabBar from './TabBar'

class FixedContainer extends React.Component {
    render(){
    return(
    <React.Fragment >
      <CssBaseline/>
      <Container fixed style={{padding: '0'}}>
        <Typography component="div" style={{width: '100%', marginBottom: '10vh', padding: '5vw', }}>
          {this.props.children}
        </Typography>
        <TabBar/>
      </Container>
    </React.Fragment>);
    };
}
export default FixedContainer;