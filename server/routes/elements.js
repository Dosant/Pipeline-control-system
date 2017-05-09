const router = require('express').Router();
const {getElements, getElementsWithState} = require('../controllers/elements');

router.get('/', (req, res, next) => {
   const {withState, deep = 1} = req.query;
   if (!withState) {
    return getElements()
      .then((elements) => {
        res.json(elements);
      });
   } else {
    return getElementsWithState(+deep)
      .then((elements) => {
        res.json(elements);
      })
      .catch(next);
   }
});

module.exports = router;