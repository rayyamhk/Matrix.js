"use strict";

/**
 * Generate a random matrix.
 * @param { Integer } row - Number of rows of a matrix
 * @param { Integer } col - Number of columns of a matrix
 * @param { Number } min - Lower bound of each entry
 * @param { Number } max - Upper bound of each entry
 * @param { Integer } toFixed - Number of decimal places
 * @return { Matrix } - Returns random matrix
 */
module.exports = function getRandomMatrix(row, col) {
  var min = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var max = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var toFixed = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  return this.generate(row, col, function () {
    return Number.parseFloat((Math.random() * (max - min) + min).toFixed(toFixed));
  });
};