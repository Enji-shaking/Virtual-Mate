import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
class FootPrint extends React.Component {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    activities: [],
  };
  render() {
    const activities = this.props.activities;

    const list = activities.map((activity) => (
      <Link key={activity.id} to={`/ActivityCard/${activity.id}`} style={{ textDecoration: 'none',color:'black'}}>
        <div
          key={activity.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '85vw',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={activity.pic} alt={activity.id} />
            <div
              style={{ padding: '0px 5vw', fontSize: '1em', fontWeight: '500' }}
            >
              {' '}
              {'Activity' + activity.id}
            </div>
          </div>
          <div style={{ fontSize: '0.6em' }}> {activity.date}</div>
        </div>
      </Link>
    ));
    return <div>{list}</div>;
  }
}
export default FootPrint;
