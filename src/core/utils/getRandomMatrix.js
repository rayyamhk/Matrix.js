/**
 * Generates a random Matrix.
 * @memberof Matrix
 * @static
 * @param {number} row - Number of rows of a Matrix
 * @param {number} col - Number of columns of a Matrix
 * @param {number} min - Lower bound of each entry
 * @param {number} max - Upper bound of each entry
 * @param {number} toFixed - Number of decimal places
 * @returns {Matrix} Generated random Matrix
 */
function getRandomMatrix(row, col, min = 0, max = 1, toFixed = 0) {
  return this.generate(
    row, col, () => Number.parseFloat((Math.random() * (max - min) + min).toFixed(toFixed)),
  );
};

module.exports = getRandomMatrix;
