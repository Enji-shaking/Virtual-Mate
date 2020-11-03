import React from 'react';
import FixedContainer from '../FixedContainer.js';
import GalleryCard from './GalleryCard';
import SearchIcon from '@material-ui/icons/Search';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';

export default function GalleryTab(props) {
  const displayStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };
  const searchBar = {
    border: '1px solid #54BEF5',
    boxSizing: 'border-box',
    borderRadius: '5px',
    width:'50vw',
    height: '24px'
  };
  return (
    <FixedContainer displayType='logo'>

      <div style={{display: "flex",alignItems: "center", justifyContent:"space-between", width:"90vw",fontSize:'1.4em'}}>
        <strong>Gallery</strong>
        <div style={{display: "flex",alignItems: "center"}}>
        <input type="text" placeholder="Search.." style={searchBar} />
        <SearchIcon style={{ color: '#54BEF5' }} />
        </div>
      </div>

      <div style={{display:'flex',justifyContent:'flex-end',marginTop:'6px'}}>
      <IconButton style={{padding:'0'}} href='/AddActivity'> <AddBoxIcon style={{color:'#54BEF5'}} ></AddBoxIcon></IconButton>
      </div>
      <div className="cardDisplay" style={displayStyle}>
        <GalleryCard canAdd={true} />
        <GalleryCard canAdd={true} />
        <GalleryCard canAdd={false} />
        <GalleryCard canAdd={true} />
        <GalleryCard canAdd={true} />
        <GalleryCard canAdd={true} />
        <GalleryCard canAdd={false} />
        <GalleryCard canAdd={true} />
      </div>
    </FixedContainer>
  );
}
