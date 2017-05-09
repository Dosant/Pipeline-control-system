const router = require('express').Router();
const paginationMiddleware = require('../middlewares/pagination');
const {getData} = require('../controllers/data');
const {mapStateToDataSet} = require('../services/state');

router.get('/', paginationMiddleware, (req, res, next) => {
  console.log(req.query);
  const {skip, top} = req.query;
  const filterConfig = JSON.parse(req.query.filterConfig);
  return getData(skip, top, filterConfig)
    .then((dataSet) => {
      dataSet = mapStateToDataSet(dataSet);
      res.json(dataSet);
    });
});

module.exports = router;