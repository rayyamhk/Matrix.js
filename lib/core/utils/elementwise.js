const { INVALID_MATRIX } = require('../../Error');

/**
 * Apply a function over each entry of a matrix and return
 * a new copy of the new matrix.
 * @param { Matrix } A - Any matrix
 * @param { Function } cb - Callback function which applies on each entry of A
 * @return { Matrix } - A copy of new matrix
 */

module.exports = function elementwise(A, cb) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  const [row, col] = A.size();
  const matrix = A._matrix;

  return this.generate(row, col, (i, j) => cb(matrix[i][j]));
};
