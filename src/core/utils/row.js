const { INVALID_ROW_COL, OVERFLOW_ROW, INVALID_MATRIX } = require('../../Error');

/**
 * Gets the row of a Matrix with valid index.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @param {number} index - Any valid row index
 * @returns {Matrix} Row of A
 */
function row(A, index) {
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

module.exports = row;
