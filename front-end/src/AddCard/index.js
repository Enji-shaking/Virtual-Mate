import React, { useState } from 'react';
import FixedContainer from '../FixedContainer';
import { Box, Button, Icon } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { myFirestore, myStorage } from '../Config/MyFirebase';

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
  const [isLoading, setIsLoading] = useState(false);
  function post() {
    let tags = [];

    try {
      if (tag.trim().length != 0) tags = tag.trim().split(',');
    } catch (e) {
      setError(true);
      return;
    }
    let tagLength = 0;
    tags.forEach((t) => {
      if (t === '') {
        setError(true);
        return;
      }
      tagLength += t.length;
    });

    if (
      img == null ||
      name.trim().length == 0 ||
      name.trim().length > 15 ||
      tagLength > 35
    ) {
      setError(true);
      return;
    }

    setIsLoading(true);
    myFirestore
      .collection('Images')
      .add({})
      .then((result) => {
        const uploadFileRef = myStorage.ref().child(result.id).put(img);
        uploadFileRef.on(
          'state_changed',
          null,
          () => {
            setIsLoading(false);
            setError(true);
          },
          () => {
            uploadFileRef.snapshot.ref.getDownloadURL().then((url) => {
              myFirestore
                .collection('Images')
                .doc(result.id)
                .set({ imageId: result.id, imageUrl: url });

              axios
                .post('http://localhost:8080/api/card/create', {
                  userCred: {
                    userId: sessionStorage.getItem('id'),
                    password: sessionStorage.getItem('pass'),
                  },
                  card: { cardName: name, imageId: result.id },
                  tags: tags,
                })
                .then(() => history.push('/'))
                .catch(() => {
                  setError(true);
                  setIsLoading(false);
                });
            });
          }
        );
      })
      .catch(() => setError(true));
  }
  const [img, changeImg] = useState(null);

  function handleChange(e) {
    changeImg(e.target.files[0]);
  }
  return sessionStorage.getItem('id') !== null ? (
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
              <img
                src={URL.createObjectURL(img)}
                style={{ width: '100%', height: '100%' }}
              ></img>
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
          entered seperated by ',' no white space after comma, and the
          characters shall be within 35 (excluding comma)
        </div>
      </div>
      {isLoading ? (
        <div className="viewLoading">
          <ReactLoading
            type={'spin'}
            color={'#203152'}
            height={'10%'}
            width={'10%'}
          />
        </div>
      ) : null}
    </FixedContainer>
  ) : (
    <FixedContainer>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '90vw',
          fontSize: '1.4em',
        }}
      >
        <strong>Add Activity Card</strong>
      </div>
      <button
        onClick={() => (window.location = '/Login')}
        style={{
          backgroundColor: '#54BEF5',
          fontSize: '1em',
          color: 'white',
          padding: '3vw',
          border: 'none',
          marginTop: '30vh',
          width: '100%',
        }}
      >
        You Haven't Logged In, Please Click Me To Log In
      </button>
    </FixedContainer>
  );
}
