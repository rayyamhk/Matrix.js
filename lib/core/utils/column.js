const { INVALID_ROW_COL, OVERFLOW_COLUMN, INVALID_MATRIX } = require('../../Error');

/**
 * Get the column of a matrix with valid index.
 * @param { Matrix } A - Any matrix
 * @param { Integer } index - Any valid column index
 * @return { Matrix } - Column of A
 */

module.exports = function column(A, index) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  if (!Number.isInteger(index) || index < 0) {
    throw new Error(INVALID_ROW_COL);
  }

  const [r, c] = A.size();

  if (index >= c) {
    throw new Error(OVERFLOW_COLUMN);
  }

  const matrix = A._matrix;

  return this.generate(r, 1, (i) => matrix[i][index]);
};
