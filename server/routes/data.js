const router = require('express').Router();
const paginationMiddleware = require('../middlewares/pagination');
const {getData, countData, addMultipleData} = require('../controllers/data');
const {mapStateToDataSet} = require('../services/state');

router.get('/', paginationMiddleware, (req, res, next) => {
  console.log(req.query);
  const {skip, top} = req.query;
  const filterConfig = JSON.parse(req.query.filterConfig);
  return getData(skip, top, filterConfig).then(dataSet => {
    dataSet = mapStateToDataSet(dataSet);
    res.json(dataSet);
  });
});

router.get('/total', (req, res, next) => {
  return countData().then(total => {
    res.send(200, total);
  });
});

router.post('/', (req, res, next) => {
  let dataSet = req.body;
  dataSet = mapStateToDataSet(dataSet);
  dataSet.forEach(data => {
    data.isCustom = true;
  });
  return addMultipleData(dataSet)
    .then(() => {
      return countData();
    })
    .then(total => {
      res.send(200, total);
    });
});

module.exports = router;
