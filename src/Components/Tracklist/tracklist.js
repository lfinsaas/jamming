import React from 'react';
import './tracklist.css';

import Track from '../Track/track';

class Tracklist extends React.Component {
  render() {
        return (
          <div className="TrackList">
          { this.props.tracks.map(track =>
              { return <Track
                  track={track}
                  onAdd={this.props.onAdd}
                  onRemove={this.props.onRemove} 
                  isRemoval={this.props.isRemoval}
                  key={track.id} /> ;
              }
            )}
          </div>
        );
      }
    }
export default Tracklist;
