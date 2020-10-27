import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
// import RestoreIcon from '@material-ui/icons/Restore';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import LocationOnIcon from '@material-ui/icons/LocationOn';
import {Home, Check, Chat, AccountBox} from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    width: 400,
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
      style={{position: 'fixed', bottom: '0', width: '100%', height:'10vh'}}
    >
      <BottomNavigationAction label="Recents" icon={<Home />} />
      <BottomNavigationAction label="Favorites" icon={<Check />} />
      <BottomNavigationAction label="Nearby" icon={<Chat />} />
      <BottomNavigationAction label="Nearby" icon={<AccountBox />} />
    </BottomNavigation>
  );
}