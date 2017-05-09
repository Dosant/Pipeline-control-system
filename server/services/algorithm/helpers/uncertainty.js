const UNCERTAINTY_LIMIT = 0.1;

function uncertainty(dataset) {
  return dataset.reduce(
    (uncertainty, data) => {
      return uncertainty + (data < UNCERTAINTY_LIMIT ? data : 0);
    },
    0
  );
}

module.exports = {
  uncertainty
}
