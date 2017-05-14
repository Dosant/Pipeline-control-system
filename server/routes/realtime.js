const router = require('express').Router();

router.get('/connected', (req, res) => {
  res.send(false);
});

module.exports = router;