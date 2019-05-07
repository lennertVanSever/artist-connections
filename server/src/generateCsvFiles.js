const data = require('../data.json');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;  

const getArtistCsv = () => {
  const csvWriter = createCsvWriter({  
    path: 'artist.csv',
    header: [
      {id: 'artistId:ID', title: 'artistId:ID'},
      {id: ':LABEL', title: ':LABEL'}
    ]
  });

  const artistIds = Object.keys(data).map(id => ({ 'artistId:ID': id, ':LABEL': 'Artist' }));

  csvWriter  
    .writeRecords(artistIds)
    .then(()=> console.log('The CSV file was written successfully'));
}


const createRelationCSV = (min, max, number) => {
  const csvWriter = createCsvWriter({  
    path: `related${number}.csv`,
    header: [
      {id: ':START_ID', title: ':START_ID'},
      {id: ':END_ID', title: ':END_ID'},
      {id: ':TYPE', title: ':TYPE'},
    ]
  });

  const related = [];

  Object.keys(data).forEach((id, index) => {
    if (index >= min && index < max) {
      const relatedArtists = data[id];
      relatedArtists.forEach((relatedId) => {
        related.push({
          ':START_ID': id,
          ':END_ID': relatedId,
          ':TYPE': 'Related'
        })
      })
    }
  });


  csvWriter  
    .writeRecords(related)
    .then(()=> console.log('The CSV file was written successfully'));
}
/*
createRelationCSV(0, 500000, 1);
createRelationCSV(500000, 1000000, 2);
createRelationCSV(1000000, 1500000, 3);
*/