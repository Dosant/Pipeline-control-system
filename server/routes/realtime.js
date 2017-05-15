const url = require('url');
function createRouter(wss){
  const router = require('express').Router();

  const IMITATION_PATH = 'realtime/imitation';
  const CLIENT_PATH = 'realtime/client';

  const checkWSOrigin = (ws, path) => {
    const location = url.parse(ws.upgradeReq.url, true);
    return location.path.includes(path);
  }

  const isImitationModuleConnected = () => {
    return Array.from(wss.clients).filter((client) => checkWSOrigin(client, IMITATION_PATH)).length > 0;
  }

  router.get('/connected', (req, res) => {
    const isConnected = isImitationModuleConnected();
    res.send(isConnected);
  });

  wss.on('connection', function connection(ws) {
    const location = url.parse(ws.upgradeReq.url, true);
    switch (location.path) {
      case `/api/${IMITATION_PATH}`:
        console.log('Imitation module connected');
        ws.send('connected');
        ws.on('message', function incoming(message) {
          try {

          } catch (e) {
            console.error(e);
          }
        });
      break;
      default:
        console.log('Unknown path', location.path);
        ws.terminate();
    }

  });

  return router;
}


module.exports = createRouter;