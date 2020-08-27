"use strict";

var empty = require('../../util/empty');
/**
 * Generate a matrix which entries are the returned value of callback function.
 * @param { Integer } row - Number of rows of matrix
 * @param { Integer } col - Number of columns of matrix
 * @param { Function } cb - Callback function which takes row and column as arguments
 * and generate the corresponding entry
 * @return { Matrix } - Returns generated matrix
 */


module.exports = function generate(row, col, cb) {
  var matrix = empty(row, col);

  if (row === 0 || col === 0) {
    return new this([]);
  }

  for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
      matrix[i][j] = cb(i, j);
    }
  }

  return new this(matrix);
};