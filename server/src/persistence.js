const { Client } = require('pg');
const connectionString = process.env.POSTGRES_URL;

const saveCountOfConnections = async (fromArtistId, toArtistId, numberOfConnections) => {
    try {
        const connection = new Client({
            connectionString,
        })
        const query = {
            text: `INSERT INTO public."artist_connections"
            (from_artist_id, to_artist_id, number_of_connections)
            VALUES($1, $2, $3)
            ON CONFLICT DO NOTHING;`,
            values: [fromArtistId, toArtistId, numberOfConnections]
        }
        await connection.connect();
        await connection.query(query);
        await connection.end();
    }
    catch(err) {
        console.log('something went wrong with pq', err);
    }
};

module.exports = {
    saveCountOfConnections
}