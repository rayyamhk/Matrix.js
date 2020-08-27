"use strict";

/**
 * Generate a zero matrix
 * @param { Integer } row - Number of rows of the matrix
 * @param { Integer } col - Number of columns of the matrix
 * @return { Matrix } - Returns zero matrix
 */
module.exports = function zero(row, col) {
  if (col === undefined) {
    return this.generate(row, row, function () {
      return 0;
    });
  }

  return this.generate(row, col, function () {
    return 0;
  });
};