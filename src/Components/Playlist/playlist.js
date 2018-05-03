import React from 'react';
import './playlist.css';

import Tracklist from '../Tracklist/tracklist';

class Playlist extends React.Component {
  constructor(props) {
        super(props);

        this.handleNameChange=this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }
  render() {
      return (
        <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange={this.handleNameChange} />
        <Tracklist tracks={this.props.playlistTracks} isRemoval={true} onRemove={this.props.onRemove} />
          <a onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</a>
        </div>
    )};
  }

export default Playlist;
