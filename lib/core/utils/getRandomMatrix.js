/**
 * Generate a random matrix.
 * @param { Integer } row - Number of rows of a matrix
 * @param { Integer } col - Number of columns of a matrix
 * @param { Number } min - Lower bound of each entry
 * @param { Number } max - Upper bound of each entry
 * @param { Integer } toFixed - Number of decimal places
 * @return { Matrix } - Returns random matrix
 */

module.exports = function getRandomMatrix(row, col, min = 0, max = 1, toFixed = 0) {
  return this.generate(
    row, col, () => Number.parseFloat((Math.random() * (max - min) + min).toFixed(toFixed)),
  );
};
