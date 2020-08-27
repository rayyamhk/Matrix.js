const { INVALID_ROW_COL, OVERFLOW_INDEX } = require('../../Error');

/**
 * Get the entry of a matrix.
 * @param { Integer } row - Any valid row index
 * @param { Integer } col - Any valid column index
 * @return { Number } - Entry of the matrix
 */

module.exports = function entry(row, col) {
  if (!Number.isInteger(row) || row < 0 || !Number.isInteger(col) || col < 0) {
    throw new Error(INVALID_ROW_COL);
  }

  const A = this._matrix;
  const [r, c] = this.size();
  if (row >= r || col >= c) {
    throw new Error(OVERFLOW_INDEX);
  }
  return A[row][col];
};
