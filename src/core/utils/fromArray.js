const { SIZE_INCOMPATIBLE } = require('../../Error');

/**
 * Generate a matrix from an array with compatible dimensions 
 * @memberof Matrix
 * @static
 * @param {Array} arr - Source array
 * @param {number} row - Row of the matrix
 * @param {number} col - Column of the matrix
 * @returns {Matrix} Matrix
 */
function fromArray(arr, row, col) {
  if (row * col !== arr.length) {
    throw new Error(SIZE_INCOMPATIBLE);
  }
  return this.generate(row, col, (i, j) => arr[i * col + j]);
};

module.exports = fromArray;
