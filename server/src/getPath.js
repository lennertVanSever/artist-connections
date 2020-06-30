const neo4j = require('neo4j-driver')
const driver = neo4j.driver(process.env.NEO4J_URL, neo4j.auth.basic('neo4j', process.env.NEO4J_PASSWORD));
const fetch = require('node-fetch');
const { getAuthorizationHeader, cherryPickData } = require('./spotify');
// const { Client } = require('pg');
// const { saveCountOfConnections } = require('./persistence');


const getPath = (artist1, artist2) => {
  return new Promise((resolve, reject) => {
    const session = driver.session();
    const resultPromise = session.run(
      `
        MATCH path = shortestPath(
            (a1 {artistId:$artist1})<-[:Related*]->(a2 {artistId:$artist2}))
        RETURN path;
      `,
      {artist1, artist2}
    );
    resultPromise.then(result => {
      session.close();
      const singleRecord = result.records[0];
      if (singleRecord) {
        const node = singleRecord.get(0);
        resolve(node.segments.map((element) => {
          const connection = () => {
            const identityIdArtist1 = element.start.properties.artistId;
            const identityIdArtist2 = element.end.properties.artistId;
            if (element.relationship.start.low === element.start.identity.low) return ({ direction: 'RIGHT', source: identityIdArtist1 });
            return ({ direction: 'LEFT', source: identityIdArtist2 });
          }
          return { artistId: element.start.properties.artistId, connection: connection() };
        }));
      } else {
        resolve('NOT FOUND');
      }
    }).catch(error => {
      console.log(error);
      reject(error);
    });
  });
}

exports.default = async (req, res) => {
  const { firstArtistId, secondArtistId } = req.params;
  if (firstArtistId === secondArtistId) return res.json({ message: 'SAME ARTIST' });
  let shortestPathRaw;
  try {
    shortestPathRaw = await getPath(firstArtistId, secondArtistId);
  } catch (error) {
    return res.json({ message: 'UNKNOWN ERROR' });
  }

  if (shortestPathRaw === 'NOT FOUND') {
    return res.json({ message: shortestPathRaw });
  }
  const shortestPath = shortestPathRaw.slice(1, shortestPathRaw.length)
  const headers = await getAuthorizationHeader();
  const artistIds = shortestPath.map(({ artistId }) => artistId);
  
  if (artistIds.length === 0) {
    return res.json({ message: 'DIRECT CONNECTION' });
  }

  const response = await fetch(`https://api.spotify.com/v1/artists?ids=${artistIds.join()}`, { headers });
  if (response.status === 200) {
    let data = await response.json();
    const cherryPickedData = cherryPickData(data.artists);
    cherryPickedData.forEach((artist, index) => {
      if (index === 0) {
        artist.connection1 = shortestPathRaw[0].connection;
        artist.connection2 = shortestPathRaw[1].connection;
      } else {
        artist.connection2 = shortestPathRaw[index + 1].connection;
      }
    });
    res.json(cherryPickedData);
    // saveCountOfConnections(firstArtistId, secondArtistId, cherryPickedData.length);
    return;
  } else {
    return res.status(500).send('something went wrong');
  }
}

