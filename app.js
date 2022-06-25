const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const app = express()

app.use(bodyParser.json());
app.use(require('./api'));

const server = http.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

module.exports = server;