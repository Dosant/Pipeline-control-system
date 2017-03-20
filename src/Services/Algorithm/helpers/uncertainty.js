const UNCERTAINTY_LIMIT = 0.1;

export function uncertainty(dataset) {
  return dataset.reduce(
    (uncertainty, data) => {
      return uncertainty + (data < UNCERTAINTY_LIMIT ? data : 0);
    },
    0
  );
}
