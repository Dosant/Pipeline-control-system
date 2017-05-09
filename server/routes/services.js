const router = require('express').Router();
const {recalcState, getSystemState} = require('../controllers/data');
const { getElementsStats } = require('../controllers/elements');
const paginationMiddleware = require('../middlewares/pagination');

router.post('/recalc_state', (req, res, next) => {
  return recalcState()
    .then((dataSet) => {
      res.send('Success');
    })
    .catch(next);
});

router.get('/system_state', paginationMiddleware, (req, res, next) => {
  const {top, skip, isCritical} = req.query
  return getSystemState(isCritical === 'true', top, skip)
    .then((systemState) => {
      res.json(systemState);
    })
    .catch(next);
});

router.get('/system_stats', (req, res, next) => {
  return getSystemState(false, 1000, 0)
    .then((systemState) => {
      const timeSeriesGraph = systemState.map(({state, date}) => {
        return {
          state,
          date: date.to
        }
      }).reverse();

      const stateClassStats = systemState.reduce((stats, {stateClass}) => {
        if (stats[stateClass._id]) {
          stats[stateClass._id].count++
        } else {
          stats[stateClass._id] = {
            stateClass,
            count: 1
          };
        }
        return stats;
      }, {});

      res.json({
        timeSeriesGraph,
        stateClassStats
      });
    });
});

router.get('/elements_stats', (req, res, next) => {
  return getElementsStats()
    .then((result) => res.json(result));
});

module.exports = router;