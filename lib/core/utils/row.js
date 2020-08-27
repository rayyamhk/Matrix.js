const { INVALID_ROW_COL, OVERFLOW_ROW, INVALID_MATRIX } = require('../../Error');

/**
 * Get the row of a matrix with valid index.
 * @param { Matrix } A - Any matrix
 * @param { Integer } index - Any valid row index
 * @return { Matrix } - Row of A
 */

module.exports = function row(A, index) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  if (!Number.isInteger(index) || index < 0) {
    throw new Error(INVALID_ROW_COL);
  }

  const [r, c] = A.size();

  if (index >= r) {
    throw new Error(OVERFLOW_ROW);
  }

  const matrix = A._matrix;

  return this.generate(1, c, (i, j) => matrix[index][j]);
};
