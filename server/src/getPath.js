const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver('bolt://0.0.0.0:7687', neo4j.auth.basic('neo4j', process.env.NEO4J_PASSWORD));
const session = driver.session();
const fetch = require('node-fetch');
const { getAuthorizationHeader, cherryPickData } = require('./spotify');


const getPath = (artist1, artist2) => {
  return new Promise((resolve, reject) => {
    const resultPromise = session.run(
      `
        MATCH path = shortestPath(
            (a1:Artist {artistId:$artist1})<-[:Related*]->(a2:Artist {artistId:$artist2}))
        RETURN path;
      `,
      {artist1, artist2}
    );

    resultPromise.then(result => {
      const singleRecord = result.records[0];
      if (singleRecord) {
        const node = singleRecord.get(0);
        resolve(node.segments.map((element) => {
          const connection = () => {
            const identityIdArtist1 = element.start.properties.artistId;
            const identityIdArtist2 = element.end.properties.artistId;
            // console.log(JSON.stringify(element, null, 2));
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
      error(error);
    });
  });
}

exports.default = async (req, res) => {
  const shortestPathRaw = await getPath(req.params.firstArtistId, req.params.secondArtistId);
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
    return res.json(cherryPickedData);
  } else {
    return res.status(500).send('something went wrong');
  }
  driver.close();
  session.close();
}

