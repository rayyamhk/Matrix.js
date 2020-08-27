const { INVALID_MATRIX } = require('../../Error');

/**
 * Create a copy of matrix. Note that the caching won't be cloned.
 * @param { Matrix } A - Any matrix
 * @return { Matrix } - A copy of A
 */

module.exports = function clone(A) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  const [row, col] = A.size();
  const matrix = A._matrix;
  return this.generate(row, col, (i, j) => matrix[i][j]);
};
