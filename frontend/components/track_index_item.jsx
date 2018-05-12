import React from 'react';
import { Link } from 'react-router-dom';
import PlayButton from './play_button_container';
import { timeSince } from '../util/format_time.js';

const TrackIndexItem = ( {rank, track, artist} ) => {
  return (
    <div className="track-index-item">
      <div className="track-index-item-details">
        <div className="track-index-item-rank">{rank}</div>
        <div className="track-index-item-info">
          <div className="cover-art-small">
            <PlayButton size="medium" trackId={track.id}></PlayButton>
            <img src={track.imageURL} />
          </div>
          <div className="track-index-item-text-details">
            <Link to={`/users/${artist.id}`} className="track-index-item-artist-link">
              {artist.username}
            </Link>
            <Link to={`/tracks/${track.id}`} className="track-index-item-track-link">
              {track.title}
            </Link>
          </div>
        </div>
      </div>
      <div className="track-index-item-data">{timeSince(new Date(track.createdAt))}</div>
    </div>
  );
};

export default TrackIndexItem;
