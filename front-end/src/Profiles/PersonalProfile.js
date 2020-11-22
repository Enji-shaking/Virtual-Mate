import React,{useState,useEffect} from 'react';
import '../index.css';
import FixedContainer from '../FixedContainer.js';
import Avatar from '@material-ui/core/Avatar';
import Album from './Album';
import FootPrint from './FootPrint';
import axios from 'axios';
export default function ProfilePage(props) {
  // let user = sessionStorage.getItem('id');
  // let pass = sessionStorage.getItem('pass');
  let user = "f3e2a8b4-e95e-45f2-a94e-f88833f07383";
  let pass = "123456"
  const history = useHistory();
  const [profile, setOther] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://bmomark.com:8080/api/user/' + user);
      console.log(result);
      setOther(result.data);
    };
    fetchData();
  }, []);

  // const activities = [
  //   { pic: 'logo192.png', date: '2000-08-10', id: '1' },
  //   { pic: 'logo192.png', date: '2000-08-10', id: '2' },
  //   { pic: 'logo192.png', date: '2000-08-10', id: '3' },
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
  const [al, albumEdit] = useState();
  function albumUpload(e) {
    albumEdit(e.target.files[0]);
    const uploadFileRef = myStorage.ref().child(user+'/'+e.target.files[0].name).put(e.target.files[0]);
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
      }
    );
 
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
        <Avatar
          src={user.Avatar?user.Avatar:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSeKZbcVtvtJKKvj5jnN11zgX82gll4TsnmFg&usqp=CAU'
        }
          style={{ width: '17vw', height: '17vw', margin: '1.5vh' }}
        ></Avatar>
        Your page
        <div style={{ width: '85vw', marginTop: '5vh' }}>
          Your Album
          <Album profile={profile} />
        </div>
        <div>
          <div style={{ margin: '2.5vh 0' }}>Your Footprints</div>
          <FootPrint activities={activities} />
        </div>
      </div>
    </FixedContainer>
  );
}
