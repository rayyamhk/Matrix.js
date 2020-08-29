const { INVALID_ROW_COL, OVERFLOW_INDEX } = require('../../Error');

/**
 * Gets the entry of a Matrix.
 * @memberof Matrix
 * @instance
 * @param {number} row - Any valid row index
 * @param {number} col - Any valid column index
 * @returns {number} Entry of the Matrix
 */
function entry(row, col) {
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

module.exports = entry;
