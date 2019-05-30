
require('dotenv').config();
var express = require('express'), app = module.exports = express(), port = process.env.PORT || 8080;
var cors = require('cors')

app.use(cors())

require('./serveClient');

const search = require('./search');
app.get('/search/:name', search.default);

const getPath = require('./getPath');
app.get('/getPath/:firstArtistId/:secondArtistId', getPath.default);

const { getArtistsDataRoute } = require('./spotify');
app.get('/getArtists/:firstArtistId/:secondArtistId', getArtistsDataRoute);


app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
