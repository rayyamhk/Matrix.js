const isNumber = require('./isNumber');

module.exports = function isMatrix(matrix) {
  if (!Array.isArray(matrix)) {
    return false;
  }
  const height = matrix.length;
  if (height === 0) {
    return true; // [] represents empty matrix (0 x 0 matrix)
  }
  const firstRow = matrix[0];
  if (!Array.isArray(firstRow)) {
    return false;
  }
  const width = firstRow.length;
  if (width === 0) {
    return false; // [ [] ] is not allowed
  }
  for (let i = 0; i < height; i++) {
    const row = matrix[i];
    if (!Array.isArray(row) || row.length !== width) {
      return false;
    }
    for (let j = 0; j < width; j++) {
      if (!isNumber(row[j])) {
        return false;
      }
    }
  }
  return true;
};
