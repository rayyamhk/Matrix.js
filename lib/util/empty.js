const { INVALID_ROW_COL } = require('../Error');

module.exports = function empty(row, col) {
  if (!Number.isInteger(row) || row < 0 || !Number.isInteger(col) || col < 0) {
    throw new Error(INVALID_ROW_COL);
  }
  if (row === 0 || col === 0) {
    return [];
  }
  const matrix = new Array(row);
  for (let i = 0; i < row; i++) {
    matrix[i] = new Array(col);
  }

  return matrix;
};
