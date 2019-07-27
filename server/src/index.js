
require('dotenv').config();
const express = require('express'), app = module.exports = express();

const PORT = 8080;
const HOST = '0.0.0.0';

require('./serveClient');

const search = require('./search');
app.get('/search/:name', search.default);

const getPath = require('./getPath');
app.get('/getPath/:firstArtistId/:secondArtistId', getPath.default);

const { getArtistsDataRoute } = require('./spotify');
app.get('/getArtists/:firstArtistId/:secondArtistId', getArtistsDataRoute);


app.listen(PORT, HOST);

console.log(`server is running on http://${HOST}:${PORT}`);
