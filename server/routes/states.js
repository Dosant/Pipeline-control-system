const router = require('express').Router();
const {getStates} = require('../controllers/states');

router.get('/', (req, res, next) => {
  return getStates()
    .then((states) => {
      res.json(states);
    });
});

module.exports = router;