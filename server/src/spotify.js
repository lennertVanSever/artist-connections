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

module.exports = {
  getAuthorizationHeader,
}