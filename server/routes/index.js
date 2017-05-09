const router = require('express').Router();

router.use('/data', require('./data'));
router.use('/elements', require('./elements'));
router.use('/states', require('./states'));

router.use('/services', require('./services'));

module.exports = router;