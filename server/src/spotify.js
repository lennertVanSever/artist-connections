const fetch = require('node-fetch');

const getAuthorizationHeader = async () => {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SERVER;
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (Buffer.from(`${client_id}:${client_secret}`).toString('base64'))
    },
    body: 'grant_type=client_credentials',
  });
  let data = await response.json();
  if (response.status === 200) {
    const token = data.access_token;
    return ({
      'Authorization': `Bearer ${token}`
    });
  }
  console.log(data)
  throw new Error(response);
}

const cherryPickData = (data) => {
  return data.map(({ external_urls: { spotify }, genres, images, name, id}) => {
    const getImage = () => {
      if (images[0]) return images[0].url;
      return null;
    }
    const getGenre = () => {
      if (genres[0]) return genres[0];
      return null;
    }
    return ({
      id,
      name,
      image: getImage(),
      genre: getGenre(),
      url: spotify,
    })
  })
}

const getArtistsData = async (artistIds) => {
  const headers = await getAuthorizationHeader();
  const response = await fetch(`https://api.spotify.com/v1/artists?ids=${artistIds.join()}`, { headers });
  if (response.status === 200) {
    let data = await response.json();
    if (data.artists.every(value => value)) {
      const cherryPickedData = cherryPickData(data.artists);
      return cherryPickedData;
    }
    return 'NOT_FOUND';
  }
  return 'SOMETHING_WENT_WRONG';
}
const getArtistsDataRoute =  async (req, res) => {
  const artistData = await getArtistsData([req.params.firstArtistId, req.params.secondArtistId]);
  if (artistData === 'SOMETHING_WENT_WRONG') {
    return res.status(500).send(artistData);
  }
  return res.json(artistData);
}


module.exports = {
  getAuthorizationHeader,
  cherryPickData,
  getArtistsData,
  getArtistsDataRoute,
}