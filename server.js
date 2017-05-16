/*
  Express config
*/
const express = require('express');
const app = express();
const http = require('http');
require('./server/config/express')(app);
const port = process.env.PORT || 8100;

const server = http.createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });
server.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});


/*
  Mongo config
*/
const config = require('config');
const mongoose = require('mongoose');
const mongoUrl = process.env.MONGODB_URI || config.get('mongoUrl')
const db = mongoose.connect(mongoUrl);

mongoose.connection.on('connected', function() {
  console.log('Mongoose default connection open to ' + mongoUrl);
  const {preloadStates} = require('./server/services/state');
  preloadStates()
    .then(() => {
      const args = require('minimist')(process.argv.slice(2));
      if (args.isTraining) {
        require('./training');
      }
    });
});

mongoose.connection.on('error', function(err) {
  console.log('Mongoose default connection error: ' + err);
});

process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});

/*
  Routes config
*/
app.use('/api', require('./server/routes')(wss));
app.use('/data', express.static('data/'));
app.use('/', express.static('build/'));
app.use('/*', express.static('build/index.html'));
