function filtration(dataset) {
  return dataset.filter((data) => data !== 0);
}

module.exports = {
  filtration: filtration
};
