const clientID = '673135aeac534e6f9669b5377714c557';
const redirectURI = 'http://localhost:3000/';

let accessToken = '';
let expiresIn = '';

const Spotify = {
    getAccessToken() {
        if (accessToken !== '') {
            return accessToken;
        }
        const isAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const isExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

        if (isAccessToken && isExpiresIn) {
            accessToken = isAccessToken[1];
            expiresIn = isExpiresIn[1];
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            window.open(`https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=token&scope=playlist-modify-public`, "_self");
        }
    },

    userSearch(term) {
    const accessToken = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
      {headers: {Authorization: `Bearer ${accessToken}`}}).then(response => {
        if(response.ok){
          return response.json();
        } else{console.log('Request failed')}
      }).then(jsonResponse => {
        if(jsonResponse.tracks){
          return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
          }))
        } else {return []}
      })
    },

    savePlaylist(playlistName, trackURIs) {
        if (playlistName === null || trackURIs === null) {
            return;
        }

        let user_id = '';
        const profileURL = 'https://api.spotify.com/v1/me';

        const headers = { Authorization: `Bearer ${accessToken}` }
        let playlist_id = '';

        fetch(profileURL, { headers: headers })
            .then(response => response.json())
            .then(jsonResponse => user_id = jsonResponse.id)
            .then(() => {
                const createPlaylistURL = `https://api.spotify.com/v1/users/${user_id}/playlists`;
                fetch(createPlaylistURL, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        name: playlistName
                    })
                })
                    .then(response => response.json())
                    .then(jsonResponse => playlist_id = jsonResponse.id)
                    .then(() => {
                        const addPlaylistTrackURL = `https://api.spotify.com/v1/${user_id}/playlists/${playlist_id}/tracks`;
                        fetch(addPlaylistTrackURL, {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify({
                                uris: trackURIs
                            })
                        })
                    })
            })

    },
};

export default Spotify;
