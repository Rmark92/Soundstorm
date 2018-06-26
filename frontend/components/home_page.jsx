import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import TrackSortContainer from './tracks/track_sort_container.js';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home-page-contents">
        <div className="track-sort-links">
          <NavLink to="/home/stream" activeClassName="track-sort-selected">Stream</NavLink>
          <NavLink to="/home/charts" activeClassName="track-sort-selected">Charts</NavLink>
          <NavLink to="/home/discover"activeClassName="track-sort-selected">Discover</NavLink>
        </div>
        <TrackSortContainer></TrackSortContainer>
      </div>
    );
  }
}

export default HomePage;
