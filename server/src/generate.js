const fetch = require('node-fetch');
const async = require('async');
const fs = require('fs');
const data = require('../data.json')
const { getAuthorizationHeader } = require('./spotify');

const getRelatedArtists = async (headers, id) => {
  const response = await fetch(`https://api.spotify.com/v1/artists/${id}/related-artists`, { headers });
  if (response.status === 200) {
    let data = await response.json();
    return data.artists.map(({ id }) => id);
  } else {
    // console.log(response);
    return 'error';
  }
  throw new Error(response);
}
/*
const getRelatedArtistsFromList = async (headers, data) => {
  return new Promise((resolve, reject) => {
    async.forEachOf(data, async (artist, index) => {
      const related = await getRelatedArtists(headers, artist.id);
      data[index].related = related;
    }, () => {
      resolve(data);
    });
  });
}
*/

const saveFile = (data) => {
  if (data) {
    const currentTotal = Object.keys(data).length;
    const foreseenTotal = 2000000;
    console.log('Total count of scraped artists', currentTotal);
    console.log('Estimated completion', `${Math.round((currentTotal / foreseenTotal) * 100)}%`);
    fs.writeFile(
      `data.json`,
      JSON.stringify(data, null, 2),
      'utf8',
      () => console.info(`file saved`)
    );
  }
}
let state = '';
let succesfullScrapes = 0;
let skippedScrapes = 0;
let done = false;
const getData = async () => {
  const headers = await getAuthorizationHeader();
  // const data = {};
  let scraped = 0;
  let notScraped = {};
  Object.keys(data).forEach((key) => {
    const related = data[key];
    related.map((id) => {
      if (data[id]) {
        scraped += 1;
      } else {
        notScraped[id] = id;
      }
    })
  });
  if (Object.keys(notScraped).length === 0) {
    saveFile(data);
    done = true;
  }
  Object.keys(notScraped).forEach(async (id, index) => {
    if (index < 100) {
      console.log({ id, index });
      const artistData = await getRelatedArtists(headers, id);
      if (artistData === 'error') {
        if (state === 'succes') {
          console.log('skipped scrapes: ', skippedScrapes, 'succesfullScrapes: ', succesfullScrapes);
          succesfullScrapes = 0;
          skippedScrapes = 0;
          saveFile(data);
        }
        state = 'overload';
        skippedScrapes += 1;
        return;
      } else {
        state = 'succes';
        succesfullScrapes += 1;
        data[id] = artistData;
      }
    }
  });
}





const duplicateFile = () => {
  const oldData = require('../data.backup.json');
  const newData = require('../data.json');
  console.log(Object.keys(oldData).length, Object.keys(newData).length);
  if (Object.keys(oldData).length < Object.keys(newData).length) {
    fs.copyFile('data.json', `data.backup.json`, (err) => {
      if (err) console.log('error in duplicating file');
      else console.log(`data.json was copied to data.backup.json`);
    });
  }
}

let amountOfCycles = 0;
const interval = setInterval(() => {
  if (!done) {
    amountOfCycles += 1;
    getData();
    console.log('amountOfCycles', amountOfCycles);
    if (amountOfCycles % 100 === 4) {
      duplicateFile();
    }
  }
  else {
    console.log('finished scraping')
    clearInterval(interval);
  }
}, 5000);




/*
  const recursivelyGetData = async (id) => {
    if (!data[id]) {
      const artistData = await getRelatedArtists(headers, id);
      console.log(artistData);
      if (artistData === 'error') {
        fs.writeFile(
          `data.json`,
          JSON.stringify(data, null, 2),
          'utf8',
          () => console.info(`file saved`)
        );
        console.log('Oops something went wrong');
        return;
      } else {
        data[id] = artistData;
        artistData.forEach((nestedId) => {
          if (!data[nestedId]) {
            recursivelyGetData(nestedId);
          }
        })
      }
    }
  };

  recursivelyGetData('32aUoW94mJ7xTJI7fG0V1G');
  */