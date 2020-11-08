import React from 'react';
import Avatar from '@material-ui/core/Avatar';

class FootPrint extends React.Component {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    activities: [],
  };
  render() {
    const FlexBox = {
      display: 'flex',
      flexWrap: 'wrap',
      width: '80%',
      alignContent: 'spaceBetween',
      margin: 'auto',
    };

    const activities = this.props.activities;

    const list = activities.map((activity) => (
      <div
        key={activity.id}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '80vw',
        }}
      >
        <div style={{display:'flex',alignItems:'center'}}>
        <Avatar src={activity.pic} alt={activity.id} />
        <div style={{padding: '10px'}}> {'Activity' + activity.id}</div>
        </div>
        <div style={{}}> {activity.date}</div>
      </div>
    ));
    return (
      <div>
        <p>Your Footprint</p>
       {list}
      </div>
    );
  }
}
export default FootPrint;
