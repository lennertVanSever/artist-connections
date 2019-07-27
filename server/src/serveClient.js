var compression = require('compression')
var express = require('express')
var app = require('./index');

const path = require('path');
const fs = require('fs');

const { getArtistsData } = require('./spotify');

const clientDirectory = './client';

app.use(compression())

app.get('/', function(request, response) {
  const filePath = path.resolve(clientDirectory, './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err,data) {
    data = data.replace(/\$TITLE/g, 'Artist Connections');
    data = data.replace(/\$DESCRIPTION/g, 'Find out the degree of seperation between any two given artist');
    data = data.replace(/\$IMAGE1/g, '/images/banner.png');
    response.send(data);
  });
});

app.get('/artists/:firstArtistId/:secondArtistId', async (request, response) => {
  const filePath = path.resolve(clientDirectory, './build', 'index.html');
  const { firstArtistId, secondArtistId } = request.params;
  const artistsData = await getArtistsData([firstArtistId, secondArtistId]);
  if (artistsData === 'NOT_FOUND') {
    return response.status(404).send('artists not found');
  }
  const { name: firstArtistName, image: firstArtistImage } = artistsData[0];
  const { name: secondArtistName, image: secondArtistImage } = artistsData[1];

  fs.readFile(filePath, 'utf8', function (err,data) {
    data = data.replace(/\$TITLE/g, `From ${firstArtistName} to ${secondArtistName}`);
    data = data.replace(/\$DESCRIPTION/g, `The degree of seperation between ${firstArtistName} and ${secondArtistName}`);
    data = data.replace(/\$IMAGE1/g, firstArtistImage);
    data = data.replace(/\$IMAGE2/g, secondArtistImage);
    data = data.replace(/\$URL/g, `http://artist-connections.com/${firstArtistName}/${secondArtistName}`);
    response.send(data);
  });
});

app.use(express.static(path.resolve(clientDirectory, './build')));