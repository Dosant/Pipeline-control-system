const url = require('url');
let _wss;

const IMITATION_PATH = 'realtime/imitation';
const CLIENT_PATH = 'realtime/client';

const checkWSOrigin = (ws, path) => {
  const location = url.parse(ws.upgradeReq.url, true);
  return location.path.includes(path);
};

const isImitationModuleConnected = () => {
  return Array.from(_wss.clients)
    .filter(client => checkWSOrigin(client, IMITATION_PATH)).length > 0;
};

const isClientConnected = () => {
  return Array.from(_wss.clients)
    .filter(client => checkWSOrigin(client, CLIENT_PATH)).length > 0;
};

function createRouter(wss) {
  _wss = wss;
  const router = require('express').Router();

  router.get('/connected', (req, res) => {
    const isConnected = isImitationModuleConnected();
    res.send(isConnected);
  });

  router.get('/notify', (req, res) => {
    notifyAboutNewData();
    res.send(true);
  })

  wss.on('connection', function connection(ws) {
    const location = url.parse(ws.upgradeReq.url, true);
    switch (location.path) {
      case `/api/${IMITATION_PATH}`:
        console.log('Imitation module connected');
        break;
      case `/api/${CLIENT_PATH}`:
        console.log('Client connected');
        
        let pingPong = setInterval(() => {
          ws.ping();
        }, 5000);
        ws.on('close', () => {
          clearInterval(pingPong);
        });

        break;
      default:
        console.log('Unknown path', location.path);
        ws.close();
    }
  });

  return router;
}

function notifyAboutNewData() {
  _wss.clients.forEach(function each(client) {
    if (checkWSOrigin(client, CLIENT_PATH) && client.readyState === client.OPEN) {
      client.send('new data');
    }
  });
}

module.exports = {
  createRouter,
  notifyAboutNewData
};
