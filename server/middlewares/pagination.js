module.exports = (req, res, next) => {
  if (!req.query.skip) {
    req.query.skip = 0;
  } else {
    req.query.skip = +req.query.skip;
  }

  if (!req.query.top) {
    req.query.top = 100;
  } else {
    req.query.top = +req.query.top;
  }

  next();
}

