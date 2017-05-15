function createRouter(wss) {
  const router = require('express').Router();

  router.use('/data', require('./data'));
  router.use('/elements', require('./elements'));
  router.use('/states', require('./states'));

  router.use('/services', require('./services'));
  router.use('/realtime', require('./realtime').createRouter(wss));

  return router;
}

module.exports = createRouter;