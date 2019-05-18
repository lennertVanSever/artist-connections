require('dotenv').config();
var cors = require('cors')

var express = require('express'), app = express(), port = process.env.PORT || 8080;

app.use(cors())
app.listen(port);

const search = require('./search');
app.get('/search/:name', search.default);

console.log(`api started on http://localhost:${port}`);

// require('./getPath.js');