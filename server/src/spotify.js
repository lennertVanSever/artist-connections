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
  if (response.status === 200) {
    let data = await response.json();
    const token = data.access_token;
    return ({
      'Authorization': `Bearer ${token}`
    });
  }
  throw new Error(response);
}

const cherryPickData = (data) => {
  console.log(data);
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

module.exports = {
  getAuthorizationHeader,
  cherryPickData,
}