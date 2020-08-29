const { INVALID_ROW_COL, OVERFLOW_COLUMN, INVALID_MATRIX } = require('../../Error');

/**
 * Gets the column of a Matrix with valid index.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @param {number} index - Any valid column index
 * @returns {Matrix} Column of A
 */
function column(A, index) {
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

module.exports = column;
