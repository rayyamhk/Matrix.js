/**
 * Generates a zero Matrix
 * @memberof Matrix
 * @static
 * @param {number} row - Number of rows of the Matrix
 * @param {number} col - Number of columns of the Matrix
 * @returns {Matrix} Zero Matrix
 */
function zero(row, col) {
  if (col === undefined) {
    return this.generate(row, row, () => 0);
  }
  return this.generate(row, col, () => 0);
};

module.exports = zero;
