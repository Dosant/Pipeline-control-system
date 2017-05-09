module.exports = {
  pQueue
};

function pQueue(promiseArray) {
  return promiseArray.reduce((promiseChain, nextPromise) => {
    return promiseChain.then(nextPromise);
  }, Promise.resolve());
}