const fetch = require('node-fetch');
const { getAuthorizationHeader, cherryPickData } = require('./spotify');

exports.default = async (req, res) => {
  const headers = await getAuthorizationHeader();
  const searchResult = await fetch(`https://api.spotify.com/v1/search?q=${req.params.name}&type=artist`, { headers });
  if (searchResult.status === 200) {
    let data = await searchResult.json();
    if (data.artists.items.length === 0) return res.status(404).send('no artists found');
    const cherryPickedData = cherryPickData(data.artists.items);
    return res.json(cherryPickedData);
  } else {
    return res.status(searchResult.status).send({searchResult});
  }
}