const { INVALID_MATRIX } = require('../../Error');

/**
 * Create a copy of matrix. Note that it resets the cached data.
 * @param { Matrix } A - Any matrix
 * @return { Matrix } - Returns a copy of A
 */

module.exports = function clone(A) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  const [row, col] = A.size();
  const matrix = A._matrix;
  return this.generate(row, col, (i, j) => matrix[i][j]);
};
