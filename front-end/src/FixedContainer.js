import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SimpleBottomNavigation from './SimpleBottomNavigation'

class FixedContainer extends React.Component {
    render(){
    return(
    <React.Fragment>
      <CssBaseline style={{padding: '0'}}/>
      <Container fixed style={{padding: '0'}}>
        <Typography component="div" style={{width: '100%', margin: '0', padding: '0', paddingBottom: '15vh'}}>
          {this.props.children}
        </Typography>
        <SimpleBottomNavigation/>
      </Container>
    </React.Fragment>);
    };
}
export default FixedContainer;