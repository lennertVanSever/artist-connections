const fetch = require('node-fetch');
const { getAuthorizationHeader } = require('./spotify');

exports.default = async (req, res) => {
  const headers = await getAuthorizationHeader();
  console.log(req.params.name);
  const searchResult = await fetch(`https://api.spotify.com/v1/search?q=${req.params.name}&type=artist`, { headers });
  if (searchResult.status === 200) {
    let data = await searchResult.json();
    console.log(data.artists.items);
    if (data.artists.items.length === 0) return res.status(404).send('no artists found');
    const cherryPickedData = data.artists.items.map(({ external_urls: { spotify }, genres, images, name, id}) => {
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
    return res.json(cherryPickedData);
  } else {
    
    return res.status(searchResult.status).send({searchResult});
  }
}