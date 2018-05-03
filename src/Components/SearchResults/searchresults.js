import React from 'react';
import './searchresults.css';

import Tracklist from '../Tracklist/tracklist.js';

class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <Tracklist tracks={this.props.searchResults} isRemoval={false} onAdd={this.props.onAdd}/>
      </div>
    )};
};
export default SearchResults;
