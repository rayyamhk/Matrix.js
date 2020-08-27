const { INVALID_MATRIX, SIZE_INCOMPATIBLE } = require('../../Error');

/**
 * Find the sum of two matrices.
 * @param { Matrix } A - Any matrix
 * @param { Matrix } B - Any matrix that has same size with A
 * @return { Matrix } - Sum of two matrices
 */

module.exports = function add(A, B) {
  if (!(A instanceof this) || !(B instanceof this)) {
    throw new Error(INVALID_MATRIX);
  }

  const [row, col] = A.size();
  const [row2, col2] = B.size();

  if (row !== row2 || col !== col2) {
    throw new Error(SIZE_INCOMPATIBLE);
  }

  const matrix1 = A._matrix;
  const matrix2 = B._matrix;

  return this.generate(row, col, (i, j) => matrix1[i][j] + matrix2[i][j]);
};
