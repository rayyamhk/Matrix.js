const { INVALID_MATRIX } = require('../../Error');

/**
 * Find the transpose of given matrix.
 * @param { Matrix } A - Any matrix
 * @return { Matrix } - Transpose of A
 */

module.exports = function transpose(A) {
  if (!(A instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  const [row, col] = A.size();
  const matrix = A._matrix;

  return this.generate(col, row, (i, j) => matrix[j][i]);
};
