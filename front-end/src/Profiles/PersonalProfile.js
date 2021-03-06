import React, { useState, useEffect } from 'react';
import '../index.css';
import FixedContainer from '../FixedContainer.js';
import Avatar from '@material-ui/core/Avatar';
import FootPrint from './FootPrint';
import axios from 'axios';
import Badge from '@material-ui/core/Badge';
import SettingsIcon from '@material-ui/icons/Settings';
import { useHistory } from 'react-router-dom';
import { myFirestore, myStorage } from '../Config/MyFirebase';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import ReactLoading from 'react-loading';

export default function ProfilePage(props) {
  let user = sessionStorage.getItem('id');
  let pass = sessionStorage.getItem('pass');
  const history = useHistory();
  const [profile, setProfile] = useState({
    userName: 'username',
    album: ['url'],
    avatar: 'avatar',
    cardsTime: [
      {
        pic: 'logo192.png',
        date: '2000-08-10',
        id: '3',
        name: 'test',
      },
    ],
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://bmomark.com:8080/api/user/' + user);
      console.log(result);
      setProfile(result.data);
      avatarEdit(result.data.avatar);
    };
    fetchData();
  }, []);

  // const activities = [
  //   { pic: 'logo192.png', name:'', date: '2000-08-10', id: '1' },
  //   { pic: 'logo192.png', name:'', date: '2000-08-10', id: '2' },
  //   { pic: 'logo192.png', name:'', date: '2000-08-10', id: '3' },
  // ];
  const activities = profile.cardsTime;
  
  const [av, avatarEdit] = useState(null);
  function avatarUpload(e) {
    avatarEdit(URL.createObjectURL(e.target.files[0]));
    const uploadFileRef = myStorage.ref().child(user).put(e.target.files[0]);
    uploadFileRef.on(
      'state_changed',
      null,
      () => {
        alert('invalid avatar pic');
      },
      () => {
        uploadFileRef.snapshot.ref.getDownloadURL().then((url) => {
          myFirestore.collection('Users').doc(user).update({ avatar: url });
        });
      }
    );
  }
  // const [al, albumEdit] = useState();
  function albumUpload(e) {
    setIsLoading(true);
    const uploadFileRef = myStorage
      .ref()
      .child(user + '/' + e.target.files[0].name)
      .put(e.target.files[0]);
    uploadFileRef.on(
      'state_changed',
      null,
      (err) => {
        alert('invalid album pic');
      },
      () => {
        uploadFileRef.snapshot.ref.getDownloadURL().then((url) => {
          console.log(url);
          profile.album.push(url);
          myFirestore
            .collection('Users')
            .doc(user)
            .update({ album: profile.album })
            .then(() => history.push(0));
        });
        setIsLoading(false);
      }
    );
  }

  function albumDelete(e) {
    //not deleting file from the storage. Fix later enji
    console.log(e.target.id);
    console.log(e.target.id);
    setIsLoading(true);
    let newAlbum = [];
    profile.album.forEach((element) => {
      if (element !== e.target.id) newAlbum.push(element);
    });
    myFirestore
      .collection('Users')
      .doc(user)
      .update({ album: newAlbum })
      .then((response) => {
        profile.album = newAlbum;
        console.log(response);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }
  return user !== null ? (
    profile ? (
      <FixedContainer>
        <button
          style={{
            maxWidth: '90%',
            position: 'fixed',
            top: '2.5vh',
            right: '3vh',
            background: '#54BEF5',
            fontSize: '0.75em',
            color: 'white',
            padding: '1vw 3vw',
            textTransform: 'none',
            border:'none'
          }}
          onClick={() => history.push(`/Login`)}
        >
          Log Out
        </button>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Badge
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            badgeContent={
              <div className="image-upload">
                <label htmlFor="file-input">
                  <SettingsIcon></SettingsIcon>
                </label>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={avatarUpload}
                />
              </div>
            }
          >
            <Avatar
              src={
                av
                  ? av
                  : null
              }
              style={{ width: '17vw', height: '17vw', margin: '1.5vh' }}
            ></Avatar>
          </Badge>
          Your page
          <div style={{ width: '85vw', margin: '3vh 0' }}>
            Your Album
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                width: '100%',
                height: '60vw',
              }}
            >
              {profile.album ? (
                profile.album.map((photo) => (
                  <div
                    key={photo}
                    style={{
                      width: '30%',
                      height: '50%',
                      margin: '5px',
                      textAlign: 'right',
                    }}
                  >
                    <img
                      style={{
                        width: '100%',
                        height: '80%',
                      }}
                      src={photo}
                    ></img>
                    <IndeterminateCheckBoxOutlinedIcon
                      id={photo}
                      onClick={albumDelete}
                      fontSize="small"
                      style={{ fontSize: '4vw', marginTop: '-5px' }}
                    ></IndeterminateCheckBoxOutlinedIcon>
                  </div>
                ))
              ) : (
                <div></div>
              )}
              {(profile && profile.album && profile.album.length < 6) ||
              !profile.album ? (
                <div
                  style={{
                    backgroundColor: '#C4C4C4',
                    width: '30%',
                    height: '40%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '3%',
                    margin: '5px',
                  }}
                >
                  <label htmlFor="album-input">
                    <AddBoxOutlinedIcon
                      style={{ color: 'white', marginTop: '5px' }}
                    />
                  </label>
                  <input
                    id="album-input"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={albumUpload}
                  />
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div>
            <div style={{ margin: '2.5vh 0' }}>Your Footprints</div>
            <FootPrint activities={activities} />
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
      <div className="viewLoading">
        <ReactLoading
          type={'spin'}
          color={'#203152'}
          height={'10%'}
          width={'10%'}
        />
      </div>
    )
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
        <strong>Profile Page</strong>
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
