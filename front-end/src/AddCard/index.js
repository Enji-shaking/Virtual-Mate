import React, { useState } from 'react';
import FixedContainer from '../FixedContainer';
import { Box, Button, Icon } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function AddCard(props) {
  const history = useHistory();
  const cardStyle = {
    border: '0.5vw dashed #54BEF5',
    borderRadius: '12%',
    width: '61.5vw',
    height: '80vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '20px',
    margin: '30px',
    marginBottom: '5px',
    textAlign: 'left',
  };
  const buttonStyle = {
    backgroundColor: '#54BEF5',
    color: 'white',
    width: '30vw',
    textTransform: 'lowercase',
    fontSize: '1.1em',
    padding: '5px',
  };

  const inputStyle = {
    border: '0',
    borderBottom: '1px solid',
    outline: '0',
    width: '90%',
    marginTop: '15px',
  };

  const [name, setName] = useState('');
  const [tag, setTag] = useState('');

  function empty() {
    setName('');
    setTag('');
    changeImg(null);
  }
  const [error, setError] = useState(false);

  function post() {
    let tags = [];
    try {
      if (tag.trim.length != 0) tags = tag.trim().split(',');
    } catch (e) {
      setError(true);
      return;
    }
    let tagLength = 0;
    tags.forEach((t) => (tagLength += t.length));

    if (
      img == null ||
      name.trim().length == 0 ||
      name.trim().length > 15 ||
      tagLength > 35
    ) {
      setError(true);
      return;
    }
    const userId='f3e2a8b4-e95e-45f2-a94e-f88833f07383';
    const password='123456'
    
    const photoFormData = JSON.stringify(
      {userCred:{userId:userId,password:password},card:{"cardName":name},
    "tags": {tags}});
    console.log(photoFormData);

    // axios({
    //   method: "POST",
    //   url: 'http://localhost:8080/api/cards/create',
    //   data: photoFormData,
    //   headers: {
    //     'Content-Type': 'multipart/form-data; boundary=${form._boundary}'
    //   }
    // });

    // history.push('/');
  }
  const [img, changeImg] = useState(null);
  function handleChange(e) {
    changeImg(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <FixedContainer displayType="return">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '2vh',
        }}
      >
        <div style={{ textAlign: 'center', fontSize: '1.5em' }}>Add A Card</div>
        <div style={cardStyle}>
          <div style={{ textAlign: 'left', width: '85%' }}>Card Name:</div>
          <input
            type="text"
            value={name}
            style={inputStyle}
            onChange={(e) => setName(e.target.value)}
          />
          <div
            style={{
              backgroundColor: 'lightgrey',
              width: '80%',
              height: '35%',
              margin: '25px',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {img ? (
              <img src={img} style={{ width: '100%', height: '100%' }}></img>
            ) : (
              <input
                accept="image/*"
                type="file"
                onChange={handleChange}
                style={{ color: 'transparent', width: '90px', height: 'auto' }}
              ></input>
            )}{' '}
          </div>
          <div style={{ textAlign: 'left', width: '85%' }}>Tag:</div>
          <input
            value={tag}
            type="text"
            style={inputStyle}
            onChange={(e) => setTag(e.target.value)}
          />
        </div>
        <div style={error ? { color: 'red' } : { visibility: 'hidden' }}>
          Wrong Format, please fix
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '85%',
            margin: '10px',
          }}
        >
          <Button style={buttonStyle} onClick={empty}>
            Empty
          </Button>
          <Button style={buttonStyle} onClick={post}>
            Add
          </Button>
        </div>
        <div style={{ fontSize: '2.5vw' }}>
          {' '}
          Note:<br></br> Card Name has to be within 15 charaters; Tags shall be
          entered seperated by ',' no white space after comma, and the characters shall be within 35 (excluding comma)
        </div>
      </div>
    </FixedContainer>
  );
}
