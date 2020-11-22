import React, { useState, useEffect } from 'react';
import FixedContainer from '../FixedContainer.js';
import { Link, useParams } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import axios from 'axios';
import ReactLoading from 'react-loading';

export default function CardView(props) {
  let { id } = useParams();

  const [usersAvatars, setUsersAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [card, setCard] = useState({
    activityImageId: "f7b48590-8101-491e-b971-62366576f51d",
    activityName: "Say Hello World!"
  });
  const [activityImageUrl, setActivityImageUrl] = useState("https://firebasestorage.googleapis.com/v0/b/mark-test-11011.appspot.com/o/0f3e2a8b4-e95e-45f2-a94e-f88833f07383?alt=media&token=2584f6ff-2525-4274-8fa3-522e92549c18");
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios(`http://localhost:8080/api/card/${id}/users`);
      setUsersAvatars(result.data);
      setIsLoading(false);
    };
    const fetchCardInfo = async () => {
      setIsLoading(true);
      const result = await axios(`http://localhost:8080/api/card/${id}`);
      setCard(result.data);
      setIsLoading(false);
    };

    fetchData();
    fetchCardInfo();
  }, []);

  useEffect(async () => {
    setIsLoading(true);
    console.log(card.activityImageId);
    const result = await axios(`http://localhost:8080/api/image/${card.activityImageId}`);
        // .then(setIsLoading(false));
    setActivityImageUrl(result.data.imageUrl);
    setIsLoading(false);
  }, [card]);

  let user = sessionStorage.getItem('id');
  let pass = sessionStorage.getItem('pass');

  let done = false;
  for (let i = 0; i < usersAvatars.length; i++) {
    if (usersAvatars[i].userId === user) {
      done = true;
      break;
    }
  }

  return (
    <FixedContainer>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ textAlign: 'center', fontSize: '1.3em' }}>{ card.activityName } </div>
        <img
          style={{ maxWidth: '78.5vw', height: 'auto', margin: '15px 0px' }}
          src={activityImageUrl}
        ></img>
        <div style={{ textAlign: 'center', fontSize: '1em' }}>
          Completed By {usersAvatars.length} People
        </div>
        {done ? (
          <div
            className="avatars"
            style={{ display: 'flex', flexWrap: 'wrap' }}
          >
            {usersAvatars.map((avatar) => {
              return (
                <Link
                  to={
                    avatar.userId != user
                      ? `/User/${
                          avatar.userId ? avatar.userId : avatar.toString()
                        }`
                      : '/Profile'
                  }
                  key={avatar.userId ? avatar.userId : avatar.toString()}
                >
                  <Avatar
                    alt={avatar.avatar.toString()}
                    src={
                      avatar.avatar
                        ? avatar.avatar
                        : 'https://material-ui.com/static/images/avatar/1.jpg'
                    }
                    style={{ width: '20vw', height: '20vw', margin: '5vw' }}
                  ></Avatar>
                </Link>
              );
            })}
          </div>
        ) : (
          <div>
            <div
              style={{
                zIndex: '2',
                margin: 'auto',
                maxWidth: '60vw',
                position: 'relative',
                top: '15vh',
                marginTop: '1.5vh',
              }}
            >
              <LockOpenRoundedIcon /> Complete This Activty To View
            </div>
            <div
              style={{
                width: '90vw',
                height: '30vh',
                filter: 'blur(50px)',
                backgroundColor: '#54BEF5',
                opacity: '0.6',
                zIndex: '1',
              }}
            ></div>
          </div>
        )}
      </div>
        {/* Loading */}
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
  );
}
