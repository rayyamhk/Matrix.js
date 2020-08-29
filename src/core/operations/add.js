const { INVALID_MATRIX, SIZE_INCOMPATIBLE } = require('../../Error');

/**
 * Calculates the sum of two Matrices.
 * @memberof Matrix
 * @static
 * @param {Matrix} A - Any Matrix
 * @param {Matrix} B - Any Matrix that has same size with A
 * @returns {Matrix} The sum of two Matrices
 */
function add(A, B) {
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

module.exports = add;
