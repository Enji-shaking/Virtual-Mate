import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FixedContainer from './FixedContainer.js';
import Box from '@material-ui/core/Box';
import Setting from './Setting';
import TopLayer from './TopLayer';
import Picture from './Picture';
import Album from './Album';
import FootPrint from './FootPrint';

function Test() {
  const activities = [{pic: "logo192.png", date: '2000-08-10'},{pic: "logo192.png", date: '2000-08-10'},{pic: "logo192.png", date: '2000-08-10'}];
  return (
    // <Box>
    //   <FixedContainer>
    //     <TopLayer/>
    //     
    //   </FixedContainer>
    // </Box>
    <Box >
      <FixedContainer>
        <TopLayer/>
        <Setting/>
        <Picture radius={'50%'} height = {'80px'}>
          <p>My name</p>
        </Picture>
        <Album/>
        <FootPrint activities={activities} />
      </FixedContainer>
    </Box>
  );
}

ReactDOM.render(<Test />, document.querySelector('#app'));
